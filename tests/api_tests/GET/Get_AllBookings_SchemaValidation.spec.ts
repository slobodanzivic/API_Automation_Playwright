import {test, expect} from '@playwright/test';
import { SchemaValidator } from '../../../utils/SchemaValidator';
import {getAllBookingsSchema} from '../../../schemas/getAllBookingsSchema.schema';  



test.describe('GET /booking - Validate schema of all bookings', () => {

    test('should validate the json schema of all bookings @get @schema', async ({ request }) => {

        const response = await request.get('/booking');
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        // Validate the response body against the JSON schema using Ajv library
        const isValid = SchemaValidator.validateSchema(getAllBookingsSchema, responseBody);
        expect(isValid).toBeTruthy();

        // Log the validation result in the console
        if (!isValid) {
            console.log("Response body does not match the JSON schema");
        }
        else {
            console.log("Response body matches the JSON schema.");
        }
        

    });

});
