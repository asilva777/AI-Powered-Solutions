// === Cognitio+ Onboarding Logic with Theme and Analytics ===

const TOTAL_STEPS = 6;
let currentStep = Number(localStorage.getItem('onboardingStep')) || 1;

document.addEventListener('DOMContentLoaded', () => {
  showStep(currentStep);
  const mainTitle = document.getElementById('main-title');
  if (mainTitle) mainTitle.focus();

   // Theme initialization
  initTheme();
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

  // Theme initialization
  initTheme();
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

// Step Navigation
function showStep(step) {
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const elem = document.getElementById(`step-${i}`);
    if (elem) elem.classList.remove('active');
  }
  const activeStep = document.getElementById(`step-${step}`);
  if (activeStep) activeStep.classList.add('active');
  updateDots(step);
  localStorage.setItem('onboardingStep', step);
  currentStep = step;
  trackEvent('onboarding_step_view', { step });
}

function nextStep() {
  if (currentStep < TOTAL_STEPS) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

function updateDots(step) {
  document.querySelectorAll('.progress-dots').forEach(dots => {
    dots.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === step - 1);
    });
  });
}

function finishOnboarding() {
  localStorage.removeItem('onboardingStep');
  trackEvent('onboarding_complete');
  // You can change "dashboard.html" to the appropriate landing page if needed
  window.location.href = "dashboard.html";
}

// === Theme (Light/Dark) Toggle Logic ===
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.innerText = theme === "dark" ? "☀️" : "🌙";
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
}

// === Service Worker Registration ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(err => { console.error('Service Worker registration failed:', err); });
  });
}
// === Analytics Tracking (Stub) ===
function trackEvent(event, data = {}) {
  // Replace this with your analytics endpoint if needed
  try {
    fetch('/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    if (window && window.console) console.warn('Analytics send failed:', err);
  }
}

// === Export navigation functions to global for HTML inline onclicks ===
window.nextStep = nextStep;
window.prevStep = prevStep;
window.finishOnboarding = finishOnboarding;
// Track step navigation
function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    const stepElem = document.getElementById(`step-${i}`);
    if (stepElem) stepElem.classList.remove('active');
  }
  const activeStep = document.getElementById(`step-${step}`);
  if (activeStep) activeStep.classList.add('active');
  updateDots(step);
  localStorage.setItem('onboardingStep', step);

  // Analytics: step view
  trackEvent('onboarding_step_view', { step });
}

// Track onboarding completion
function finishOnboarding() {
  localStorage.removeItem('onboardingStep');
  trackEvent('onboarding_complete', {});
  window.location.href = "dashboard.html";
}

// === Simulated analytics stub ===
function trackEvent(event) {
  // Example: send to an analytics service
  // fetch('/analytics', { method: 'POST', body: JSON.stringify({ event }) });
}
// Example: track onboarding step changes
// (Uncomment to use)
// document.querySelectorAll('.btn').forEach(btn => {
//   btn.addEventListener('click', () => trackEvent(`step-${currentStep}`));
// });
