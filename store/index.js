function S(o, d) {
  let i = [];
  const l = /* @__PURE__ */ new Set(), c = w(o), u = () => c, r = (a) => {
    if (a.call)
      return l.add(a), () => {
        l.delete(a);
      };
    s(a);
  }, y = (a, n) => (i.push({ action: a, payload: n }), new Promise((e) => f((t) => g({ action: a, payload: n }, e)))), s = (a) => new Promise((n) => {
    r((e, { action: t, payload: p }) => {
      t in a && f((h) => {
        a[t].call(null, e, { action: t, payload: p }), n(e);
      });
    });
  }), g = ({ action: a, payload: n = {} }, e) => {
    i.forEach(({ action: t, payload: p = {} }) => {
      if (!(t in d))
        console.log(`[Oni] Error -> No action [ ${t} ] found.`);
      else {
        const h = d[t].call(null, c, p, { getState: u, subscribe: r, dispatch: y, patternMatch: s });
        Object.assign(c, h);
      }
    }), i.length && (l.forEach((t) => t(c, { action: a, payload: n })), i = []), e(c);
  };
  return {
    getState: u,
    subscribe: r,
    dispatch: y,
    patternMatch: s,
    destroy: () => l.clear()
  };
}
const w = (o) => JSON.parse(JSON.stringify(o)), f = typeof window > "u" ? (o) => o() : (o) => requestAnimationFrame(o);
export {
  S as Store
};
