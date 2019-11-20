const express = require('express')
const router = express.Router()

// New park
router.get('/new', (req, res, next) =>{
    res.render('parks/new-park')
})

router.post('/new', (req, res, next) => {
    res.json(req.body)
})


module.exports = router