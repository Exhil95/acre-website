(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css=`
  :root{--motion:cubic-bezier(.2,.75,.25,1)}
  .site-header{transition:background .35s ease,border-color .35s ease,box-shadow .35s ease,transform .35s ease}
  .site-header.is-scrolled{background:rgba(11,13,15,.94);border-bottom-color:rgba(224,160,110,.16);box-shadow:0 12px 42px rgba(0,0,0,.22)}
  .navlinks{align-items:center}
  .navlinks a{position:relative;transition:color .2s ease;white-space:nowrap}
  .navlinks a:after{content:"";position:absolute;left:0;right:100%;bottom:-8px;height:1px;background:var(--accent2);transition:right .28s var(--motion)}
  .navlinks a:hover:after,.navlinks a.is-active:after{right:0}
  .navlinks a.is-active{color:var(--text)}
  .footer-links a.is-active{color:var(--text)}
  .acre-progress{position:fixed;z-index:100;left:0;top:0;width:100%;height:2px;pointer-events:none;background:transparent}
  .acre-progress span{display:block;width:100%;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));transform-origin:0 50%;transform:scaleX(0)}
  .motion-ready .reveal{opacity:0;transform:translate3d(0,26px,0);filter:blur(3px);transition:opacity .75s var(--motion),transform .75s var(--motion),filter .75s var(--motion);transition-delay:var(--reveal-delay,0ms)}
  .motion-ready .reveal.visible{opacity:1;transform:none;filter:none}
  .hero .eyebrow,.hero h1,.hero .lead,.hero .sublead,.hero .actions,.hero .techline,.page-hero .kicker,.page-hero h1,.page-hero> .wrap>p,.page-hero .actions{opacity:0;transform:translate3d(0,20px,0);animation:acreIntro .82s var(--motion) forwards}
  .hero h1,.page-hero h1{animation-delay:.07s}.hero .lead,.page-hero> .wrap>p{animation-delay:.14s}.hero .sublead{animation-delay:.20s}.hero .actions,.page-hero .actions{animation-delay:.27s}.hero .techline{animation-delay:.36s}
  @keyframes acreIntro{to{opacity:1;transform:none}}
  .hero-logo{position:relative;isolation:isolate;animation:acreFloat 7s ease-in-out infinite}
  .hero-logo:before{content:"";position:absolute;inset:13%;border-radius:50%;background:radial-gradient(circle,rgba(196,122,69,.12),transparent 68%);filter:blur(18px);z-index:-1;animation:acrePulse 4.8s ease-in-out infinite}
  @keyframes acreFloat{0%,100%{transform:translateY(0) rotate(-.3deg)}50%{transform:translateY(-8px) rotate(.4deg)}}
  @keyframes acrePulse{0%,100%{opacity:.35;transform:scale(.96)}50%{opacity:.7;transform:scale(1.04)}}
  .card,.passion-card,.tech-detail-card,.feature-item,.b2b-point,.step,.tech-gallery-card,.equipment-media{position:relative;transition:border-color .32s ease,box-shadow .32s ease,background .32s ease,transform .28s var(--motion)}
  .card:hover,.passion-card:hover,.tech-detail-card:hover,.feature-item:hover,.b2b-point:hover,.step:hover{border-color:rgba(224,160,110,.22);box-shadow:0 14px 36px rgba(0,0,0,.14);transform:translateY(-2px)}
  .chip{transition:border-color .25s ease,color .25s ease,transform .25s ease}
  .card:hover .chip,.passion-card:hover .chip{border-color:rgba(224,160,110,.26);color:#d1d5da;transform:translateY(-1px)}
  .equipment-media,.tech-gallery-card{overflow:hidden}
  .equipment-media img,.tech-gallery-card img{transform:translate3d(0,var(--parallax,0px),0) scale(1.035);transition:transform .5s var(--motion),filter .4s ease}
  .equipment-media:hover img,.tech-gallery-card:hover img{transform:translate3d(0,var(--parallax,0px),0) scale(1.055);filter:brightness(1.035)}
  .tech-gallery-card figcaption{transition:transform .35s var(--motion)}
  .tech-gallery-card:hover figcaption{transform:translateY(-3px)}
  .btn{position:relative;overflow:hidden;isolation:isolate}
  .btn:after{content:"";position:absolute;z-index:-1;top:-120%;left:-35%;width:35%;height:340%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent);transform:rotate(18deg);transition:left .55s var(--motion)}
  .btn:hover:after{left:120%}
  .text-link span{display:inline-block}
  .faq details{transition:border-color .3s ease,background .3s ease,transform .3s ease}
  .faq details:hover{border-color:rgba(224,160,110,.22)}
  .faq details[open]{border-color:rgba(224,160,110,.27);background:#13171b}
  .faq details[open] p{animation:faqIn .35s var(--motion)}
  @keyframes faqIn{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}
  @media(min-width:901px) and (max-width:1120px){.navlinks{gap:16px}.navlinks a{font-size:13px}.brand{gap:9px}.brand .logo-frame{width:42px}.nav-actions{gap:8px}.desktop-cta{padding:0 16px}}
  @media(max-width:900px){.hero-logo{animation:none}.card,.passion-card,.tech-detail-card,.feature-item,.b2b-point,.step{transform:none!important}.navlinks a.is-active{color:var(--accent2)}}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.motion-ready .reveal,.motion-ready .reveal.visible,.hero .eyebrow,.hero h1,.hero .lead,.hero .sublead,.hero .actions,.hero .techline,.page-hero .kicker,.page-hero h1,.page-hero> .wrap>p,.page-hero .actions{opacity:1!important;transform:none!important;filter:none!important;animation:none!important;transition:none!important}.hero-logo,.hero-logo:before{animation:none!important}.equipment-media img,.tech-gallery-card img{transform:none!important}.acre-progress{display:none!important}}
  `;
  const style=document.createElement('style');style.id='acre-motion';style.textContent=css;document.head.appendChild(style);

  const main=document.querySelector('main');
  if(main){
    if(!main.id)main.id='main-content';
    if(!document.querySelector('.skip-link')){
      const skip=document.createElement('a');
      skip.className='skip-link';
      skip.href=`#${main.id}`;
      skip.textContent='Przejdź do treści';
      document.body.prepend(skip);
    }
  }

  if(!reduced)document.body.classList.add('motion-ready');

  const currentFile=location.pathname.split('/').filter(Boolean).pop()||'index.html';
  const activeMap={
    'druk-3d-na-zamowienie.html':'/druk-3d-na-zamowienie.html',
    'druk-3d-dla-hobbystow.html':'/druk-3d-na-zamowienie.html',
    'grawerowanie-ciecie-laserowe.html':'/grawerowanie-ciecie-laserowe.html',
    'projektowanie-cad.html':'/projektowanie-cad.html',
    'dla-firm.html':'/dla-firm.html',
    'akcesoria-astronomiczne.html':'/akcesoria-astronomiczne.html',
    'technologia.html':'/technologia.html'
  };
  const activeHref=activeMap[currentFile]||'';

  const navLinks=document.querySelector('.navlinks');
  if(navLinks){
    navLinks.innerHTML=`
      <a href="/druk-3d-na-zamowienie.html">Druk 3D</a>
      <a href="/grawerowanie-ciecie-laserowe.html">Laser</a>
      <a href="/projektowanie-cad.html">CAD</a>
      <a href="/dla-firm.html">Dla firm</a>
      <a href="/akcesoria-astronomiczne.html">ACRE / ASTRO</a>
      <a href="/technologia.html">Technologia</a>`;
    navLinks.querySelectorAll('a').forEach(link=>{
      if(activeHref&&link.getAttribute('href')===activeHref){
        link.classList.add('is-active');
        link.setAttribute('aria-current','page');
      }
    });
  }

  const brand=document.querySelector('.brand');
  if(brand)brand.setAttribute('href','/');

  const navActions=document.querySelector('.nav-actions');
  let menuButton=document.querySelector('.menu-toggle');
  if(navLinks&&navActions&&!menuButton){
    menuButton=document.createElement('button');
    menuButton.className='menu-toggle';
    menuButton.type='button';
    menuButton.setAttribute('aria-label','Otwórz menu');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.innerHTML='<span></span><span></span>';
    navActions.appendChild(menuButton);
  }

  if(menuButton&&navLinks){
    menuButton.addEventListener('click',()=>{
      const open=navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open',open);
      menuButton.setAttribute('aria-expanded',String(open));
      menuButton.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');
    });
    navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.setAttribute('aria-label','Otwórz menu');
    }));
  }

  const footer=document.querySelector('footer .wrap');
  if(footer){
    let footerLinks=footer.querySelector('.footer-links');
    if(!footerLinks){
      footerLinks=document.createElement('nav');
      footerLinks.className='footer-links';
      footerLinks.setAttribute('aria-label','Nawigacja stopki');
      footer.appendChild(footerLinks);
    }
    footerLinks.innerHTML=`
      <a href="/">Strona główna</a>
      <a href="/druk-3d-na-zamowienie.html">Druk 3D</a>
      <a href="/grawerowanie-ciecie-laserowe.html">Laser</a>
      <a href="/projektowanie-cad.html">CAD</a>
      <a href="/dla-firm.html">Dla firm</a>
      <a href="/druk-3d-dla-hobbystow.html">Hobby / DIY</a>
      <a href="/akcesoria-astronomiczne.html">ACRE / ASTRO</a>
      <a href="/technologia.html">Technologia</a>
      <a href="/wycena.html">Wycena</a>
      <a href="/polityka-prywatnosci.html">Prywatność</a>`;
    footerLinks.querySelectorAll('a').forEach(link=>{
      const href=link.getAttribute('href');
      if((currentFile==='index.html'&&href==='/')||href.endsWith('/'+currentFile))link.classList.add('is-active');
    });
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
  const progress=document.createElement('div');progress.className='acre-progress';progress.setAttribute('aria-hidden','true');progress.innerHTML='<span></span>';document.body.appendChild(progress);
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
          img.style.setProperty('--parallax',`${Math.max(-10,Math.min(10,-delta*15)).toFixed(1)}px`);
        }
      });
    }
    scrollTick=false;
  };
  window.addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(updateScroll);}},{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});
  updateScroll();
})();
