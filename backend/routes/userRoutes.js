const express = require('express');
const router = express.Router();
const { registerUser, getUser, useCredits } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/:id', getUser);
router.post('/:id/use', useCredits);

module.exports = router;
