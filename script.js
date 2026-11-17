// Princess Zoya — all interactions live here.
const welcome = document.getElementById('welcome');
const kingdom = document.getElementById('kingdom');
document.getElementById('openKingdom').addEventListener('click', () => {
  welcome.classList.add('fade-away');
  welcome.style.transition = 'opacity .65s, transform .65s';
  welcome.style.opacity = '0';
  welcome.style.transform = 'scale(.98)';
  setTimeout(() => {
    welcome.classList.add('hidden');
    kingdom.classList.remove('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
    revealObserver.observeAll?.();
  }, 650);
});

// Open and close the animated envelope.
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
  const isOpen = envelope.classList.toggle('open');
  envelope.setAttribute('aria-expanded', String(isOpen));
  document.getElementById('letterNote').textContent = isOpen
    ? 'Keep these words close, Princess. ❤️'
    : 'A little reminder, whenever you need one. 💌';
});

// Sweet surprise buttons.
document.querySelectorAll('[data-message]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#messagePanel p').textContent = button.dataset.message;
    document.querySelector('#messagePanel').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
});

// Photo lightbox. Replace the six files in assets/photos with your own images.
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    if (!image || image.style.display === 'none' || !image.complete || image.naturalWidth === 0) {
      showToast('Add your picture in assets/photos to fill this memory frame.');
      return;
    }
    lightboxImage.src = card.dataset.photo;
    lightbox.classList.add('show');
  });
});
function closeLightbox(){ lightbox.classList.remove('show'); lightboxImage.src = ''; }
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

// Final button gives a small personal toast.
document.getElementById('madeWithLove').addEventListener('click', () => showToast('A little kingdom, made with love for Zoya. ❤️'));
let toastTimer;
function showToast(message){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, {threshold: .12});
function observeReveals(){ document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el)); }
observeReveals();
document.getElementById('openKingdom').addEventListener('click', () => setTimeout(observeReveals, 700));

// Lightweight floating hearts, petals and sparkles.
const floatLayer = document.getElementById('floatLayer');
const symbols = ['♡','♥','✿','✧','✦'];
function addFloaty(){
  if(document.hidden) return;
  const item = document.createElement('span');
  item.className = 'floaty';
  item.textContent = symbols[Math.floor(Math.random()*symbols.length)];
  item.style.left = Math.random()*100 + 'vw';
  item.style.fontSize = (12 + Math.random()*16) + 'px';
  item.style.animationDuration = (9 + Math.random()*9) + 's';
  floatLayer.appendChild(item);
  setTimeout(() => item.remove(), 18000);
}
setInterval(addFloaty, 1450);
