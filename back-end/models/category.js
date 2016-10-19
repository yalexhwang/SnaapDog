var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    breeds: { type: Array },
    sizes: { type: Array },
    colors: { type: Array },
    coats: { type: Array }
});
module.exports = mongoose.model('category', categorySchema);