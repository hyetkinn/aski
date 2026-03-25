(function () {
  function syncThemeUI() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", dark ? "Açık temayı aç" : "Karanlık temayı aç");
      var moon = btn.querySelector(".theme-toggle__icon--moon");
      var sun = btn.querySelector(".theme-toggle__icon--sun");
      if (moon) moon.hidden = dark;
      if (sun) sun.hidden = !dark;
    });
  }

  function setTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
    syncThemeUI();
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      setTheme(!isDark);
    });
  });
  syncThemeUI();

  function setHeaderOffset() {
    var h = document.querySelector(".site-header");
    if (h) document.documentElement.style.setProperty("--header-offset", h.offsetHeight + "px");
  }
  window.addEventListener("resize", setHeaderOffset);
  window.addEventListener("load", setHeaderOffset);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setHeaderOffset);
  } else {
    setHeaderOffset();
  }

  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");

  if (nav && toggle) {
    function setOpen(open) {
      nav.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      setHeaderOffset();
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

  var weatherEl = document.querySelector("[data-live-weather]");
  if (weatherEl) {
    var tempEl = weatherEl.querySelector("[data-weather-temp]");
    var metaEl = weatherEl.querySelector("[data-weather-meta]");
    var url =
      "https://api.open-meteo.com/v1/forecast?latitude=39.9334&longitude=32.8597&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Europe%2FIstanbul";

    function wmoLabel(code) {
      var m = {
        0: "Açık",
        1: "Çoğunlukla açık",
        2: "Parçalı bulutlu",
        3: "Kapalı",
        45: "Sis",
        48: "Sis",
        51: "Çisenti",
        53: "Çisenti",
        55: "Çisenti",
        61: "Hafif yağmur",
        63: "Yağmur",
        65: "Kuvvetli yağmur",
        71: "Kar",
        80: "Sağanak",
        95: "Fırtına"
      };
      return m[code] != null ? m[code] : "Hava";
    }

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("http");
        return r.json();
      })
      .then(function (data) {
        var c = data.current;
        if (!c || tempEl == null) return;
        var t = c.temperature_2m;
        var hum = c.relative_humidity_2m;
        var code = c.weather_code;
        tempEl.textContent = Math.round(t) + "°C";
        if (metaEl) {
          metaEl.textContent =
            wmoLabel(code) + (hum != null ? " · Nem %" + Math.round(hum) : "") + " · Open-Meteo";
        }
      })
      .catch(function () {
        if (tempEl) tempEl.textContent = "—";
        if (metaEl) metaEl.textContent = "Canlı veri şu an alınamadı. Ağ bağlantınızı kontrol edin.";
      });
  }
})();
