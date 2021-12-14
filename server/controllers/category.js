const Category = require('../models/category')
const slugify = require('slugify')

// Create Category
exports.createCat = async (req, res) => {
    try {
        const {name, icon} = req.body;
        const category = await new Category({name, slug: slugify(name), icon}).save();
        res.json(category)
    } catch (err) {
        res.status(400).send('Category was NOT created')
    }
}

exports.listCat = async (req, res) => {

}
exports.readCat = async (req, res) => {

}
exports.updateCat = async (req, res) => {

}
exports.deleteCat = async (req, res) => {

}