
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(201).json({ email, token });
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
}


// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        const token = createToken(user._id);

        res.status(201).json({ email, token });
    } catch (err) {
        res.status(400).json({msg: err.message});
    }
}

module.exports = {loginUser, signupUser};