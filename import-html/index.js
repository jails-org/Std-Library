const l = (e, n = null) => fetch(e, n).then((t) => t.text().then((h) => ({ response: t, html: h })));
export {
  l as importHtml
};
