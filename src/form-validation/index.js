var G = Object.defineProperty, H = Object.defineProperties;
var J = Object.getOwnPropertyDescriptors;
var h = Object.getOwnPropertySymbols;
var M = Object.prototype.hasOwnProperty, w = Object.prototype.propertyIsEnumerable;
var L = (t, r, e) => r in t ? G(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e, m = (t, r) => {
  for (var e in r || (r = {}))
    M.call(r, e) && L(t, e, r[e]);
  if (h)
    for (var e of h(r))
      w.call(r, e) && L(t, e, r[e]);
  return t;
}, y = (t, r) => H(t, J(r));
var S = (t, r) => {
  var e = {};
  for (var a in t)
    M.call(t, a) && r.indexOf(a) < 0 && (e[a] = t[a]);
  if (t != null && h)
    for (var a of h(t))
      r.indexOf(a) < 0 && w.call(t, a) && (e[a] = t[a]);
  return e;
};
const E = "form-validation", p = "[data-validation]", P = "[data-mask]";
function W({
  main: t,
  elm: r,
  state: e,
  on: a,
  emit: v,
  dependencies: O,
  trigger: $
}) {
  var x;
  const u = S(O, []), c = (x = r.querySelector("input,select,textarea")) == null ? void 0 : x.form;
  let d = N(c);
  t((s) => {
    a("input", "input, textarea, select", q), a("input", P, T), a("input", p, b("input")), a("change", p, b("change")), a("blur", p, b("blur")), a("focus", "input, textarea, select", _), a("blur", "input, textarea, select", j), c.addEventListener("reset", B), c.addEventListener("submit", K), z();
  }), r.setValues = (s) => {
    e.set((o) => o.form.values = m(m({}, o.form.values), s));
  };
  const z = () => {
    if (!u)
      throw new Error(
        "<form-validation> - No entities provided in dependencies"
      );
    const s = V();
    e.set((o) => o.form.values = s);
  }, V = () => {
    const s = {};
    return d.forEach((o) => s[o] = ""), s;
  }, _ = (s) => {
    const o = s.target.name;
    e.set((n) => {
      n.form.touched[o] = !0, n.form.focused[o] = !0;
    });
  }, j = (s) => {
    const o = s.target.name;
    e.set((n) => {
      n.form.focused[o] = !1;
    });
  }, b = (s) => (o) => {
    const n = o.target, f = n.name, i = I(n, c), k = n.dataset.validation.split(/\s/), g = [], D = e.get();
    k.forEach((l) => {
      if (l in u) {
        const A = u[l];
        if (!A.validate(i, n, c)) {
          const C = A.message(i, n, c);
          g.push(C);
        }
      }
    }), g.length ? s === "input" ? (d.add(n.name), e.set((l) => {
      l.form.isValid = !1, D.form.errors[f] && g[0] != D.form.errors[f] && (l.form.errors[f] = g[0]);
    })) : (s === "blur" || s === "change") && (d.add(n.name), e.set((l) => {
      l.form.errors[f] = g[0], l.form.isValid = !1;
    })) : (d.delete(n.name), e.set((l) => {
      delete l.form.errors[f], d.size || (l.form.isValid = !0);
    }).then(() => {
      const l = F(c);
      v(`${E}:valid`, m({}, l));
    }));
  }, q = (s) => {
    const { name: o } = s.target, n = I(s.target, c);
    e.set((f) => f.form.values[o] = n);
  }, K = (s) => {
    s.preventDefault(), $("blur", p);
    const n = e.get().form.errors;
    if (Object.keys(n).length)
      v(`${E}:error`, { errors: n });
    else {
      const i = F(s.target);
      v(`${E}:submit`, m({}, i));
    }
  }, T = (s) => {
    let o = s.target.value;
    const { mask: n } = s.target.dataset;
    n.split(/s/).forEach((i) => {
      if (u[i] && u[i].mask) {
        const k = u[i].mask;
        o = k(o, s.target, s.target.form);
      }
    }), e.set((i) => i.form.values[s.target.name] = o || "");
  }, B = () => {
    d = N(c), e.set({
      form: y(m({}, Q.form), {
        values: V()
      })
    });
  };
}
const Q = {
  form: {
    errors: {},
    values: {},
    touched: {},
    isValid: !1,
    focused: {}
  }
}, F = (t) => {
  const r = new FormData(t), e = {};
  for (let [a, v] of r)
    e[a] = v;
  return { formData: r, data: e };
}, I = (t, r) => {
  const { name: e, type: a } = t;
  return a == "checkbox" ? t.checked ? t.value : "" : r[e].value;
}, N = (t) => {
  const r = /* @__PURE__ */ new Set();
  return Array.from(t.elements).filter((e) => e.name && e.dataset.validation).forEach((e) => r.add(e.name)), r;
};
export {
  W as default,
  Q as model
};
