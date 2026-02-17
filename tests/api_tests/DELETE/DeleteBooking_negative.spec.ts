import { test, expect } from '@playwright/test';
import { JSONReader } from '../../../utils/JSONReader';


test.describe('DELETE booking API Tests', () => {

    test('DELETE /booking/{id} - delete booking with invalid booking ID @delete', async ({ request }) => {

        //Read booking data from JSON file
        const jsonReader = new JSONReader();
        const requestBody = await jsonReader.readJSONFile('testData/createBooking_requestBody.json');

        // First, create a booking to ensure we have a valid booking ID to delete
        const createResponse = await request.post('/booking', { data: requestBody });
        expect(createResponse.ok()).toBeTruthy();
        

        // Generate a token for authentication
        const tokenRequestBody = await jsonReader.readJSONFile('testData/token_requestBody.json');
        const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
        expect(tokenResponse.ok()).toBeTruthy();

        // extract the token from the response
        const tokenResponseBody = await tokenResponse.json();
        const token = tokenResponseBody.token;
        console.log(`Token generated for authentication: ${token}`);

        const invalidBookingId = 99999; // Assuming this booking ID does not exist

        // Send a DELETE request to delete the booking with invalid booking ID
        const deleteResponse = await request.delete(`/booking/${invalidBookingId}`, {
            headers: { "Cookie": `token=${token}` }
        });

        // Verify the DELETE response status
        expect(deleteResponse.status()).toBe(405); // Expecting 405 Method Not Allowed since the booking ID does not exist

    });


    test('DELETE /booking/{id} - delete booking without authentication token @delete', async ({ request }) => {

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

        // Send a DELETE request to delete the booking without authentication token
        const deleteResponse = await request.delete(`/booking/${bookingId}`);

        // Verify the DELETE response status
        expect(deleteResponse.status()).toBe(403); // Expecting 403 Forbidden since no authentication token is provided
        
        
        // Verify text Forbidden is printed in the console to confirm that the booking cannot be deleted without authentication token
        const deleteResponseBody = await deleteResponse.text();
        expect(deleteResponseBody).toBe('Forbidden');
        console.log(`Text in the response: ${deleteResponseBody}`); // Should print "Forbidden"
    });


});