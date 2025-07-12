var T = Object.defineProperty, B = Object.defineProperties;
var C = Object.getOwnPropertyDescriptors;
var D = Object.getOwnPropertySymbols;
var G = Object.prototype.hasOwnProperty, H = Object.prototype.propertyIsEnumerable;
var A = (a, r, e) => r in a ? T(a, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[r] = e, b = (a, r) => {
  for (var e in r || (r = {}))
    G.call(r, e) && A(a, e, r[e]);
  if (D)
    for (var e of D(r))
      H.call(r, e) && A(a, e, r[e]);
  return a;
}, L = (a, r) => B(a, C(r));
const M = "form-validation", v = "[data-validation]", J = "[data-mask]";
function U({
  main: a,
  elm: r,
  state: e,
  on: n,
  emit: m,
  dependencies: y,
  trigger: F
}) {
  var V;
  const { validations: g, masks: E } = y, f = (V = r.querySelector("input,select,textarea")) == null ? void 0 : V.form;
  let u = S(f);
  a((t) => {
    n("input", "input, textarea, select", z), n("input", J, $), n("input", v, h("input")), n("change", v, h("change")), n("blur", v, h("blur")), n("focus", "input, textarea, select", N), n("blur", "input, textarea, select", O), f.addEventListener("reset", j), f.addEventListener("submit", _), I();
  });
  const I = () => {
    if (!g)
      throw new Error(
        "<form-validation> - No validations provided in dependencies"
      );
    const t = k();
    e.set((o) => o.form.values = t);
  }, k = () => {
    const t = {};
    return u.forEach((o) => t[o] = ""), t;
  }, N = (t) => {
    const o = t.target.name;
    e.set((s) => {
      s.form.touched[o] = !0, s.form.focused[o] = !0;
    });
  }, O = (t) => {
    const o = t.target.name;
    e.set((s) => {
      s.form.focused[o] = !1;
    });
  }, h = (t) => (o) => {
    const s = o.target, l = s.name, c = w(s, f), p = s.dataset.validation.split(/\s/), d = [], x = e.get();
    p.forEach((i) => {
      if (i in g) {
        const { ok: q, message: K } = g[i](
          c,
          s,
          f
        );
        q || d.push(K);
      }
    }), d.length ? t === "input" ? (u.add(s.name), e.set((i) => {
      i.form.isValid = !1, x.form.errors[l] && d[0] != x.form.errors[l] && (i.form.errors[l] = d[0]);
    })) : (t === "blur" || t === "change") && (u.add(s.name), e.set((i) => {
      i.form.errors[l] = d[0], i.form.isValid = !1;
    })) : (u.delete(s.name), e.set((i) => {
      delete i.form.errors[l], u.size || (i.form.isValid = !0);
    }));
  }, z = (t) => {
    const { name: o } = t.target, s = w(t.target, f);
    e.set((l) => l.form.values[o] = s);
  }, _ = (t) => {
    t.preventDefault(), F("blur", v);
    const s = e.get().form.errors;
    if (Object.keys(s).length)
      m(`${M}:error`, { errors: s });
    else {
      const c = Q(t.target);
      m(`${M}:submit`, b({}, c));
    }
  }, $ = (t) => {
    let o = t.target.value;
    const { mask: s } = t.target.dataset;
    s.split(/s/).forEach((c) => {
      if (c && c in E) {
        const p = E[c];
        o = p(o, t.target, t.target.form);
      }
    }), e.set((c) => c.form.values[t.target.name] = o || "");
  }, j = () => {
    u = S(f), e.set({
      form: L(b({}, P.form), {
        values: k()
      })
    });
  };
}
const P = {
  form: {
    errors: {},
    values: {},
    touched: {},
    isValid: !1,
    focused: {}
  }
}, Q = (a) => {
  const r = new FormData(a), e = {};
  for (let [n, m] of r)
    e[n] = m;
  return { formData: r, data: e };
}, w = (a, r) => {
  const { name: e, type: n } = a;
  return n == "checkbox" ? a.checked ? a.value : "" : r[e].value;
}, S = (a) => {
  const r = /* @__PURE__ */ new Set();
  return Array.from(a.elements).filter((e) => e.name && e.dataset.validation).forEach((e) => r.add(e.name)), r;
};
export {
  U as default,
  P as model
};
