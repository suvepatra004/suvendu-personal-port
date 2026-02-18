// ============================================================
// CURSOR
// ============================================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ============================================================
// NAV SCROLL
// ============================================================
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('nav-links');
const navClose     = document.getElementById('nav-close');
const overlay      = document.createElement('div');
overlay.className  = 'nav-overlay';
document.body.appendChild(overlay);

function openMenu() {
  navLinks.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));

// ============================================================
// SCROLL REVEAL
// ============================================================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

// ============================================================
// CONTACT FORM
// ============================================================
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const msg     = document.getElementById('form-msg');

  if (!name || !email || !message) {
    msg.style.color = '#f87171';
    msg.textContent = 'Please fill in all fields.';
    return;
  }

  const mailto = `mailto:suvepatra2003@gmail.com?subject=Portfolio message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
  window.location.href = mailto;

  msg.style.color = '#4ade80';
  msg.textContent = 'Opening your email client…';
  this.reset();
  setTimeout(() => { msg.textContent = ''; }, 5000);
});

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
const sections = document.querySelectorAll('section[id], div[id="hero"]');
const navItems = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });
