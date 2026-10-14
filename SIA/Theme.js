// Theme manager for Step 'N Kicks
// Usage: <script src="theme.js"></script> early in <head>
// API: SNKTheme.get() → "dark" | "light" | "system"
//      SNKTheme.set("dark" | "light" | "system")
(function () {
  const KEY = "snk-theme";
  const VALID = ["dark", "light", "system"];

  function systemPrefersLight() {
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  function resolve(pref) {
    if (pref === "light") return "light";
    if (pref === "dark") return "dark";
    return systemPrefersLight() ? "light" : "dark";
  }

  function apply(pref) {
    const theme = resolve(pref);
    document.documentElement.setAttribute("data-theme", theme);
    // Keep color-scheme in sync for form controls / scrollbars
    document.documentElement.style.colorScheme = theme;
  }

  function get() {
    try {
      const v = localStorage.getItem(KEY);
      return VALID.includes(v) ? v : "dark";
    } catch (e) {
      return "dark";
    }
  }

  function set(pref) {
    if (!VALID.includes(pref)) pref = "dark";
    try {
      localStorage.setItem(KEY, pref);
    } catch (e) {}
    apply(pref);
  }

  // Apply immediately (before first paint if script is in <head>)
  apply(get());

  // React to OS theme changes when user chose "system"
  try {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
      if (get() === "system") apply("system");
    });
  } catch (e) {}

  window.SNKTheme = { get, set };
})();