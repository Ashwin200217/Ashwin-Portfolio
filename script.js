(() => {
  // ===== Profile image fallback + set glitch background =====
  const img = document.getElementById("profileImg");
  const glitch = document.getElementById("glitchPfp");

  if (img && glitch) {
    const candidates = [
      "images/Profile.jpg",
      "images/profile.jpg",
      "images/Profile.jpeg",
      "images/profile.jpeg",
      "images/Profile.png",
      "images/profile.png",
    ];

    let idx = 0;

    function setGlitchBg(url) {
      glitch.style.setProperty("--glitch-img", `url("${url}")`);
    }

    function tryNext() {
      if (idx >= candidates.length) {
        // Fail safe placeholder
        img.style.display = "none";
        glitch.style.setProperty("--glitch-img", "none");
        glitch.style.background =
          "radial-gradient(circle at 35% 20%, rgba(37,255,122,.25), transparent 45%), rgba(11,18,13,.65)";
        return;
      }
      img.src = candidates[idx++];
    }

    img.addEventListener("load", () => setGlitchBg(img.src));
    img.addEventListener("error", () => tryNext());

    setGlitchBg(img.src);
  }

  // ===== Timed glitch bursts (CLIfolio-style) =====
  (() => {
    const g = document.getElementById("glitchPfp");
    if (!g) return;

    setInterval(() => {
      g.classList.add("glitch-active");
      setTimeout(() => g.classList.remove("glitch-active"), 320);
    }, 6500);
  })();

  // ===== Status dropdown (PIN-locked edit) =====
  (() => {
    const dd = document.getElementById("statusDD");
    const btn = document.getElementById("statusBtn");
    const menu = document.getElementById("statusMenu");
    const text = document.getElementById("statusText");
    const dot = document.getElementById("statusDot");
    const unlockBtn = document.getElementById("unlockStatus");
    if (!dd || !btn || !menu || !text || !dot || !unlockBtn) return;

    const items = Array.from(menu.querySelectorAll(".status-item[data-status]"));

    const STATUS_KEY = "portfolio_status";
    const UNLOCK_KEY = "portfolio_status_unlocked";

    // CHANGE THIS PIN (only you know it)
    const OWNER_PIN = "8426";

    const statusMap = {
      available: { label: "Available", dot: "var(--accent)", glow: "0 0 14px rgba(37,255,122,.75)" },
      looking:   { label: "Currently looking", dot: "var(--accent2)", glow: "0 0 14px rgba(95,255,209,.65)" },
      working:   { label: "Currently working", dot: "rgba(127,234,163,.9)", glow: "0 0 14px rgba(127,234,163,.35)" },
    };

    function applyStatus(key) {
      const s = statusMap[key] || statusMap.available;
      text.textContent = s.label;
      dot.style.background = s.dot;
      dot.style.boxShadow = s.glow;
    }

    function isUnlocked() {
      return localStorage.getItem(UNLOCK_KEY) === "1";
    }

    function setLockedUI() {
      dd.classList.toggle("locked", !isUnlocked());
      unlockBtn.textContent = isUnlocked() ? "🔓 Lock editing" : "🔒 Unlock to edit";
    }

    function openMenu() {
      menu.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }

    // Load status for display
    const saved = localStorage.getItem(STATUS_KEY) || "available";
    applyStatus(saved);
    setLockedUI();

    // Open/close
    btn.addEventListener("click", () => {
      if (menu.classList.contains("open")) closeMenu();
      else openMenu();
    });

    // Click outside closes
    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) closeMenu();
    });

    // Change status only if unlocked
    items.forEach(item => {
      item.addEventListener("click", () => {
        if (!isUnlocked()) {
          closeMenu();
          return;
        }
        const key = item.dataset.status;
        localStorage.setItem(STATUS_KEY, key);
        applyStatus(key);
        closeMenu();
      });
    });

    // Unlock / lock
    unlockBtn.addEventListener("click", () => {
      if (isUnlocked()) {
        localStorage.setItem(UNLOCK_KEY, "0");
        setLockedUI();
        closeMenu();
        return;
      }

      const pin = window.prompt("Enter owner PIN to unlock status editing:");
      if (pin === OWNER_PIN) {
        localStorage.setItem(UNLOCK_KEY, "1");
        setLockedUI();
        closeMenu();
      } else {
        closeMenu();
      }
    });
  })();

})();
