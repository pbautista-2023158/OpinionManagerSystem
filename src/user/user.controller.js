//Gestionar un perfil existente de usuario
import User from "../user/user.model.js";
import { encrypt } from '../../utils/encryp.js'

//Obtener usuarios
export const getAll = async(req,res)=>{
    try{
        const { limit = 5, skip = 0} = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(!users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found',
                users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', err})
    }
}

//Obtener usuario por id
export const getId = async(req, res)=>{
    try{
        let { id } = req.params
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                    success: false,
                    message: 'User not found'
            }   
        )    
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Actualizar usuario
export const updateId = async(req, res)=>{
    try{
        const { id } = req.params
        const data = req.body
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false, 
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update 
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }   
} 

//Actualizar foto de usuario
export const updateProfilePicture = async(req, res)=>{
    try{
        const { uid } = req.user
        const { filename } = req.file
        const user = await User.findByIdAndUpdate(
            uid,
            {
                ProfilePicture: filename
            },
            { new: true }
        )
        if(!user) return res.status(404).send(
            {
                succes: false,
                message: 'User not found - not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated successfully',
                user
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Actualizar la contraseña del usuario
export const updatePassword = async(req, res) => {
    try {
      const { id } = req.params
      const { newPassword } = req.body
  
      if (!newPassword) {
        return res.status(400).send({ message: "New password is required" })
      }
  
      const hashedPassword = await encrypt(newPassword)
  
      const user = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      )
  
      if(!user) {
        return res.status(404).send({ message: "User not found" })
      }
      return res.send(
        {
            success: true,
            message: 'Password updated successfully'
        }
    )
    }catch (err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

const agregarUsuarioAutomaticamente = async () => {
    try{
        const adminExistente = await User.findOne({ role: "ADMIN" })
        if (!adminExistente) {
            const passwordEncrypt = await encrypt("Contraseña123*", 13)
            const usuarioPorDefecto = new User( 
                {
                    name: "Pedro Sergio Javier",
                    surname: "Bautista Matheu",
                    username: "usuariodefault",
                    email: "correoinstitucional@kinal.edu.gt",
                    password: passwordEncrypt,
                    phone: "4967-0135",
                    role: "ADMIN",
                    profilePicture: null
                }
            )
            await usuarioPorDefecto.save()
            console.log("Default admin added")
        }
    }catch(error){
        console.error("General error when adding the default user", err)
    }
}

agregarUsuarioAutomaticamente()