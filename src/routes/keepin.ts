const express = require('express');
const router = express.Router({mergeParams: true});
const keepinController = require('../Controllers/keepin');

/* keepin */
router.get('/', keepinController.readAll); //ok
router.get('/country', keepinController.countryRead); //ok
router.post('/',keepinController.create); //ok
router.put('/',keepinController.update); //@@
router.delete('/',keepinController.delete); //ok