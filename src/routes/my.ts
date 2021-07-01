const express = require('express');
const router = express.Router({mergeParams: true});
const myController = require('../Controllers/my');

/* my */
router.get('/', myController.readAll); //ok
router.get('/country', myController.countryRead); //ok
router.post('/',myController.create); //ok
router.put('/',myController.update); //@@
router.delete('/',myController.delete); //ok