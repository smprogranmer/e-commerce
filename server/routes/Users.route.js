const express = require('express')
const { getAllUsers, registerUsers,loginUsers,logOutUsers,upgradeUsers,upgradeProfile,getSingleUser,deleteUsers, verifyUser, forgotPassword, changePassword, accessFereshToken } = require('../controllers/Users.controllers')
const isAuthenticatedUser = require('../middlewares/auth')


const Router = express.Router()

Router.get('/admin',isAuthenticatedUser,getAllUsers)
Router.get('/me',isAuthenticatedUser,getSingleUser)
Router.post('/register',registerUsers)
Router.get('/verify',verifyUser)
Router.post('/login',loginUsers)
Router.post('/logOut',logOutUsers)
Router.delete('/admin/:id',isAuthenticatedUser,deleteUsers)
Router.put('/me/change-password',isAuthenticatedUser,changePassword)
Router.put('/me/upgradeProfile',isAuthenticatedUser,upgradeProfile)
Router.post('/refresh-token',accessFereshToken)


module.exports = Router