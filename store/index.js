function S(e, d) {
  let r = [];
  const l = /* @__PURE__ */ new Set(), c = g(e), p = () => c, s = (a) => {
    if (a.call)
      return l.add(a), () => {
        l.delete(a);
      };
    {
      const n = (t, { action: o, payload: i }) => {
        o in a && a[o].call(null, t, { action: o, payload: i });
      };
      return l.add(n), () => {
        l.delete(n);
      };
    }
  }, u = (a, n) => (r.push({ action: a, payload: n }), new Promise(
    (t) => f({ action: a, payload: n }, t)
  )), y = (a) => new Promise((n) => {
    s((t, { action: o, payload: i }) => {
      o in a && w((h) => {
        a[o].call(null, t, { action: o, payload: i }), n(t);
      });
    });
  }), f = ({ action: a, payload: n = {} }, t) => {
    r.forEach(({ action: o, payload: i = {} }) => {
      if (!(o in d))
        console.log(`[Oni] Error -> No action [ ${o} ] found.`);
      else {
        const h = d[o].call(null, c, i, {
          getState: p,
          subscribe: s,
          dispatch: u,
          patternMatch: y
        });
        Object.assign(c, h);
      }
    }), r.length && (l.forEach((o) => o(c, { action: a, payload: n })), r = []), t(c);
  };
  return {
    getState: p,
    subscribe: s,
    dispatch: u,
    patternMatch: y,
    destroy: () => l.clear()
  };
}
const g = (e) => JSON.parse(JSON.stringify(e)), w = typeof window > "u" ? (e) => e() : (e) => requestAnimationFrame(e);
export {
  S as Store
};
