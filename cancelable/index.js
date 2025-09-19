const i = (l) => {
  let e = 0;
  return (...n) => {
    const c = ++e;
    return new Promise((r, a) => {
      l(...n).then((t) => {
        c === e && r(t);
      }).catch((t) => {
        c === e && a(t);
      });
    });
  };
};
export {
  i as cancelable
};
