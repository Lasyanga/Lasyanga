function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

// Below 993px the sidebar covers the page, so a nav tap must dismiss it or the
// reader is left tapping the x. At 993px and up it is permanent and stays put.
document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.getElementById("mySidebar");
  var collapsed = window.matchMedia("(max-width: 992px)");

  var links = sidebar.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      if (collapsed.matches) {
        w3_close();
      }
    });
  }

  // Scrollspy: highlight the nav link for the section currently in view
  var sections = [];
  var navLinks = [];
  for (var i = 0; i < links.length; i++) {
    var id = links[i].getAttribute("href");
    if (id && id.length > 1) {
      var section = document.querySelector(id);
      if (section) {
        sections.push(section);
        navLinks.push(links[i]);
      }
    }
  }

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120; // offset for fixed top bar + padding
    var activeIndex = 0;
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      var top = rect.top + window.scrollY;
      if (top <= scrollPos) {
        activeIndex = i;
      }
    }
    // The final section sits closer to the bottom than the viewport is tall, so the
    // loop above can never reach it once the page bottoms out. Claim it explicitly.
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
      activeIndex = sections.length - 1;
    }
    for (var i = 0; i < navLinks.length; i++) {
      if (i === activeIndex) {
        navLinks[i].classList.add("w3-theme-l5");
        navLinks[i].setAttribute("aria-current", "true");
      } else {
        navLinks[i].classList.remove("w3-theme-l5");
        navLinks[i].removeAttribute("aria-current");
      }
    }
  }

  if (sections.length > 0) {
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink(); // run once on load
  }
});