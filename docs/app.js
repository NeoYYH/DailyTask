(function () {
  const nav = document.getElementById("nav");
  const page = document.getElementById("page");
  const search = document.getElementById("search");
  const sidebar = document.getElementById("sidebar");
  const menu = document.getElementById("menu");

  function pageId() {
    const raw = (location.hash || "#start").replace(/^#/, "").split("&")[0];
    return PAGES.some((p) => p.id === raw) ? raw : "start";
  }

  function strip(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    return (d.textContent || "").toLowerCase();
  }

  function render() {
    const id = pageId();
    const q = (search.value || "").trim().toLowerCase();
    nav.innerHTML = "";
    let shown = 0;
    PAGES.forEach((p) => {
      const blob = (p.nav + " " + strip(HTML[p.id])).toLowerCase();
      if (q && !blob.includes(q)) return;
      shown += 1;
      const a = document.createElement("a");
      a.href = "#" + p.id;
      a.textContent = p.nav;
      if (p.id === id) a.className = "active";
      nav.appendChild(a);
    });
    if (!shown) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = EMPTY_NAV;
      nav.appendChild(empty);
    }

    const current = PAGES.find((p) => p.id === id) || PAGES[0];
    document.title = current.nav + " · Ponytail 使用指南";
    page.innerHTML = HTML[id];
    page.querySelectorAll("pre").forEach((pre) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy";
      btn.textContent = "复制";
      btn.addEventListener("click", async () => {
        const text = pre.querySelector("code") ? pre.querySelector("code").textContent : pre.textContent;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "已复制";
        } catch (_) {
          btn.textContent = "Ctrl+C";
        }
        setTimeout(() => {
          btn.textContent = "复制";
        }, 1200);
      });
      pre.appendChild(btn);
    });
    sidebar.classList.remove("open");
  }

  search.addEventListener("input", render);
  window.addEventListener("hashchange", render);
  menu.addEventListener("click", () => sidebar.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && e.target !== menu) sidebar.classList.remove("open");
  });

  if (!location.hash) history.replaceState(null, "", "#start");
  render();
})();
