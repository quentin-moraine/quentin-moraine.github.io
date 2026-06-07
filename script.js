/* ═══════════════════════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════════════════════ */
const loader    = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');

let pct = 0;
const tick = setInterval(() => {
    pct = Math.min(pct + Math.random() * 14 + 4, 100);
    if (loaderBar) loaderBar.style.width = pct + '%';
    if (pct >= 100) {
        clearInterval(tick);
        setTimeout(() => {
            loader?.classList.add('out');
            document.body.style.overflow = '';
            initReveal();
        }, 350);
    }
}, 70);

document.body.style.overflow = 'hidden';

/* ═══════════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════════ */
const ring = document.getElementById('cursorRing');
const dot  = document.getElementById('cursorDot');
let   mx = window.innerWidth / 2,  my = window.innerHeight / 2;
let   rx = mx, ry = my;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
});

;(function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animRing);
})();

document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

function addHover(sel) {
    document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}
addHover('a, button, .project-row, .proj-next, .stat-card, .zoom-btn, .hamburger');

/* ═══════════════════════════════════════════════════════════════════
   MAGNETIC BUTTONS
═══════════════════════════════════════════════════════════════════ */
document.querySelectorAll('.mag-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width  / 2);
        const dy = e.clientY - (r.top  + r.height / 2);
        btn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ═══════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR (injectée)
═══════════════════════════════════════════════════════════════════ */
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);

/* ═══════════════════════════════════════════════════════════════════
   NAV SCROLL STATE + PROGRESS + PARALLAXE
═══════════════════════════════════════════════════════════════════ */
const nav   = document.getElementById('nav');
const orbs  = document.querySelectorAll('.hero-orb, .pg-orb, .cta-orb, .proj-hero-orb, .contact-orb');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ticking = false;
function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        const y = window.scrollY;
        // nav island
        nav?.classList.toggle('scrolled', y > 40);
        // progress bar
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? y / max : 0;
        progress.style.transform = `scaleX(${p})`;
        // parallaxe douce des orbes
        if (!reduceMotion) {
            orbs.forEach((o, i) => {
                const speed = (i % 2 === 0 ? 0.12 : -0.08);
                // propriété `translate` distincte de `transform` → se compose avec l'animation orbDrift
                o.style.translate = `0 ${y * speed}px`;
            });
        }
        ticking = false;
    });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ═══════════════════════════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger?.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
        hamburger?.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }
});

/* ═══════════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════════ */
function initReveal() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = parseFloat(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
            io.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-up').forEach(el => {
        if (el.dataset.delay)
            el.style.transitionDelay = el.dataset.delay + 's';
        io.observe(el);
    });
}

/* ═══════════════════════════════════════════════════════════════════
   PLAYGROUND 3D — cube glisser-pour-tourner + inertie
═══════════════════════════════════════════════════════════════════ */
const cube  = document.getElementById('pgCube');
const stage = document.getElementById('pgStage');
const hint  = document.getElementById('pgHint');

if (cube && stage) {
    let rotX = -22, rotY = 32;     // rotation courante
    let velX = 0,   velY = 0.18;   // vitesse (auto-rotation douce au repos)
    let dragging = false;
    let lastX = 0, lastY = 0;
    let interacted = false;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) velY = 0;

    const apply = () => {
        cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const onDown = (x, y) => {
        dragging = true;
        lastX = x; lastY = y;
        velX = velY = 0;
        if (!interacted) { interacted = true; hint?.classList.add('hide'); }
    };
    const onMove = (x, y) => {
        if (!dragging) return;
        const dx = x - lastX;
        const dy = y - lastY;
        lastX = x; lastY = y;
        rotY += dx * 0.4;
        rotX -= dy * 0.4;
        rotX = Math.max(-90, Math.min(90, rotX));
        velX = -dy * 0.4;
        velY =  dx * 0.4;
        apply();
    };
    const onUp = () => { dragging = false; };

    // Souris
    stage.addEventListener('mousedown', e => onDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);
    // Tactile
    stage.addEventListener('touchstart', e => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    window.addEventListener('touchmove', e => { if (dragging) onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    window.addEventListener('touchend', onUp);

    // Boucle d'inertie / auto-rotation
    (function loop() {
        if (!dragging) {
            rotX += velX;
            rotY += velY;
            rotX = Math.max(-90, Math.min(90, rotX));
            // friction
            velX *= 0.95;
            velY *= 0.95;
            // auto-rotation douce si quasi à l'arrêt et jamais touché
            if (!reduce && !interacted && Math.abs(velY) < 0.05) velY = 0.18;
            apply();
        }
        requestAnimationFrame(loop);
    })();

    apply();
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT FORM — mode email direct (mailto pré-rempli, sans backend)
═══════════════════════════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const to    = contactForm.dataset.email;
        const name  = (document.getElementById('cf-name')?.value  || '').trim();
        const email = (document.getElementById('cf-email')?.value || '').trim();
        const msg   = (document.getElementById('cf-msg')?.value   || '').trim();

        const subject = `Contact portfolio — ${name || 'Sans nom'}`;
        const body    = `${msg}\n\n— ${name}${email ? ` (${email})` : ''}`;
        window.location.href =
            `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECT PAGE — INTERACT TOGGLE (Three.js hook)
═══════════════════════════════════════════════════════════════════ */
const interactCb = document.getElementById('interactToggleCb');
if (interactCb) {
    interactCb.addEventListener('change', () => {
        const interact = interactCb.checked;
        // Connecte ici : controls.enabled = interact; etc.
        console.log('Mode:', interact ? 'interact' : 'animation');
    });
}
