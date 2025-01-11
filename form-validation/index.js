var K = Object.defineProperty, T = Object.defineProperties;
var B = Object.getOwnPropertyDescriptors;
var A = Object.getOwnPropertySymbols;
var C = Object.prototype.hasOwnProperty, G = Object.prototype.propertyIsEnumerable;
var L = (s, r, e) => r in s ? K(s, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[r] = e, E = (s, r) => {
  for (var e in r || (r = {}))
    C.call(r, e) && L(s, e, r[e]);
  if (A)
    for (var e of A(r))
      G.call(r, e) && L(s, e, r[e]);
  return s;
}, M = (s, r) => T(s, B(r));
const w = "form-validation", m = "[data-validation]", H = "[data-mask]";
function R({
  main: s,
  elm: r,
  state: e,
  on: i,
  emit: g,
  dependencies: y,
  trigger: F
}) {
  var V;
  const { validations: h, masks: b } = y, f = (V = r.querySelector("input,select,textarea")) == null ? void 0 : V.form;
  let d = S(f);
  s((t) => {
    i("input", "input, textarea, select", N), i("input", H, z), i("focus", m, _), i("input", m, v("input")), i("change", m, v("change")), i("blur", m, v("blur")), f.addEventListener("reset", $), f.addEventListener("submit", O), I();
  });
  const I = () => {
    if (!h)
      throw new Error(
        "<form-validation> - No validations provided in dependencies"
      );
    const t = k();
    e.set((a) => a.form.fields = t);
  }, k = () => {
    const t = {};
    return d.forEach((a) => t[a] = ""), t;
  }, v = (t) => (a) => {
    const o = a.target, l = o.name, c = x(o, f), p = o.dataset.validation.split(/\s/), u = [], D = e.get();
    p.forEach((n) => {
      if (n in h) {
        const { ok: j, message: q } = h[n](
          c,
          o,
          f
        );
        j || u.push(q);
      }
    }), u.length ? t === "input" ? (d.add(o.name), e.set((n) => {
      n.form.isValid = !1, D.form.errors[l] && u[0] != D.form.errors[l] && (n.form.errors[l] = u[0]);
    })) : (t === "blur" || t === "change") && (d.add(o.name), e.set((n) => {
      n.form.errors[l] = u[0], n.form.isValid = !1;
    })) : (d.delete(o.name), e.set((n) => {
      delete n.form.errors[l], d.size || (n.form.isValid = !0);
    }));
  }, N = (t) => {
    const { name: a } = t.target, o = x(t.target, f);
    e.set((l) => l.form.fields[a] = o);
  }, O = (t) => {
    t.preventDefault(), F("blur", m);
    const o = e.get().form.errors;
    if (Object.keys(o).length)
      g(`${w}:error`, { errors: o });
    else {
      const c = P(t.target);
      g(`${w}:submit`, E({}, c));
    }
  }, z = (t) => {
    let a = t.target.value;
    const { mask: o } = t.target.dataset;
    o.split(/s/).forEach((c) => {
      if (c && c in b) {
        const p = b[c];
        a = p(a, t.target, t.target.form);
      }
    }), e.set((c) => c.form.fields[t.target.name] = a || "");
  }, _ = (t) => {
    e.set((a) => a.form.touched[t.target.name] = !0);
  }, $ = () => {
    d = S(f), e.set({
      form: M(E({}, J.form), {
        fields: k()
      })
    });
  };
}
const J = {
  form: {
    errors: {},
    fields: {},
    touched: {},
    isValid: !1
  }
}, P = (s) => {
  const r = new FormData(s), e = {};
  for (let [i, g] of r)
    e[i] = g;
  return { formData: r, data: e };
}, x = (s, r) => {
  const { name: e, type: i } = s;
  return i == "checkbox" ? s.checked ? s.value : "" : r[e].value;
}, S = (s) => {
  const r = /* @__PURE__ */ new Set();
  return Array.from(s.elements).filter((e) => e.name).forEach((e) => r.add(e.name)), r;
};
export {
  R as default,
  J as model
};
