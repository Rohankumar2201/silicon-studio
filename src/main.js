import './style.css';
import {PROJECTS,CATEGORIES,CATEGORY_BLURBS} from './data.js';
const $=s=>document.querySelector(s), app=$('#app');
const PROFILE='https://github.com/Rohankumar2201', byId=id=>PROJECTS.find(p=>p.id===id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const catUrl=c=>'/tools?cat='+encodeURIComponent(c);
const tags=p=>p.cat.map(c=>`<span class="tag">${esc(c)}</span>`).join('');
const card=p=>`<a class="card" href="/tools/${p.id}"><div class="tags">${tags(p)}</div><h3>${esc(p.name)}</h3><p>${esc(p.short)}</p><span class="more">Read guide \u2192</span></a>`;
const gate=`<svg class="hero-art" viewBox="0 0 420 300" role="img" aria-label="Schematic: two AND gates feeding an OR gate, with a clock waveform beneath"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 50h50M20 90h50M20 160h50M20 200h50"/><path d="M70 36h30a24 24 0 0 1 0 68H70zM70 146h30a24 24 0 0 1 0 68H70z"/><path d="M148 70h30v20h20M148 180h30v-60h20"/><path d="M198 80q30 0 30 40t-30 40 q15-40 0-80z" class="fill"/><path d="M228 120h70"/><circle cx="304" cy="120" r="6"/><path class="wave" d="M20 270h40v-24h40v24h40v-24h40v24h40v-24h40v24h40v-24h40v24h30"/></g><g font-size="11" fill="currentColor"><text x="4" y="54">A</text><text x="4" y="94">B</text><text x="4" y="164">C</text><text x="4" y="204">D</text><text x="318" y="124">Y</text><text x="20" y="292">CLK</text></g></svg>`;
function filtered(q,cat,sort){q=q.trim().toLowerCase();
 let r=PROJECTS.filter(p=>(cat==='All Tools'||p.cat.includes(cat))&&(!q||[p.name,p.short,p.overview,p.cat.join(' '),p.keywords].join(' ').toLowerCase().includes(q)));
 return sort==='name'?[...r].sort((a,b)=>a.name.localeCompare(b.name)):r;}
function nav(){return `<header class="nav"><a class="logo" href="/">Silicon<span>Studio</span></a><button class="menu" aria-expanded="false" aria-controls="links">Menu</button><nav id="links" aria-label="Primary"><a href="/">Home</a><a href="/tools">Explore Tools</a><a href="/#about">About</a><a href="${PROFILE}">GitHub</a><button class="theme" aria-label="Toggle dark or light theme">Theme</button></nav></header>`;}
const foot=`<footer><div><strong>Silicon Studio</strong><p>Design. Simulate. Verify. Build.</p></div><nav aria-label="Footer"><a href="/tools">Explore Tools</a><a href="/#about">About</a><a href="${PROFILE}">GitHub profile</a></nav><small>\u00A9 ${new Date().getFullYear()} Silicon Studio. Linked tools are independent projects.</small></footer>`;
function home(){document.title='Silicon Studio \u2014 Design. Simulate. Verify. Build.';
 const feat=PROJECTS;
 return `<section class="hero"><div><p class="eyebrow">An Interactive Workspace for Digital Hardware Engineering</p><h1>Engineering the logic behind tomorrow.</h1><p class="lead">Interactive tools for digital logic, RTL, waveforms and hardware interfaces, each with a guide that explains what it does before you open it.</p><div class="actions"><a class="btn primary" href="/tools">Explore Tools</a><a class="btn" href="#platform">Discover the Platform</a></div></div>${gate}</section>
 <section class="sec"><h2>All 10 tools</h2><div class="feat">${feat.map(p=>`<a class="card" href="/tools/${p.id}"><div class="tags">${tags(p)}</div><h3>${esc(p.name)}</h3><p>${esc(p.short)}</p><span class="more">Read guide \u2192</span></a>`).join('')}</div></section>
 <section class="sec" id="platform"><h2>Four areas of the workflow</h2><ol class="cats">${CATEGORIES.map((c,i)=>`<li><a href="${catUrl(c)}"><span class="num">0${i+1}</span><h3>${esc(c)}</h3><p>${esc(CATEGORY_BLURBS[c])}</p></a></li>`).join('')}</ol></section>
 <section class="sec about" id="about"><h2>About</h2><p>Silicon Studio is a hub for practical digital hardware engineering tools. It keeps each tool independent and adds guides covering the concepts, workflow and limits, so you know what to expect before launching one.</p></section>`;}
function dir(){document.title='Explore Tools \u2014 Silicon Studio';
 return `<section class="sec"><h1 class="h2">Explore Tools</h1><div class="controls"><label>Search<input id="q" type="search" autocomplete="off" placeholder="Name, topic, protocol\u2026"></label><label>Sort<select id="sort"><option value="default">Default</option><option value="name">Name</option></select></label></div><div class="chips" role="group" aria-label="Category filter">${['All Tools',...CATEGORIES].map(c=>`<button class="chip" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}</div><p id="count" aria-live="polite"></p><div class="grid" id="grid"></div></section>`;}
function wireDir(){const sp=new URLSearchParams(location.search);let cat=CATEGORIES.includes(sp.get('cat'))?sp.get('cat'):'All Tools';
 const q=$('#q'),sort=$('#sort');q.value=sp.get('q')||'';
 const draw=()=>{const r=filtered(q.value,cat,sort.value);
  document.querySelectorAll('.chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cat===cat));
  $('#count').textContent=`${r.length} of ${PROJECTS.length} tools`;
  $('#grid').innerHTML=r.length?r.map(card).join(''):`<div class="empty"><p>No tools match.</p><button class="btn" id="reset">Reset filters</button></div>`;
  const rs=$('#reset');if(rs)rs.onclick=()=>{q.value='';cat='All Tools';draw();};};
 document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;draw();});
 q.oninput=draw;sort.onchange=draw;draw();}
function guide(p){document.title=`${p.name} guide \u2014 Silicon Studio`;
 const ul=a=>`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
 return `<article class="sec guide"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/tools">Tools</a> / <span aria-current="page">${esc(p.name)}</span></nav><div class="tags">${tags(p)}</div><h1>${esc(p.name)}</h1><p class="lead">${esc(p.overview)}</p>
 <div class="actions"><a class="btn primary" href="${p.live}">Open Tool</a><a class="btn" href="${p.gh}">View Source Code</a><a class="btn ghost" href="/tools">Back to All Tools</a></div>
 <p class="note">Guide content is based on the tool\u2019s build specification and has not yet been checked against the live app.</p>
 <h2>The problem it helps with</h2><p>${esc(p.problem)}</p><h2>Concepts</h2>${ul(p.concepts)}<h2>Who it\u2019s for</h2><p>${esc(p.audience)}</p>
 <h2>How to use it</h2><ol>${p.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><h2>Example</h2><p>${esc(p.example)}</p>
 <h2>Reading the output</h2><p>${esc(p.outputs)}</p><h2>Limitations and unverified items</h2>${ul(p.limits)}
 <h2>Related tools</h2><div class="grid">${p.related.map(id=>card(byId(id))).join('')}</div></article>`;}
