/**
 * Page-level behaviour: reveal sections as they scroll into view.
 */
(function () {
  function setupReveal() {
    const targets = document.querySelectorAll(
      '.about-text, .subsection, .experience-item, .contact-list'
    );
    targets.forEach((el) => el.classList.add('reveal'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', setupReveal);
})();
