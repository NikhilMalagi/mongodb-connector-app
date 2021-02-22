const mongoose = require('mongoose');

/* Constructor to create the schema */
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

/* To use the above schema ---> need to create a model 
And the model name becomes the collection name
*/
module.exports = mongoose.model('Products', productSchema);