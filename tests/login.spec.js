import { test, expect } from '@playwright/test';

test('Landing page elements are visible', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Check if main headings are visible
  await expect(page.getByRole('heading', { name: "Welcome to CUET Teachers'" })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Join Us Today! 🌟' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🔑 Login' })).toBeVisible();
});

test('Login with invalid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Enter invalid email and password
  await page.getByRole('textbox', { name: '📧 Email Address' }).fill('wrong@person.com');
  await page.getByRole('textbox', { name: '🔒 Password' }).fill('123456789');
  await page.getByRole('button', { name: '🚀 Log In' }).click();

  // Verify error message appears
  await expect(page.getByText('⚠️ Failed to log in: Invalid')).toBeVisible();
});

test('Login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Enter valid email and password
  await page.getByRole('textbox', { name: '📧 Email Address' }).fill('test@person.com');
  await page.getByRole('textbox', { name: '🔒 Password' }).fill('test1234');

  // Handle any alert popups before clicking login
  page.once('dialog', async dialog => {
    await dialog.dismiss();
  });

  await page.getByRole('button', { name: '🚀 Log In' }).click();

  // Verify that the dashboard heading is visible after login
  await expect(page.getByRole('heading', { name: '🛠️ CUET Teachers Association' })).toBeVisible();
});

test('Verify dashboard elements after login', async ({ page }) => {
  await page.goto('http://localhost:3000/teacher');

  // Verify different sections are visible
  await expect(page.getByRole('heading', { name: 'Meeting Schedule' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cast Your Vote' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Poll Results' })).toBeVisible();
});
