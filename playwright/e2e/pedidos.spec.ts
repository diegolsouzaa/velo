import { test, expect } from '@playwright/test';

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  await page.getByTestId('search-order-id').fill('VLO-BVP0T0');
  await page.getByTestId('search-order-button').click();

  await page.getByTestId('search-order-button').click();

  //checkpoint
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-BVP0T0');
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});