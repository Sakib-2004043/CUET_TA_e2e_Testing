import { test, expect } from '@playwright/test';

test.describe('Profile Management Tests', () => {

  // Before each test, perform the login
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: '📧 Email Address' }).click();
    await page.getByRole('textbox', { name: '📧 Email Address' }).fill('test@person.com');
    await page.getByRole('textbox', { name: '🔒 Password' }).click();
    await page.getByRole('textbox', { name: '🔒 Password' }).fill('test1234');
    await page.getByRole('button', { name: '🚀 Log In' }).click();

    // Ensure login success (Check if redirected to dashboard)
    await expect(page).toHaveURL('http://localhost:3000/teacher');
  });

  test('Edit Profile Functionality', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/profile');
    
    // Ensure Edit Profile button is visible
    const editButton = page.getByRole('button', { name: 'Edit Profile ✏️' });
    await expect(editButton).toBeVisible();
    
    await editButton.click();
    await expect(page.getByRole('heading', { name: 'Teacher Profile' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Profile Image' })).toBeVisible();
    await expect(page.getByText('Current Profile Image')).toBeVisible();
    
    await page.getByRole('textbox', { name: 'Mobile:' }).click();
    await page.getByRole('textbox', { name: 'Mobile:' }).fill('11223344000');
    await page.locator('input[type="file"]').setInputFiles('./tests/fixtures/profile.jpg');

    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'), // Listen for the alert dialog
      page.getByRole('button', { name: 'Save Changes' }).click() // Click the save button
    ]);

    // Ensure alert dialog contains the success message
    await expect(dialog.message()).toBe('Profile updated successfully!');
    await dialog.accept(); // Close the dialog after the check
  });

  test('Complaint Submission Test', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/profile');

    // Ensure the complaint input box is visible before interacting
    await expect(page.getByRole('textbox', { name: 'Enter your complaint here...' })).toBeVisible();
    
    await page.getByRole('textbox', { name: 'Enter your complaint here...' }).click();
    await page.getByRole('textbox', { name: 'Enter your complaint here...' }).fill('Complain From Tester');
    await page.getByRole('button', { name: 'Submit Complaint' }).click();
    await page.waitForTimeout(2000);
    // Ensure at least one occurrence of "Complaint:" and "Reply:" is visible
    const complaintCount = await page.locator('text=Complaint:').count();
    const replyCount = await page.locator('text=Reply:').count();

    expect(complaintCount).toBeGreaterThan(0); // Ensure at least one "Complaint:" is visible
    expect(replyCount).toBeGreaterThan(0); // Ensure at least one "Reply:" is visible
  });
});
