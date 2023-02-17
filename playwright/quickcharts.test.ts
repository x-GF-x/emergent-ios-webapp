import { test } from '@playwright/test';

test('vital signs', async ({ page }) => {
	await page.goto('http://localhost:5173/patient_details');
	await page.getByRole('button', { name: 'add Vital Signs' }).click();
	await page.getByRole('button', { name: 'eVital02' }).click();
	await page.getByRole('button', { name: 'No', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals06' }).click();
	await page.getByRole('button', { name: '8', exact: true }).click();
	await page.getByRole('button', { name: '9', exact: true }).click();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals07' }).click();
	await page.getByRole('button', { name: '7', exact: true }).click();
	await page.getByRole('button', { name: '5', exact: true }).click();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals08' }).click();
	await page.getByRole('button', { name: 'Arterial Line' }).click();
	await page.getByRole('button', { name: 'eVitals09' }).click();
	await page.getByRole('button', { name: '0', exact: true }).dblclick();
	await page.getByRole('button', { name: '8', exact: true }).click();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals10' }).click();
	await page.getByRole('button', { name: '2', exact: true }).dblclick();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals11' }).click();
	await page.getByRole('button', { name: 'Electronic Monitor - Cardiac' }).click();
	await page.getByRole('button', { name: 'eVitals12' }).click();
	await page.getByRole('button', { name: '5', exact: true }).dblclick();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals13' }).click();
	await page.getByRole('button', { name: 'Irregularly Irregular' }).click();
	await page.getByRole('button', { name: 'eVitals14' }).click();
	await page.getByRole('button', { name: '9', exact: true }).click();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals15', exact: true }).click();
	await page.getByRole('button', { name: 'Normal' }).click();
	await page.getByRole('button', { name: 'eVitals16' }).click();
	await page.getByRole('button', { name: '8', exact: true }).dblclick();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals15_type' }).click();
	await page.getByRole('button', { name: 'eVitals18' }).click();
	await page.getByRole('button', { name: '5', exact: true }).click();
	await page.getByRole('button', { name: '0', exact: true }).click();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals25' }).click();
	await page.getByRole('button', { name: 'Rectal' }).click();
	await page.getByRole('button', { name: 'eVitals24' }).click();
	await page.getByRole('button', { name: '8', exact: true }).click();
	await page.getByRole('button', { name: '6', exact: true }).click();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eVitals26' }).click();
	await page.getByRole('button', { name: 'Verbal' }).click();
	await page.getByRole('button', { name: 'Update' }).click();
});

test('oxygen', async ({ page }) => {
	await page.goto('http://localhost:5173/patient_details');
	await page.getByRole('button', { name: 'add Oxygen' }).click();
	await page.getByRole('button', { name: 'eMedications05' }).click();
	await page.getByRole('button', { name: '2', exact: true }).dblclick();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eMedications04' }).click();
	await page.getByRole('button', { name: 'Blow-By' }).click();
	await page.getByRole('button', { name: 'eMedications06' }).click();
	await page.getByRole('button', { name: 'Drops (gtts)' }).click();
	await page.getByRole('button', { name: 'Update' }).click();
});

test('other drug', async ({ page }) => {
	await page.goto('http://localhost:5173/patient_details');
	await page.getByRole('button', { name: 'add Other Drug' }).click();
	await page.getByRole('button', { name: 'eMedications03' }).click();
	await page.getByRole('button', { name: 'Lidocaine' }).click();
	await page.getByRole('button', { name: 'eMedications04' }).click();
	await page.getByRole('button', { name: 'Intraosseous (IO)' }).click();
	await page.getByRole('button', { name: 'eMedications05' }).click();
	await page.getByRole('button', { name: '2', exact: true }).dblclick();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eMedications06' }).click();
	await page.getByRole('button', { name: 'Grams (gms)' }).click();
	await page.getByRole('button', { name: 'Update' }).click();
});

test('add action, arrest info', async ({ page }) => {
	await page.goto('http://localhost:5173/patient_details');
	await page.getByRole('button', { name: 'add Other Actions' }).click();
	await page.getByRole('button', { name: 'Arrest Info' }).click();
	await page.getByRole('button', { name: 'eVitals27' }).click();
	await page.getByRole('button', { name: '2', exact: true }).dblclick();
	await page.getByRole('button', { name: '0', exact: true }).click();
	await page.getByRole('button', { name: '2', exact: true }).click();
	await page.getByRole('button', { name: '0', exact: true }).click();
	await page.getByRole('button', { name: '2', exact: true }).click();
	await page.getByRole('button', { name: '3' }).click();
	await page.getByRole('button', { name: 'UPDATE', exact: true }).click();
	await page.getByRole('button', { name: 'eArrest02' }).click();
	await page.getByRole('button', { name: 'Drug Overdose' }).click();
	await page.getByRole('button', { name: 'eArrest04' }).click();
	await page.getByRole('button', { name: 'Witnessed by Family Member' }).click();
	await page.getByRole('button', { name: 'Witnessed by Bystander' }).click();
	await page.getByRole('button', { name: 'Update Items' }).click();
});
