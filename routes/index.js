const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
// from any further routes access from here
//router.use('/routerName',require('./routerfile'));
// console.log('Router is loaded');
module.exports = router;