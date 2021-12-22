const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authController = require('../auth/controller');

router.post('/user/update', authController.updateUser);
router.post('/user/delete', authController.deleteUser);


module.exports = router;