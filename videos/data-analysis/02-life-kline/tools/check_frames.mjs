import {bundle} from '@remotion/bundler';
import {getCompositions, openBrowser, renderStill} from '@remotion/renderer';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const episode=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.resolve(episode,'../../..');
const batch=process.argv[2]??'v3-1-stages';
if(!/^[a-zA-Z0-9-]+$/.test(batch))throw new Error('Invalid batch name');
const output=path.join(episode,'debug/screenshots',batch);
await mkdir(output,{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(root,'.cache/life-kline/check-bundle'),publicDir:path.join(root,'public'),rootDir:root});
const browser=await openBrowser('chrome');
const frames=process.argv[3]?process.argv[3].split(',').map(Number):[0,60,120,210,420,630,690,760,790,830,900,950,985,990,1050,1140,1200,1260,1320,1349,1350,1420,1580,1650,1710,1769,1770,1820,1900,1980,2070,2130,2189,2190,2400,2519];
try{
  const compositions=await getCompositions(serveUrl,{puppeteerInstance:browser,port:3102});
  const composition=compositions.find(c=>c.id==='data-analysis-life-kline-vertical');
  if(!composition)throw new Error('Life K-line composition missing');
  for(const frame of frames){
    if(!Number.isInteger(frame)||frame<0||frame>=composition.durationInFrames)throw new Error('Invalid frame');
    await renderStill({composition,serveUrl,frame,output:path.join(output,`f${String(frame).padStart(6,'0')}.png`),imageFormat:'png',scale:.75,puppeteerInstance:browser,port:3102});
    console.log(`Checked frame ${frame}`);
  }
  await writeFile(path.join(output,'frames.json'),JSON.stringify({script:'v3.1 sequential actions, exclusive stages and recruitment gate',composition:composition.id,fps:composition.fps,durationInFrames:composition.durationInFrames,scale:.75,frames},null,2)+'\n');
}finally{await browser.close({silent:true});}
