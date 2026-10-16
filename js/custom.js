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
});