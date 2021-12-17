var express = require('express');
var router = express.Router();

const storageController = require('../controller/storageController');

router.post('/new', storageController.createFile)
router.get('/temp/:id', storageController.getHfs)
router.get('/perm/:id', storageController.getFilecoin)

module.exports = router