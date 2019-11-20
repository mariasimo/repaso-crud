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


// All coasters
router.get('/', (req,res) => {
    Coasters
    .find()
    .populate('park')
    .sort({name: 1})
    .then(allCoasters => res.render('coasters/coasters-index', {allCoasters}))
})


// Coaster details
router.get('/:id', (req, res) => {
    Coasters
    .findById({_id: req.params.id})
    .populate('park')
    .then(coasterDetails => {
        res.render('coasters/coaster-details', {coasterDetails})
    });
})

router.post('/delete/:id', (req,res)=>{   

    Coasters
    .findByIdAndDelete({_id:req.params.id})
    .then(deletedCoaster => {
        console.log(`${deletedCoaster.name} was deleted from db \n ${deletedCoaster}`)
        res.redirect('/coasters')
    })
    .catch(err => console.log(`Error while deleting ${deletedCoaster.name} coaster. Error: ${err}`))
})



// Coaster details
router.get('/edit/:id', (req, res) => {
    let coasterToEdit;

    Coasters
    .findById({_id: req.params.id})
    .then(coasterPayload => {
        coasterToEdit = coasterPayload,
        Parks.find().select({name: 1, _id: 1})
        .then(parks => {
        res.render('coasters/coaster-edit', {coasterToEdit, parks})
        })
    })
})

router.post('/edit/:id', (req,res)=>{    

    Coasters
    .findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(updatedCoaster => {
        console.log({alert: "Coaster was updated", updatedCoaster})
        res.redirect(`/coasters/${updatedCoaster._id}`)
    })
    .catch(err => console.log(`Error while updating ${deletedCoaster.name} coaster \n ${err}`))
})


module.exports = router