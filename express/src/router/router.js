

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
router.get('/index' , mainController.index);
router.get('/sobre' , mainController.sobre);



module.exports = router;




