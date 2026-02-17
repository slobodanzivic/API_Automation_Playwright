import {test, expect} from '@playwright/test'
import { SchemaValidator } from '../../../utils/SchemaValidator';
import {getBookingIdsByNameSchema} from '../../../schemas/getBookingIdsByNameSchema.schema';


test ('Should validate JSON Schema of GET /booking response when filtering by first name and last name @get @schema', async ({ request }) => {

     const firstName = "Jim";  // Assuming there are bookings with this first name
     const lastName = "Brown"; // Assuming there are bookings with this last name

    //sending GET request along with query parameters for first name and last name

    const response = await request.get("/booking", { params: { firstName, lastName } })

    //Extract responseBody from the response const responseBody
    const responseBody = await response.json();
    console.log(responseBody);

    //Validate schema of the response body using Ajv library
    const isValid = SchemaValidator.validateSchema(getBookingIdsByNameSchema, responseBody);
    expect(isValid).toBeTruthy();

    // Log the validation result in the console
    if (!isValid) {
        console.log("Response body does not match the JSON schema");
    }
    else {
        console.log("Response body matches the JSON schema.");
    }
});
