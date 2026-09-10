(()=>{
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];let lang='ko',expanded=false;
 const storage={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
 const refresh=()=>{$('#expand').textContent=lang==='ko'?(expanded?'상세 모두 접기':'상세 모두 펼치기'):(expanded?'Collapse all details':'Expand all details')};
 function language(next){lang=next;document.documentElement.lang=lang;all('[data-i18n]').forEach(e=>e.textContent=e.dataset[lang]);$('#language').textContent=lang==='ko'?'EN':'KO';$('#language').setAttribute('aria-label',lang==='ko'?'Switch language to English':'한국어로 전환');document.title=`${lang==='ko'?'전지오':'Jioh Jeon'} · Embedded & System Software`;all('img[data-src-ko]').forEach(img=>{img.src=img.dataset[lang==='ko'?'srcKo':'srcEn'];img.alt=img.closest('.project').querySelector('h3').textContent+(lang==='ko'?' 시스템 구성도':' system architecture');img.closest('button').setAttribute('aria-label',img.alt+(lang==='ko'?' 확대':' enlarge'))});refresh();storage.set('portfolio-language',lang)}
 function theme(dark){document.documentElement.dataset.theme=dark?'dark':'light';$('#theme').setAttribute('aria-pressed',String(dark));storage.set('portfolio-theme',dark?'dark':'light')}
 $('#language').addEventListener('click',()=>language(lang==='ko'?'en':'ko'));$('#theme').addEventListener('click',()=>theme(document.documentElement.dataset.theme!=='dark'));
 all('[data-filter]').forEach(b=>b.addEventListener('click',()=>{all('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));all('.project').forEach(p=>p.hidden=b.dataset.filter!=='all'&&!p.dataset.categories.split(' ').includes(b.dataset.filter));$('#result-count').textContent=`${all('.project:not([hidden])').length} projects`}));
 $('#expand').addEventListener('click',()=>{expanded=!expanded;all('.project details').forEach(d=>d.open=expanded);refresh()});
 let before;window.addEventListener('beforeprint',()=>{before=all('details').map(d=>d.open);all('details').forEach(d=>d.open=true)});window.addEventListener('afterprint',()=>all('details').forEach((d,i)=>d.open=before?.[i]??false));
 all('.diagram-open').forEach(b=>b.addEventListener('click',()=>{const img=b.querySelector('img');$('#modal-image').classList.remove('zoomed');$('#diagram-zoom').setAttribute('aria-pressed','false');$('#modal-image').src=img.src;$('#modal-image').alt=img.alt;$('#diagram-modal').showModal()}));
 $('#diagram-zoom').addEventListener('click',()=>{const z=$('#modal-image').classList.toggle('zoomed');$('#diagram-zoom').setAttribute('aria-pressed',String(z))});
 $('#diagram-modal').addEventListener('click',e=>{if(e.target===$('#diagram-modal'))$('#diagram-modal').close()});
 language(storage.get('portfolio-language')==='en'?'en':'ko');theme(storage.get('portfolio-theme')==='dark');
})();
