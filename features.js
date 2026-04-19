/**
 * BunBabe Premium Features: Twilight Mode & Bouquet Builder
 */

// 🌙 Twilight Mode Logic
function toggleTwilight() {
    document.body.classList.toggle('twilight-mode');
    const isTwilight = document.body.classList.contains('twilight-mode');
    localStorage.setItem('bunbabe_twilight', isTwilight);
    updateTwilightIcon(isTwilight);
}

function updateTwilightIcon(isTwilight) {
    const btn = document.getElementById('twilightBtn');
    if (btn) {
        btn.innerText = isTwilight ? '☀️' : '🌙';
    }
}

function initTwilight() {
    const saved = localStorage.getItem('bunbabe_twilight');
    if (saved === 'true') {
        document.body.classList.add('twilight-mode');
        updateTwilightIcon(true);
    }
}

// 🌸 Bouquet Builder Logic
let currentBouquet = [];

function addToBouquet(emoji) {
    if (currentBouquet.length >= 12) {
        alert("Your bouquet is full! 🌸");
        return;
    }
    
    currentBouquet.push(emoji);
    renderBouquet();
}

function renderBouquet() {
    const canvas = document.getElementById('builderCanvas');
    if (!canvas) return;
    
    canvas.innerHTML = '';
    currentBouquet.forEach((emoji, index) => {
        const span = document.createElement('span');
        span.innerText = emoji;
        span.style.position = 'absolute';
        span.style.fontSize = '3rem';
        span.style.cursor = 'move';
        
        // Random placement within canvas
        const x = Math.random() * (canvas.offsetWidth - 60);
        const y = Math.random() * (canvas.offsetHeight - 60);
        
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        span.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        
        span.onclick = () => removeFromBouquet(index);
        canvas.appendChild(span);
    });
}

function removeFromBouquet(index) {
    currentBouquet.splice(index, 1);
    renderBouquet();
}

function clearBouquet() {
    currentBouquet = [];
    renderBouquet();
}

// 🌸 Floating Decorations Logic
function initDecorations() {
  const container = document.createElement('div');
  container.id = 'decorations-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '-1';
  container.style.overflow = 'hidden';
  document.body.appendChild(container);

  const icons = ['🌸', '🌼', '🌷', '🌿', '✨', '🎀', '🧶'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const dec = document.createElement('div');
    dec.innerText = icons[Math.floor(Math.random() * icons.length)];
    dec.className = 'floating-decoration';
    
    dec.style.left = Math.random() * 95 + 'vw';
    dec.style.top = Math.random() * 95 + 'vh';
    dec.style.animationDuration = (Math.random() * 3 + 4) + 's';
    dec.style.animationDelay = (Math.random() * 5) + 's';
    dec.style.opacity = Math.random() * 0.3 + 0.1;
    dec.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
    
    container.appendChild(dec);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTwilight();
    
    // Start bobbing decorations
    initDecorations();
    
    // Add Twilight Button to all pages
    const toggle = document.createElement('div');
    toggle.id = 'twilightBtn';
    toggle.className = 'twilight-toggle';
    toggle.innerText = '🌙';
    toggle.onclick = toggleTwilight;
    document.body.appendChild(toggle);

    // ── Inject Nav Auth Badge ──────────────────────────────
    const nav = document.querySelector('nav');
    if (nav) {
        const session = JSON.parse(localStorage.getItem('bb_session') || 'null');
        const authEl  = document.createElement('a');
        authEl.href   = 'auth.html';
        authEl.style.cssText = 'display:flex; align-items:center; gap:0.4rem; text-decoration:none; background:var(--pink-light); color:var(--pink-dark); padding:0.35rem 0.8rem; border-radius:50px; font-weight:800; font-size:0.85rem; transition:all 0.2s;';
        authEl.onmouseover = () => authEl.style.background = 'var(--pink-dark)', authEl.style.color = '#fff';
        authEl.onmouseout  = () => authEl.style.background = 'var(--pink-light)', authEl.style.color = 'var(--pink-dark)';

        if (session) {
            const av = session.avatar || '🐰';
            authEl.innerHTML = `<span>${av}</span><span>${session.firstName}</span>`;
        } else {
            authEl.innerHTML = `<span>👤</span><span>Sign In</span>`;
        }
        // Insert before cart icon
        const cart = nav.querySelector('.nav-cart');
        if (cart) nav.insertBefore(authEl, cart);
        else nav.appendChild(authEl);
    }
});
