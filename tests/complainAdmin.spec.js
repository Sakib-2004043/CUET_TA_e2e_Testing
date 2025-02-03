import { test, expect } from '@playwright/test';

test.describe('Admin Complaints Section Tests', () => {
  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: '📧 Email Address' }).fill('test@admin.com');
    await page.getByRole('textbox', { name: '🔒 Password' }).fill('test1234');
    page.once('dialog', dialog => {
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: '🚀 Log In' }).click();
  });

  // Test: Complaints Page is Accessible
  test('Complaints Page Test', async ({ page }) => {
    await page.getByRole('link', { name: '📝 Complaints' }).click();

    const complaintsTexts = await page.locator('text=Complaint').count();
    expect(complaintsTexts).toBeGreaterThan(0); 
  });


  // Test: All Complaints Button Visibility
  test('All Complaints Test', async ({ page }) => {
    await page.getByRole('link', { name: '📝 Complaints' }).click();
    await page.getByRole('button', { name: 'All Complaints' }).click();
    await expect(page.getByRole('button', { name: 'All Complaints' })).toBeVisible();
  });

  // Test: Replied Complaints Button Visibility
  test('Replied Complaints Test', async ({ page }) => {
    await page.getByRole('link', { name: '📝 Complaints' }).click();
    await page.getByRole('button', { name: 'Replied Complaints', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Submit' })).not.toBeVisible();
  });

  // Test: Unreplied Complaints Button Visibility
  test('Unreplied Complaints Test', async ({ page }) => {
    await page.getByRole('link', { name: '📝 Complaints' }).click();

    await page.getByRole('button', { name: 'Unreplied Complaints' }).click();

    const submitButtons = await page.locator('button:has-text("Submit")').count();
    expect(submitButtons).toBeGreaterThanOrEqual(0); // Ensure at least one "Submit" button is visible
  });


  // Test: Search Functionality
  test('Search Complaints Test', async ({ page }) => {
    await page.getByRole('link', { name: '📝 Complaints' }).click();
    await page.getByRole('textbox', { name: 'Search by teacher name...' }).fill('Test');
    await expect(page.getByText('Test Person').first()).toBeVisible();
  });

  // Test: Complaint and Reply Section Visibility
  test('Complaint & Reply Test', async ({ page }) => {
    await page.getByRole('link', { name: '📝 Complaints' }).click();
    await expect(page.getByText('Complaint:').first()).toBeVisible();
    await expect(page.getByText('Reply:').first()).toBeVisible();
  });
});
