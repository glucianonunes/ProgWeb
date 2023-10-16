const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main');


//Main controller
router.get('/' , mainController.index);
router.get('/sobre' , mainController.sobre);
router.get('/profs', mainController.profs)
router.get('/ui', mainController.ui)

//User controller

//Products controller

module.exports = router;



