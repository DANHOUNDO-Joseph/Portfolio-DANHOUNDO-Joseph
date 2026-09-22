const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', ()=> {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px'; navLinks.style.left='16px'; navLinks.style.right='16px';
  navLinks.style.background='white'; navLinks.style.padding='20px'; navLinks.style.borderRadius='20px';
  navLinks.style.boxShadow='0 12px 24px rgba(0,0,0,.1)';
});

// Scroll spy + smooth
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
    if(window.innerWidth<768) navLinks.style.display='none';
  })
});

// Formulaire validation AA
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  let ok = true;
  if(name.length<2){ form.name.nextElementSibling.textContent='Nom trop court'; ok=false }
  else form.name.nextElementSibling.textContent='';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ form.email.nextElementSibling.textContent='Email invalide'; ok=false }
  else form.email.nextElementSibling.textContent='';
  if(message.length<10){ ok=false; statusEl.textContent='Message trop court (10 caractères min)'; statusEl.style.color='crimson'; return }
  if(!ok) return;
  statusEl.textContent='Envoi en cours...';
  
  setTimeout(()=>{
    statusEl.textContent='✓ Message envoyé ! Réponse sous 24h depuis Abomey-Calavi.';
    statusEl.style.color='var(--green-dark)';
    
    window.location.href = `mailto:jdanhoundo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\n---\nDe: ' + name + ' (' + email + ')')}`;
    
    form.reset();
  },800);
});