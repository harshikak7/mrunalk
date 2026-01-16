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
   DARK MODE TOGGLE
--------------------- */
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});
