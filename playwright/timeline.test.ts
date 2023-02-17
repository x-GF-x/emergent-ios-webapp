import { test } from '@playwright/test';

test('QC populates timeline', async ({ page }) => {
	await page.goto('http://localhost:5173/patient_details');
	await page.getByRole('button', { name: 'add Signs/Symptons' }).click();
	await page.getByRole('button', { name: 'eVitals27' }).click();
	await page.getByRole('button', { name: '2', exact: true }).dblclick();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals28' }).click();
	await page
		.getByRole('button', { name: 'FLACC (Face, Legs, Activity, Cry, Consolability)' })
		.click();
	await page.getByRole('button', { name: 'Update' }).click();
	await page.getByRole('button', { name: 'Timeline' }).click();
	await page.getByRole('button', { name: 'eVitals27' }).click();
	await page.getByRole('button', { name: 'UPDATE' }).click();
	await page.getByRole('button', { name: 'eVitals28' }).click();
	await page.getByRole('button', { name: 'Other' }).click();
});
