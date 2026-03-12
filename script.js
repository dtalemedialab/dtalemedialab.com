/* ═══ STAR CANVAS (배경) ═══ */
const CV=document.getElementById('canvas'),CX=CV.getContext('2d');
let W,H,ST=[],SH=[];
function rsz(){W=CV.width=innerWidth;H=CV.height=innerHeight;mkS();}
rsz();window.addEventListener('resize',rsz);
function mkS(){
  ST=[];
  const n=Math.floor(W*H/800); // 별 밀도 증가 (1300→800)
  for(let i=0;i<n;i++){
    const size=Math.random();
    ST.push({
      x:Math.random()*W,y:Math.random()*H,
      r:size<.7 ? Math.random()*.6+.1 : Math.random()*1.4+.5, // 크기 분포
      a:Math.random()*.75+.12, // 밝기 강화
      sp:Math.random()*.007+.001, // 반짝임 속도 다양화
      ph:Math.random()*Math.PI*2,
      bright:size>.85 // 특별히 밝은 별
    });
  }
}
// 별똥별 생성 - 더 자주, 다양한 방향
function spawnS(){
  // 화면 상단/좌측 랜덤 출발
  const fromTop=Math.random()>.4;
  const x=fromTop ? Math.random()*W : -20;
  const y=fromTop ? Math.random()*H*.3 : Math.random()*H*.6;
  const angle=fromTop ? (Math.PI/6+Math.random()*Math.PI/8) : (Math.PI/8+Math.random()*Math.PI/10);
  const speed=Math.random()*4+5;
  SH.push({
    x,y,
    dx:Math.cos(angle)*speed,
    dy:Math.sin(angle)*speed,
    len:Math.random()*110+60,
    a:Math.random()*.3+.3, // 은은한 밝기
    fade:Math.random()*.006+.007,
    w:Math.random()*.5+.6
  });
}
setInterval(spawnS,600); // 1200ms→600ms (2배 빈도)
[100,300,600,900,1300,1800,2400,3000,3700].forEach(t=>setTimeout(spawnS,t)); // 초기 더 많이
let tk=0;
function draw(){
  CX.clearRect(0,0,W,H);tk++;
  for(const s of ST){
    // 밝은 별은 더 강하게 반짝
    const base=s.bright ? s.a*1.4 : s.a;
    const a=Math.min(.95, base*(0.4+0.6*Math.sin(tk*s.sp+s.ph)));
    CX.beginPath();CX.arc(s.x,s.y,s.r,0,Math.PI*2);
    CX.fillStyle=`rgba(245,242,232,${a})`;CX.fill();
    // 특별히 밝은 별에 광채 추가
    if(s.bright && a>.5){
      const glow=CX.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*5);
      glow.addColorStop(0,`rgba(255,250,235,${a*.35})`);
      glow.addColorStop(1,'rgba(0,0,0,0)');
      CX.beginPath();CX.arc(s.x,s.y,s.r*5,0,Math.PI*2);
      CX.fillStyle=glow;CX.fill();
    }
  }
  SH=SH.filter(s=>s.a>0);
  for(const s of SH){
    const d=Math.hypot(s.dx,s.dy),ex=s.x-s.dx/d*s.len,ey=s.y-s.dy/d*s.len;
    const g=CX.createLinearGradient(s.x,s.y,ex,ey);
    g.addColorStop(0,`rgba(255,252,240,${s.a})`);
    g.addColorStop(.25,`rgba(220,205,175,${s.a*.5})`);
    g.addColorStop(1,'rgba(0,0,0,0)');
    CX.beginPath();CX.moveTo(s.x,s.y);CX.lineTo(ex,ey);
    CX.strokeStyle=g;CX.lineWidth=s.w;CX.stroke();
    s.x+=s.dx;s.y+=s.dy;s.a-=s.fade;
  }
  requestAnimationFrame(draw);
}
draw();

/* ═══ INTRO ═══ */
const introEl = document.getElementById('intro');
const lettersEl = document.getElementById('intro-letters');
const siteEl = document.getElementById('site');

