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
  .footer-nav-groups{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:36px;padding:30px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:26px}
  .footer-group{display:flex;flex-direction:column;gap:14px}
  .footer-group>strong{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--text);font-weight:700}
  .footer-group .footer-links{display:flex;flex-wrap:wrap;gap:10px 18px;margin:0}
  .footer-group .footer-links a{font-size:13px}
  .footer-bottom{display:flex;justify-content:space-between;gap:20px;padding-top:20px;color:var(--muted);font-size:12px}
  .acre-cookie-banner{position:fixed;z-index:120;left:18px;right:18px;bottom:18px;max-width:1180px;margin:0 auto;background:rgba(17,20,24,.98);border:1px solid rgba(224,160,110,.24);box-shadow:0 20px 60px rgba(0,0,0,.42);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);padding:18px 20px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:center;transform:translateY(16px);opacity:0;animation:cookieIn .35s var(--motion) forwards}
  .acre-cookie-copy{display:flex;flex-direction:column;gap:5px;min-width:0}
  .acre-cookie-copy strong{font-size:14px;color:var(--text)}
  .acre-cookie-copy p{margin:0;color:var(--muted);font-size:13px;line-height:1.55;max-width:880px}
  .acre-cookie-copy a{color:var(--accent2);text-decoration:none}
  .acre-cookie-actions{display:flex;align-items:center;gap:10px}
  .acre-cookie-actions .btn{min-width:110px}
  @keyframes cookieIn{to{opacity:1;transform:none}}
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
  @media(max-width:900px){.hero-logo{animation:none}.card,.passion-card,.tech-detail-card,.feature-item,.b2b-point,.step{transform:none!important}.navlinks a.is-active{color:var(--accent2)}.footer-nav-groups{grid-template-columns:1fr;gap:24px}.footer-bottom{flex-direction:column;gap:6px}.acre-cookie-banner{left:10px;right:10px;bottom:10px;grid-template-columns:1fr;gap:14px;padding:16px}.acre-cookie-actions{justify-content:flex-start}}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.motion-ready .reveal,.motion-ready .reveal.visible,.hero .eyebrow,.hero h1,.hero .lead,.hero .sublead,.hero .actions,.hero .techline,.page-hero .kicker,.page-hero h1,.page-hero> .wrap>p,.page-hero .actions{opacity:1!important;transform:none!important;filter:none!important;animation:none!important;transition:none!important}.hero-logo,.hero-logo:before{animation:none!important}.equipment-media img,.tech-gallery-card img{transform:none!important}.acre-progress{display:none!important}.acre-cookie-banner{animation:none!important;opacity:1!important;transform:none!important}}
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
    'technologia.html':'/technologia.html',
    'realizacje.html':'/realizacje.html'
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
      <a href="/technologia.html">Technologia</a>
      <a href="/realizacje.html">Realizacje</a>`;
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
    const year=new Date().getFullYear();
    footer.innerHTML=`
      <div class="footer-grid">
        <span>ACRE / digital fabrication</span>
        <span><a href="mailto:kontakt@acreworks.pl">kontakt@acreworks.pl</a> / InPost / cała Polska</span>
      </div>
      <div class="footer-nav-groups">
        <nav class="footer-group" aria-label="Usługi ACRE">
          <strong>Usługi</strong>
          <div class="footer-links">
            <a href="/druk-3d-na-zamowienie.html">Druk 3D</a>
            <a href="/grawerowanie-ciecie-laserowe.html">Laser</a>
            <a href="/projektowanie-cad.html">CAD</a>
            <a href="/dla-firm.html">Dla firm</a>
          </div>
        </nav>
        <nav class="footer-group" aria-label="Specjalizacje ACRE">
          <strong>Specjalizacje</strong>
          <div class="footer-links">
            <a href="/druk-3d-dla-hobbystow.html">Hobby / DIY</a>
            <a href="/akcesoria-astronomiczne.html">ACRE / ASTRO</a>
            <a href="/technologia.html">Technologia</a>
          </div>
        </nav>
        <nav class="footer-group" aria-label="Informacje ACRE">
          <strong>Informacje</strong>
          <div class="footer-links">
            <a href="/">Strona główna</a>
            <a href="/realizacje.html">Realizacje</a>
            <a href="/wycena.html">Wycena</a>
            <a href="/polityka-prywatnosci.html">Polityka prywatności</a>
            <a href="/polityka-prywatnosci.html#cookies">Pliki cookies</a>
          </div>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>© ${year} ACRE</span>
        <span>Druk 3D / laser / CAD / krótkie serie</span>
      </div>`;
    footer.querySelectorAll('a').forEach(link=>{
      const href=link.getAttribute('href')||'';
      if((currentFile==='index.html'&&href==='/')||href.endsWith('/'+currentFile))link.classList.add('is-active');
    });
  }

  const cookieKey='acre_cookie_notice_v1';
  let cookieNoticeSeen=false;
  try{cookieNoticeSeen=localStorage.getItem(cookieKey)==='1';}catch{}
  if(!cookieNoticeSeen&&!document.querySelector('.acre-cookie-banner')){
    const banner=document.createElement('div');
    banner.className='acre-cookie-banner';
    banner.setAttribute('role','region');
    banner.setAttribute('aria-label','Informacja o plikach cookies i prywatności');
    banner.innerHTML=`
      <div class="acre-cookie-copy">
        <strong>Cookies i prywatność</strong>
        <p>ACRE nie korzysta obecnie z cookies analitycznych ani reklamowych. Używamy wyłącznie technicznego zapisu preferencji, aby zapamiętać zamknięcie tego komunikatu. <a href="/polityka-prywatnosci.html#cookies">Dowiedz się więcej</a>.</p>
      </div>
      <div class="acre-cookie-actions">
        <button class="btn primary" type="button" data-cookie-dismiss>Rozumiem</button>
      </div>`;
    document.body.appendChild(banner);
    banner.querySelector('[data-cookie-dismiss]')?.addEventListener('click',()=>{
      try{localStorage.setItem(cookieKey,'1');}catch{}
      banner.remove();
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
