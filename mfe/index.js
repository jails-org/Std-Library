var T = Object.defineProperty;
var b = Object.getOwnPropertySymbols;
var A = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable;
var L = (n, e, t) => e in n ? T(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, p = (n, e) => {
  for (var t in e || (e = {}))
    A.call(e, t) && L(n, t, e[t]);
  if (b)
    for (var t of b(e))
      E.call(e, t) && L(n, t, e[t]);
  return n;
};
var w = (n, e, t) => new Promise((l, s) => {
  var h = (r) => {
    try {
      a(t.next(r));
    } catch (d) {
      s(d);
    }
  }, u = (r) => {
    try {
      a(t.throw(r));
    } catch (d) {
      s(d);
    }
  }, a = (r) => r.done ? l(r.value) : Promise.resolve(r.value).then(h, u);
  a((t = t.apply(n, e)).next());
});
const P = ({ timeout: n = 5e3 } = {}) => {
  const e = {};
  return {
    renderJS({ target: l, tag: s, src: h }) {
      return l.innerHTML = `<${s}></${s}>`, new Promise((u, a) => {
        const r = document.createElement("script");
        r.src = h, r.async = !0, r.onload = () => u(l), r.onerror = (d) => a({
          type: "error",
          message: `[mfe] - ${d.type} loading script`
        }), document.head.appendChild(r);
      });
    },
    render(l, s) {
      return w(this, null, function* () {
        if (!l)
          return new Promise((h, u) => {
            throw {
              type: "not-found",
              data: { target: l, path },
              message: "[mfe] - Target not found"
            };
          });
        if (e[s])
          e[s].push({ target: l });
        else {
          e[s] = [];
          const h = yield fetch(s).then((o) => o.text()), a = new DOMParser().parseFromString(h, "text/html"), r = a.querySelectorAll('link[rel="stylesheet"], style'), d = a.querySelectorAll("script"), f = new URL(s), y = [];
          r.forEach((o) => {
            switch (o.localName) {
              case "link":
                const c = document.createElement("link");
                c.setAttribute("rel", "stylesheet"), c.setAttribute("href", new URL(o.getAttribute("href") || "", f).href), y.push(new Promise((i, m) => {
                  c.onload = () => i(!0), c.onerror = () => m(new Error(`Failed to load ${c.href}`));
                })), document.head.appendChild(c);
                break;
              case "style":
                const _ = document.createElement("style");
                _.innerHTML = o.innerHTML, document.head.appendChild(_);
                break;
            }
          });
          const S = [];
          return d.forEach((o) => {
            S.push(() => new Promise((c, _) => {
              const i = document.createElement("script");
              for (const m of o.attributes)
                i.setAttribute(m.name, m.value);
              if (o.text) {
                i.text = o.text, document.head.appendChild(i), c();
                return;
              }
              o.src && (i.setAttribute("src", new URL(o.getAttribute("src") || "", f).href), i.onload = c, i.onerror = _, document.head.appendChild(i));
            }));
          }), new Promise((o) => {
            Promise.allSettled(y).then(() => l.innerHTML = a.body.innerHTML).then(() => M(S)).then(() => setTimeout(o, 1e3)).then(() => e[s].forEach(({ target: c }) => c.innerHTML = a.body.innerHTML));
          });
        }
      });
    }
  };
}, k = (n = {}) => window.___Shell___ ? (window.___Shell___ = p(p({}, n), window.___Shell___), window.___Shell___) : (window.___Shell___ = p({}, n), window.___Shell___), M = (n) => w(void 0, null, function* () {
  const e = [];
  for (const t of n) {
    const l = yield t();
    e.push(l);
  }
  return e;
});
export {
  k as Shell,
  P as mfe
};
