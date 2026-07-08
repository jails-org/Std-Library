const a = ({
  target: o = null,
  accept: i = [],
  origin: d = location.origin
}) => {
  const t = (o == null ? void 0 : o.contentWindow) || o, s = {};
  return window.addEventListener("message", (n) => {
    if (i.includes("*") || i.includes(n.origin)) {
      const { payload: e, event: l } = n.data;
      s[l] && s[l].apply(null, e);
    } else
      throw {
        type: "ACCESS DENIED",
        message: "Cant receive message from: " + n.origin
      };
  }), {
    on(n, e) {
      s[n] = e;
    },
    emit(n, ...e) {
      t.postMessage({ event: n, payload: e }, d);
    },
    remove(n) {
      delete s[n];
    }
  };
};
export {
  a as Channel
};
