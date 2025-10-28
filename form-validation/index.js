var T = Object.defineProperty, B = Object.defineProperties;
var C = Object.getOwnPropertyDescriptors;
var D = Object.getOwnPropertySymbols;
var G = Object.prototype.hasOwnProperty, H = Object.prototype.propertyIsEnumerable;
var A = (a, r, e) => r in a ? T(a, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[r] = e, m = (a, r) => {
  for (var e in r || (r = {}))
    G.call(r, e) && A(a, e, r[e]);
  if (D)
    for (var e of D(r))
      H.call(r, e) && A(a, e, r[e]);
  return a;
}, L = (a, r) => B(a, C(r));
const M = "form-validation", g = "[data-validation]", J = "[data-mask]";
function U({
  main: a,
  elm: r,
  state: e,
  on: n,
  emit: v,
  dependencies: y,
  trigger: F
}) {
  var k;
  const { validations: h, masks: E } = y, f = (k = r.querySelector("input,select,textarea")) == null ? void 0 : k.form;
  let u = S(f);
  a((t) => {
    n("input", "input, textarea, select", z), n("input", J, $), n("input", g, p("input")), n("change", g, p("change")), n("blur", g, p("blur")), n("focus", "input, textarea, select", N), n("blur", "input, textarea, select", O), f.addEventListener("reset", j), f.addEventListener("submit", _), I();
  }), r.setValues = (t) => {
    e.set((s) => s.form.values = m(m({}, s.form.values), t));
  };
  const I = () => {
    if (!h)
      throw new Error(
        "<form-validation> - No validations provided in dependencies"
      );
    const t = V();
    e.set((s) => s.form.values = t);
  }, V = () => {
    const t = {};
    return u.forEach((s) => t[s] = ""), t;
  }, N = (t) => {
    const s = t.target.name;
    e.set((o) => {
      o.form.touched[s] = !0, o.form.focused[s] = !0;
    });
  }, O = (t) => {
    const s = t.target.name;
    e.set((o) => {
      o.form.focused[s] = !1;
    });
  }, p = (t) => (s) => {
    const o = s.target, i = o.name, c = w(o, f), b = o.dataset.validation.split(/\s/), d = [], x = e.get();
    b.forEach((l) => {
      if (l in h) {
        const { ok: q, message: K } = h[l](
          c,
          o,
          f
        );
        q || d.push(K);
      }
    }), d.length ? t === "input" ? (u.add(o.name), e.set((l) => {
      l.form.isValid = !1, x.form.errors[i] && d[0] != x.form.errors[i] && (l.form.errors[i] = d[0]);
    })) : (t === "blur" || t === "change") && (u.add(o.name), e.set((l) => {
      l.form.errors[i] = d[0], l.form.isValid = !1;
    })) : (u.delete(o.name), e.set((l) => {
      delete l.form.errors[i], u.size || (l.form.isValid = !0);
    }));
  }, z = (t) => {
    const { name: s } = t.target, o = w(t.target, f);
    e.set((i) => i.form.values[s] = o);
  }, _ = (t) => {
    t.preventDefault(), F("blur", g);
    const o = e.get().form.errors;
    if (Object.keys(o).length)
      v(`${M}:error`, { errors: o });
    else {
      const c = Q(t.target);
      v(`${M}:submit`, m({}, c));
    }
  }, $ = (t) => {
    let s = t.target.value;
    const { mask: o } = t.target.dataset;
    o.split(/s/).forEach((c) => {
      if (c && c in E) {
        const b = E[c];
        s = b(s, t.target, t.target.form);
      }
    }), e.set((c) => c.form.values[t.target.name] = s || "");
  }, j = () => {
    u = S(f), e.set({
      form: L(m({}, P.form), {
        values: V()
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
  for (let [n, v] of r)
    e[n] = v;
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
