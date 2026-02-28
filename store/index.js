function j(n, f) {
  let o = [], a = !1;
  const s = /* @__PURE__ */ new Set(), t = O(n), l = () => t, p = (e) => (s.add(e), () => s.delete(e)), d = (e, i = {}) => (o.push({ action: e, payload: i }), new Promise((c) => {
    a || y(c);
  })), y = (e) => {
    for (a = !0; o.length; ) {
      const i = o.slice();
      o = [];
      for (const { action: c, payload: b } of i) {
        const u = f[c];
        if (!u) continue;
        const r = u(t, b, {
          getState: l,
          subscribe: p,
          dispatch: d
        });
        r && typeof r == "object" && Object.assign(t, r), s.forEach(
          (h) => h(t, { action: c, payload: b })
        );
      }
    }
    a = !1, e(t);
  }, S = () => s.clear(), g = Object.fromEntries(
    Object.keys(f).map((e) => [e, e])
  );
  return {
    getState: l,
    dispatch: d,
    subscribe: p,
    destroy: S,
    Actions: g
  };
}
const O = (n) => JSON.parse(JSON.stringify(n));
export {
  j as Store
};
