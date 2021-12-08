const express = require('express')

const router = express.Router()

router.get(`/create-user`, (req,res) => {
    res.json({
        data: 'Hey you created a user'
    })
})

module.exports = router;