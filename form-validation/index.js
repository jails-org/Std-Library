var T = Object.defineProperty, B = Object.defineProperties;
var C = Object.getOwnPropertyDescriptors;
var D = Object.getOwnPropertySymbols;
var G = Object.prototype.hasOwnProperty, H = Object.prototype.propertyIsEnumerable;
var A = (s, r, e) => r in s ? T(s, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[r] = e, b = (s, r) => {
  for (var e in r || (r = {}))
    G.call(r, e) && A(s, e, r[e]);
  if (D)
    for (var e of D(r))
      H.call(r, e) && A(s, e, r[e]);
  return s;
}, L = (s, r) => B(s, C(r));
const M = "form-validation", v = "[data-validation]", J = "[data-mask]";
function U({
  main: s,
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
  s((t) => {
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
    e.set((a) => {
      a.form.touched[o] = !0, a.form.focused[o] = !0;
    });
  }, O = (t) => {
    const o = t.target.name;
    e.set((a) => {
      a.form.focused[o] = !1;
    });
  }, h = (t) => (o) => {
    const a = o.target, i = a.name, c = w(a, f), p = a.dataset.validation.split(/\s/), d = [], x = e.get();
    p.forEach((l) => {
      if (l in g) {
        const { ok: q, message: K } = g[l](
          c,
          a,
          f
        );
        q || d.push(K);
      }
    }), d.length ? t === "input" ? (u.add(a.name), e.set((l) => {
      l.form.isValid = !1, x.form.errors[i] && d[0] != x.form.errors[i] && (l.form.errors[i] = d[0]);
    })) : (t === "blur" || t === "change") && (u.add(a.name), e.set((l) => {
      l.form.errors[i] = d[0], l.form.isValid = !1;
    })) : (u.delete(a.name), e.set((l) => {
      delete l.form.errors[i], u.size || (l.form.isValid = !0);
    }));
  }, z = (t) => {
    const { name: o } = t.target, a = w(t.target, f);
    e.set((i) => i.form.values[o] = a);
  }, _ = (t) => {
    t.preventDefault(), F("blur", v);
    const a = e.get().form.errors;
    if (Object.keys(a).length)
      m(`${M}:error`, { errors: a });
    else {
      const c = Q(t.target);
      m(`${M}:submit`, b({}, c));
    }
  }, $ = (t) => {
    let o = t.target.value;
    const { mask: a } = t.target.dataset;
    a.split(/s/).forEach((c) => {
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
}, Q = (s) => {
  const r = new FormData(s), e = {};
  for (let [n, m] of r)
    e[n] = m;
  return { formData: r, data: e };
}, w = (s, r) => {
  const { name: e, type: n } = s;
  return n == "checkbox" ? s.checked ? s.value : "" : r[e].value;
}, S = (s) => {
  const r = /* @__PURE__ */ new Set();
  return Array.from(s.elements).filter((e) => e.name).forEach((e) => r.add(e.name)), r;
};
export {
  U as default,
  P as model
};
