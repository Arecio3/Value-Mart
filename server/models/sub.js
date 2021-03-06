const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [3, 'Too short'],
        maxlength: [32, "Too long"]
    },
    slug: { 
        type:  String,
        unique: true,
        lowercase: true,
        index: true
    },
    icon: {
        type: String,
        required: false
    },
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
}, {timestamps: true}
);

module.exports = mongoose.model('Sub', subSchema);
