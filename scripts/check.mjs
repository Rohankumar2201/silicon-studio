// Post-build sanity check: 10 projects, unique ids/URLs, no target=_blank in source.
import {PROJECTS} from '../src/data.js';import {readFileSync} from 'fs';
const bad=[];if(PROJECTS.length!==10)bad.push('expected 10 projects');
for(const k of ['id','live','gh'])if(new Set(PROJECTS.map(p=>p[k])).size!==10)bad.push('duplicate '+k);
for(const p of PROJECTS){if(!p.live.startsWith('https://')||!p.gh.startsWith('https://github.com/Rohankumar2201/'))bad.push('url '+p.id);
 if(p.related.some(r=>!PROJECTS.find(x=>x.id===r)))bad.push('related '+p.id);}
if(/target=|window\.open/.test(readFileSync('src/main.js','utf8')))bad.push('new-tab code found');
if(bad.length){console.error(bad);process.exit(1)}console.log('inventory check OK: 10 projects');
