(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const css=`
  :root{--motion:cubic-bezier(.2,.75,.25,1)}
  .site-header{transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease}
  .site-header.is-scrolled{background:rgba(11,13,15,.94);border-bottom-color:rgba(224,160,110,.16);box-shadow:0 12px 42px rgba(0,0,0,.22)}
  .navlinks a{position:relative;transition:color .2s ease}
  .navlinks a:after{content:"";position:absolute;left:0;right:100%;bottom:-8px;height:1px;background:var(--accent2);transition:right .28s var(--motion)}
  .navlinks a:hover:after{right:0}
  .acre-progress{position:fixed;z-index:100;left:0;top:0;width:100%;height:2px;pointer-events:none;background:transparent}
  .acre-progress span{display:block;width:100%;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));transform-origin:0 50%;transform:scaleX(0);box-shadow:0 0 16px rgba(224,160,110,.35)}
  .reveal{opacity:0;transform:translate3d(0,26px,0);filter:blur(3px);transition:opacity .75s var(--motion),transform .75s var(--motion),filter .75s var(--motion);transition-delay:var(--reveal-delay,0ms)}
  .reveal.visible{opacity:1;transform:none;filter:none}
  .hero .eyebrow,.hero h1,.hero .lead,.hero .sublead,.hero .actions,.hero .techline,.page-hero .kicker,.page-hero h1,.page-hero> .wrap>p,.page-hero .actions{opacity:0;transform:translate3d(0,20px,0);animation:acreIntro .82s var(--motion) forwards}
  .hero h1,.page-hero h1{animation-delay:.07s}.hero .lead,.page-hero> .wrap>p{animation-delay:.14s}.hero .sublead{animation-delay:.20s}.hero .actions,.page-hero .actions{animation-delay:.27s}.hero .techline{animation-delay:.36s}
  @keyframes acreIntro{to{opacity:1;transform:none}}
  .hero-logo{position:relative;isolation:isolate;animation:acreFloat 7s ease-in-out infinite}
  .hero-logo:before{content:"";position:absolute;inset:13%;border-radius:50%;background:radial-gradient(circle,rgba(196,122,69,.16),transparent 68%);filter:blur(18px);z-index:-1;animation:acrePulse 4.8s ease-in-out infinite}
  @keyframes acreFloat{0%,100%{transform:translateY(0) rotate(-.3deg)}50%{transform:translateY(-10px) rotate(.5deg)}}
  @keyframes acrePulse{0%,100%{opacity:.45;transform:scale(.94)}50%{opacity:.9;transform:scale(1.06)}}
  .card,.passion-card,.tech-detail-card,.feature-item,.b2b-point,.step,.tech-gallery-card,.equipment-media{position:relative;transition:border-color .32s ease,box-shadow .32s ease,background .32s ease,transform .22s ease;will-change:transform}
  .card:before,.passion-card:after,.tech-detail-card:before,.feature-item:before,.b2b-point:before,.step:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(224,160,110,.09),transparent 42%);transition:opacity .28s ease}
  .card:hover:before,.passion-card:hover:after,.tech-detail-card:hover:before,.feature-item:hover:before,.b2b-point:hover:before,.step:hover:before{opacity:1}
  .card:hover,.passion-card:hover,.tech-detail-card:hover,.feature-item:hover,.b2b-point:hover,.step:hover{border-color:rgba(224,160,110,.24);box-shadow:0 18px 50px rgba(0,0,0,.16)}
  .chip{transition:border-color .25s ease,color .25s ease,transform .25s ease}
  .card:hover .chip,.passion-card:hover .chip{border-color:rgba(224,160,110,.3);color:#d1d5da;transform:translateY(-1px)}
  .equipment-media,.tech-gallery-card{overflow:hidden}
  .equipment-media img,.tech-gallery-card img{transform:translate3d(0,var(--parallax,0px),0) scale(1.035);transition:transform .5s var(--motion),filter .4s ease}
  .equipment-media:hover img,.tech-gallery-card:hover img{transform:translate3d(0,var(--parallax,0px),0) scale(1.07);filter:brightness(1.06)}
  .tech-gallery-card figcaption{transition:transform .35s var(--motion)}
  .tech-gallery-card:hover figcaption{transform:translateY(-4px)}
  .btn{position:relative;overflow:hidden;isolation:isolate}
  .btn:after{content:"";position:absolute;z-index:-1;top:-120%;left:-35%;width:35%;height:340%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transform:rotate(18deg);transition:left .55s var(--motion)}
  .btn:hover:after{left:120%}
  .text-link span{display:inline-block}
  .faq details{transition:border-color .3s ease,background .3s ease,transform .3s ease}
  .faq details:hover{border-color:rgba(224,160,110,.22)}
  .faq details[open]{border-color:rgba(224,160,110,.27);background:#13171b}
  .faq details[open] p{animation:faqIn .35s var(--motion)}
  @keyframes faqIn{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}
  .acre-cursor-glow{position:fixed;z-index:0;width:360px;height:360px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(196,122,69,.055),transparent 67%);transform:translate3d(-50%,-50%,0);opacity:0;transition:opacity .35s ease;mix-blend-mode:screen}
  body:hover .acre-cursor-glow{opacity:1}
  main,header,footer{position:relative;z-index:1}
  @media(max-width:900px){.acre-cursor-glow{display:none}.hero-logo{animation:none}.card,.passion-card,.tech-detail-card,.feature-item,.b2b-point,.step{transform:none!important}}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.reveal,.reveal.visible,.hero .eyebrow,.hero h1,.hero .lead,.hero .sublead,.hero .actions,.hero .techline,.page-hero .kicker,.page-hero h1,.page-hero> .wrap>p,.page-hero .actions{opacity:1!important;transform:none!important;filter:none!important;animation:none!important;transition:none!important}.hero-logo,.hero-logo:before{animation:none!important}.equipment-media img,.tech-gallery-card img{transform:none!important}.acre-cursor-glow,.acre-progress{display:none!important}}
  `;
  const style=document.createElement('style');style.id='acre-motion';style.textContent=css;document.head.appendChild(style);

  const menuButton=document.querySelector('.menu-toggle');
  const navLinks=document.querySelector('.navlinks');
  if(menuButton&&navLinks){
    menuButton.addEventListener('click',()=>{
      const open=navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open',open);
      menuButton.setAttribute('aria-expanded',String(open));
    });
    navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      navLinks.classList.remove('open');document.body.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');
    }));
  }

  const reveals=[...document.querySelectorAll('.reveal')];
  reveals.forEach((el,i)=>el.style.setProperty('--reveal-delay',`${Math.min((i%4)*70,210)}ms`));
  if(reduced){reveals.forEach(el=>el.classList.add('visible'));}
  else{
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
    },{threshold:.10,rootMargin:'0px 0px -7% 0px'});
    reveals.forEach(el=>observer.observe(el));
  }

  const header=document.querySelector('.site-header');
  const progress=document.createElement('div');progress.className='acre-progress';progress.innerHTML='<span></span>';document.body.appendChild(progress);
  const progressBar=progress.firstElementChild;
  let scrollTick=false;
  const parallaxImages=[...document.querySelectorAll('.equipment-media img,.tech-gallery-card img')];
  const updateScroll=()=>{
    const y=window.scrollY||0;
    header?.classList.toggle('is-scrolled',y>18);
    const max=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);
    progressBar.style.transform=`scaleX(${Math.min(y/max,1)})`;
    if(!reduced&&window.innerWidth>700){
      const center=window.innerHeight/2;
      parallaxImages.forEach(img=>{
        const r=img.getBoundingClientRect();
        if(r.bottom>0&&r.top<window.innerHeight){
          const delta=(r.top+r.height/2-center)/window.innerHeight;
          img.style.setProperty('--parallax',`${Math.max(-12,Math.min(12,-delta*18)).toFixed(1)}px`);
        }
      });
    }
    scrollTick=false;
  };
  window.addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(updateScroll);}},{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});updateScroll();

  if(finePointer&&!reduced){
    const glow=document.createElement('div');glow.className='acre-cursor-glow';document.body.prepend(glow);
    let gx=innerWidth/2,gy=innerHeight/2,tx=gx,ty=gy,glowRAF=0;
    const animateGlow=()=>{gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;glow.style.left=`${gx}px`;glow.style.top=`${gy}px`;glowRAF=requestAnimationFrame(animateGlow)};
    window.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});animateGlow();

    const interactive=document.querySelectorAll('.card,.passion-card,.tech-detail-card,.feature-item,.b2b-point,.step');
    interactive.forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        const px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
        el.style.setProperty('--mx',`${(px*100).toFixed(1)}%`);el.style.setProperty('--my',`${(py*100).toFixed(1)}%`);
        const rx=(.5-py)*1.2,ry=(px-.5)*1.5;
        el.style.transform=`perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
      });
      el.addEventListener('pointerleave',()=>{el.style.transform='';});
    });
  }
})();