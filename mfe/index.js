var y = Object.defineProperty;
var p = Object.getOwnPropertySymbols;
var S = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable;
var f = (e, t, r) => t in e ? y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, u = (e, t) => {
  for (var r in t || (t = {}))
    S.call(t, r) && f(e, r, t[r]);
  if (p)
    for (var r of p(t))
      E.call(t, r) && f(e, r, t[r]);
  return e;
};
const L = ({ timeout: e = 5e3 } = {}) => {
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
      return r ? fetch(n).then((s) => s.text()).then((s) => {
        const c = [], i = new URL(n), a = new DOMParser().parseFromString(s, "text/html"), h = a.documentElement.querySelector("body");
        if (!t[n]) {
          const d = h.querySelectorAll('script, link[rel="stylesheet"], style'), m = a.documentElement.querySelector("head");
          d.forEach((l) => {
            m.appendChild(l);
          }), m.querySelectorAll('link[rel="stylesheet"], style, script').forEach((l) => {
            if (l.localName == "script" && l.src) {
              const _ = document.createElement("script");
              _.setAttribute("type", "module"), _.setAttribute("src", l.getAttribute("src")), w(_, i, c, e), document.head.appendChild(_);
            } else
              w(l, i, c, e), document.head.appendChild(l);
          }), t[n] = c;
        }
        return new Promise((d, m) => {
          Promise.all(t[n]).then(() => {
            r.innerHTML = h == null ? void 0 : h.innerHTML, d(r);
          }).catch((l) => {
            m({
              type: "error",
              message: "[mfe] - Unexpected error : " + l
            });
          });
        });
      }).catch((s) => {
        throw s;
      }) : new Promise((s, c) => {
        throw {
          type: "not-found",
          data: { target: r, path: n },
          message: "[mfe] - Target not found"
        };
      });
    }
  };
}, T = (e = {}) => window.___Shell___ ? (window.___Shell___ = u(u({}, e), window.___Shell___), window.___Shell___) : (window.___Shell___ = u({}, e), window.___Shell___), w = (e, t, r, n) => {
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
  T as Shell,
  L as mfe
};
