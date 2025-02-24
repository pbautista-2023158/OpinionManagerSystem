'use strict'

import User from '../user/user.model.js'
import Publication from '../publication/publication.model.js'
import Comment from '../comment/comment.model.js'

//Comentar una publicación
export const postComment = async(req, res) => {
    const { user, publication, comment } = req.body
    try{
        const userExists = await User.findById(user)
        if(!userExists) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'User id not found'
                }
            )
        }

        const publicationExists = await Publication.findById(publication)
        if(!publicationExists) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'Publication id not found'
                }
            )
        }

        const newComment = new Comment(
            {
                user: user,  
                publication: publication, 
                comment: comment
            }
        )

        await newComment.save()
        publicationExists.comments.push(newComment._id)
        await publicationExists.save()

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
                message: 'General error when creating a comment',
                err
            }
        )
    }
}

//Actualizar un comentario
export const updateComment = async(req, res) => {
    try{
        const { id } = req.params
        const data = req.body
        const updateComment = await Comment.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!updateComment.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Comment updated',
                updateComment
            }
        )                 
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting the comment',
                err
            }
        )
    }
}

//Eliminar un comentario
export const deleteComment = async(req, res) => {
    try{
        const { id } = req.params
        let deleteComment = await Comment.findById(id)

        if (!deleteComment.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
            
                }
            )
        }

        await Publication.updateMany(
            {comments: id},
            {comments: null}
        )

        await Comment.findByIdAndDelete(id)

        return res.send(
            {
                success: true,
                message: 'Comment deleted',
                deleteComment
            }
        )         
    }catch (err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting the comment',
                err
            }
        )
    }
}