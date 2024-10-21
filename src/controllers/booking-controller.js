const {BookingService} = require('../services/index.js');
const {StatusCodes} = require('http-status-codes');
const bookingService = new BookingService();

const {createChannel,publishMessage} = require('../utils/messageQueue.js');

const {REMINDER_BINDING_KEY} = require('../config/serverConfig.js');


class BookingController{

    constructor(){
    }
    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const payload = {
            data:{
                subject:"This is noti from queue",
                content:"some content wth the mail by the queue",
                recepientEmail:"rjnbj@gmail.com",
                notificationTime:"2024-10-21T06:45:42"
            },
            service:"CREATE_NOTIFICATION"
        };
        await publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
        res.status(200).json({
            data:{},
            message:"message sent to queue",
            success:true,
            err:{}
        })
    }
    async create(req,res){
        try {
            const response = await bookingService.createBooking(req.body);
            res.status(StatusCodes.OK).json({
                data:response,
                message:"created a booking",
                err:{},
                success:true
            })
        } catch (error) {
            res.status(error.statusCode).json({
                data:{},
                message:error.message,
                success:false,
                err:error.explanation
            })
        }
    }
}

module.exports = BookingController;