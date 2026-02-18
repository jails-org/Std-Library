const r = (e, o = 100) => {
  let t = Date.now();
  return (...n) => {
    t + o - Date.now() < 0 && (e(...n), t = Date.now());
  };
};
export {
  r as throttle
};
