//Modelo de comentario 
import { Schema, model } from 'mongoose'

const commentSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        publication: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication is required']
        },
        comment: {
            type: String,
            maxLength: [1000, `Can't be overcome 1000 characters`],
            required: [true, 'Comment is required']            
        }
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

export default model('Comment', commentSchema)