import { test, expect } from '@playwright/test';

test.describe('Booking API Tests', () => {
  
  test('GET /booking - should return list of all bookings', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');

    // Verify response status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response is an array
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);

    // Verify each booking has required properties
    responseBody.forEach((booking: any) => {
      expect(booking).toHaveProperty('bookingid');
      expect(typeof booking.bookingid).toBe('number');
    });

    console.log(`Total bookings found: ${responseBody.length}`);
  });

});
