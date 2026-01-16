/* --------------------
   SCROLL REVEAL
--------------------- */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(reveal => observer.observe(reveal));


/* --------------------
   SCROLL TO TOP
--------------------- */
const scrollTopBtn = document.querySelector(".scroll-top");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* --------------------
   DARK MODE TOGGLE (FINAL)
--------------------- */
const themeToggle = document.querySelector(".theme-toggle");

/* SVG icons */
const sunIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
  viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>
`;

const moonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
  viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3
    a7 7 0 0 0 9.79 9.79z"/>
</svg>
`;

/* Dark mode by default */
document.body.classList.add("dark");

/* Dark mode active → show SUN (to switch to light) */
themeToggle.innerHTML = sunIcon;

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");

  /* If dark → sun | if light → moon */
  themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
});
