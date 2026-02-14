import { test, expect } from '@playwright/test';
import { JSONReader } from '../../../utils/JSONReader';

test.describe('Update Booking', () => {

    test('Update an existing booking', async ({ request }) => {

        // Step 1: ************************** Create a new booking**********************************

        //Create an object of JSONReader class
        const jsonReader = new JSONReader();


        //Read the request body from JSON file and create a new booking
        const requestBody = await jsonReader.readJSONFile('testData/createBooking_requestBody.json');
        console.log(requestBody);

        const createBookingResponse = await request.post('/booking', { data: requestBody });
        expect(createBookingResponse.ok()).toBeTruthy();


        // Extract and print the booking ID from the response
        const responseBody = await createBookingResponse.json();
        const bookingId = responseBody.bookingid;
        console.log(`Created booking with ID: ${bookingId}`);

        //*****************************************************************************************



        // Step 2: ************************** Create a token for authentication

        //Read the token request body from JSON file and generate a token
        const tokenRequestBody = await jsonReader.readJSONFile('testData/token_requestBody.json');
        const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
        expect(tokenResponse.ok()).toBeTruthy();


        //Extract the token from the response
        const tokenResponseBody = await tokenResponse.json();
        const token = tokenResponseBody.token;
        console.log(`Generated token: ${token}`);

        //****************************************************************************************


        // Step 3: ************************** Update the booking using PUT method, with the updated details read from JSON file

        //Read the update booking request body from JSON file and update the booking
        const updateRequestBody = await jsonReader.readJSONFile('testData/updateBooking_requestBody.json');
        const updateResponse = await request.put(`/booking/${bookingId}`,
            {
                data: updateRequestBody,
                headers: { "Cookie": `token=${token}` }
            }
        );

        // Verify the response status 
        expect(updateResponse.ok()).toBeTruthy();
        expect(updateResponse.status()).toBe(200);


        // Extract and print the updated booking details from the response
        const updateBookingResponseBody = await updateResponse.json();
        console.log(updateBookingResponseBody);


    });

});






