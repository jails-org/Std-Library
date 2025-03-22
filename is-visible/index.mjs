const v = (e, { root: n = null, rootMargin: o = "0px", threshold: i = 0 } = {}) => new Promise((c, b) => {
  const r = new IntersectionObserver((s) => {
    s.forEach((t) => {
      t.isIntersecting && (c(s), r.unobserve(e));
    });
  }, { root: n, rootMargin: o, threshold: i });
  r.observe(e);
});
export {
  v as isVisible
};
