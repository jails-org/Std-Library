function y(n, a) {
  let c = [];
  const i = /* @__PURE__ */ new Set(), o = O(n), d = () => o, l = (e) => {
    if (e.call)
      return i.add(e), () => {
        i.delete(e);
      };
  }, p = (e, r) => (c.push({ action: e, payload: r }), new Promise((s) => g((t) => w({ action: e, payload: r }, s)))), f = (e) => new Promise((r) => {
    l((s, { action: t, payload: u }) => {
      t in e && g((h) => {
        e[t].call(null, s, { action: t, payload: u }), r(s);
      });
    });
  }), w = ({ action: e, payload: r = {} }, s) => {
    c.forEach(({ action: t, payload: u = {} }) => {
      if (!(t in a))
        console.log(`[Oni] Error -> No action [ ${t} ] found.`);
      else {
        const h = a[t].call(null, o, u, { getState: d, subscribe: l, dispatch: p, patternMatch: f });
        Object.assign(o, h);
      }
    }), c.length && (i.forEach((t) => t(o, { action: e, payload: r })), c = []), s(o);
  };
  return {
    getState: d,
    subscribe: l,
    dispatch: p,
    patternMatch: f,
    destroy: () => i.clear()
  };
}
const O = (n) => JSON.parse(JSON.stringify(n)), g = typeof window == "undefined" ? (n) => n() : (n) => requestAnimationFrame(n);
export {
  y as Store
};
