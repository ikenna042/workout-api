require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');

const app = express();

app.use(express.json());

app.use('/api/workouts', workoutRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('Connected to MongoDB & Listening to port', process.env.PORT));
    })
    .catch(err => console.error(err));