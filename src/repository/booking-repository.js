const {StatusCodes} = require('http-status-codes');
const {Booking} = require('../models/index');
const {ValidationError,ServiceError,AppError} = require('../utils/errors/index.js');

class BookingRepository {
    async create(data){
        try {
            const booking = await Booking.create();
            return booking;
        } catch (error) {
            if(error.name==="SequelizeValidationError"){
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was an issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = BookingRepository;