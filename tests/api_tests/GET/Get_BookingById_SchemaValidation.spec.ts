import { test, expect } from '@playwright/test';
import { SchemaValidator } from '../../../utils/SchemaValidator';
import { getBookingByIdSchema } from '../../../schemas/getBookingByIdSchema.schema';

test('Should validate JSON Schema of GET /booking/{id} response @get @schema', async ({ request }) => {

    const bookingId = 10; // Assuming booking with ID 10 exists
    const response = await request.get(`/booking/${bookingId}`);

    // Validate response status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Extract the response body from the response const responseBody
    const responseBody = await response.json();
    console.log(responseBody);


    // Validate the response body against the JSON schema using Ajv library
    const isValid = SchemaValidator.validateSchema(getBookingByIdSchema, responseBody);
    expect(isValid).toBeTruthy();

    // Log the validation result in the console
    if (!isValid) {
        console.log("Response body does not match the JSON schema");
    }
    else {
        console.log("Response body matches the JSON schema.");
    }
});





