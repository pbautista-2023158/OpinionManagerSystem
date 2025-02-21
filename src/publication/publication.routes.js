import { Router } from 'express'
import { createPublication, deletePublicaton, updatePublication } from './publication.controller.js'

const api = Router()

api.post('/', createPublication)
api.put("/:id", updatePublication)
api.delete("/:id", deletePublicaton)

export default api