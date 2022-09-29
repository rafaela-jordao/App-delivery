const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAll);
router.delete('/:id', userController.delete);

module.exports = router;