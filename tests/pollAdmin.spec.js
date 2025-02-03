import { test, expect } from '@playwright/test';

test.describe('Poll Management Tests', () => {
  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: '📧 Email Address' }).fill('test@admin.com');
    await page.getByRole('textbox', { name: '🔒 Password' }).fill('test1234');

    // Handle any unexpected dialog popups
    page.once('dialog', dialog => {
      dialog.dismiss().catch(() => {});
    });

    await page.getByRole('button', { name: '🚀 Log In' }).click();

    // Ensure successful login by checking if redirected to the admin panel
    await expect(page).toHaveURL('http://localhost:3000/admin');
  });

  // Test for navigating to "Manage Polls"
  test('Manage Polls Page Test', async ({ page }) => {
    await page.getByRole('link', { name: '📋 Manage Polls' }).click();
    await expect(page.getByRole('heading', { name: 'Create a New Poll' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'All Polls' })).toBeVisible();
  });

  // Test for visibility of poll creation form fields
  test('Poll Creation Form Test', async ({ page }) => {
    await page.getByRole('link', { name: '📋 Manage Polls' }).click();

    await expect(page.getByText('Poll Title:')).toBeVisible();
    await expect(page.getByText('Poll Description:')).toBeVisible();
    await expect(page.getByText('Poll Deadline:')).toBeVisible();
    await expect(page.getByText('Poll Status:')).toBeVisible();
  });

  // Test for creating a new poll
  test('Create Poll Test', async ({ page }) => {
    await page.getByRole('link', { name: '📋 Manage Polls' }).click();

    await page.getByRole('textbox', { name: 'Poll Title:' }).fill('Test Poll');
    await page.getByRole('textbox', { name: 'Poll Description:' }).fill('This Test Poll is created by Test Admin');
    await page.getByRole('textbox', { name: 'Poll Deadline:' }).fill('2025-02-06');
    await page.getByLabel('Poll Status:').selectOption('open');
    await page.getByRole('button', { name: 'Create Poll' }).click();

    // Ensure at least one occurrence of "Test Poll" is visible
    const pollOccurrences = page.locator('text=Test Poll');
    await expect(pollOccurrences.first()).toBeVisible();
  });


  // Test for visibility of poll details section
  test('Poll Details Visibility Test', async ({ page }) => {
    await page.getByRole('link', { name: '📋 Manage Polls' }).click();
    await page.getByRole('heading', { name: 'Poll Details' }).click();

    // Ensure poll details section is visible
    await expect(page.getByText('Select a poll to view details.')).toBeVisible();
  });

  // Test for selecting a poll and viewing details
  test('View Poll Details Test', async ({ page }) => {
    await page.getByRole('link', { name: '📋 Manage Polls' }).click();
    await page.locator('.admin-poll-view-details').first().click();

    await expect(page.getByRole('cell', { name: 'Test Poll', exact: true})).toBeVisible();
    await expect(page.getByRole('cell', { name: 'This Test Poll is created by Test Admin' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'open' })).toBeVisible();
  });

  // Test for checking table headers visibility
  test('Poll Table Headers Test', async ({ page }) => {
    await page.getByRole('link', { name: '📋 Manage Polls' }).click();
    await page.locator('.admin-poll-view-details').first().click();
    // Check if table headers are visible
    await expect(page.getByRole('cell', { name: 'Details' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Attribute' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Agreed (Yes Votes)' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Disagreed (No Votes)'})).toBeVisible();
  });
});
