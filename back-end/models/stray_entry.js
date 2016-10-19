var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stray_entrySchema = new Schema({
    photo: { type: Array, required: true},
    location: {
        coord: {
            lat: { type: Number },
            lng: { type: Number }
        },
        address: {
            line1: { type: String },
            city: { type: String },
            state: { type: String },
            zip: { type: String }
        }
    },
    dog_name: { type: String, required: true},
    status: { type: Number, required: true },
    sex: { type: Number, required: true },
    size: { type: Number, required: true },
    color: {  type: Number, required: true },
    coat: { type: Number, required: true}, 
    breed: { type: Array },
    tag_id: { type: String },
    description: { type: String }
});
module.exports = mongoose.model('stray_entry', stray_entrySchema);