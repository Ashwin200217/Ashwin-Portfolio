// Timed glitch bursts
(() => {
  const glitch = document.getElementById("glitchPfp");
  if (!glitch) return;

  setInterval(() => {
    glitch.classList.add("glitch-active");
    setTimeout(() => glitch.classList.remove("glitch-active"), 320);
  }, 6500);
})();
