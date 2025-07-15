// Password strength evaluation
function evaluatePasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
const pwInput = document.getElementById('password');
const pwMeter = document.getElementById('pw-strength-meter');
const pwStrengthText = document.getElementById('pw-strength');
if (pwInput && pwMeter && pwStrengthText) {
  pwInput.addEventListener('input', () => {
    const value = pwInput.value;
    const score = evaluatePasswordStrength(value);
    pwMeter.value = score;
    let desc = '';
    switch (score) {
      case 0: case 1: desc = 'Weak'; break;
      case 2: desc = 'Fair'; break;
      case 3: desc = 'Good'; break;
      case 4: desc = 'Strong'; break;
    }
    pwStrengthText.textContent = desc;
    pwStrengthText.style.color = score < 3 ? '#d32f2f' : '#0066ff';
  });
}

// Authentication - Example only (replace with secure backend call)
document.getElementById('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = pwInput.value;
  if (username.length < 3 || password.length < 8) {
    alert('Please provide valid credentials.');
    return;
  }
  // Call your secure API here! (Example only)
  // const res = await fetch('/api/auth', {method:'POST',body:JSON.stringify({username,password})});
  // if (res.ok) { ... } else { ... }
  alert('Authentication request submitted.');
});

// Feedback form validation
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fb = document.getElementById('feedbackText').value.trim();
  if (fb.length < 5) {
    alert('Please provide more detailed feedback.');
    return;
  }
  // Securely send feedback to your backend here!
  alert('Thank you for your feedback!');
  this.reset();
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
  document.body.classList.add('dark-mode');
  darkModeToggle.setAttribute('aria-pressed', 'true');
}
darkModeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  darkModeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
});

// Internationalization (basic)
const langSelect = document.getElementById('langSelect');
const i18nStrings = {
  en: {
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.contact": "Contact",
    "nav.dark_mode": "Dark Mode",
    "main.title": "Welcome to AI-Powered Solutions and Tools",
    "auth.username": "Username:",
    "auth.password": "Password:",
    "auth.login": "Log In",
    "features.title": "Features",
    "features.accessibility": "Accessible design",
    "features.security": "Security best practices",
    "features.performance": "Performance optimized",
    "features.pwa": "Offline ready (PWA)",
    "feedback.title": "Feedback",
    "feedback.desc": "Share your thoughts:",
    "feedback.submit": "Submit",
    "footer.rights": "All rights reserved."
  },
  es: {
    "nav.home": "Inicio",
    "nav.features": "Características",
    "nav.contact": "Contacto",
    "nav.dark_mode": "Modo Oscuro",
    "main.title": "Bienvenido a Soluciones y Herramientas con IA",
    "auth.username": "Usuario:",
    "auth.password": "Contraseña:",
    "auth.login": "Iniciar sesión",
    "features.title": "Características",
    "features.accessibility": "Diseño accesible",
    "features.security": "Mejores prácticas de seguridad",
    "features.performance": "Optimización de rendimiento",
    "features.pwa": "Listo para trabajar sin conexión (PWA)",
    "feedback.title": "Comentarios",
    "feedback.desc": "Comparte tus pensamientos:",
    "feedback.submit": "Enviar",
    "footer.rights": "Todos los derechos reservados."
  }
};
function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nStrings[lang][key]) el.textContent = i18nStrings[lang][key];
  });
}
langSelect.addEventListener('change', () => {
  const lang = langSelect.value;
  setLanguage(lang);
  localStorage.setItem('lang', lang);
});
window.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  langSelect.value = lang;
  setLanguage(lang);
});
