/*
Test: Create a booking
Endpoint: POST /booking
Request Body: static JSON object with booking details

*/

import { test, expect } from "@playwright/test"

test.describe("Create a booking with a static request body",  ()=> {

    test("POST /booking - should create a new booking", async ({request}) => {

        //********************** preparing the request body ***********************
        const requestBody = {
            "firstname": "Petar",
            "lastname": "Petrovic",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"

        }

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

        //validating the response body (attributes/properties)
        expect(responseBody).toHaveProperty("bookingid");
        expect(responseBody).toHaveProperty("booking");

        //validating the booking property in the response body
        const booking = responseBody.booking;
        expect(booking).toMatchObject({
            "firstname": "Petar",
            "lastname": "Petrovic",
            "totalprice": 111,
            "depositpaid": true,
            "additionalneeds": "Breakfast"
        });

        //validating the bookingdates property in the response body (nested json object)
        expect(booking.bookingdates).toMatchObject({
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        });






    })
});
