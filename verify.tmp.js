const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('http://localhost:8090', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=QR Payment Manager');
  await page.screenshot({ path: 'C:/Users/INGALV~1/AppData/Local/Temp/claude/c--Users-Ing-Alvaro-Documents-GitHub-qr/151378c7-bbdc-4039-a86f-cb175e78b5f1/scratchpad/01-dashboard.png' });

  await page.click('button[data-view="misqr"]');
  await page.waitForSelector('#qr-grid .qr-card');
  await page.fill('#search-input', 'Banco');
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'C:/Users/INGALV~1/AppData/Local/Temp/claude/c--Users-Ing-Alvaro-Documents-GitHub-qr/151378c7-bbdc-4039-a86f-cb175e78b5f1/scratchpad/02-misqr-search.png' });
  await page.fill('#search-input', '');

  await page.click('button[data-view="agregar"]');
  await page.waitForSelector('#qr-form');
  await page.screenshot({ path: 'C:/Users/INGALV~1/AppData/Local/Temp/claude/c--Users-Ing-Alvaro-Documents-GitHub-qr/151378c7-bbdc-4039-a86f-cb175e78b5f1/scratchpad/03-agregar.png' });

  await page.click('button[data-view="categorias"]');
  await page.waitForSelector('.category-card');
  await page.screenshot({ path: 'C:/Users/INGALV~1/AppData/Local/Temp/claude/c--Users-Ing-Alvaro-Documents-GitHub-qr/151378c7-bbdc-4039-a86f-cb175e78b5f1/scratchpad/04-categorias.png' });

  await page.click('button[data-view="misqr"]');
  await page.waitForSelector('#qr-grid .qr-card');
  await page.click('#qr-grid .qr-card .js-view');
  await page.waitForSelector('#qr-modal.open');
  await page.screenshot({ path: 'C:/Users/INGALV~1/AppData/Local/Temp/claude/c--Users-Ing-Alvaro-Documents-GitHub-qr/151378c7-bbdc-4039-a86f-cb175e78b5f1/scratchpad/05-modal.png' });

  await page.click('#modal-client');
  await page.waitForSelector('#client-view.open');
  await page.screenshot({ path: 'C:/Users/INGALV~1/AppData/Local/Temp/claude/c--Users-Ing-Alvaro-Documents-GitHub-qr/151378c7-bbdc-4039-a86f-cb175e78b5f1/scratchpad/06-client-view.png' });

  await page.click('#client-close');

  console.log('ERRORS:', JSON.stringify(errors));
  console.log('DONE');

  await browser.close();
})();
