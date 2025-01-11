const n = (e, o = 100) => {
  let t = Date.now();
  return () => {
    t + o - Date.now() < 0 && (e(), t = Date.now());
  };
};
export {
  n as throttle
};
