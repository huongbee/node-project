const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
//load helper 
const {
    ensureAuthenticated
} = require('../helper/auth.js')

//load Ideamodel
require('../models/idea');
const Idea = mongoose.model('ideas'); //select * from ideas


router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add')
});
router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({}).sort({
            date: 'desc'
        })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            })
        })

});
router.post('/', ensureAuthenticated, (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({
            text: 'Plz enter title'
        })
    }
    if (!req.body.detail) {
        errors.push({
            text: 'Plz enter detail'
        })
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            detail: req.body.detail
        })
    } else {
        //res.send('success')
        const newIdea = {
            title: req.body.title,
            detail: req.body.detail //off line 9 models/idea.js
        }
        new Idea(newIdea).save().then(idea => {
            req.flash('success_msg', "Add successfully")
            res.redirect('/ideas');
        })
    }
    console.log(req.body)
    //res.send('ok')
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findById(req.params.id)
        // Idea.findOne({
        //     _id: req.params.id
        // })
        .then(idea => {
            res.render('ideas/edit', {
                idea: idea
            })
        })

});
router.put('/:id', ensureAuthenticated, (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({
            text: 'Plz enter title'
        })
    }
    if (!req.body.detail) {
        errors.push({
            text: 'Plz enter detail'
        })
    }
    if (errors.length > 0) {
        res.render('ideas/edit/:', {
            errors: errors,
            title: req.body.title,
            detail: req.body.detail
        })
    } else {
        Idea.findOne({
            _id: req.params.id
        }).then(idea => {
            idea.title = req.body.title;
            idea.detail = req.body.detail;
            idea.date = Date.now();
            idea.save().then(idea => {
                req.flash('success_msg', "Update successfully")
                res.redirect('/ideas');
            })
        })

    }
    console.log(req.body)
    //res.send('ok')
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.remove({
        _id: req.params.id
    }).then(idea => {
        req.flash('success_msg', "Deleted! ")
        res.redirect('/ideas');
    })

});

module.exports = router