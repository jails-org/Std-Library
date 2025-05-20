function S(e, d) {
  let r = [];
  const l = /* @__PURE__ */ new Set(), c = w(e), p = () => c, s = (o) => {
    if (o.call)
      return l.add(o), () => {
        l.delete(o);
      };
    {
      const n = (t, { action: a, payload: i }) => {
        a in o && o[a].call(null, t, { action: a, payload: i });
      };
      return () => {
        l.delete(n);
      };
    }
  }, u = (o, n) => (r.push({ action: o, payload: n }), new Promise((t) => f((a) => g({ action: o, payload: n }, t)))), y = (o) => new Promise((n) => {
    s((t, { action: a, payload: i }) => {
      a in o && f((h) => {
        o[a].call(null, t, { action: a, payload: i }), n(t);
      });
    });
  }), g = ({ action: o, payload: n = {} }, t) => {
    r.forEach(({ action: a, payload: i = {} }) => {
      if (!(a in d))
        console.log(`[Oni] Error -> No action [ ${a} ] found.`);
      else {
        const h = d[a].call(null, c, i, { getState: p, subscribe: s, dispatch: u, patternMatch: y });
        Object.assign(c, h);
      }
    }), r.length && (l.forEach((a) => a(c, { action: o, payload: n })), r = []), t(c);
  };
  return {
    getState: p,
    subscribe: s,
    dispatch: u,
    patternMatch: y,
    destroy: () => l.clear()
  };
}
const w = (e) => JSON.parse(JSON.stringify(e)), f = typeof window > "u" ? (e) => e() : (e) => requestAnimationFrame(e);
export {
  S as Store
};
