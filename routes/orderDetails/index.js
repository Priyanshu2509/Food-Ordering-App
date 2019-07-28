const express = require('express');
const router = express.Router();

const orderDetails= require('./orderDetails');

router.post('/', orderDetails.placeOrder);

module.exports = router;    