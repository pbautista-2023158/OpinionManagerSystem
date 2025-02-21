'use strict'

import User from '../user/user.model.js'
import Publication from '../publication/publication.model.js'
import Comment from '../category/category.model.js'


//Publicar un comentario
export const postComment = async(req, res) => {
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

        const publication = await Publication.findOne(
            {
                _id: data.publication
            }
        )

        if(!publication) return res.status(403).send(
            {
                success: false,
                message: 'Category id not found'
            }
        )

        const comment = new Comment(data)
        await comment.save()
        return res.send(
            {
                success: true, 
                message: 'Your comment has been submitted'
            }
        )
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when post commentary',
                err
            }
        )
    }
}