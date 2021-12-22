const router = require('express').Router();

const bookManagementController = require('../controllers/bookManagementController');

router.post('/book/management/list', bookManagementController.readAll);
router.post('/book/management/create', bookManagementController.create);
router.post('/book/management/update', bookManagementController.update);
router.post('/book/management/remove', bookManagementController.remove);

module.exports = router;