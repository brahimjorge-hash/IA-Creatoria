const express = require('express');
const router = express.Router();
const { createPreference, webhook } = require('../controllers/mercadoPagoController');

router.post('/create_preference', createPreference);
router.post('/webhook', webhook);

module.exports = router;
