import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
require.extensions['.tsx']=(m,f)=>m._compile(ts.transpileModule(readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,f);
const root=fileURLToPath(new URL('.',import.meta.url));
const read=name=>JSON.parse(readFileSync(`${root}/${name}`,'utf8'));
test('revised video gives five life uses complete reading and action time',()=>{
 assert.ok(existsSync(`${root}/timeline.json`),'episode timeline must exist');
 const timeline=read('timeline.json'),meta=read('video.json');
 let cursor=0;
 for(const s of timeline.scenes){assert.equal(s.from,cursor);cursor+=s.durationInFrames;}
 assert.equal(timeline.scenes.length,7);assert.equal(cursor,4290);assert.equal(cursor,meta.durationInFrames);
 for(const id of ['marriage','moving'])assert.ok(timeline.scenes.find(s=>s.id===id).durationInFrames>=30*30);
 assert.equal(timeline.scenes.find(s=>s.id==='ending').durationInFrames,3*30);
 assert.deepEqual(meta.format,{width:1080,height:1920,fps:30});
 assert.equal(meta.audio.narration,'');assert.equal(meta.audio.bgm,'');
});
test('new story completes wedding, transport and home actions in order before inviting comments',()=>{
 assert.ok(existsSync(`${root}/story-motion.ts`),'new narrative motion must exist');
 const {storyAt,legacyTime,weddingBackdropAt}=require(`${root}/story-motion.ts`);
 assert.equal(typeof weddingBackdropAt,'function');
 assert.equal(weddingBackdropAt(86.9),0);
 assert.equal(weddingBackdropAt(87.5),.875);
 assert.equal(weddingBackdropAt(88),1);
 assert.ok(legacyTime(8)<2&&legacyTime(26)===13&&legacyTime(50)===25,'legacy scene visuals must follow revised chapter timing');
 assert.equal(storyAt(74).stage,'compatibility');assert.equal(storyAt(84).stage,'wedding-date');
 assert.equal(storyAt(96).stage,'ceremony');assert.equal(storyAt(116).stage,'packing');
 assert.equal(storyAt(123).stage,'loading');assert.equal(storyAt(128).stage,'transport');
 assert.equal(storyAt(135).stage,'entering');assert.equal(storyAt(139).stage,'settling');
 assert.equal(storyAt(139).stage,'settling');assert.equal(storyAt(141).stage,'discussion');
 assert.equal(storyAt(142.9).visibility,1);assert.equal(storyAt(142.9).question,1,'ending prompt remains visible through the final frame');
 assert.ok(storyAt(118).pack>0&&storyAt(123).load>0&&storyAt(127).drive>0&&storyAt(135).enter>0,'packing must lead into loading, driving, then unloading');
 for(let f=68*30;f<143*30;f++){const a=storyAt(f/30),b=storyAt((f+1)/30);assert.ok(Math.abs(a.camera-b.camera)<40,'camera must travel continuously');}
});
test('loading animation lifts one staged box at a time and keeps landed boxes in the van',()=>{
 const {cargoAt}=require(`${root}/story-motion.ts`);
 assert.equal(typeof cargoAt,'function');
 assert.equal(cargoAt(118.5).active,0);assert.equal(cargoAt(118.5).loaded,0);
 assert.equal(cargoAt(119.9).active,-1);assert.equal(cargoAt(119.9).loaded,1);
 assert.equal(cargoAt(120.5).active,1);assert.equal(cargoAt(120.5).loaded,1);
 assert.equal(cargoAt(122.5).active,2);assert.equal(cargoAt(122.5).loaded,2);
 assert.equal(cargoAt(123.9).active,-1);assert.equal(cargoAt(123.9).loaded,3);
});
test('arrival unloads the same three items into the home and keeps them there for the ceremony',()=>{
 const {unloadAt}=require(`${root}/story-motion.ts`);
 assert.equal(typeof unloadAt,'function');
 assert.equal(unloadAt(131.5).active,0);assert.equal(unloadAt(131.5).moved,0);
 assert.equal(unloadAt(132.5).active,-1);assert.equal(unloadAt(132.5).moved,1);
 assert.equal(unloadAt(134).active,1);assert.equal(unloadAt(134).moved,1);
 assert.equal(unloadAt(136).active,2);assert.equal(unloadAt(136).moved,2);
 assert.equal(unloadAt(137.1).active,-1);assert.equal(unloadAt(137.1).moved,3);
});
test('simple moving story shows the chosen day, the van and the 安居 scroll',()=>{
 const src=readFileSync(`${root}/SimpleMove.tsx`,'utf8');
 assert.match(src,/data-scene="simple-move"/);
 for(const text of ['丙午年','入宅','搬家','安居'])assert.match(src,new RegExp(text));
 const old=src.indexOf('StageOld'),day=src.indexOf('StageDay'),home=src.indexOf('StageHome');
 assert.ok(old<day&&day<home,'story should read old home → moving day → new home');
});
test('opening explains the two Ganzhi characters before connecting Wu to the horse zodiac',()=>{
 const {openingAt}=require(`${root}/story-motion.ts`);
 assert.equal(openingAt(0.5).caption,'马年，为什么写“丙午”？');
 assert.equal(openingAt(2.5).caption,'丙是天干，午是地支。');
 assert.equal(openingAt(4.5).caption,'地支“午”，对应生肖马。');
 assert.equal(openingAt(6.5).caption,'丙午年名 → 午 → 马');
});
test('zodiac horse keeps one continuous, licence-cleared silhouette at both display sizes',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
 const {Horse}=require(`${root}/Props.tsx`);
 const source=readFileSync(`${root}/horse-silhouette.ts`,'utf8');
 assert.match(source,/CC0/);assert.match(source,/svgrepo\.com\/svg\/29905/);
 assert.ok(source.length>7000,'the detailed horse silhouette must not collapse into a placeholder');
 for(const size of [96,286]){
  const svg=renderToStaticMarkup(React.createElement(Horse,{size,motion:4.5}));
  assert.match(svg,/data-prop="zodiac-horse"/);
  assert.match(svg,/data-part="silhouette"/);
  assert.match(svg,/viewBox="0 0 400 300"/);
  assert.match(svg,/aria-label="侧身腾跃的生肖马"/);
  assert.match(svg,/translate\(200 150\) scale\(-3 3\)/);
  assert.match(svg,/linearGradient/);
 }
});
test('greeting card uses one large horse medallion and a readable Wu-to-horse strip',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
 const {Greeting}=require(`${root}/Props.tsx`);
 const html=renderToStaticMarkup(React.createElement(Greeting,{t:10}));
 assert.match(html,/data-role="main-horse"/);
 assert.match(html,/地支/);assert.match(html,/生肖马/);
 assert.doesNotMatch(html,/width="90"/,'the unreadable 90px horse must stay removed');
 assert.match(html,/width="210"/);
});
test('wedding uses the confirmed paper-cut tableau',()=>{
 const src=readFileSync(`${root}/PaperCutScenes.tsx`,'utf8');
 assert.match(src,/data-scene="wedding-papercut"/);
 assert.match(src,/wedding-papercut.png/);
 assert.ok(existsSync(fileURLToPath(new URL('../../../public/ganzhi-modern-life/2d/wedding-papercut.png',import.meta.url))));
});
test('moving uses the supplied casual character cutouts, not drawn faces',()=>{
 const src=readFileSync(`${root}/SimpleMove.tsx`,'utf8');
 assert.match(src,/casual-\$\{which\}\.png/);
 for(const file of ['casual-man.png','casual-woman.png']){
  assert.ok(existsSync(fileURLToPath(new URL(`../../../public/ganzhi-modern-life/2d/${file}`,import.meta.url))),`${file} must exist`);
 }
});
test('the 1:05 bridge has one continuous world with no legacy and later scene overlap',()=>{
 const {sceneAt}=require(`${root}/story-motion.ts`);
 assert.equal(sceneAt(49.9),'legacy');
 assert.equal(sceneAt(50),'calligraphy');
 assert.equal(sceneAt(63.9),'calligraphy');
 assert.equal(sceneAt(64),'bridge');
 assert.equal(sceneAt(65.5),'bridge');
 assert.equal(sceneAt(67.9),'bridge');
 assert.equal(sceneAt(68),'later');
});
test('Fu counting preserves earlier events and only produces the result at the third Geng day',()=>{
 assert.ok(existsSync(`${root}/motion.ts`),'episode motion implementation must exist');
 const {gengAt}=require(`${root}/motion.ts`);
 assert.equal(gengAt(14).count,0);assert.equal(gengAt(16.9).count,1);
 assert.equal(gengAt(18.9).count,2);assert.equal(gengAt(20.9).count,3);
 assert.equal(gengAt(20).result,false);assert.equal(gengAt(22).result,true);
 let previous=0;for(let f=390;f<750;f++){const v=gengAt(f/30);assert.ok(v.count>=previous);previous=v.count;}
});
test('persistent props keep continuous poses across every scene boundary',()=>{
 assert.ok(existsSync(`${root}/motion.ts`),'episode motion implementation must exist');
 const {posesAt}=require(`${root}/motion.ts`);
 for(const s of [4,13,25,35,42,49,51,60]){
  const a=posesAt(s-1/3000),b=posesAt(s+1/3000);
  for(const key of ['phone','calendar','art','box','camera'])for(const axis of ['x','y','scale','angle']){
   assert.ok(Number.isFinite(a[key][axis]));assert.ok(Math.abs(a[key][axis]-b[key][axis])<2,`${key}.${axis} jumps at ${s}`);
  }
 }
});
test('calendar leaves the portrait frame and the artwork descends into the box before travel',()=>{
 const {posesAt}=require(`${root}/motion.ts`);
 const c=posesAt(26).calendar;assert.ok(c.x-390*c.scale>1080,'old calendar must be fully outside the frame');
 const raised=posesAt(52).art,inserted=posesAt(53.5).art;
 assert.ok(raised.y<inserted.y-120,'scroll must descend into the opening');
 const travelling=posesAt(59);assert.ok(Math.abs(travelling.art.x-travelling.box.x)<100);
});
test('phone and day labels reveal information only after their matching events',()=>{
 const {phoneCalendarAt,gengAt}=require(`${root}/motion.ts`);
 assert.equal(typeof phoneCalendarAt,'function');
 assert.equal(phoneCalendarAt(16).result,false);assert.equal(phoneCalendarAt(22).saved,false);
 assert.equal(phoneCalendarAt(24).saved,true);
 for(const at of [15,17,19])assert.equal(gengAt(at+.01).count,[15,17,19].indexOf(at)+1);
});
test('brush follows cumulative segment length rather than vertex index',()=>{
 const {pointAlong}=require(`${root}/motion.ts`);assert.equal(typeof pointAlong,'function');
 assert.deepEqual(pointAlong([[0,0],[10,0],[110,0]],.5),{x:55,y:0});
});
test('phone stays below the three counted date labels during the Fu explanation',()=>{
 const {posesAt}=require(`${root}/motion.ts`);
 for(const t of [15,17,19,21]){const p=posesAt(t);assert.ok(p.phone.y-425*p.phone.scale>p.calendar.y+310*p.calendar.scale,'phone must not cover the date panel');}
});
test('scroll stays inside the closed box until extraction begins',()=>{
 const {posesAt}=require(`${root}/motion.ts`);
 for(const t of [54,56,58,59,59.9]){const p=posesAt(t);assert.ok(p.art.y-285*p.art.scale>p.box.y-195*p.box.scale,'scroll exposed through the closed lid');}
 const p=posesAt(60.8);assert.ok(p.art.y+330*p.art.scale<p.box.y-195*p.box.scale,'scroll must clear the silhouette before moving to front');
});
