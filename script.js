(() => {
  const img = document.getElementById("profileImg");
  const glitch = document.getElementById("glitchPfp");

  if (!img || !glitch) return;

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
      // Fail safe: show a placeholder glow (won’t break layout)
      glitch.style.setProperty("--glitch-img", `none`);
      img.style.display = "none";
      glitch.style.background =
        "radial-gradient(circle at 35% 20%, rgba(37,255,122,.25), transparent 45%), rgba(11,18,13,.65)";
      return;
    }
    img.src = candidates[idx++];
  }

  img.addEventListener("load", () => {
    setGlitchBg(img.src);
  });

  img.addEventListener("error", () => {
    tryNext();
  });

  // Start with whatever is in HTML, set bg too (in case it loads instantly)
  setGlitchBg(img.src);
})();
