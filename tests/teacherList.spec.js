import { test, expect } from '@playwright/test';

test.describe('Teachers List Tests', () => {
  // Before each test, perform the login
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: '📧 Email Address' }).click();
    await page.getByRole('textbox', { name: '📧 Email Address' }).fill('test@admin.com');
    await page.getByRole('textbox', { name: '🔒 Password' }).click();
    await page.getByRole('textbox', { name: '🔒 Password' }).fill('test1234');
    await page.getByRole('button', { name: '🚀 Log In' }).click();

    // Ensure login success (Check if redirected to dashboard)
    await expect(page).toHaveURL('http://localhost:3000/admin');
  });

  test('Teacher Management Page is Visible', async ({ page }) => {
    await page.getByRole('link', { name: '👥 Manage Teacher' }).click();
    const teacherManagementHeading = page.getByRole('heading', { name: '🛠️ CUET Teachers Association' });
    await expect(teacherManagementHeading).toBeVisible();
  });

  test('All Cells are Visible', async ({ page }) => {
    await page.getByRole('link', { name: '👥 Manage Teacher' }).click();

    const profileCell = await page.getByRole('cell', { name: 'Profile', exact: true });
    await expect(profileCell).toBeVisible();

    const nameCell = await page.getByRole('cell', { name: 'Name', exact: true });
    await expect(nameCell).toBeVisible();

    const emailCell = await page.getByRole('cell', { name: 'Email', exact: true });
    await expect(emailCell).toBeVisible();

    const departmentCell = await page.getByRole('cell', { name: 'Department', exact: true });
    await expect(departmentCell).toBeVisible();

    const mobileCell = await page.getByRole('cell', { name: 'Mobile', exact: true });
    await expect(mobileCell).toBeVisible();

    const roleCell = await page.getByRole('cell', { name: 'Role', exact: true });
    await expect(roleCell).toBeVisible();
  });
  
  test('Search Bar is Visible and Works for Existing Teacher', async ({ page }) => {
    await page.getByRole('link', { name: '👥 Manage Teacher' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).fill('test@person.com');
    const teacherRow = page.locator('tr:has-text("test@person.com")');
    await expect(teacherRow).toBeVisible();
  });

  test('Search Bar Shows No Teachers Found for Non-Existing Query', async ({ page }) => {
    await page.getByRole('link', { name: '👥 Manage Teacher' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).fill('not exist');
    await page.getByRole('textbox', { name: 'Search by any field...' }).press('Enter');
    const noTeachersMessage = page.getByText('No teachers found.');
    await expect(noTeachersMessage).toBeVisible();
  });

  test('Search Bar Works After Entering and Pressing Enter', async ({ page }) => {
    await page.getByRole('link', { name: '👥 Manage Teacher' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).fill('test@person.com');
    await page.getByRole('textbox', { name: 'Search by any field...' }).press('Enter');
    const teacherRow = page.locator('tr:has-text("test@person.com")');
    await expect(teacherRow).toBeVisible();
  });

  test('Clicking Search Input and Searching for "not exist" Shows No Results', async ({ page }) => {
    await page.getByRole('link', { name: '👥 Manage Teacher' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).click();
    await page.getByRole('textbox', { name: 'Search by any field...' }).fill('not exist');
    await page.getByRole('textbox', { name: 'Search by any field...' }).press('Enter');
    const noTeachersMessage = page.locator('text=No teachers found.');
    await expect(noTeachersMessage).toBeVisible();
  });
});
