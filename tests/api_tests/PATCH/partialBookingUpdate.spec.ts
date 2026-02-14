import{test,expect} from "@playwright/test";
import { JSONReader } from "../../../utils/JSONReader";


test.describe('Partial Booking Update', () => {

    test('Update an existing booking partially using PATCH method', async ({ request }) => {

        // Step 1: ************************** Create a new booking**********************************

        //Create an object of JSONReader class to read the request body from JSON file 
        const jsonReader = new JSONReader();
        const requestBody = await jsonReader.readJSONFile('testData/createBooking_requestBody.json');

        //Send a POST request to create a new booking and verify the response status
        const createBookingResponse = await request.post('/booking', { data: requestBody });
        expect(createBookingResponse.ok()).toBeTruthy();

        // Extract and print the booking ID from the response
        const responseBody = await createBookingResponse.json();
        const bookingId = responseBody.bookingid;


        //Print the created booking ID and details in the console
        console.log(`Created booking with ID: ${bookingId}`);
        console.log("Booking details:", responseBody);

        //******************************************************************************************/

        
        
        // Step 2:********************** Create a token for authentication *************************/

        //Read the token request body from JSON file 
        const tokenRequestBody = await jsonReader.readJSONFile('testData/token_requestBody.json');

        //Send a POST request to generate a token and verify the response status
        const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
        expect(tokenResponse.ok()).toBeTruthy();

        //Extract the token from the response
        const tokenResponseBody = await tokenResponse.json();
        const token = tokenResponseBody.token;

        //Print the generated token in the console
        console.log(`Generated token: ${token}`);

        //******************************************************************************************/

        
        // Step 3: Update the booking using PATCH method, with the updated details read from JSON file

        //Read the partial update booking request body from JSON file 
        const patchRequestBody = await jsonReader.readJSONFile('testData/partialUpdateBooking_requestBody.json');
        
        //Send a PATCH request to partially update the booking 
        const patchResponse = await request.patch(`/booking/${bookingId}`,
            {
                data: patchRequestBody,
                headers: { "Cookie": `token=${token}` }
            }
        );

        // Verify the response status 
        expect(patchResponse.ok()).toBeTruthy();
        expect(patchResponse.status()).toBe(200);

        // Extract and print the updated booking details from the response
        const patchBookingResponseBody = await patchResponse.json();
        console.log("Booking response after partial update:", patchBookingResponseBody);
    });
});

