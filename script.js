document.addEventListener("DOMContentLoaded", () => {

  const menuIcon = document.getElementById("menuIcon");
  const navMenu = document.getElementById("navLinks");
  const overlay = document.getElementById("overlay");

  const progressBar = document.getElementById("progressBar");
  const topBtn = document.getElementById("topBtn");
  const toggle = document.getElementById("themeToggle");

  /* ================= MOBILE MENU ================= */

  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  /* ================= SECTION REVEAL ================= */

  const sections = document.querySelectorAll("section");

  const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  }, { threshold: 0.15 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ================= ACTIVE NAV LINK ================= */

  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }

    });

  });

  /* ================= SKILL CIRCLE ANIMATION ================= */

  const circles = document.querySelectorAll(".circle");

  const skillObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry, index) => {

      const circle = entry.target;
      const percent = +circle.dataset.percent;

      if (entry.isIntersecting) {

        let progress = 0;

        const delay = index * 120;

        setTimeout(() => {

          const animate = () => {

            progress += (percent - progress) * 0.08;

            const current = Math.floor(progress);

            circle.style.background =
              `conic-gradient(#2563eb ${current * 3.6}deg, #e5e7eb 0deg)`;

            circle.querySelector("span").textContent =
              current + "%";

            if (current < percent) {

              requestAnimationFrame(animate);

            } else {

              circle.style.background =
                `conic-gradient(#2563eb ${percent * 3.6}deg, #e5e7eb 0deg)`;

              circle.querySelector("span").textContent =
                percent + "%";
            }

          };

          animate();

        }, delay);

      } else {

        circle.style.background =
          `conic-gradient(#2563eb 0deg, #e5e7eb 0deg)`;

        circle.querySelector("span").textContent = "0%";
      }

    });

  }, { threshold: 0.5 });

  circles.forEach(circle => skillObserver.observe(circle));

  /* ================= SKILL CARD 3D EFFECT ================= */

  const cards = document.querySelectorAll(".skill-card");

  cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        `perspective(1000px)
         rotateX(0)
         rotateY(0)
         translateY(0)`;

    });

  });

  /* ================= PROJECT FILTER ================= */

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");
  const indicator = document.querySelector(".filter-indicator");

  function moveIndicator(btn) {

    indicator.style.width = btn.offsetWidth + "px";
    indicator.style.left = btn.offsetLeft + "px";

  }

  filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      moveIndicator(btn);

      const filter = btn.dataset.filter;

      projects.forEach(project => {

        const match =
          filter === "all" ||
          project.dataset.category === filter;

        if (match) {

          project.style.display = "block";

          setTimeout(() => {
            project.style.opacity = "1";
            project.style.transform = "scale(1)";
          }, 100);

        } else {

          project.style.opacity = "0";
          project.style.transform = "scale(0.95)";

          setTimeout(() => {
            project.style.display = "none";
          }, 200);

        }

      });

    });

  });

  window.addEventListener("load", () => {

    const activeBtn =
      document.querySelector(".filter-btn.active");

    moveIndicator(activeBtn);

  });

  /* ================= COUNTER ANIMATION ================= */

  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const el = entry.target;
        const target = +el.dataset.target;

        let count = 0;

        const update = () => {

          count += (target - count) * 0.08;

          if (count < target - 1) {

            el.textContent = Math.floor(count);

            requestAnimationFrame(update);

          } else {

            el.textContent = target;

          }

        };

        update();

        counterObserver.unobserve(el);

      }

    });

  }, { threshold: 0.6 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  /* ================= GITHUB LIVE API ================= */

  fetch("https://api.github.com/users/saurabhgautam56")
    .then(res => res.json())
    .then(data => {

      const repoCount =
        document.getElementById("repoCount");

      if (repoCount) {
        repoCount.textContent = data.public_repos;
      }

    })
    .catch(() => {

      const repoCount =
        document.getElementById("repoCount");

      if (repoCount) {
        repoCount.textContent = "N/A";
      }

    });

  /* ================= THEME TOGGLE ================= */

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {

    document.body.classList.add("dark");

    toggle.innerHTML =
      '<i class="fas fa-sun"></i>';

  }

  toggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

      localStorage.setItem("theme", "dark");

      toggle.innerHTML =
        '<i class="fas fa-sun"></i>';

    } else {

      localStorage.setItem("theme", "light");

      toggle.innerHTML =
        '<i class="fas fa-moon"></i>';

    }

  });

  /* ================= SCROLL EFFECTS ================= */

  window.addEventListener("scroll", () => {

    /* progress bar */

    const totalHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      (window.pageYOffset / totalHeight) * 100;

    progressBar.style.width = progress + "%";

    /* top button */

    if (window.scrollY > 400) {

      topBtn.classList.add("show");

    } else {

      topBtn.classList.remove("show");

    }

    /* navbar shadow */

    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  });

  /* ================= TOP BUTTON ================= */

  topBtn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

  /* ================= FOOTER YEAR ================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});