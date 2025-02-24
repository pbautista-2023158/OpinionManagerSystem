//Modelo de publicación
import { Schema, model } from 'mongoose'

const publicationSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        title: {
            type: String,
            maxLength: [75, `Can't be overcome 75 characters`],
            required: [true, 'Post is required']
        },
        post: {
            type: String,
            maxLength: [1000, `Can't be overcome 1000 characters`],
            required: [true, 'Post is required']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']            
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment' 
        }]
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

export default model('Publication', publicationSchema)