const express = require('express');
const mainController = require('../controllers/main');
const areaController = require('../controllers/area');
const cursoController = require('../controllers/curso');

const router = express.Router();


//Main controller
router.get('/' , mainController.index);
router.get('/sobre' , mainController.sobre);
router.get('/game' , mainController.game);
router.get('/profs', mainController.profs)
router.get('/ui', mainController.ui)

//Area controller
router.get("/areas", areaController.index);

//Curso controller
router.get('/curso' , cursoController.index);
router.get('/curso/read/:id' , cursoController.read);
router.get('/curso/create' , cursoController.create);
router.post('/curso/create' , cursoController.create);
router.get('/curso/update/:id' , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.post('/curso/remove/:id' , cursoController.remove);

module.exports = router;
