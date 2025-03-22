function P(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var p = { exports: {} }, _ = p.exports, x;
function q() {
  return x || (x = 1, function(t, F) {
    (function(v, f) {
      t.exports = f();
    })(_, () => (() => {
      var v = {};
      return (() => {
        var f = v;
        Object.defineProperty(f, "__esModule", { value: !0 }), f.default = function(e, j) {
          var s = [], l = /* @__PURE__ */ new Set(), u = S(e), O = function() {
            return u;
          }, y = function(n) {
            if (n.call) return l.add(n), function() {
              l.delete(n);
            };
          }, b = function(n, r) {
            return s.push({ action: n, payload: r }), new Promise(function(o) {
              return h(function(a) {
                return m({ action: n, payload: r }, o);
              });
            });
          }, g = function(n) {
            return new Promise(function(r) {
              y(function(o, a) {
                var c = a.action, i = a.payload;
                c in n && h(function(d) {
                  n[c].call(null, o, { action: c, payload: i }), r(o);
                });
              });
            });
          }, m = function(n, r) {
            var o = n.action, a = n.payload, c = a === void 0 ? {} : a;
            s.forEach(function(i) {
              var d = i.action, w = i.payload, E = w === void 0 ? {} : w;
              if (d in j) {
                var M = j[d].call(null, u, E, { getState: O, subscribe: y, dispatch: b, patternMatch: g });
                Object.assign(u, M);
              } else console.log("[Oni] Error -> No action [ ".concat(d, " ] found."));
            }), s.length && (l.forEach(function(i) {
              return i(u, { action: o, payload: c });
            }), s = []), r(u);
          };
          return { getState: O, subscribe: y, dispatch: b, patternMatch: g, destroy: function() {
            return l.clear();
          } };
        };
        var S = function(e) {
          return JSON.parse(JSON.stringify(e));
        }, h = typeof window == "undefined" ? function(e) {
          return e();
        } : function(e) {
          return requestAnimationFrame(e);
        };
      })(), v;
    })());
  }(p)), p.exports;
}
var N = q();
const J = /* @__PURE__ */ P(N);
export {
  J as Store
};
