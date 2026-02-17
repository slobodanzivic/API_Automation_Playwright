/*
Test: Create a booking
Endpoint: POST /booking
Request Body: dynamic randomly generated data using faker library

Prerequisites:
1. Install the faker library: npm install @faker-js/faker
2. Import the faker library in your test file: import { faker } from '@faker-js/faker';

3. Install the luxon library: npm install luxon
4. Import the luxon library in your test file: import { DateTime } from 'luxon';

*/

import { test, expect } from "@playwright/test"
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';   

test.describe("Create a booking dynamically with random data",  ()=> {

    test("POST /booking - should create a new booking @post", async ({request}) => {

        //data generation using faker library
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const totalPrice = faker.number.int({min:100, max:5000});
        const depositPaid = faker.datatype.boolean();
        const additionalNeeds = faker.helpers.arrayElement(["Breakfast", "Lunch", "Dinner", "None"]);
        const checkinDate = DateTime.now().toFormat('yyyy-MM-dd');
        const checkoutDate = DateTime.now().plus({days:7}).toFormat('yyyy-MM-dd');

        //********************** preparing the request body ***********************
        const requestBody = {
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": depositPaid,
            "bookingdates": {
                "checkin": checkinDate,
                "checkout": checkoutDate
            },
            "additionalneeds": additionalNeeds

        };

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
            "firstname": requestBody.firstname,
            "lastname": requestBody.lastname,
            "totalprice": requestBody.totalprice,
            "depositpaid": requestBody.depositpaid,
            "additionalneeds": requestBody.additionalneeds
        });

        //validating the bookingdates property in the response body (nested json object)
        expect(booking.bookingdates).toMatchObject({
            "checkin": requestBody.bookingdates.checkin,
            "checkout": requestBody.bookingdates.checkout
        });

    })
});
