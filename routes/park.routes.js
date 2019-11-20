const express = require('express')
const router = express.Router()
const Parks = require('../models/park.model')

// New park
router.get('/new', (req, res, next) =>{
    res.render('parks/new-park')
})

router.post('/new', (req, res, next) => {
    const {name, description} = req.body
    const newPark = new Parks ({name, description})

    Parks
    .findOne({name})
    .then(parkExists => {
        if(parkExists) {
            res.json({alert: "This parks already exists"})
        } else {
            newPark.save()
            .then(parkCreated => {
                res.json({message: "New park created", parkCreated})
            })
            .catch(err => console.log(`Error while creating new park : ${err}`))
        }
    })
})


module.exports = router