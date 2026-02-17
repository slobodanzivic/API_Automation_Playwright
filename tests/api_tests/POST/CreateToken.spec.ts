import { test, expect } from '@playwright/test';

test.describe('Authentication API Tests', () => {

  test('POST /auth - should successfully authenticate and return token', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    // Verify response status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response contains token
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
    expect(typeof responseBody.token).toBe('string');

    console.log('Authentication successful. Token:', responseBody.token);
  });

  test('POST /auth - should fail with invalid username', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: 'invaliduser',
        password: 'password123'
      }
    });

    // Verify response status
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response indicates authentication failure
    expect(responseBody).toHaveProperty('reason');
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST /auth - should fail with invalid password', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: 'admin',
        password: 'wrongpassword'
      }
    });

    // Verify response status
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response indicates authentication failure
    expect(responseBody).toHaveProperty('reason');
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST /auth - should fail with missing username', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        password: 'password123'
      }
    });

    // Verify response status
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response indicates authentication failure
    expect(responseBody).toHaveProperty('reason');
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST /auth - should fail with missing password', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: 'admin'
      }
    });

    // Verify response status
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response indicates authentication failure
    expect(responseBody).toHaveProperty('reason');
    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('POST /auth - should fail with empty credentials @post', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      data: {
        username: '',
        password: ''
      }
    });

    // Verify response status
    expect(response.status()).toBe(200);

    // Parse response body
    const responseBody = await response.json();

    // Verify response indicates authentication failure
    expect(responseBody).toHaveProperty('reason');
    expect(responseBody.reason).toBe('Bad credentials');
  });
});
