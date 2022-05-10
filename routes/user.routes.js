const router = require("express").Router()

const User = require('./../models/User.model')
const Match = require('./../models/Match.model')

const { isAuthenticated } = require("../middlewares/jwt.middleware")

// USERS LIST  
router.get('/', isAuthenticated, (req, res) => {

    User
        .find()
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))
})

// USER PROFILE 
router.get('/:_id', isAuthenticated, (req, res) => {

    const { _id } = req.params

    const promises = [User.findById(_id).populate('favouriteGames'),
    Match.find({ 'players': { _id } }).populate('boardGame')]

    Promise
        .all(promises)
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))
})

// EDIT USER PROFILE 
router.put('/:_id/edit', isAuthenticated, (req, res) => {

    const { _id } = req.params
    const { email, username, avatar } = req.body

    User
        .findByIdAndUpdate(_id, { email, username, avatar })
        .then(() => res.status(200).json("Updated"))
        .catch(err => res.status(500).json(err))
})

// DELETE USER PROFILE 
router.delete('/:_id/delete', (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.status(200).json("Deleted"))
        .catch(err => res.status(500).json(err))
})

// DELETE FAVOURITE BOARDGAME  
router.delete('/:id/delete-favourite', (req, res) => {

    const { id } = req.params
    const { _id } = req.payload

    BoardGame
        .findByIdAndUpdate(_id, { $pull: { favouriteGames: id } })
        .then(() => res.status(200).json("Removed"))
        .catch(err => res.status(500).json(err))
})

module.exports = router