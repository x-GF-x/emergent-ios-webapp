import { test } from '@playwright/test';

test('note added from QC is on narrative page', async ({ page }) => {
	await page.goto('http://localhost:5173/patient_details');
	await page.getByRole('button', { name: 'ADD NOTE' }).click();
	await page.getByPlaceholder('Note').click();
	await page.getByPlaceholder('Note').fill('New Note :)');
	await page.getByPlaceholder('Note').press('ArrowLeft');
	await page.getByPlaceholder('Note').fill('New Note :o)');
	await page.getByRole('button', { name: 'Update' }).click();
	await page.getByRole('button', { name: 'Narrative' }).click();
	await page.getByPlaceholder('Note').click();
	await page.getByPlaceholder('Note').fill('');
});
