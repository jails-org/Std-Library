function S(l, d) {
  let s = [], r = !1;
  const n = /* @__PURE__ */ new Set(), c = h(l), u = () => c, f = (t) => {
    if (t.call)
      return n.add(t), () => {
        n.delete(t);
      };
    {
      const a = (o, { action: e, payload: i }) => {
        e in t && t[e].call(null, o, { action: e, payload: i });
      };
      return n.add(a), () => {
        n.delete(a);
      };
    }
  }, p = (t, a = {}) => (s.push({ action: t, payload: a }), new Promise((o) => {
    r || y(o);
  })), y = (t) => {
    for (r = !0; s.length; ) {
      const a = s.slice();
      s = [];
      for (const { action: o, payload: e } of a) {
        if (!(o in d)) {
          console.log(`[Oni] Error -> No action [ ${o} ] found.`);
          continue;
        }
        const i = d[o].call(null, c, e, {
          getState: u,
          subscribe: f,
          dispatch: p
        });
        Object.assign(c, i), n.forEach((g) => g(c, { action: o, payload: e }));
      }
    }
    r = !1, t(c);
  };
  return {
    getState: u,
    subscribe: f,
    dispatch: p,
    destroy: () => n.clear()
  };
}
const h = (l) => JSON.parse(JSON.stringify(l));
export {
  S as Store
};
