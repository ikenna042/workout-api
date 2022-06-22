
const Workout = require('../models/workout');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
    try {
        const payload = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json({
            payload,
            message: 'Record(s) found',
            success: true
        });
    } catch (error) {
        res.status(400).json({
            payload: null,
            message: error.message,
            success: false
        });
    }
}

const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            payload: null,
            message: 'Record not found!',
            success: false
        });
    }

    const payload = await Workout.findById(id);
    if (!payload) {
        return res.status(404).json({
            payload: null,
            message: 'Record not found!',
            success: false
        })
    }

    res.status(200).json({
        payload,
        message: 'Record(s) found',
        success: true
    });
}

const createWorkout = async (req, res) => {
    try {
        const payload = await Workout.create(req.body);
        res.status(201).json({
            payload,
            message: 'Record created successfully!',
            success: true
        });
    } catch(err) {
        res.status(400).json({
            payload: null,
            message: err.message,
            success: false
        });
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            payload: null,
            message: 'Record not found, Invalid Id!',
            success: false
        });
    }
    try {
        const body = await Workout.findByIdAndUpdate(id, req.body);
        if (!body) {
            return res.status(404).json({
                payload: null,
                message: 'Record not found!',
                success: false
            })
        }
        const payload = await Workout.findById(id);
        res.status(200).json({
            payload,
            message: 'Successfully Updated!',
            success: true
        })
    } catch (error) {
        res.status(400).json({
            payload: null,
            message: error.message,
            success: false
        });
    }
}



const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            payload: null,
            message: 'Record not found, Invalid Id!',
            success: false
        });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({
            payload: null,
            message: 'Record not found!',
            success: false
        })
    }

    const body = await Workout.findByIdAndDelete(id);
    res.status(200).json({
        payload: body,
        message: 'Successfully Deleted!',
        success: true
    })
}

const checkId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No record found, Invalid Id!'});
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({error: 'Record not found!'})
    }
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}