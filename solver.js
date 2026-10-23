// BFS over (x, y, moves mod 6). Reads LEVELS straight from index.html.
const fs=require('fs');
const src=fs.readFileSync(__dirname+'/index.html','utf8');
const LEVELS=eval(src.split('/*LEVELS*/')[1].split('/*END*/')[0]+';LEVELS');
const SHIFT=3,lay=m=>Math.floor(m/SHIFT)%2;
const wall=(c,L)=>c==='#'||(c==='a'&&L===0)||(c==='b'&&L===1);
const pars=[];
LEVELS.forEach((rows,i)=>{
  let s,e;rows.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='S')s=[x,y];if(c==='E')e=[x,y]}));
  const cell=(x,y)=>{const c=rows[y]?.[x];return c==='S'||c==='E'?'.':c};
  const seen=new Set([s+',0']);let q=[[s[0],s[1],0]],best=-1;
  while(q.length&&best<0){const nq=[];
    for(const [x,y,m] of q){
      if(x===e[0]&&y===e[1]){best=m;break}
      for(const [dx,dy] of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]){
        const nx=x+dx,ny=y+dy,c=cell(nx,ny);if(!c)continue;
        const m2=m+1;if(wall(c,lay(m))||wall(c,lay(m2)))continue;
        const k=nx+','+ny+','+(m2%6);if(seen.has(k))continue;seen.add(k);nq.push([nx,ny,m2])}}
    q=nq}
  // BFS depth = moves; recompute depth properly via level-order
  pars.push(best);
});
console.log(pars.map((p,i)=>`Level ${i+1}: ${p<0?'UNSOLVABLE':p+' moves'}${p>=0&&p<4?'  (too easy?)':''}`).join('\n'));
console.log('PARS='+JSON.stringify(pars));
