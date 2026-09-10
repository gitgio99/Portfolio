const {chromium}=require('C:/Users/smw06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('path'),{pathToFileURL}=require('url');
(async()=>{
 const root=path.resolve(__dirname,'..'),b=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}),p=await b.newPage({viewport:{width:1100,height:900}});
 const assert=(x,m)=>{if(!x)throw Error(m)};
 for(const id of ['display','linux','integration']){
  for(const lang of ['ko','en']){
   await p.goto(pathToFileURL(path.join(root,`assets/diagrams/${id}-${lang}.svg`)).href);
   await p.locator('svg').screenshot({path:path.join(root,`tmp/architecture/${id}-${lang}.png`)});
  }
 }
 await p.goto(pathToFileURL(path.join(root,'index.html')).href);
 assert(await p.locator('.system-diagram').count()===3,'Three diagrams');assert(await p.locator('.award-card').count()===4,'Four awards');
 assert((await p.locator('#profile').innerText()).includes('정보처리기사 · 결과 발표 대기'),'Pending certification');
 await p.locator('#integration .diagram-open').click();assert(await p.locator('#diagram-modal').evaluate(e=>e.open),'Open diagram');
 await p.keyboard.press('Escape');assert(!(await p.locator('#diagram-modal').evaluate(e=>e.open)),'Close with Escape');
 await p.locator('#language').click();
 for(const img of await p.locator('img[data-src-ko]').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());assert((await img.getAttribute('src')).endsWith('-en.svg'),'English diagram')}
 await p.locator('#language').click();
 await p.locator('#awards').screenshot({path:path.join(root,'tmp/architecture/awards-web.png')});
 await p.setViewportSize({width:390,height:900});await p.locator('#display .diagram-open').click();await p.screenshot({path:path.join(root,'tmp/architecture/mobile-modal.png')});await p.keyboard.press('Escape');
 await p.locator('#display .diagram-open').click();await p.locator('#diagram-zoom').click();assert(await p.locator('.diagram-viewport').evaluate(e=>e.scrollWidth>e.clientWidth),'Original-size zoom scrolls on mobile');await p.keyboard.press('Escape');
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile overflow');
 console.log('PASS: 3 bilingual diagrams, 4 awards, pending certificate, image load, modal/escape and mobile width.');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
