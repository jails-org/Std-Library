var _ = Object.defineProperty;
var d = Object.getOwnPropertySymbols;
var g = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable;
var y = (e, t, r) => t in e ? _(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, f = (e, t) => {
  for (var r in t || (t = {}))
    g.call(t, r) && y(e, r, t[r]);
  if (d)
    for (var r of d(t))
      E.call(t, r) && y(e, r, t[r]);
  return e;
};
const L = (e) => window.___Shell___ = f(f({}, e), window.___Shell___), b = ({ timeout: e = 5e3 } = {}) => {
  const t = {};
  return {
    renderJS({ target: r, tag: n, src: s }) {
      return r.innerHTML = `<${n}></${n}>`, new Promise((c, i) => {
        const o = document.createElement("script");
        o.src = s, o.async = !0, o.onload = () => c(r), o.onerror = (a) => i({
          type: "error",
          message: `[mfe] - ${a.type} loading script`
        }), document.head.appendChild(o);
      });
    },
    render(r, n) {
      return fetch(n).then((s) => s.text()).then((s) => {
        const c = [], i = new URL(n), a = new DOMParser().parseFromString(s, "text/html"), h = a.documentElement.querySelector("body");
        if (!t[n]) {
          const p = h.querySelectorAll('script, link[rel="stylesheet"], style'), m = a.documentElement.querySelector("head");
          p.forEach((l) => {
            m.appendChild(l);
          }), m.querySelectorAll('link[rel="stylesheet"], style, script').forEach((l) => {
            if (l.localName == "script" && l.src) {
              const u = document.createElement("script");
              u.setAttribute("type", "module"), u.setAttribute("src", l.getAttribute("src")), w(u, i, c, e), document.head.appendChild(u);
            } else
              w(l, i, c, e), document.head.appendChild(l);
          }), t[n] = c;
        }
        return new Promise((p, m) => {
          Promise.all(t[n]).then(() => {
            r.innerHTML = h == null ? void 0 : h.innerHTML, p(r);
          }).catch((l) => {
            m({
              type: "error",
              message: "[mfe] - Unexpected error : " + l
            });
          });
        });
      }).catch((s) => {
        throw s;
      });
    }
  };
}, w = (e, t, r, n) => {
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
    }, n);
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
  L as Shell,
  b as mfe
};
