const Product = require('../models/product')
const slugify = require('slugify')

exports.createProduct = async (req, res) => {
    try {
        // Creates slug based on title
        req.body.slug = slugify(req.body.title)
            const newProduct = await new Product(req.body).save()
        res.json(newProduct)
    } catch (err) {
    console.log(err.message)
        res.status(400).json({
            err: err.message,
        })
    }
}

exports.getInventory = async (req, res) => {
    let inventory = await Product.find({});
    res.json(inventory)
}