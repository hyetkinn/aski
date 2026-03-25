(function () {
  var SEARCH_INDEX = [
    { title: "Ana sayfa", url: "index.html", keywords: "anasayfa başlangıç giriş", excerpt: "Su hizmetleri ve hızlı işlemler özeti." },
    { title: "Hızlı işlemler", url: "index.html#hizli", keywords: "fatura borç ödeme abonelik randevu tarife kesinti", excerpt: "Fatura, borç, kesinti, abonelik ve diğer işlemler." },
    { title: "Kesinti ve şebeke durumu", url: "index.html#durum", keywords: "kesinti arıza ilçe mahalle su yok", excerpt: "İlçe ve adrese göre kesinti sorgulama (taslak)." },
    { title: "Hizmetler", url: "index.html#hizmetler", keywords: "vatandaş iş dünyası şeffaflık ruhsat kanal ihale", excerpt: "Hizmet kategorileri ve bağlantılar." },
    { title: "E-Şube giriş", url: "esube.html", keywords: "eşube e-devlet giriş bireysel kurumsal üye", excerpt: "Online işlem merkezi ve giriş ekranı (prototip)." },
    { title: "İletişim", url: "index.html#iletisim", keywords: "adres telefon 153 e-posta çalışma saat", excerpt: "Genel müdürlük iletişim ve çağrı merkezi." },
    { title: "Kurumsal bağlantılar", url: "index.html#kurumsal", keywords: "misyon mevzuat yönetim stratejik", excerpt: "Kurumsal sayfa kısayolları." },
    { title: "Duyurular", url: "index.html", keywords: "duyuru haber basın", excerpt: "Son duyurular ve haberler listesi." }
  ];

  function normalize(s) {
    return (s || "")
      .toLocaleLowerCase("tr")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c");
  }

  function searchEntries(q) {
    if (!q || q.length < 2) return [];
    var nq = normalize(q);
    return SEARCH_INDEX.filter(function (item) {
      var blob = normalize(item.title + " " + item.keywords + " " + item.excerpt);
      return blob.indexOf(nq) !== -1;
    }).slice(0, 8);
  }

  function renderSearchResults(container, results, q) {
    container.innerHTML = "";
    if (!q || q.length < 2) {
      container.hidden = true;
      return;
    }
    if (!results.length) {
      var empty = document.createElement("p");
      empty.className = "site-search__empty";
      empty.textContent = "Sonuç bulunamadı.";
      container.appendChild(empty);
      container.hidden = false;
      return;
    }
    results.forEach(function (item, i) {
      var a = document.createElement("a");
      a.className = "site-search__item";
      a.href = item.url;
      a.setAttribute("role", "option");
      a.id = "search-opt-" + i;
      var t = document.createElement("span");
      t.className = "site-search__item-title";
      t.textContent = item.title;
      var e = document.createElement("span");
      e.className = "site-search__item-excerpt";
      e.textContent = item.excerpt;
      a.appendChild(t);
      a.appendChild(e);
      container.appendChild(a);
    });
    container.hidden = false;
  }

  function setupSiteSearch(container) {
    var input = container.querySelector(".site-search__input");
    var dropdown = container.querySelector(".site-search__dropdown");
    if (!input || !dropdown) return;

    var debounce;
    input.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        var q = input.value.trim();
        var results = searchEntries(q);
        renderSearchResults(dropdown, results, q);
        input.setAttribute("aria-expanded", dropdown.hidden ? "false" : "true");
      }, 180);
    });

    input.addEventListener("focus", function () {
      var q = input.value.trim();
      if (q.length >= 2) {
        renderSearchResults(dropdown, searchEntries(q), q);
        input.setAttribute("aria-expanded", "true");
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dropdown.hidden = true;
        input.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".site-search").forEach(setupSiteSearch);

  document.addEventListener("click", function (e) {
    document.querySelectorAll(".site-search").forEach(function (wrap) {
      if (wrap.contains(e.target)) return;
      var dd = wrap.querySelector(".site-search__dropdown");
      var inp = wrap.querySelector(".site-search__input");
      if (dd && !dd.hidden) {
        dd.hidden = true;
        if (inp) inp.setAttribute("aria-expanded", "false");
      }
    });
  });

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
