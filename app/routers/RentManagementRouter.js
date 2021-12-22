const router = require('express').Router();

const rentManagementController = require('../controllers/rentManagementController');

router.post('/rent/management/list', rentManagementController.readAll);
router.post('/rent/management/create', rentManagementController.create);
router.delete('/rent/management/remove', rentManagementController.remove);

module.exports = router;