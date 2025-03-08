const d = ({ timeout: e = 5e3 } = {}) => {
  const l = {};
  return {
    renderJS({ target: n, tag: s, src: r }) {
      return n.innerHTML = `<${s}></${s}>`, new Promise((t, i) => {
        const o = document.createElement("script");
        o.src = r, o.async = !0, o.onload = () => t(n), o.onerror = (a) => i({
          type: "error",
          message: `[mfe] - ${a.type} loading script`
        }), document.head.appendChild(o);
      });
    },
    render(n, s) {
      return fetch(s).then((r) => r.text()).then((r) => {
        const t = [], i = new URL(s), a = new DOMParser().parseFromString(r, "text/html"), m = a.documentElement.querySelector("body");
        if (!l[s]) {
          const p = m.querySelectorAll('script, link[rel="stylesheet"], style'), h = a.documentElement.querySelector("head");
          p.forEach((c) => {
            h.appendChild(c);
          }), h.querySelectorAll('link[rel="stylesheet"], style, script').forEach((c) => {
            if (c.localName == "script" && c.src) {
              const u = document.createElement("script");
              u.setAttribute("type", "module"), u.setAttribute("src", c.getAttribute("src")), f(u, i, t, e), document.head.appendChild(u);
            } else
              f(c, i, t, e), document.head.appendChild(c);
          }), l[s] = t;
        }
        return new Promise((p, h) => {
          Promise.all(l[s]).then(() => {
            n.innerHTML = m == null ? void 0 : m.innerHTML, p(n);
          }).catch((c) => {
            h({
              type: "error",
              message: "[mfe] - Unexpected error : " + c
            });
          });
        });
      }).catch((r) => {
        throw r;
      });
    }
  };
}, f = (e, l, n, s) => {
  if (e.src && e.getAttribute("src").startsWith("/")) {
    const { pathname: r, search: t } = new URL(e.src);
    e.src = l.origin + r + t;
  } else if (e.href && e.getAttribute("href").startsWith("/")) {
    const { pathname: r, search: t } = new URL(e.href);
    e.href = l.origin + r + t;
  }
  return (e.src || e.href && e.rel == "stylesheet") && n.push(new Promise((r, t) => {
    const i = setTimeout(() => {
      t({
        type: "error",
        message: `[mfe] - Timeout exceeded ${e} resolving after milisseconds.`
      });
    }, s);
    e.addEventListener("load", () => {
      clearTimeout(i), r(e);
    }), e.addEventListener("error", () => {
      clearTimeout(i), t({
        type: "error",
        message: `[mfe] - Error to fetch : ${e.src}`
      });
    });
  })), n;
};
export {
  d as mfe
};
