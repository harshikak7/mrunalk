const toggleBtn = document.querySelector(".theme-toggle");

toggleBtn.addEventListener("click", () => {
  // Dark mode will be added later
  alert("Dark mode coming next 👀");
});


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
  {
    threshold: 0.2
  }
);

reveals.forEach(reveal => {
  observer.observe(reveal);
});

const scrollTopBtn = document.querySelector(".scroll-top");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


const hamburger = document.querySelector(".hamburger");
const navRight = document.querySelector(".nav-right");

hamburger.addEventListener("click", () => {
  navRight.classList.toggle("open");
});
