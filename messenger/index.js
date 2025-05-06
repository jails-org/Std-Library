var w = Object.defineProperty;
var l = Object.getOwnPropertySymbols;
var a = Object.prototype.hasOwnProperty, p = Object.prototype.propertyIsEnumerable;
var r = (n, i, s) => i in n ? w(n, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[i] = s, d = (n, i) => {
  for (var s in i || (i = {}))
    a.call(i, s) && r(n, s, i[s]);
  if (l)
    for (var s of l(i))
      p.call(i, s) && r(n, s, i[s]);
  return n;
};
const f = ({
  target: n = null,
  accept: i = [],
  actions: s = {},
  origin: c = location.origin
} = {}) => {
  const m = (n == null ? void 0 : n.contentWindow) || n;
  return window.addEventListener("message", (e) => {
    if (i.includes("*") || i.includes(e.origin)) {
      const { action: o, payload: u } = e.data;
      o in s && s[o](u);
    } else
      throw {
        type: "ACCESS DENIED",
        message: "Cant receive message from: " + e.origin
      };
  }), {
    dispatch(e, o) {
      m.postMessage({ action: e, payload: o }, c);
    },
    subscribe(e) {
      s = d(d({}, e), s);
    }
  };
};
export {
  f as messenger
};
