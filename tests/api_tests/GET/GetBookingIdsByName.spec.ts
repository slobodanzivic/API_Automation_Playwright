import { test, expect } from '@playwright/test';

test.describe('GET /booking - Retrieve booking IDs by name', () => {


    test('should return booking IDs for a valid first name and last name @get', async ({ request }) => {

        const firstName = "Jim";  // Assuming there are bookings with this first name
        const lastName = "Brown"; // Assuming there are bookings with this last name

        //sending GET request along with query parameters for first name and last name
        const response = await request.get("/booking", { params: { firstName, lastName } })

        //Extract responseBody from the response
        const responseBody = await response.json();
        console.log(responseBody);

        // Validate response status
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        //Validate that response should not be empty
        expect(responseBody.length).toBeGreaterThan(0);

        for (const item of responseBody) {

            // Validate that each item in the response has a bookingid property
            expect(item).toHaveProperty('bookingid');

            // Validate that the bookingid is a number
            expect(typeof item.bookingid).toBe('number');

            // Validate that the bookingid is greater than 0
            expect(item.bookingid).toBeGreaterThan(0);

        }

    });

}); 
