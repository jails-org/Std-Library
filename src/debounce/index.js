const i = (t, o = 250) => {
  let e;
  return (...r) => {
    clearTimeout(e), e = setTimeout(() => {
      t.apply(void 0, r);
    }, o);
  };
};
export {
  i as debounce
};
