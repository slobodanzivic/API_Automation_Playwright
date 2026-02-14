/*
Test: Create a booking
Endpoint: POST /booking
Request Body: read from a JSON file with booking details

*/

import { test, expect } from "@playwright/test"
import fs from "fs";

test.describe("Create a booking with request body from a JSON file",  ()=> {

    test("POST /booking - should create a new booking", async ({request}) => {

        //read data from the JSON file and prepare the request body
        const jsonFile="testData/createBooking_requestBody.json";
        const requestBody = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
        

        //sending the POST request to create a new booking 
        const response = await request.post("/booking", {data:requestBody})

        //extracting the response body from the response
        const responseBody = await response.json()
        console.log(responseBody);

        
        
        //***************************** Validations *********************************

        //validating the status
        expect(response.ok()).toBeTruthy();

        //validating the response status code
        expect(response.status()).toBe(200);

        //validating the response body (properties)
        expect(responseBody).toHaveProperty("bookingid");
        expect(responseBody).toHaveProperty("booking");

        //validating the booking property in the response body
        const booking = responseBody.booking;
        expect(booking).toMatchObject({
            "firstname": requestBody.firstname,
            "lastname": requestBody.lastname,
            "totalprice": requestBody.totalprice,
            "depositpaid": requestBody.depositpaid,
            "additionalneeds": requestBody.additionalneeds
        });

        //validating the bookingdates property in the response body
        expect(booking.bookingdates).toMatchObject({
           "checkin": requestBody.bookingdates.checkin,
           "checkout": requestBody.bookingdates.checkout,
        });






    })
});
