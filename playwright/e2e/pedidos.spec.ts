import { test, expect } from '@playwright/test';

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-BVP0T0');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();


  await expect(page.getByText('VLO-BVP0T0')).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText('VLO-BVP0T0')).toContainText('VLO-BVP0T0');

  //checkpoint
  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.getByText('APROVADO')).toContainText('APROVADO');
});