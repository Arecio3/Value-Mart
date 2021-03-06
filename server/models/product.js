const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 12,
        text: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
    },
    subs: [{
        type: ObjectId,
        ref: "Sub",
    }],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    // images: {
    //     type: Array
    // },
    shipping: {
        type: String,
        enum: ["Yes", "No"]
    },
    color: {
        type: String,
        enum: ["Black", "Gold", "Silver", "White", "Blue", "None" ],
    },
    brand: {
        type: String,
        enum: ["Apple", "Microsoft", "Samsung", "Android", "Hollister", "None" ],
    },
    // rating:[{
    //     star: Number,
    //     postedBy: {type: ObjectId, ref: "User"}
    // }],
    condition: [{
        type: String,
        enum: ["Very Used", "Barely Used", "New Open Box", "Refurbished", "Brand New"],
        required: true
    }]
},
{timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);