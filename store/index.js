function _(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var l = { exports: {} }, q = l.exports, x;
function N() {
  return x || (x = 1, function(t, F) {
    (function(d, u) {
      t.exports = u();
    })(q, () => (() => {
      var d = {};
      return (() => {
        var u = d;
        Object.defineProperty(u, "__esModule", { value: !0 }), u.default = function(r, h) {
          var c = [], f = /* @__PURE__ */ new Set(), i = S(r), j = function() {
            return i;
          }, p = function(n) {
            if (n.call) return f.add(n), function() {
              f.delete(n);
            };
          }, O = function(n, o) {
            return c.push({ action: n, payload: o }), new Promise(function(a) {
              return w(function(e) {
                return E({ action: n, payload: o }, a);
              });
            });
          }, b = function(n) {
            p(function(o, a) {
              var e = a.action, v = a.payload;
              e in n && n[e].call(null, o, { action: e, payload: v });
            });
          }, E = function(n, o) {
            var a = n.action, e = n.payload, v = e === void 0 ? {} : e;
            c.forEach(function(s) {
              var y = s.action, g = s.payload, m = g === void 0 ? {} : g;
              if (y in h) {
                var M = h[y].call(null, i, m, { getState: j, subscribe: p, dispatch: O, patternMatch: b });
                Object.assign(i, M);
              } else console.log("[Oni] Error -> No action [ ".concat(y, " ] found."));
            }), c.length && (f.forEach(function(s) {
              return s(i, { action: a, payload: v });
            }), c = []), o(i);
          };
          return { getState: j, subscribe: p, dispatch: O, patternMatch: b, destroy: function() {
            return f.clear();
          } };
        };
        var S = function(r) {
          return JSON.parse(JSON.stringify(r));
        }, w = typeof window == "undefined" ? function(r) {
          return r();
        } : function(r) {
          return requestAnimationFrame(r);
        };
      })(), d;
    })());
  }(l)), l.exports;
}
var P = N();
const J = /* @__PURE__ */ _(P);
export {
  J as Store
};
