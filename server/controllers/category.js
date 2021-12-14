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
// Get list of all categories
exports.listCat = async (req, res) =>  res.json(await Category.find({}).sort({createdAt: -1}).exec())

// Get one Category
exports.readCat = async (req, res) => {
let category = await Category.findOne({slug: req.params.slug}).exec();
res.json(category)
}
exports.updateCat = async (req, res) => {

}
// Delete
exports.deleteCat = async (req, res) => {
try {
    const deleted = await Category.findOneAndDelete({slug: req.params.slug})
    res.json(deleted)

} catch (err) {
    res.status(400).send("Category was not deleted")
}
}