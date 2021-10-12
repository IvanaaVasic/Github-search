const THEME = {
  DARK: "DARK",
  LIGHT: "LIGHT",
};

function initTheme() {
  const savedTheme = window.localStorage.getItem("theme");
  const themeName = document.querySelector(".theme-mood-text");
  const themeIcon = document.querySelector(".thememood");
  const searchContainer = document.querySelector(".search-bar");
  const mainContainer = document.querySelector(".main-content-wrapper");

  if (savedTheme === THEME.LIGHT) {
    document.body.classList.add("light");
    themeName.innerHTML = THEME.DARK;
    themeIcon.classList.remove("theme-icon-dark");
    themeIcon.classList.add("theme-icon-light");
  } else {
    themeName.innerHTML = THEME.LIGHT;
    themeIcon.classList.remove("theme-icon-light");
    themeIcon.classList.add("theme-icon-dark");
  }
  console.log(savedTheme);
}

const toggle = document.querySelector(".thememood");

toggle.addEventListener("click", () => {
  const currentTheme = window.localStorage.getItem("theme");
  const themeName = document.querySelector(".theme-mood-text");
  const themeIcon = document.querySelector(".thememood");
  const searchContainer = document.querySelector(".search-bar");
  const mainContainer = document.querySelector(".main-content-wrapper");

  if (currentTheme === THEME.LIGHT) {
    window.localStorage.setItem("theme", THEME.DARK);
    themeName.innerHTML = THEME.LIGHT;
    themeIcon.classList.remove("theme-icon-light");
    themeIcon.classList.add("theme-icon-dark");
  } else {
    window.localStorage.setItem("theme", THEME.LIGHT);
    themeName.innerHTML = THEME.DARK;
    themeIcon.classList.remove("theme-icon-dark");
    themeIcon.classList.add("theme-icon-light");
  }
  document.body.classList.toggle("light");
});

initTheme();
