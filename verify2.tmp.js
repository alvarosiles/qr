const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8090', { waitUntil: 'networkidle' });

  await page.click('button[data-view="misqr"]');
  await page.waitForSelector('#qr-grid .qr-card');
  await page.click('#qr-grid .qr-card .js-view');
  await page.waitForTimeout(300);

  const info = await page.evaluate(() => {
    const modal = document.getElementById('qr-modal');
    const rect = modal.getBoundingClientRect();
    const style = getComputedStyle(modal);
    const contentRect = modal.querySelector('.modal-content').getBoundingClientRect();
    return {
      className: modal.className,
      display: style.display,
      rect,
      contentRect,
      html: modal.outerHTML.slice(0, 500),
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await page.screenshot({ path: 'debug-modal.png' });
  await browser.close();
})();