// 인트로 별 캔버스 (더 밀도 높게)
const IC = document.getElementById('intro-canvas');
const IX = IC.getContext('2d');
let IW,IH,IST=[],ISH=[];
function irsz(){IW=IC.width=innerWidth;IH=IC.height=innerHeight;imkS();}
irsz();window.addEventListener('resize',irsz);
function imkS(){
  IST=[];
  const n=Math.floor(IW*IH/700); // 별 밀도 더 높게
  for(let i=0;i<n;i++){
    const sz=Math.random();
    IST.push({
      x:Math.random()*IW,y:Math.random()*IH,
      r:sz<.65 ? Math.random()*.65+.1 : Math.random()*1.6+.6,
      a:Math.random()*.8+.15,
      sp:Math.random()*.008+.001,
      ph:Math.random()*Math.PI*2,
      bright:sz>.82
    });
  }
}
// 인트로 별똥별
function ispawnS(){
  const fromTop=Math.random()>.3;
  const x=fromTop?Math.random()*IW:-20;
  const y=fromTop?Math.random()*IH*.25:Math.random()*IH*.5;
  const angle=Math.PI/7+Math.random()*Math.PI/9;
  const speed=Math.random()*4.5+5.5;
  ISH.push({x,y,dx:Math.cos(angle)*speed,dy:Math.sin(angle)*speed,len:Math.random()*120+70,a:Math.random()*.28+.28,fade:Math.random()*.006+.007,w:Math.random()*.6+.7});
}
setInterval(ispawnS,500);
[50,200,450,750,1100,1500,2000,2600].forEach(t=>setTimeout(ispawnS,t));

let itk=0;
function idraw(){
  IX.clearRect(0,0,IW,IH);itk++;
  // ── 배경 별 ──
  for(const s of IST){
    const base=s.bright?s.a*1.5:s.a;
    const a=Math.min(.98,base*(0.4+0.6*Math.sin(itk*s.sp+s.ph)));
    IX.beginPath();IX.arc(s.x,s.y,s.r,0,Math.PI*2);
    IX.fillStyle=`rgba(245,242,232,${a})`;IX.fill();
    if(s.bright&&a>.5){
      const g=IX.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*6);
      g.addColorStop(0,`rgba(255,250,235,${a*.4})`);g.addColorStop(1,'rgba(0,0,0,0)');
      IX.beginPath();IX.arc(s.x,s.y,s.r*6,0,Math.PI*2);IX.fillStyle=g;IX.fill();
    }
  }
  // ── 일반 별똥별 ──
  ISH=ISH.filter(s=>s.a>0);
  for(const s of ISH){
    const d=Math.hypot(s.dx,s.dy),ex=s.x-s.dx/d*s.len,ey=s.y-s.dy/d*s.len;
    const g=IX.createLinearGradient(s.x,s.y,ex,ey);
    g.addColorStop(0,`rgba(255,252,240,${s.a})`);g.addColorStop(.3,`rgba(215,200,170,${s.a*.5})`);g.addColorStop(1,'rgba(0,0,0,0)');
    IX.beginPath();IX.moveTo(s.x,s.y);IX.lineTo(ex,ey);IX.strokeStyle=g;IX.lineWidth=s.w;IX.stroke();
    s.x+=s.dx;s.y+=s.dy;s.a-=s.fade;
  }
  if(!introEl.classList.contains('hide')) requestAnimationFrame(idraw);
}
idraw();

/* ── 인트로 글자: 철자 개별 분리, 화면 안에서 흩어진 채 시작 → 천천히 중앙 집합 → 유지 ── */
// d는 소문자 유지, 나머지는 대문자
const words2 = [
  {chars:["d","'"],gold:[true,true],lower:[true,false]},
  {chars:["T","A","L","E"],gold:[false,false,false,false],lower:[false,false,false,false]},
  {chars:["M","E","D","I","A"],gold:[false,false,false,false,false],lower:[false,false,false,false,false]},
  {chars:["L","A","B"],gold:[false,false,false],lower:[false,false,false]}
];

lettersEl.innerHTML='';
const allSpans=[];

// 단어 그룹 div 생성
words2.forEach((word,wi)=>{
  const wordDiv=document.createElement('div');
  wordDiv.style.cssText='display:flex;align-items:baseline;gap:clamp(1px,0.3vw,5px);';
  word.chars.forEach((ch,ci)=>{
    const span=document.createElement('span');
    span.className='il'+(word.gold[ci]?' apos':'');
    // d만 소문자, 나머지는 대문자
    span.textContent=word.lower[ci] ? ch : ch.toUpperCase();
    if(!word.lower[ci]) span.style.textTransform='uppercase';
    // 철자별 부드러운 drift 파라미터
    const gi=allSpans.length;
    const signs=[[1,-1],[-1,1],[1,1],[-1,-1]];
    const sx=((gi%2===0)?1:-1);
    const sy=((gi%3===0)?-1:1);
    span.style.setProperty('--dy',(sy*(3+gi%4))+'px');
    span.style.setProperty('--dx',(sx*(2+gi%3))+'px');
    span.style.setProperty('--dy2',(sy*-1*(2+gi%3))+'px');
    span.style.setProperty('--dx2',(sx*-1*(1+gi%3))+'px');
    // z축: 홀짝 교번으로 scale 방향 다르게 → 입체감
    const scaleUp  = gi%2===0 ? 1.018 + (gi%3)*0.006 : 0.982 - (gi%3)*0.005;
    const scaleDown= gi%2===0 ? 0.978 - (gi%3)*0.004 : 1.022 + (gi%3)*0.004;
    span.style.setProperty('--sz', scaleUp);
    span.style.setProperty('--sz2', scaleDown);
    span.style.setProperty('--dur',(7+gi%5)+'s');
    span.style.setProperty('--ds',(gi*0.4)+'s');
    wordDiv.appendChild(span);
    allSpans.push(span);
  });
  lettersEl.appendChild(wordDiv);
  // 단어 사이 간격 spacer
  if(wi<words2.length-1){
    const sp=document.createElement('div');
    sp.style.cssText='width:clamp(4px,0.35em,10px);flex-shrink:0;';
    lettersEl.appendChild(sp);
  }
});

