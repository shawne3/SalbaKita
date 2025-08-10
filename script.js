// ================================================
// PAGE LOAD: Loader animation and scroll triggers
// ================================================
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-screen");

  // Fade out loader on page load
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    onComplete: () => loader.remove()
  });

  // Animate elements with .fade-in class on scroll
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

// ================================================
// SECTION-SPECIFIC STYLES: Load CSS dynamically
// ================================================
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

  if (cssFile && !document.querySelector(`link[href='${cssFile}']`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssFile;
    document.head.appendChild(link);
  }
}

// ================================================
// MODE TOGGLE: Light and Dark mode switching
// ================================================
const modeToggle = document.getElementById("modeToggle");
const root = document.documentElement;

function updateModeToggleText() {
  modeToggle.textContent = root.classList.contains("light-mode")
    ? "Dark Mode"
    : "Light Mode";
}

function updateModeToggleClass() {
  modeToggle.classList.toggle("light-mode", root.classList.contains("light-mode"));
}

modeToggle?.addEventListener("click", () => {
  root.classList.toggle("light-mode");
  updateModeToggleText();
  updateModeToggleClass();
});

updateModeToggleText();
updateModeToggleClass();

// ================================================
// SUMMARY SECTION: Expand/Collapse behavior
// ================================================
const summaryHead = document.querySelector(".summary-head");
const summaryText = document.querySelector(".summary-text");

if (summaryHead && summaryText) {
  summaryHead.addEventListener("click", () => {
    summaryText.classList.toggle("expanded");
    summaryHead.classList.toggle("active");
  });
}

// ================================================
// FEATURE LIST: Expand/Collapse descriptions
// ================================================
document.querySelectorAll(".feature-title").forEach(title => {
  title.addEventListener("click", () => {
    title.parentElement.classList.toggle("expanded");
  });
});

// ================================================
// BROCHURE CAROUSEL: Navigate & Swipe Support
// ================================================
const carousel = document.querySelector(".page-carousel");
const images = document.querySelectorAll(".page-carousel img");
const dots = document.querySelectorAll(".page-dots .dot");
const totalSlides = images.length;
let currentIndex = 0;

function updateCarousel(index) {
  currentIndex = (index + totalSlides) % totalSlides;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

document.querySelector(".page-btn.left")?.addEventListener("click", () => {
  updateCarousel(currentIndex - 1);
});

document.querySelector(".page-btn.right")?.addEventListener("click", () => {
  updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => updateCarousel(i));
});

// Swipe detection for mobile
let startX = 0;
let endX = 0;

carousel?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel?.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carousel?.addEventListener("touchend", () => {
  const threshold = 50;
  if (startX - endX > threshold) {
    updateCarousel(currentIndex + 1); // Swiped left
  } else if (endX - startX > threshold) {
    updateCarousel(currentIndex - 1); // Swiped right
  }
  startX = 0;
  endX = 0;
});

// ================================================
// TECHNICAL DETAILS: Expandable cards
// ================================================
document.querySelectorAll("#technical_details .tech-header").forEach(header => {
  header.addEventListener("click", () => {
    header.parentElement.classList.toggle("active");
  });
});
