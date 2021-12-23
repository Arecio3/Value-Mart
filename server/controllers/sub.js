const Sub = require('../models/sub')
const slugify = require('slugify')

// Create Sub
exports.createSub = async (req, res) => {
    try {
        const {name, parent} = req.body;
        const sub = await new Sub({name, parent, slug: slugify(name)}).save();
        res.json(sub)
    } catch (err) {
        res.status(400).send('Sub was NOT created')
    }
}
// Get list of all categories
exports.listSub = async (req, res) =>  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());

// Get one Sub
exports.readSub = async (req, res) => {
    let sub = await Sub.findOne({slug: req.params.slug}).exec();
    res.json(sub)
}

// Update
exports.updateSub = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await Sub.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug: slugify(name)}, {new: true})
        res.json(updated)
    } catch(err) {
        res.status(400).send("Could not update Sub")
    }
}
// Delete
exports.deleteSub = async (req, res) => {
try {
    const deleted = await Sub.findOneAndDelete({slug: req.params.slug})
    res.json(deleted)

} catch (err) {
    res.status(400).send("Sub was not deleted")
}
}