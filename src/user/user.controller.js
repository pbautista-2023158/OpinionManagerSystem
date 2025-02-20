//Gestionar un perfil existente de usuario
import User from "../user/user.model.js";
import { encrypt } from '../../utils/encryp.js'

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

const agregarUsuarioAutomaticamente = async () => {
    const usuariosExistentes = await User.countDocuments()
    //user.password = await encrypt(user.password)    
    if(usuariosExistentes === 0) {
        const usuarioPorDefecto = [
            {
                name: "Pedro Sergio Javier",
                surname: "Bautista Matheu",
                username: "usuariodefault",
                email: "correoinstitucional@kinal.edu.gt",
                password: "Contrasenia!",
                phone: "4967-0135",
                role: "ADMIN"
            }
        ]
        try{
            await User.insertMany(usuarioPorDefecto)
            console.log("Default user added")
        }catch(error){
            console.error("General error when adding the default user", error)
        }
    }
}

agregarUsuarioAutomaticamente()