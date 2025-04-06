var y = Object.defineProperty;
var d = Object.getOwnPropertySymbols;
var S = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable;
var f = (e, t, r) => t in e ? y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, u = (e, t) => {
  for (var r in t || (t = {}))
    S.call(t, r) && f(e, r, t[r]);
  if (d)
    for (var r of d(t))
      E.call(t, r) && f(e, r, t[r]);
  return e;
};
const L = ({ timeout: e = 5e3 } = {}) => {
  const t = {};
  return {
    renderJS({ target: r, tag: l, src: s }) {
      return r.innerHTML = `<${l}></${l}>`, new Promise((c, i) => {
        const o = document.createElement("script");
        o.src = s, o.async = !0, o.onload = () => c(r), o.onerror = (a) => i({
          type: "error",
          message: `[mfe] - ${a.type} loading script`
        }), document.head.appendChild(o);
      });
    },
    render(r, l) {
      return fetch(l).then((s) => s.text()).then((s) => {
        const c = [], i = new URL(l), a = new DOMParser().parseFromString(s, "text/html"), h = a.documentElement.querySelector("body");
        if (!t[l]) {
          const p = h.querySelectorAll('script, link[rel="stylesheet"], style'), _ = a.documentElement.querySelector("head");
          p.forEach((n) => {
            _.appendChild(n);
          }), _.querySelectorAll('link[rel="stylesheet"], style, script').forEach((n) => {
            if (n.localName == "script" && n.src) {
              const m = document.createElement("script");
              m.setAttribute("type", "module"), m.setAttribute("src", n.getAttribute("src")), w(m, i, c, e), document.head.appendChild(m);
            } else
              w(n, i, c, e), document.head.appendChild(n);
          }), t[l] = c;
        }
        return new Promise((p, _) => {
          Promise.all(t[l]).then(() => {
            r.innerHTML = h == null ? void 0 : h.innerHTML, p(r);
          }).catch((n) => {
            _({
              type: "error",
              message: "[mfe] - Unexpected error : " + n
            });
          });
        });
      }).catch((s) => {
        throw s;
      });
    }
  };
}, b = (e = {}) => window.___Shell___ ? (window.___Shell___ = u(u({}, e), window.___Shell___), window.___Shell___) : (window.___Shell___ = u({}, e), window.___Shell___), w = (e, t, r, l) => {
  if (e.src && e.getAttribute("src").startsWith("/")) {
    const { pathname: s, search: c } = new URL(e.src);
    e.src = t.origin + s + c;
  } else if (e.href && e.getAttribute("href").startsWith("/")) {
    const { pathname: s, search: c } = new URL(e.href);
    e.href = t.origin + s + c;
  }
  return (e.src || e.href && e.rel == "stylesheet") && r.push(new Promise((s, c) => {
    const i = setTimeout(() => {
      c({
        type: "error",
        message: `[mfe] - Timeout exceeded ${e} resolving after milisseconds.`
      });
    }, l);
    e.addEventListener("load", () => {
      clearTimeout(i), s(e);
    }), e.addEventListener("error", () => {
      clearTimeout(i), c({
        type: "error",
        message: `[mfe] - Error to fetch : ${e.src}`
      });
    });
  })), r;
};
export {
  b as Shell,
  L as mfe
};
