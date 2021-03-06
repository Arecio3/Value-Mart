const Category = require('../models/category')
const Sub = require('../models/sub')
const slugify = require('slugify')

// Create Category
exports.createCat = async (req, res) => {
    try {
        const {name} = req.body;
        const category = await new Category({name, slug: slugify(name)}).save();
        res.json(category)
    } catch (err) {
        res.status(400).send('Category was NOT created')
    }
}
// Get list of all categories
exports.listCat = async (req, res) =>  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

// Get one Category
exports.readCat = async (req, res) => {
    let category = await Category.findOne({slug: req.params.slug}).exec();
    res.json(category)
}

// Update
exports.updateCat = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true})
        res.json(updated)
    } catch(err) {
        res.status(400).send("Could not update Category")
    }
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

exports.getSubs = (req, res) => {
    Sub.find({parent: req.params._id}).exec((err, subs) => {
        res.json(subs);
    })
}