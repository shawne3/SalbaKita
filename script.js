// Loader animation (fade out after page load)
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-screen");
  gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => loader.remove() });

  // Animate sections on scroll
  const fadeEls = document.querySelectorAll(".fade-in");
  fadeEls.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 + i * 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          onEnter: () => applySectionStyle(el)
        }
      }
    );
  });
});

// Dynamically apply section CSS when section enters viewport
function applySectionStyle(sectionEl) {
  const sectionId = sectionEl.id;
  if (!sectionId) return;
  const cssFileMap = {
    home: "home-section.css",
    about: "about-section.css",
    demo: "demo-section.css",
    technical_details: "technical-details-section.css",
    contact: "contact-section.css"
  };
  const cssFile = cssFileMap[sectionId];
  if (cssFile) {
    // Check if already loaded
    if (!document.querySelector(`link[href='${cssFile}']`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssFile;
      document.head.appendChild(link);
    }
  }
}
