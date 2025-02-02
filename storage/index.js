const s = {
  local: {
    set(t, e) {
      return localStorage.setItem(t, JSON.stringify(e)), e;
    },
    get(t) {
      let e = localStorage.getItem(t);
      try {
        e = JSON.parse(e);
      } catch (r) {
      }
      return e;
    },
    remove(t) {
      let e = this.get(t);
      return localStorage.removeItem(t), e;
    }
  },
  session: {
    set(t, e) {
      return sessionStorage.setItem(t, JSON.stringify(e)), e;
    },
    get(t) {
      let e = sessionStorage.getItem(t);
      try {
        e = JSON.parse(e);
      } catch (r) {
      }
      return e;
    },
    remove(t) {
      let e = this.get(t);
      return sessionStorage.removeItem(t), e;
    }
  }
};
export {
  s as storage
};
