import { test, expect } from "@playwright/test"
import Ajv from "ajv";
import fs from "fs";
import {SchemaValidator} from "../../../utils/SchemaValidator";
import {createBookingSchema} from "../../../schemas/createBookingSchema.schema";



test.describe('Validate JSON Schema of create booking API response', () => {

    test('POST /booking - should return response matching the JSON schema @post', async ({ request }) => {

       //read data from the JSON file and prepare the request body
        const jsonFile = "testData/createBooking_requestBody.json";
        const requestBody = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));


        //sending the POST request to create a new booking 
        const response = await request.post("/booking", { data: requestBody })

        //extracting the response body from the response
        const responseBody = await response.json()
        console.log(responseBody);


        //***************************** Validations *********************************

        //validating the status
        expect(response.ok()).toBeTruthy();
        //validating the response status code
        expect(response.status()).toBe(200);

        //validating the response body against the JSON schema using Ajv library
        //Call the validateSchema function to validate the response body against the JSON schema
        
        const isValid = SchemaValidator.validateSchema(createBookingSchema, responseBody);
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


