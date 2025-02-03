import { test, expect } from '@playwright/test';

test.describe('User Registration Tests', () => {
  const uniqueEmail = `user${Date.now()}@example.com`;
  const password = '123';

  test('Successful registration', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    
    // Fill form
    await page.getByRole('textbox', { name: 'Name' }).fill('Test Name');
    await page.getByRole('textbox', { name: 'Your E-Mail' }).fill(uniqueEmail);
    await page.getByRole('textbox', { name: 'Your Department' }).fill('Test');
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('12345678910');
    await page.getByRole('textbox', { name: 'Set Password' }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await page.getByPlaceholder('Profile Image').setInputFiles('./tests/fixtures/profile.jpg');

    // Ensure Sign Up button is visible
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Check success message
    await expect(page.getByText('Registration successful!')).toBeVisible();
  });

  test('Attempt duplicate registration', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    // Fill form with the same email
    await page.getByRole('textbox', { name: 'Name' }).fill('Test Name');
    await page.getByRole('textbox', { name: 'Your E-Mail' }).fill(uniqueEmail);
    await page.getByRole('textbox', { name: 'Your Department' }).fill('Test');
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('12345678910');
    await page.getByRole('textbox', { name: 'Set Password' }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await page.getByPlaceholder('Profile Image').setInputFiles('./tests/fixtures/profile.jpg');

    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Check for failure message
    await expect(page.getByText('Failed to register. Please')).toBeVisible();
  });

  test('Profile image upload functionality', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    // Upload profile image
    const fileInput = page.getByPlaceholder('Profile Image');
    await fileInput.setInputFiles('./tests/fixtures/profile.jpg');

    // Ensure image preview is visible
    await expect(page.getByRole('img', { name: 'Profile Preview' })).toBeVisible();
  });

  test('Check if Register button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    // Ensure register button is visible before clicking
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
  });
});
