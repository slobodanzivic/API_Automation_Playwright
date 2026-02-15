import { test, expect } from '@playwright/test';
import { JSONReader } from '../../../utils/JSONReader';


test.describe('DELETE booking API Tests', () => {

    test('DELETE /booking/{id} - should delete a booking successfully', async ({ request }) => {

        //Read booking data from JSON file
        const jsonReader = new JSONReader();
        const requestBody = await jsonReader.readJSONFile('testData/createBooking_requestBody.json');

        // First, create a booking to ensure we have a valid booking ID to delete
        const createResponse = await request.post('/booking', { data: requestBody });
        expect(createResponse.ok()).toBeTruthy();
        
        // Extract the booking ID from the create response
        const createResponseBody = await createResponse.json();
        console.log(`Booking created successfully for deletion test. Response:`, createResponseBody);

        const bookingId = createResponseBody.bookingid;
        console.log(`Booking ID to be deleted: ${bookingId}`);

        // Generate a token for authentication
        const tokenRequestBody = await jsonReader.readJSONFile('testData/token_requestBody.json');
        const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
        expect(tokenResponse.ok()).toBeTruthy();

        // extract the token from the response
        const tokenResponseBody = await tokenResponse.json();
        const token = tokenResponseBody.token;
        console.log(`Token generated for authentication: ${token}`);

        // Send a DELETE request to delete the booking
        const deleteResponse = await request.delete(`/booking/${bookingId}`, {
            headers: { "Cookie": `token=${token}` }
        });

        // Verify the DELETE response status
        expect(deleteResponse.status()).toBe(201);

        //Additionally, we can try to GET the deleted booking to confirm it has been deleted
        const getResponse = await request.get(`/booking/${bookingId}`);
        expect(getResponse.status()).toBe(404); // Expecting 404 Not Found since the booking should be deleted

        //print text Not Found in the console to confirm the booking has been deleted
        const getResponseBody = await getResponse.text();
        console.log(getResponseBody); // Should print "Not Found"

    });

});