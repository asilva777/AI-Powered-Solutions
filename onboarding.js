// === Onboarding logic with localStorage progress persistence ===
let currentStep = Number(localStorage.getItem('onboardingStep')) || 1;
const totalSteps = 5;
document.addEventListener('DOMContentLoaded', () => {
  showStep(currentStep);
  // Focus main title for accessibility on load
  const mainTitle = document.getElementById('main-title');
  if (mainTitle) mainTitle.focus();
});

function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    const stepElem = document.getElementById(`step-${i}`);
    if (stepElem) stepElem.classList.remove('active');
  }
  const activeStep = document.getElementById(`step-${step}`);
  if (activeStep) activeStep.classList.add('active');
  updateDots(step);
  localStorage.setItem('onboardingStep', step);
}
function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
}
function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}
function updateDots(step) {
  const allDots = document.querySelectorAll('.progress-dots');
  allDots.forEach(dots => {
    dots.querySelectorAll('.dot').forEach((dot, i) => {
      if (i === step - 1) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  });
}
function finishOnboarding() {
  // Simulated dashboard redirect; clear onboarding progress
  localStorage.removeItem('onboardingStep');
  window.location.href = "dashboard.html";
}

// === Dark mode toggle implementation ===
const themeToggle = document.getElementById('themeToggle');
// Save theme preference
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) themeToggle.innerText = theme === "dark" ? "☀️" : "🌙";
}
// Init theme
(function(){
  const saved = localStorage.getItem('theme');
  if(saved) setTheme(saved);
  else if(window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
})();
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === "dark" ? "light" : "dark";
    setTheme(current);
  });
}

// === Service worker registration with error handling ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(err => { console.error('Service Worker registration failed:', err); });
  });
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
