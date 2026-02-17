import { test, expect } from "@playwright/test"
import Ajv from "ajv";
import fs from "fs";
import { JSONReader } from "../../../utils/JSONReader";

test.describe('Validate JSON Schema of create booking API response', () => {

    test('POST /booking - should return response matching the JSON schema', async ({ request }) => {

        // Define the JSON schema for the expected response
        const responseSchema = {
            "type": "object",
            "properties": {
                "bookingid": {
                    "type": "number"
                },
                "booking": {
                    "type": "object",
                    "properties": {
                        "firstname": {
                            "type": "string"
                        },
                        "lastname": {
                            "type": "string"
                        },
                        "totalprice": {
                            "type": "number"
                        },
                        "depositpaid": {
                            "type": "boolean"
                        },
                        "bookingdates": {
                            "type": "object",
                            "properties": {
                                "checkin": {
                                    "type": "string"
                                },
                                "checkout": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "checkin",
                                "checkout"
                            ]
                        },
                        "additionalneeds": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "firstname",
                        "lastname",
                        "totalprice",
                        "depositpaid",
                        "bookingdates",
                        "additionalneeds"
                    ]
                }
            },
            "required": [
                "bookingid",
                "booking"
            ]
        }

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
        const ajv = new Ajv();
        const validate = ajv.compile(responseSchema);
        const isValid = validate(responseBody);
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


