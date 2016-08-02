var express = require('express');
var router = express.Router();
var donorController = require('../controllers/donorController.js');

/*
 * GET
 */
router.get('/', function(req, res) {
    donorController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    donorController.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
    donorController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    donorController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    donorController.remove(req, res);
});

module.exports = router;