import { Router } from "express";
import { getAll, getId, updateId, updateProfilePicture } from "./user.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";

const api = Router()

api.get("/", getAll); 
api.get('/:id', getId)
api.put('/:id', [validateJwt, updateUserValidator], updateId)
api.put(
    '/updateProfilePicture/:id',
    [
        validateJwt,
        uploadProfilePicture.single('profilePicture'),
        deleteFileOnError
    ],
    updateProfilePicture
)

export default api