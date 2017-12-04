import mongoose from 'mongoose';


var Schema = mongoose.Schema;

var postSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    visibility: {
        type: Boolean,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    history: [
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },
            startedAt: Date,
            endedAt: Date,
            editedAt: {
                type: Date,
                default: Date.now,
            },
            frames: [
                {
                    image: {
                        picture: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Picture' 
                        },
                        type: {
                            type: String,
                            enum: ['admin', 'user'],
                        }
                    }
                }
            ]
        }
    ]
});

var Post = mongoose.model('Post', postSchema);

export default Post;