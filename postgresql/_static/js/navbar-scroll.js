document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav-scroll");
  const leftBtn = document.getElementById("navLeft");
  const rightBtn = document.getElementById("navRight");

  const scrollAmount = 220;

  function updateButtons() {
    leftBtn.style.display = nav.scrollLeft > 0 ? "block" : "none";
    rightBtn.style.display =
      nav.scrollLeft + nav.clientWidth < nav.scrollWidth ? "block" : "none";
  }

  leftBtn.addEventListener("click", () =>
    nav.scrollBy({ left: -scrollAmount, behavior: "smooth" })
  );
  rightBtn.addEventListener("click", () =>
    nav.scrollBy({ left: scrollAmount, behavior: "smooth" })
  );

  nav.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
});

///To Remove tooltips from "Toggle primary sidebar", "Fullscreen mode", "light/dark".////
// Remove tooltips (title="...") from the white header bar icons
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".bd-header-article");
  if (!root) return;

  // Remove ALL title tooltips from that white bar
  root.querySelectorAll("[title]").forEach((el) => {
    el.removeAttribute("title");
  });
});