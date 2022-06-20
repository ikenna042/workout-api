const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: 'Get All Workouts'});
})

// get single workout
router.get('/:id', (req, res) => {
    res.json({msg: 'Get single workout'});
});

// create workout
router.post('/', (req, res) => {
    res.json({msg: 'Create workout'});
});

// update workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update workout'});
});

// delete workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete workout'});
});


module.exports = router;