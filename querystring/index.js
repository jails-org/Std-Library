const n = () => {
  const r = new URLSearchParams(location.search), o = {};
  for (const [a, e] of r)
    o[a] = e;
  return o;
};
export {
  n as querystring
};
