document.addEventListener('DOMContentLoaded', () => {
  // Trigger fade-in and fade-out animations for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  let lastScrollY = window.scrollY;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const card = entry.target;
      const order = parseInt(card.getAttribute('data-order'));
      const isScrollingUp = window.scrollY < lastScrollY;

      if (entry.isIntersecting) {
        // Fade-in with staggered delay (UI/UX first)
        const fadeInDelay = (order - 1) * 300; // 300ms delay
        setTimeout(() => {
          card.classList.remove('animate-fade-out');
          card.classList.add('animate-fade-in');
        }, fadeInDelay);
      } else if (isScrollingUp) {
        // Fade-out with staggered delay (Data Analyst first)
        const fadeOutDelay = (3 - order) * 300; // Reverse order
        setTimeout(() => {
          card.classList.remove('animate-fade-in');
          card.classList.add('animate-fade-out');
        }, fadeOutDelay);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => {
    observer.observe(card);
  });

  // Update last scroll position
  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
  });
});