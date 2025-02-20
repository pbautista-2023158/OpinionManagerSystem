import { Router } from "express";
import { getAll, getId, updateId } from "./user.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js";

const api = Router()

api.get("/", getAll); 
api.get('/:id', getId)
api.put('/:id', [validateJwt, updateUserValidator], updateId)

export default api
