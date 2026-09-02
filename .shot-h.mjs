import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--host-resolver-rules=MAP www.treatmentshub.com 127.0.0.1:4396'] });
for (const [w,h,name] of [[390,844,'mob'],[1280,800,'desk']]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.addInitScript(() => sessionStorage.setItem('promoPopupSeen','1'));
  await p.goto('http://www.treatmentshub.com/weight-loss', { waitUntil: 'networkidle' });
  await p.screenshot({ path: `/tmp/claude-0/-home-user-top-weight-loss/b789f8a4-45e6-5318-8e34-096e73e1c87e/scratchpad/hero-${name}.png` });
  await p.close();
}
await b.close();
