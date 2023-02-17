import { test } from '@playwright/test';

test('hit some NVs and PNs', async ({ page }) => {
	await page.goto('http://localhost:5173/patient_details');
	await page.getByRole('button', { name: 'Person Info' }).click();
	await page
		.locator('div')
		.filter({ hasText: 'First Name block MI block Last Name block' })
		.getByRole('button', { name: 'block' })
		.first()
		.click();
	await page.getByText('None').first().click();
	await page
		.locator('div')
		.filter({ hasText: 'First Name None block MI block Last Name block' })
		.getByRole('button', { name: 'block' })
		.nth(1)
		.click();
	await page.getByText('Refused').click();
	await page
		.locator('div')
		.filter({ hasText: 'First Name None block MI Refused block Last Name block' })
		.getByRole('button', { name: 'block' })
		.nth(2)
		.click();
	await page.getByRole('button', { name: 'Unable to complete' }).click();
});
