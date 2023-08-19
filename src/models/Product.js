const mongoose = require('mongoose');

const paginationPlugin = require('mongoose-paginate');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        require: true,
    }
})

productSchema.plugin(paginationPlugin)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;