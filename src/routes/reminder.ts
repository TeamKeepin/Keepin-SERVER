const express = require('express');
const router = express.Router({mergeParams: true});
const reminderController = require('../Controllers/reminder');

/* Reminder */
router.get('/', reminderController.readAll); //ok
router.get('/country', reminderController.countryRead); //ok
router.post('/',reminderController.create); //ok
router.put('/',reminderController.update); //@@
router.delete('/',reminderController.delete); //ok