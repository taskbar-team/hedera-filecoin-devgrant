var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const storageController = require('../controller/storageController');

router.post('/new', storageController.createFile)
router.get('/temp/:id', storageController.getHfs)
router.get('/perm/:id', storageController.getFilecoin)

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router