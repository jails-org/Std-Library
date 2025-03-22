const c = (r, { async: t = !0 } = {}) => new Promise((n, o) => {
  const e = document.createElement("script");
  e.src = r, e.async = t, e.onload = n, e.onerror = o, document.head.appendChild(e);
});
export {
  c as importJs
};
