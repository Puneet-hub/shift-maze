// Level generator + checker. Random mazes -> BFS solver -> keep levels where the shift really matters.
// '#' wall | 'a' wall in layout A | 'b' wall in layout B | S start | E exit
const fs=require('fs');
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const lay=m=>Math.floor(m/3)%2;
const wall=(c,L)=>c==='#'||(c==='a'&&L===0)||(c==='b'&&L===1);
function solve(rows,mode){ // mode: 'game' | 'open' (a,b ignored, no shift) | 'static' (a,b always walls)
  let s,e;rows.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='S')s=[x,y];if(c==='E')e=[x,y]}));
  const cell=(x,y)=>{const c=rows[y]?.[x];return c==='S'||c==='E'?'.':c};
  const blocked=(c,m)=>mode==='open'?c==='#':mode==='static'?c!=='.':(wall(c,lay(m))||wall(c,lay(m+1)));
  const seen=new Set([s+',0']);let q=[[s[0],s[1],0]];
  while(q.length){const nq=[];
    for(const[x,y,m]of q){if(x===e[0]&&y===e[1])return m;
      for(const[dx,dy]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]]){
        const nx=x+dx,ny=y+dy,c=cell(nx,ny);if(!c)continue;
        if(mode==='game'?(wall(c,lay(m))||wall(c,lay(m+1))):blocked(c,m))continue;
        const k=nx+','+ny+','+((m+1)%6);if(seen.has(k))continue;seen.add(k);nq.push([nx,ny,m+1])}}
    q=nq}
  return -1}
module.exports={solve};
if(require.main===module){
  // size, par range, min (par - open par)
  const bands=[[7,7,6,8,2],[7,7,9,11,3],[9,9,11,13,4],[9,9,13,16,5],[9,9,16,19,6],[11,11,19,23,6],[11,11,23,28,6],[11,11,28,45,6]];
  const R=rng(2026),out=[];
  for(const[w,h,lo,hi,gap]of bands){
    for(let tries=0;tries<60000;tries++){const g2=Math.max(1,gap-Math.floor(tries/15000));
      const rows=[];
      for(let y=0;y<h;y++){let r='';for(let x=0;x<w;x++){
        if(x===0||y===0||x===w-1||y===h-1)r+='#';
        else if(x===1&&y===1)r+='S';else if(x===w-2&&y===h-2)r+='E';
        else{const p=R();r+=p<.2?'#':p<.34?'a':p<.48?'b':'.'}}rows.push(r)}
      const p=solve(rows,'game');if(p<lo||p>hi)continue;
      const o=solve(rows,'open');if(p-o<g2)continue;
      const st=solve(rows,'static');if(st!==-1&&st<=p)continue;
      out.push(rows);console.log(`L${out.length} ${w}x${h} par ${p} (open ${o}, static ${st})`);break}}
  fs.writeFileSync(__dirname+'/levels.json',JSON.stringify(out));
}
