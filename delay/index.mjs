const r = (e = 100) => (t) => new Promise((o) => {
  setTimeout(() => o(t), e);
});
export {
  r as delay
};
