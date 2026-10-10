import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';

test.describe('Consulta de pedido', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:5173/');

    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    const order = {
      number: 'VLO-BVP0T0',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Paulo Soares',
        email: 'paulo@email.com',
      },
      payment: ' À Vista'
    }

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    // aqui estamos usando ` escape ... para conseguir passar o order.
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - img
    - text: APROVADO
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);


    //  const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-BVP0T0"]')
    //  await expect(orderCode).toBeVisible({ timeout: 30_000 });

    /*  const containerPedido = page.getByRole('paragraph')
         .filter({hasText: /^Pedido$/}) // expressao regular, o '/^' significa que começa com 'Pedido' e '$/' que termina com 'Pedido'
         .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)
     
       await expect(containerPedido).toContainText(order, {timeout: 10000})
     
     //  await expect(page.getByText('VLO-BVP0T0')).toBeVisible({ timeout: 30_000 });
     //  await expect(page.getByText('VLO-BVP0T0')).toContainText('VLO-BVP0T0');
     
       //checkpoint
       await expect(page.getByText('APROVADO')).toBeVisible();
       await expect(page.getByText('APROVADO')).toContainText('APROVADO'); */
  });

  test('deve consultar um pedido reprovado', async ({ page }) => {

    const order = {
      number: 'VLO-L76ESD',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Rafael Cardoso',
        email: 'rafael@email.com',
      },
      payment: 'À Vista'
    }


    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    // aqui estamos usando ` escape ... para conseguir passar o order.
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: REPROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

  });

  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()


    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //  await expect(page.locator('#root')).toContainText('Pedido não encontrado');
    //  await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');

    // const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
    // await expect(title).toBeVisible()

    //const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
    //await expect(message).toBeVisible()

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
     - img
     - heading "Pedido não encontrado" [level=3]
     - paragraph: Verifique o número do pedido e tente novamente
     `);

  })


})

