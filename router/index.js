function d(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var v = { exports: {} }, S = v.exports, m;
function E() {
  return m || (m = 1, (function(h, b) {
    (function(n) {
      function s(e) {
        var t = this;
        return this.events = {}, this.state = null, this.options = e || {}, this.options.env = this.options.env || (Object.keys(n).length === 0 && process && process.browser !== !0 ? "server" : "client"), this.options.mode = this.options.mode || (this.options.env !== "server" && this.options.pushState && n.history && n.history.pushState ? "pushState" : "hashchange"), this.version = "0.6.4", typeof n.addEventListener == "function" && (n.addEventListener("hashchange", function() {
          t.trigger("hashchange");
        }), n.addEventListener("popstate", function(r) {
          if (t.state && t.state.previousState === null) return !1;
          t.trigger("navigate");
        })), this;
      }
      s.regexRoute = function(e, t, r, a) {
        return e instanceof RegExp ? e : (e instanceof Array && (e = "(" + e.join("|") + ")"), e = e.concat(a ? "" : "/?").replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(i, o, l, g, u, f) {
          return t.push({
            name: g,
            optional: !!f
          }), o = o || "", "" + (f ? "" : o) + "(?:" + (f ? o : "") + (l || "") + (u || l && "([^/.]+?)" || "([^/]+?)") + ")" + (f || "");
        }).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)"), new RegExp("^" + e + "$", r ? "" : "i"));
      }, s._forEach = function(e, t) {
        return typeof Array.prototype.forEach == "function" ? Array.prototype.forEach.call(e, t) : function(r, a) {
          for (var i = 0, o = this.length; i < o; ++i)
            r.call(a, this[i], i, this);
        }.call(e, t);
      }, s.prototype.get = s.prototype.add = function(e) {
        var t = this, r = Array.prototype.slice.call(arguments, 1, -1), a = Array.prototype.slice.call(arguments, -1)[0], i = new y(e), o = function() {
          var u = i.parse(t.path());
          if (u.match) {
            var f = {
              route: e,
              params: u.params,
              req: u,
              regex: u.match
            }, c = new p(t, f).enqueue(r.concat(a));
            if (t.trigger("match", c, u), !c.runCallback) return t;
            if (c.previousState = t.state, t.state = c, c.parent() && c.parent().propagateEvent === !1)
              return c.propagateEvent = !1, t;
            c.callback();
          }
          return t;
        }, l = t.options.mode !== "pushState" && t.options.env !== "server" ? "hashchange" : "navigate";
        return o().on(l, o);
      }, s.prototype.trigger = function(e) {
        var t = this, r = Array.prototype.slice.call(arguments, 1);
        return this.events[e] && s._forEach(this.events[e], function(a) {
          a.apply(t, r);
        }), this;
      }, s.prototype.on = s.prototype.bind = function(e, t) {
        var r = this, a = e.split(" ");
        return s._forEach(a, function(i) {
          r.events[i] ? r.events[i].push(t) : r.events[i] = [t];
        }), this;
      }, s.prototype.once = function(e, t) {
        var r = !1;
        return this.on(e, function() {
          return r ? !1 : (r = !0, t.apply(this, arguments), t = null, !0);
        });
      }, s.prototype.context = function(e) {
        var t = this, r = Array.prototype.slice.call(arguments, 1);
        return function() {
          var a = arguments[0], i = arguments.length > 2 ? Array.prototype.slice.call(arguments, 1, -1) : [], o = Array.prototype.slice.call(arguments, -1)[0], l = e.slice(-1) !== "/" && a !== "/" && a !== "" ? e + "/" : e, g = a.substr(0, 1) !== "/" ? a : a.substr(1), u = l + g;
          return t.add.apply(t, [u].concat(r).concat(i).concat([o]));
        };
      }, s.prototype.navigate = function(e) {
        return this.path(e).trigger("navigate");
      }, s.prototype.path = function(e) {
        var t = this, r;
        if (typeof e == "string")
          return t.options.mode === "pushState" ? (r = t.options.root ? t.options.root + e : e, n.history.pushState({}, null, r)) : n.location ? n.location.hash = (t.options.hashBang ? "!" : "") + e : n._pathname = e || "", this;
        if (typeof e == "undefined")
          return t.options.mode === "pushState" ? r = n.location.pathname.replace(t.options.root, "") : t.options.mode !== "pushState" && n.location ? r = n.location.hash ? n.location.hash.split(t.options.hashBang ? "#!" : "#")[1] : "" : r = n._pathname || "", r;
        if (e === !1)
          return t.options.mode === "pushState" ? n.history.pushState({}, null, t.options.root || "/") : n.location && (n.location.hash = t.options.hashBang ? "!" : ""), t;
      }, s.listen = function() {
        var e, t;
        return arguments[0] && arguments[1] ? (e = arguments[0], t = arguments[1]) : t = arguments[0], (function() {
          for (var r in t)
            this.add.call(this, r, t[r]);
          return this;
        }).call(new s(e || {}));
      };
      function p(e, t) {
        this.stack = p.global.slice(0), this.router = e, this.runCallback = !0, this.callbackRan = !1, this.propagateEvent = !0, this.value = e.path();
        for (var r in t)
          this[r] = t[r];
        return this;
      }
      function y(e) {
        this.route = e, this.keys = [], this.regex = s.regexRoute(e, this.keys);
      }
      p.global = [], p.prototype.preventDefault = function() {
        this.runCallback = !1;
      }, p.prototype.stopPropagation = function() {
        this.propagateEvent = !1;
      }, p.prototype.parent = function() {
        var e = !!(this.previousState && this.previousState.value && this.previousState.value == this.value);
        return e ? this.previousState : !1;
      }, p.prototype.callback = function() {
        this.callbackRan = !0, this.timeStamp = Date.now(), this.next();
      }, p.prototype.enqueue = function(e, t) {
        for (var r = Array.isArray(e) ? t < e.length ? e.reverse() : e : [e]; r.length; )
          this.stack.splice(t || this.stack.length + 1, 0, r.shift());
        return this;
      }, p.prototype.next = function() {
        var e = this;
        return this.stack.shift().call(this.router, this.req, this, function() {
          e.next.call(e);
        });
      }, y.prototype.parse = function(e) {
        var t = e.match(this.regex), r = this, a = {
          params: {},
          keys: this.keys,
          matches: (t || []).slice(1),
          match: t
        };
        return s._forEach(a.matches, function(i, o) {
          var l = r.keys[o] && r.keys[o].name ? r.keys[o].name : o;
          a.params[l] = i ? decodeURIComponent(i) : void 0;
        }), a;
      }, s.CallStack = p, s.Request = y, typeof n.define == "function" && !n.define.amd.grapnel ? n.define(function(e, t, r) {
        return n.define.amd.grapnel = !0, s;
      }) : h.exports = s;
    }).call({}, typeof window == "object" ? window : S);
  })(v)), v.exports;
}
var _ = E();
const w = /* @__PURE__ */ d(_), x = w;
export {
  x as Router
};
