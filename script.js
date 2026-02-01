// Timed glitch bursts
(() => {
  const glitch = document.getElementById("glitchPfp");
  if (!glitch) return;

  setInterval(() => {
    glitch.classList.add("glitch-active");
    setTimeout(() => glitch.classList.remove("glitch-active"), 320);
  }, 6500);
})();

// ===== Status toggle: Available / Looking / Working (single-select) =====
(() => {
  const wrap = document.getElementById("statusSwitch");
  if (!wrap) return;

  const KEY = "portfolio_status";
  const buttons = Array.from(wrap.querySelectorAll(".status-pill"));

  function setActive(status) {
    buttons.forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.status === status);
    });
    localStorage.setItem(KEY, status);
  }

  // Load saved state or default to "available"
  const saved = localStorage.getItem(KEY) || "available";
  setActive(saved);

  // Click handler
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".status-pill");
    if (!btn) return;
    setActive(btn.dataset.status);
  });
})();
