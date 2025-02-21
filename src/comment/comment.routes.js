import { Router } from 'express'
import { postComment } from './comment.controller.js'

const api = Router()

api.post('/', postComment)

export default api