function render(){const path=location.pathname.replace(/\/+$/,'')||'/';let body,after=()=>{};
 const m=path.match(/^\/tools\/([\w-]+)$/),p=m&&byId(m[1]);
 if(path==='/')body=home();else if(path==='/tools'){body=dir();after=wireDir;}
 else if(p)body=guide(p);else{document.title='Not found \u2014 Silicon Studio';body=`<section class="sec"><h1>Page not found</h1><a class="btn" href="/tools">Explore Tools</a></section>`;}
 app.innerHTML=nav()+`<main id="main">${body}</main>`+foot;after();bind();
 if(location.hash){const e=document.getElementById(location.hash.slice(1));if(e)e.scrollIntoView();}else window.scrollTo(0,0);
 observe();}
function bind(){const b=$('.menu'),l=$('#links');b.onclick=()=>{const o=l.classList.toggle('open');b.setAttribute('aria-expanded',o);};
 $('.theme').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('ss-theme',t)}catch(e){}};}
function observe(){if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))return;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}));
 document.querySelectorAll('.sec').forEach(s=>{s.classList.add('rv');io.observe(s)});}
// Intercept only same-origin, unmodified left clicks; external links stay plain same-tab anchors.
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;
 const u=new URL(a.href,location.href);if(u.origin!==location.origin)return;
 if(u.pathname===location.pathname&&u.search===location.search&&u.hash){return;}
 e.preventDefault();history.pushState({},'',u.pathname+u.search+u.hash);render();});
addEventListener('popstate',render);render();
