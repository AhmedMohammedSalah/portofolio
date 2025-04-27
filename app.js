// Modern Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Navigation controls
  const controls = document.querySelectorAll(".control");
  const sections = document.querySelectorAll(".container");
  const themeBtn = document.querySelector(".theme-btn");
  const backToTopBtn = document.querySelector(".back-to-top");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // Set initial active section
  let currentSection = "home";

  // Navigation controls functionality
  controls.forEach((control) => {
    control.addEventListener("click", function () {
      const id = this.dataset.id;

      // Remove active class from all controls and sections
      document.querySelector(".active-btn").classList.remove("active-btn");
      document.querySelector(".active").classList.remove("active");

      // Add active class to clicked control and corresponding section
      this.classList.add("active-btn");
      document.getElementById(id).classList.add("active");
      currentSection = id;
    });
  });

  // Theme toggle functionality
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Change icon based on theme
    const isLightMode = document.body.classList.contains("light-mode");
    themeBtn.innerHTML = isLightMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    // Save theme preference to localStorage
    localStorage.setItem("portfolio-theme", isLightMode ? "light" : "dark");
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Back to top button functionality
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Portfolio filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      document.querySelector(".filter-btn.active").classList.remove("active");
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.dataset.filter;

      portfolioItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Typing animation for hero section
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    const words = [
      "Full Stack Developer",
      "React.js Specialist",
      "Django Developer",
      "Problem Solver",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);

      typingText.textContent = currentChar;

      if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        charIndex++;
        setTimeout(type, 100);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(type, 50);
      } else {
        // Change word
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
      }
    }

    // Start typing animation
    setTimeout(type, 1000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);

      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".about-item, .skill-category, .timeline-item, .portfolio-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial styles for animated elements
  document
    .querySelectorAll(
      ".about-item, .skill-category, .timeline-item, .portfolio-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

  // Run once on load
  animateOnScroll();

  // Then run on scroll
  window.addEventListener("scroll", animateOnScroll);

  // GitHub chart animation
  const githubChart = document.querySelector(".github-chart");
  if (githubChart) {
    githubChart.style.opacity = "0";
    githubChart.style.transform = "scale(0.9)";
    githubChart.style.transition = "opacity 1s ease, transform 1s ease";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            githubChart.style.opacity = "1";
            githubChart.style.transform = "scale(1)";
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(githubChart);
  }
});
