// Onboarding Step Logic
document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  const stepCount = 6;
  const onboardingSteps = document.querySelectorAll('.onboarding-step');
  const progressDotSets = document.querySelectorAll('.progress-dots');

  // Utility
  function updateStepDisplay() {
    onboardingSteps.forEach((step, idx) => {
      step.classList.toggle('active', (idx + 1) === currentStep);
    });
    // Update progress dots
    progressDotSets.forEach((dots, i) => {
      const dotEls = dots.querySelectorAll('.dot');
      dotEls.forEach((dot, j) => {
        dot.classList.toggle('active', j === (currentStep - 1));
      });
    });
    // Focus main title for accessibility
    if (onboardingSteps[currentStep - 1]) {
      onboardingSteps[currentStep - 1].querySelector('h2').focus();
    }
  }

  // Navigation
  function nextStep() {
    if (currentStep < stepCount) {
      currentStep++;
      updateStepDisplay();
    }
  }
  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      updateStepDisplay();
    }
  }
  function finishOnboarding() {
    window.location.href = 'https://asilva777.github.io/MH-Digital-Apps/';
  }

  // Attach event listeners to all relevant buttons
  document.querySelectorAll('.next-step').forEach(btn => btn.addEventListener('click', nextStep));
  document.querySelectorAll('.prev-step').forEach(btn => btn.addEventListener('click', prevStep));
  const finishBtn = document.querySelector('.finish-onboarding');
  if (finishBtn) finishBtn.addEventListener('click', finishOnboarding);

  // Keyboard navigation: Enter, Space, and arrow keys
  document.addEventListener('keydown', (e) => {
    if (document.activeElement.classList.contains('btn')) {
      if (e.key === 'Enter' || e.key === ' ') {
        document.activeElement.click();
      }
    }
    // Optional: allow left/right arrow navigation
    if (e.key === 'ArrowLeft') prevStep();
    if (e.key === 'ArrowRight') nextStep();
  });

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeStatus = document.getElementById('themeStatus');

function setTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.textContent = dark ? '\u2600\ufe0f' : '\ud83c\udf19'; // Sun/Moon
  themeStatus.textContent = dark ? 'Dark mode: On' : 'Dark mode: Off';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Load theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (savedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});
