const r = (t, n = 250) => {
  let e;
  return (...o) => {
    clearTimeout(e), e = setTimeout(() => {
      t.apply(void 0, o);
    }, n);
  };
};
export {
  r as debounce
};
