var C = Object.defineProperty, G = Object.defineProperties;
var H = Object.getOwnPropertyDescriptors;
var h = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty, M = Object.prototype.propertyIsEnumerable;
var A = (t, r, e) => r in t ? C(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, v = (t, r) => {
  for (var e in r || (r = {}))
    L.call(r, e) && A(t, e, r[e]);
  if (h)
    for (var e of h(r))
      M.call(r, e) && A(t, e, r[e]);
  return t;
}, w = (t, r) => G(t, H(r));
var y = (t, r) => {
  var e = {};
  for (var a in t)
    L.call(t, a) && r.indexOf(a) < 0 && (e[a] = t[a]);
  if (t != null && h)
    for (var a of h(t))
      r.indexOf(a) < 0 && M.call(t, a) && (e[a] = t[a]);
  return e;
};
const S = "form-validation", p = "[data-validation]", J = "[data-mask]";
function W({
  main: t,
  elm: r,
  state: e,
  on: a,
  emit: g,
  dependencies: N,
  trigger: O
}) {
  var V;
  const u = y(N, []), f = (V = r.querySelector("input,select,textarea")) == null ? void 0 : V.form;
  let m = I(f);
  t((s) => {
    a("input", "input, textarea, select", j), a("input", J, K), a("input", p, b("input")), a("change", p, b("change")), a("blur", p, b("blur")), a("focus", "input, textarea, select", _), a("blur", "input, textarea, select", $), f.addEventListener("reset", T), f.addEventListener("submit", q), z();
  }), r.setValues = (s) => {
    e.set((o) => o.form.values = v(v({}, o.form.values), s));
  };
  const z = () => {
    if (!u)
      throw new Error(
        "<form-validation> - No entities provided in dependencies"
      );
    const s = E();
    e.set((o) => o.form.values = s);
  }, E = () => {
    const s = {};
    return m.forEach((o) => s[o] = ""), s;
  }, _ = (s) => {
    const o = s.target.name;
    e.set((n) => {
      n.form.touched[o] = !0, n.form.focused[o] = !0;
    });
  }, $ = (s) => {
    const o = s.target.name;
    e.set((n) => {
      n.form.focused[o] = !1;
    });
  }, b = (s) => (o) => {
    const n = o.target, c = n.name, l = F(n, f), k = n.dataset.validation.split(/\s/), d = [], x = e.get();
    k.forEach((i) => {
      if (i in u) {
        const D = u[i];
        if (!D.validate(l, n, f)) {
          const B = D.message(l, n, f);
          d.push(B);
        }
      }
    }), d.length ? s === "input" ? (m.add(n.name), e.set((i) => {
      i.form.isValid = !1, x.form.errors[c] && d[0] != x.form.errors[c] && (i.form.errors[c] = d[0]);
    })) : (s === "blur" || s === "change") && (m.add(n.name), e.set((i) => {
      i.form.errors[c] = d[0], i.form.isValid = !1;
    })) : (m.delete(n.name), e.set((i) => {
      delete i.form.errors[c], m.size || (i.form.isValid = !0);
    }));
  }, j = (s) => {
    const { name: o } = s.target, n = F(s.target, f);
    e.set((c) => c.form.values[o] = n);
  }, q = (s) => {
    s.preventDefault(), O("blur", p);
    const n = e.get().form.errors;
    if (Object.keys(n).length)
      g(`${S}:error`, { errors: n });
    else {
      const l = Q(s.target);
      g(`${S}:submit`, v({}, l));
    }
  }, K = (s) => {
    let o = s.target.value;
    const { mask: n } = s.target.dataset;
    n.split(/s/).forEach((l) => {
      if (u[l] && u[l].mask) {
        const k = u[l].mask;
        o = k(o, s.target, s.target.form);
      }
    }), e.set((l) => l.form.values[s.target.name] = o || "");
  }, T = () => {
    m = I(f), e.set({
      form: w(v({}, P.form), {
        values: E()
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
}, Q = (t) => {
  const r = new FormData(t), e = {};
  for (let [a, g] of r)
    e[a] = g;
  return { formData: r, data: e };
}, F = (t, r) => {
  const { name: e, type: a } = t;
  return a == "checkbox" ? t.checked ? t.value : "" : r[e].value;
}, I = (t) => {
  const r = /* @__PURE__ */ new Set();
  return Array.from(t.elements).filter((e) => e.name && e.dataset.validation).forEach((e) => r.add(e.name)), r;
};
export {
  W as default,
  P as model
};
