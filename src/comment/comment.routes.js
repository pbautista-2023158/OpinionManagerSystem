import { Router } from 'express'
import { deleteComment, postComment, updateComment } from './comment.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/', postComment)
api.put('/:id', validateJwt, updateComment)
api.delete('/:id', validateJwt, deleteComment)

export default api