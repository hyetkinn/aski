(function () {
  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");

  if (nav && toggle) {
    function setOpen(open) {
      nav.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(nav.dataset.open !== "true");
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 880px)").matches) {
          setOpen(false);
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) setOpen(false);
    });
  }

  var loginTabs = document.querySelectorAll("[data-login-tab]");
  var loginPanels = document.querySelectorAll("[data-login-panel]");
  if (loginTabs.length && loginPanels.length) {
    loginTabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-login-tab");
        loginTabs.forEach(function (t) {
          t.setAttribute("aria-selected", t === btn ? "true" : "false");
        });
        loginPanels.forEach(function (p) {
          p.hidden = p.getAttribute("data-login-panel") !== id;
        });
      });
    });
  }

  var edevlet = document.getElementById("edevlet-giris");
  if (edevlet) {
    edevlet.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }
})();