// ── 등장 애니메이션: 화면 안에서 흩어진 위치 → 중앙 집합 ──
// 각 철자를 화면 안의 랜덤 위치에 흩어놓고, transition으로 제자리로 모음
const vw=window.innerWidth, vh=window.innerHeight;
// 흩어진 위치: 화면 내부 랜덤 (넓게 분산, 화면 밖 NO)
const scatterOffsets=[
  {x:-28,y:-18},{x:22,y:-24},{x:-40,y:10},{x:18,y:20},
  {x:-20,y:-30},{x:30,y:-14},{x:-35,y:22},{x:25,y:28},
  {x:-15,y:-20},{x:35,y:10},{x:-25,y:25},{x:20,y:-18},
  {x:-30,y:15},{x:28,y:-22}
];

// 1) 초기: 흩어진 위치, 완전 투명
const spread = Math.min(window.innerWidth, window.innerHeight) * 0.22;
allSpans.forEach((span,i)=>{
  const off=scatterOffsets[i%scatterOffsets.length];
  span.style.transition='none';
  span.style.opacity='0';
  span.style.transform=`translate(${off.x/40*spread}px,${off.y/40*spread}px)`;
});

// 2) 철자마다 순차적으로 — 나타나면서 동시에 중앙으로 흘러옴 (끊김 없이 1개 모션)
requestAnimationFrame(()=>{
  requestAnimationFrame(()=>{
    allSpans.forEach((span,i)=>{
      setTimeout(()=>{
        // 페이드인 + 중앙 이동을 하나의 transition으로
        span.style.transition=`opacity 2.2s cubic-bezier(.4,0,.2,1), transform 2.8s cubic-bezier(.16,1,.3,1)`;
        span.style.opacity='1';
        span.style.transform='translate(0,0)';
      }, 200 + i*90); // 철자마다 90ms 간격으로 순차 등장
    });

    // 3) 마지막 철자 transition 완료 즉시 drift + 부제 표시
    const lastStart = 200 + (allSpans.length-1)*90;
    const gatherDone = lastStart + 2800;

    // 부제("방송 콘텐츠 제작사")는 집합 완료보다 살짝 먼저 — 마지막 글자들이 모이는 도중 자연스럽게
    setTimeout(()=>{
      document.getElementById('intro-sub').classList.add('show');
    }, lastStart + 1800);

    setTimeout(()=>{
      document.querySelector('.intro-hint').classList.add('show');
      allSpans.forEach(span=>{
        span.style.transition='none';
        span.classList.add('floating');
      });
    }, gatherDone);
  });
});

// 클릭/터치 시 메인 진입
function enterSite(){
  introEl.classList.add('hide');
  siteEl.classList.add('show');
  document.body.style.overflow = '';
}
introEl.addEventListener('click', enterSite);
introEl.addEventListener('touchend', enterSite);
document.body.style.overflow = 'hidden';

/* ═══ CURSOR ═══ */
const DOT=document.getElementById('cd'),RING=document.getElementById('cr'),GLOW=document.getElementById('cg');
let mx=0,my=0,rx=0,ry=0,gx=0,gy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function ca(){
  DOT.style.left=mx+'px';DOT.style.top=my+'px';
  rx+=(mx-rx)*.13;ry+=(my-ry)*.13;RING.style.left=rx+'px';RING.style.top=ry+'px';
  gx+=(mx-gx)*.055;gy+=(my-gy)*.055;GLOW.style.left=gx+'px';GLOW.style.top=gy+'px';
  requestAnimationFrame(ca);
})();

/* ═══ TICKER ═══ */
const shows=['사장님 귀는 당나귀귀','살림하는 남자들','슈퍼맨이 돌아왔다','백년손님 자기야','조립식가족','언제나 칸타레','걸어서 환장속으로','리얼중계 시티헌터','나는펫','기막힌 외출','헤이헤이헤이 시즌2','크레이지 리치 코리안'];
const ti=document.getElementById('ticker-inner');
const th=shows.map(s=>`<span class="ticker-item"><span>✦</span>${s}</span>`).join('');
ti.innerHTML=th+th;

/* ═══ REVEAL ═══ */
const RO=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('on');});},{threshold:.07});
document.querySelectorAll('.rv').forEach(el=>RO.observe(el));
