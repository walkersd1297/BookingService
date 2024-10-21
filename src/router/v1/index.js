const express = require('express');
const {BookingController} = require('../../controllers/index.js');
const router = express.Router();
// const {createChannel} = require('../../utils/messageQueue.js');


// const channel = await createChannel();

const bookingController = new BookingController();
router.post('/bookings',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue);



module.exports = router;