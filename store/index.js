function w(o, p) {
  let l = [];
  const s = /* @__PURE__ */ new Set(), e = g(o), b = () => e, r = (a) => a.call ? (s.add(a), () => {
    s.delete(a);
  }) : () => {
    d(a).then(({ __unsubscribe: n }) => n());
  }, h = (a, n) => (l.push({ action: a, payload: n }), new Promise((c) => y((t) => f({ action: a, payload: n }, c)))), d = (a) => new Promise((n) => {
    let c = r((t, { action: i, payload: u }) => {
      i in a && y((S) => {
        a[i].call(null, t, { action: i, payload: u }), t.__unsubscribe = c, n(t);
      });
    });
  }), f = ({ action: a, payload: n = {} }, c) => {
    l.forEach(({ action: t, payload: i = {} }) => {
      if (!(t in p))
        console.log(`[Oni] Error -> No action [ ${t} ] found.`);
      else {
        const u = p[t].call(null, e, i, { getState: b, subscribe: r, dispatch: h, patternMatch: d });
        Object.assign(e, u);
      }
    }), l.length && (s.forEach((t) => t(e, { action: a, payload: n })), l = []), c(e);
  };
  return {
    getState: b,
    subscribe: r,
    dispatch: h,
    patternMatch: d,
    destroy: () => s.clear()
  };
}
const g = (o) => JSON.parse(JSON.stringify(o)), y = typeof window > "u" ? (o) => o() : (o) => requestAnimationFrame(o);
export {
  w as Store
};
