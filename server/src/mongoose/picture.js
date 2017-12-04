import mongoose from 'mongoose';
import { imgUrlRegex } from '../util/regex'

var Schema = mongoose.Schema;

var pictureSchema = new Schema({
    url: {
        type: String,
        required: true,
        match: [mongoose, 'Please fill a valid picture address'],
    },
    location : {
        name: String,
        coordinates: {
            lat: Number,
            lng: Number,
        }
    },
    tags: [String],
    date: Date,
    visibility: {
        type: Boolean,
        required: true,
    },
});

var Picture = mongoose.model('Picture', pictureSchema);

export default Picture;