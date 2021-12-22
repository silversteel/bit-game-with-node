const router = require('express').Router();

const membershipController = require('../controllers/bookManagementController');

router.post('/membership/list', membershipController.readAll);
router.post('/membership/create', membershipController.create);
router.post('/membership/update', membershipController.update);
router.post('/membership/remove', membershipController.remove);

module.exports = router;