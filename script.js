// --- Theme (Dark/Light) ---
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
  }
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme ? savedTheme : "dark");

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// --- Copy Buttons (E-Mail / Telefon) ---
const hint = document.getElementById("copyHint");

async function copyText(selector, label) {
  const el = document.querySelector(selector);
  if (!el) return;

  const text = el.textContent.trim();

  try {
    await navigator.clipboard.writeText(text);
    if (hint) hint.textContent = `${label} kopiert ✅`;
  } catch (err) {
    // Fallback (falls Clipboard API blockiert ist)
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    if (hint) hint.textContent = `${label} kopiert ✅`;
  }

  setTimeout(() => {
    if (hint) hint.textContent = "";
  }, 2000);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;

  const selector = btn.getAttribute("data-copy");
  const label = btn.getAttribute("data-label") || "Text";
  copyText(selector, label);
});

// --- Footer year ---
document.getElementById("year").textContent = new Date().getFullYear();
