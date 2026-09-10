const {chromium}=require('C:/Users/smw06/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url');
(async()=>{
 const root=path.resolve(__dirname,'..');fs.mkdirSync(path.join(root,'tmp/qa'),{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:1050},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.screenshot({path:path.join(root,'tmp/qa/desktop.png')});
 const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
 assert(await page.locator('.project').count()===8,'Expected eight projects');
 await page.locator('#display').screenshot({path:path.join(root,'tmp/qa/project.png')});
 for(const [filter,count] of [['firmware',3],['linux',4],['systems',7],['data',3],['all',8]]){
  await page.locator(`[data-filter="${filter}"]`).click();assert(await page.locator('.project:visible').count()===count,`Filter ${filter}`);
 }
 await page.locator('#expand').click();assert(await page.locator('details[open]').count()===8,'Expand all');
 await page.locator('#expand').click();assert(await page.locator('details[open]').count()===0,'Collapse all');
 await page.locator('#language').click();assert(await page.locator('html').getAttribute('lang')==='en','English switch');
 assert(await page.locator('h1').innerText()!=='','English heading');
 await page.locator('#theme').click();assert(await page.locator('html').getAttribute('data-theme')==='dark','Dark mode');
 await page.screenshot({path:path.join(root,'tmp/qa/english-dark.png')});
 await page.reload();assert(await page.locator('html').getAttribute('lang')==='en','Language persistence');
 await page.locator('#language').click();await page.locator('#theme').click();
 await page.locator('#expand').click();
 for(const language of ['ko','en']){
  if(await page.locator('html').getAttribute('lang')!==language)await page.locator('#language').click();
  for(const width of [375,390,768,1024,1440]){
   await page.setViewportSize({width,height:900});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Horizontal overflow ${language} ${width}`);
  }
 }
 await page.locator('#language').click();
 await page.locator('#pipeline').screenshot({path:path.join(root,'tmp/qa/pipeline.png')});
 await page.setViewportSize({width:390,height:900});await page.locator('#home').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'tmp/qa/mobile.png')});
 const links=await page.locator('a').evaluateAll(a=>a.map(x=>x.getAttribute('href')));
 for(const href of links){if(href.startsWith('#'))assert(await page.locator(href).count()===1,`Missing anchor ${href}`);else if(!/^(https?:|mailto:)/.test(href))assert(fs.existsSync(path.resolve(root,href)),`Missing file ${href}`)}
 assert(errors.length===0,errors.join('\n'));
 console.log('PASS: 8 projects, 5 filters, expand/collapse, KO/EN, dark mode, persistence, five viewport widths, local links and no JS errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
