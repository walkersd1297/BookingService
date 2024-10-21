const {BookingRepository} = require('../repository/index.js');
const axios = require('axios');
const ServiceError = require('../utils/errors/service-error.js');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig.js');

class BookingService {
    constructor(){
        this.BookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getFlightRequestURL);
            let flightData =  flight.data.data;
            let flightPrice = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something wnet wrong in booking process','Insufficient Seats')
            }
            const totalCost = flightPrice * data.noOfSeats;
            const bookingPayload = {...data,totalCost};
            const booking = await this.BookingRepository(bookingPayload);

            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats-booking.noOfSeats});
            const finalBooking = await this.BookingRepository.update(booking.id,{status:"Booked"});
            return finalBooking;
            
        } catch (error) {
            if(error.name==='RepositoryError' || error.name==='ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }

    }
}

module.exports = BookingService;