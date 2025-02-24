'use strict'

import User from '../user/user.model.js'
import Category from '../category/category.model.js'
import Comment from '../comment/comment.model.js'
import Publication from '../publication/publication.model.js'

//Crear una publicacion
export const createPublication = async(req, res) => {
    const data = req.body
    try{
        const user = await User.findOne(
            {
                _id: data.user
            }
        )

        if(!user) return res.status(403).send(
            {
                success: false,
                message: 'User id not found'
            }
        )        

        const category = await Category.findOne(
            {
                _id: data.category
            }
        )

        if(!category) return res.status(403).send(
            {
                success: false,
                message: 'Category id not found'
            }
        )
         
        const publication = new Publication(data)
        await publication.save()
        return res.send(
            {
                success: true,
                message: `Your post has been submitted`
            }
        )
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when create a publication',
                err
            }
        )
    }
}

//Obtener comentarios
export const getComments = async(req, res) => {
    try{
        const { limit = 5, skip = 0} = req.query
        const comments = await Publication.find()
            .skip(skip)
            .limit(limit)
            if(!comments.length === 0){
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
                    message: 'Publications found',
                    comments
                }
            )            
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', err})
    }
}

//Actualizar una publicación
export const updatePublication = async(req, res) => {
    try{
        const { id } = req.params
        const data = req.body
        const updatePublication = await Publication.findByIdAndUpdate(
            id, 
            data, 
            {new: true}
        )

        if(!updatePublication.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Publication updated',
                updatePublication
            }
        )             
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updating the publication',
                err
            }
        )
    }
}

//Eliminar una publicación
export const deletePublication = async(req, res) => {
    try {
        const { id } = req.params
        let deletePublication = await Publication.findById(id)
       
        if (!deletePublication.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
            
                }
            )
        }

        await Comment.deleteMany(
            { 
                publication: id 
            }
        )

        await Publication.findByIdAndDelete(id)

        return res.send(
            {
                success: true,
                message: 'Publication and its comments deleted successfully',
                deletePublication
            }
        )
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting the publication',
                err
            }
        )
    }
}
