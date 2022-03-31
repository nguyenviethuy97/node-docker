const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const signUp = async (req, res, next) => {
    const { username, password } = req.body
    const hashpass = await bcrypt.hash(password, 10)
    //TOI DOAN SET UP BCRYPT, GIO THU 3
    try {
        const newUser = await User.create({
            username,
            password: hashpass
        })
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail'
        })
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                msg: 'user not found'
            })
        }
        const isCorrectPass = await bcrypt.compare(password, user.password)
        if (!isCorrectPass) {
            return res.status(404).json({
                status: 'fail',
                msg: 'password is not correct'
            })
        }

        // req.session.user = user
        res.status(200).json({
            status: 'success',
        })

    } catch (e) {

        console.log(e.message)
        res.status(400).json({
            status: 'fail'
        })
    }
}
module.exports = {
    signUp,
    login
}