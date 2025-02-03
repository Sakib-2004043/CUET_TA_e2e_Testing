import { test, expect } from '@playwright/test';

test.describe('Teachers Polls Tests', () => {

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

  test('Access Ongoing Polls Section', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/poll');
    await page.getByRole('link', { name: '🗳️ Vote' }).click();
    await page.getByRole('heading', { name: '🗳️ Ongoing Polls' }).click();
    const pollButton = page.getByText('Participate in the decision-');
    await expect(pollButton).toBeVisible();

    await pollButton.click();
    await expect(page).toHaveURL('http://localhost:3000/teacher/poll');
  });

  test('Check Voting Status for Poll', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/poll');
    await page.getByRole('link', { name: '🗳️ Vote' }).click();
    await page.getByRole('heading', { name: '🗳️ Ongoing Polls' }).click();

    const pollItem = page.getByRole('listitem').filter({ hasText: 'Scholarships for Research' });
    const pollStatus = pollItem.getByRole('paragraph').nth(3);
    await expect(pollStatus).toBeVisible();

    await pollStatus.click();
    const votingClosedText = await page.getByText('❌ Voting is Closed').first();
    await expect(votingClosedText).toBeVisible();
    await votingClosedText.click();

    const closedPollText = await page.getByText('🚫 This poll is closed. Thank').first();
    await expect(closedPollText).toBeVisible();
    await closedPollText.click();
  });

  test('Handle Poll Button Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/poll');
    await page.getByRole('button', { name: 'Open Polls' }).click();
    const openPollsButton = page.getByRole('button', { name: 'Open Polls' });
    await expect(openPollsButton).toBeVisible();

    await page.getByRole('button', { name: 'Closed Polls' }).click();
    const closedPollsButton = page.getByRole('button', { name: 'Closed Polls' });
    await expect(closedPollsButton).toBeVisible();
  });

  test('Verify All Polls Button', async ({ page }) => {
    await page.goto('http://localhost:3000/teacher/poll');
    await page.getByRole('button', { name: 'All Polls' }).click();
    const allPollsButton = page.getByRole('button', { name: 'All Polls' });
    await expect(allPollsButton).toBeVisible();
  });
});
