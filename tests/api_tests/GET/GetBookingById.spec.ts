import { test, expect } from '@playwright/test';

test.describe('GET /booking/{id} - Retrieve a booking by ID', () => {

    test('should return booking details for a valid booking ID @get', async ({ request }) => {

        const bookingId = 10 // Assuming booking with ID 1 exists

        const response = await request.get(`/booking/${bookingId}`);

        // Validate response status
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        // Validate response body
        const responseBody = await response.json();//extracting the response body from the response

        expect(responseBody).toHaveProperty('firstname');
        expect(responseBody).toHaveProperty('lastname');
        expect(responseBody).toHaveProperty('totalprice');
        expect(responseBody).toHaveProperty('depositpaid');
        expect(responseBody).toHaveProperty('bookingdates');

        // Validate bookingdates structure
        expect(responseBody.bookingdates).toHaveProperty('checkin');
        expect(responseBody.bookingdates).toHaveProperty('checkout');

        console.log(`Booking details for ID ${bookingId}:`, responseBody);

    });


    test('should return 404 for a non-existent booking ID @get', async ({ request }) => {

        const nonExistentBookingId = 99999; // Assuming this ID does not exist
        const response = await request.get(`/booking/${nonExistentBookingId}`);

        // Validate response status
        expect(response.status()).toBe(404);

        console.log(`Response for non-existent booking ID ${nonExistentBookingId}:`, await response.text());


    });

    test('should return 404 for entering a non-numeric booking ID @get', async ({ request }) => {

        const invalidBookingId = "abc"; // Invalid non-numeric ID
        const response = await request.get(`/booking/${invalidBookingId}`);

        // Validate response status
        expect(response.status()).toBe(404);

        console.log(`Response for invalid booking ID ${invalidBookingId}:`, await response.text());

    });

    test('should return 404 for entering a combination of numbers and letters as booking ID @get', async ({ request }) => {

        const invalidBookingId = "0a1b2c"; // Invalid alphanumeric ID
        const response = await request.get(`/booking/${invalidBookingId}`);

        // Validate response status
        expect(response.status()).toBe(404);
        console.log(`Response for invalid booking ID ${invalidBookingId}:`, await response.text());
    });


    test ('should return 404 for entering special characters as booking ID @get', async ({ request }) => {

        const invalidBookingId = "!@#"; // Invalid special characters
        const response = await request.get(`/booking/${invalidBookingId}`);

        // Validate response status
        expect(response.status()).toBe(404);
        console.log(`Response for invalid booking ID ${invalidBookingId}:`, await response.text());
    });
});

