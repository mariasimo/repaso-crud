const express = require('express')
const router = express.Router()
const Parks = require('../models/park.model')
const Coasters = require('../models/coaster.model')



// New coaster
router.get('/new', (req,res, next) => {
    Parks.find().select({name:1, _id:1})
    .then(parks => {
        res.render('coasters/new-coaster', {parks})
    })
})

router.post('/new', (req, res, next) => {
    const name = req.body.name
    const newCoaster = new Coasters (req.body)

    Coasters
    .findOne({name})
    .then(coasterExists => {
        if(coasterExists) {
            res.json({alert: "This coaster already exists"})
        } else {
            newCoaster.save()
            .then(coasterCreated => {
                res.json({message: "New coaster created", coasterCreated})
            })
            .catch(err => console.log(`Error while creating new coaster : ${err}`))
        }
    })
})



module.exports = router