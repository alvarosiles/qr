const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('http://localhost:8090', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  await page.click('button[data-view="agregar"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'shot-agregar.png' });

  await page.click('button[data-view="categorias"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'shot-categorias.png' });

  await page.click('button[data-view="configuracion"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'shot-config.png' });

  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
