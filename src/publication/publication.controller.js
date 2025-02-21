'use strict'

import User from '../user/user.model.js'
import Category from '../category/category.model.js'
import Comment from '../category/category.model.js'
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

//Actualizar un comentario
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

//Eliminar un comentario
export const deletePublicaton = async(req, res) => {
    try{
        let { id } = req.params
        let deletePublication = await Publication.findByIdAndDelete(id)     
        if(!deletePublication.length === 0){
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
                message: 'Publication deleted',
                deletePublication
            }
        )          
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when delete the publication',
                err
            }
        )
    }
}