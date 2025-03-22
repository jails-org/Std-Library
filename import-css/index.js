const l = (n, r = null) => new Promise((o, t) => {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = n, e.onload = o, e.onerror = t, document.head.appendChild(e);
});
export {
  l as importCss
};
