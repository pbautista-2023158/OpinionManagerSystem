import { Router } from 'express'
import { createPublication, deletePublication, getComments, updatePublication } from './publication.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/', createPublication)
api.get('/', getComments)
api.put("/:id", validateJwt, updatePublication)
api.delete("/:id", validateJwt, deletePublication)

export default api