var R = (function() {
  const m = () => {
  }, T = {
    morphStyle: "outerHTML",
    callbacks: {
      beforeNodeAdded: m,
      afterNodeAdded: m,
      beforeNodeMorphed: m,
      afterNodeMorphed: m,
      beforeNodeRemoved: m,
      afterNodeRemoved: m,
      beforeAttributeUpdated: m
    },
    head: {
      style: "merge",
      shouldPreserve: (c) => c.getAttribute("im-preserve") === "true",
      shouldReAppend: (c) => c.getAttribute("im-re-append") === "true",
      shouldRemove: m,
      afterHeadMorphed: m
    },
    restoreFocus: !0
  };
  function b(c, g, f = {}) {
    c = E(c);
    const p = N(g), h = k(c, p, f), l = v(h, () => H(
      h,
      c,
      p,
      /** @param {MorphContext} ctx */
      (r) => r.morphStyle === "innerHTML" ? (S(r, c, p), Array.from(c.childNodes)) : A(r, c, p)
    ));
    return h.pantry.remove(), l;
  }
  function A(c, g, f) {
    const p = N(g);
    return S(
      c,
      p,
      f,
      // these two optional params are the secret sauce
      g,
      // start point for iteration
      g.nextSibling
      // end point for iteration
    ), Array.from(p.childNodes);
  }
  function v(c, g) {
    var s;
    if (!c.config.restoreFocus) return g();
    let f = (
      /** @type {HTMLInputElement|HTMLTextAreaElement|null} */
      document.activeElement
    );
    if (!(f instanceof HTMLInputElement || f instanceof HTMLTextAreaElement))
      return g();
    const { id: p, selectionStart: h, selectionEnd: l } = f, r = g();
    return p && p !== ((s = document.activeElement) == null ? void 0 : s.getAttribute("id")) && (f = c.target.querySelector(`[id="${p}"]`), f == null || f.focus()), f && !f.selectionEnd && l && f.setSelectionRange(h, l), r;
  }
  const S = /* @__PURE__ */ (function() {
    function c(e, t, n, i = null, o = null) {
      t instanceof HTMLTemplateElement && n instanceof HTMLTemplateElement && (t = t.content, n = n.content), i || (i = t.firstChild);
      for (const a of n.childNodes) {
        if (i && i != o) {
          const d = f(
            e,
            a,
            i,
            o
          );
          if (d) {
            d !== i && h(e, i, d), L(d, a, e), i = d.nextSibling;
            continue;
          }
        }
        if (a instanceof Element) {
          const d = (
            /** @type {String} */
            a.getAttribute("id")
          );
          if (e.persistentIds.has(d)) {
            const M = l(
              t,
              d,
              i,
              e
            );
            L(M, a, e), i = M.nextSibling;
            continue;
          }
        }
        const u = g(
          t,
          a,
          i,
          e
        );
        u && (i = u.nextSibling);
      }
      for (; i && i != o; ) {
        const a = i;
        i = i.nextSibling, p(e, a);
      }
    }
    function g(e, t, n, i) {
      if (i.callbacks.beforeNodeAdded(t) === !1) return null;
      if (i.idMap.has(t)) {
        const o = document.createElement(
          /** @type {Element} */
          t.tagName
        );
        return e.insertBefore(o, n), L(o, t, i), i.callbacks.afterNodeAdded(o), o;
      } else {
        const o = document.importNode(t, !0);
        return e.insertBefore(o, n), i.callbacks.afterNodeAdded(o), o;
      }
    }
    const f = /* @__PURE__ */ (function() {
      function e(i, o, a, u) {
        let d = null, M = o.nextSibling, B = 0, y = a;
        for (; y && y != u; ) {
          if (n(y, o)) {
            if (t(i, y, o))
              return y;
            d === null && (i.idMap.has(y) || (d = y));
          }
          if (d === null && M && n(y, M) && (B++, M = M.nextSibling, B >= 2 && (d = void 0)), i.activeElementAndParents.includes(y)) break;
          y = y.nextSibling;
        }
        return d || null;
      }
      function t(i, o, a) {
        let u = i.idMap.get(o), d = i.idMap.get(a);
        if (!d || !u) return !1;
        for (const M of u)
          if (d.has(M))
            return !0;
        return !1;
      }
      function n(i, o) {
        var d, M, B;
        const a = (
          /** @type {Element} */
          i
        ), u = (
          /** @type {Element} */
          o
        );
        return a.nodeType === u.nodeType && a.tagName === u.tagName && // If oldElt has an `id` with possible state and it doesn't match newElt.id then avoid morphing.
        // We'll still match an anonymous node with an IDed newElt, though, because if it got this far,
        // its not persistent, and new nodes can't have any hidden state.
        // We can't use .id because of form input shadowing, and we can't count on .getAttribute's presence because it could be a document-fragment
        (!((d = a.getAttribute) != null && d.call(a, "id")) || ((M = a.getAttribute) == null ? void 0 : M.call(a, "id")) === ((B = u.getAttribute) == null ? void 0 : B.call(u, "id")));
      }
      return e;
    })();
    function p(e, t) {
      var n;
      if (e.idMap.has(t))
        s(e.pantry, t, null);
      else {
        if (e.callbacks.beforeNodeRemoved(t) === !1) return;
        (n = t.parentNode) == null || n.removeChild(t), e.callbacks.afterNodeRemoved(t);
      }
    }
    function h(e, t, n) {
      let i = t;
      for (; i && i !== n; ) {
        let o = (
          /** @type {Node} */
          i
        );
        i = i.nextSibling, p(e, o);
      }
      return i;
    }
    function l(e, t, n, i) {
      var a, u;
      const o = (
        /** @type {Element} - will always be found */
        // ctx.target.id unsafe because of form input shadowing
        // ctx.target could be a document fragment which doesn't have `getAttribute`
        ((u = (a = i.target).getAttribute) == null ? void 0 : u.call(a, "id")) === t && i.target || i.target.querySelector(`[id="${t}"]`) || i.pantry.querySelector(`[id="${t}"]`)
      );
      return r(o, i), s(e, o, n), o;
    }
    function r(e, t) {
      const n = (
        /** @type {String} */
        e.getAttribute("id")
      );
      for (; e = e.parentNode; ) {
        let i = t.idMap.get(e);
        i && (i.delete(n), i.size || t.idMap.delete(e));
      }
    }
    function s(e, t, n) {
      if (e.moveBefore)
        try {
          e.moveBefore(t, n);
        } catch (i) {
          e.insertBefore(t, n);
        }
      else
        e.insertBefore(t, n);
    }
    return c;
  })(), L = /* @__PURE__ */ (function() {
    function c(r, s, e) {
      return e.ignoreActive && r === document.activeElement ? null : (e.callbacks.beforeNodeMorphed(r, s) === !1 || (r instanceof HTMLHeadElement && e.head.ignore || (r instanceof HTMLHeadElement && e.head.style !== "morph" ? I(
        r,
        /** @type {HTMLHeadElement} */
        s,
        e
      ) : (g(r, s, e), l(r, e) || S(e, r, s))), e.callbacks.afterNodeMorphed(r, s)), r);
    }
    function g(r, s, e) {
      let t = s.nodeType;
      if (t === 1) {
        const n = (
          /** @type {Element} */
          r
        ), i = (
          /** @type {Element} */
          s
        ), o = n.attributes, a = i.attributes;
        for (const u of a)
          h(u.name, n, "update", e) || n.getAttribute(u.name) !== u.value && n.setAttribute(u.name, u.value);
        for (let u = o.length - 1; 0 <= u; u--) {
          const d = o[u];
          if (d && !i.hasAttribute(d.name)) {
            if (h(d.name, n, "remove", e))
              continue;
            n.removeAttribute(d.name);
          }
        }
        l(n, e) || f(n, i, e);
      }
      (t === 8 || t === 3) && r.nodeValue !== s.nodeValue && (r.nodeValue = s.nodeValue);
    }
    function f(r, s, e) {
      if (r instanceof HTMLInputElement && s instanceof HTMLInputElement && s.type !== "file") {
        let t = s.value, n = r.value;
        p(r, s, "checked", e), p(r, s, "disabled", e), s.hasAttribute("value") ? n !== t && (h("value", r, "update", e) || (r.setAttribute("value", t), r.value = t)) : h("value", r, "remove", e) || (r.value = "", r.removeAttribute("value"));
      } else if (r instanceof HTMLOptionElement && s instanceof HTMLOptionElement)
        p(r, s, "selected", e);
      else if (r instanceof HTMLTextAreaElement && s instanceof HTMLTextAreaElement) {
        let t = s.value, n = r.value;
        if (h("value", r, "update", e))
          return;
        t !== n && (r.value = t), r.firstChild && r.firstChild.nodeValue !== t && (r.firstChild.nodeValue = t);
      }
    }
    function p(r, s, e, t) {
      const n = s[e], i = r[e];
      if (n !== i) {
        const o = h(
          e,
          r,
          "update",
          t
        );
        o || (r[e] = s[e]), n ? o || r.setAttribute(e, "") : h(e, r, "remove", t) || r.removeAttribute(e);
      }
    }
    function h(r, s, e, t) {
      return r === "value" && t.ignoreActiveValue && s === document.activeElement ? !0 : t.callbacks.beforeAttributeUpdated(r, s, e) === !1;
    }
    function l(r, s) {
      return !!s.ignoreActiveValue && r === document.activeElement && r !== document.body;
    }
    return c;
  })();
  function H(c, g, f, p) {
    if (c.head.block) {
      const h = g.querySelector("head"), l = f.querySelector("head");
      if (h && l) {
        const r = I(h, l, c);
        return Promise.all(r).then(() => {
          const s = Object.assign(c, {
            head: {
              block: !1,
              ignore: !0
            }
          });
          return p(s);
        });
      }
    }
    return p(c);
  }
  function I(c, g, f) {
    let p = [], h = [], l = [], r = [], s = /* @__PURE__ */ new Map();
    for (const t of g.children)
      s.set(t.outerHTML, t);
    for (const t of c.children) {
      let n = s.has(t.outerHTML), i = f.head.shouldReAppend(t), o = f.head.shouldPreserve(t);
      n || o ? i ? h.push(t) : (s.delete(t.outerHTML), l.push(t)) : f.head.style === "append" ? i && (h.push(t), r.push(t)) : f.head.shouldRemove(t) !== !1 && h.push(t);
    }
    r.push(...s.values());
    let e = [];
    for (const t of r) {
      let n = (
        /** @type {ChildNode} */
        document.createRange().createContextualFragment(t.outerHTML).firstChild
      );
      if (f.callbacks.beforeNodeAdded(n) !== !1) {
        if ("href" in n && n.href || "src" in n && n.src) {
          let i, o = new Promise(function(a) {
            i = a;
          });
          n.addEventListener("load", function() {
            i();
          }), e.push(o);
        }
        c.appendChild(n), f.callbacks.afterNodeAdded(n), p.push(n);
      }
    }
    for (const t of h)
      f.callbacks.beforeNodeRemoved(t) !== !1 && (c.removeChild(t), f.callbacks.afterNodeRemoved(t));
    return f.head.afterHeadMorphed(c, {
      added: p,
      kept: l,
      removed: h
    }), e;
  }
  const k = /* @__PURE__ */ (function() {
    function c(e, t, n) {
      const { persistentIds: i, idMap: o } = r(e, t), a = g(n), u = a.morphStyle || "outerHTML";
      if (!["innerHTML", "outerHTML"].includes(u))
        throw `Do not understand how to morph style ${u}`;
      return {
        target: e,
        newContent: t,
        config: a,
        morphStyle: u,
        ignoreActive: a.ignoreActive,
        ignoreActiveValue: a.ignoreActiveValue,
        restoreFocus: a.restoreFocus,
        idMap: o,
        persistentIds: i,
        pantry: f(),
        activeElementAndParents: p(e),
        callbacks: a.callbacks,
        head: a.head
      };
    }
    function g(e) {
      let t = Object.assign({}, T);
      return Object.assign(t, e), t.callbacks = Object.assign(
        {},
        T.callbacks,
        e.callbacks
      ), t.head = Object.assign({}, T.head, e.head), t;
    }
    function f() {
      const e = document.createElement("div");
      return e.hidden = !0, document.body.insertAdjacentElement("afterend", e), e;
    }
    function p(e) {
      let t = [], n = document.activeElement;
      if ((n == null ? void 0 : n.tagName) !== "BODY" && e.contains(n))
        for (; n && (t.push(n), n !== e); )
          n = n.parentElement;
      return t;
    }
    function h(e) {
      var n;
      let t = Array.from(e.querySelectorAll("[id]"));
      return (n = e.getAttribute) != null && n.call(e, "id") && t.push(e), t;
    }
    function l(e, t, n, i) {
      for (const o of i) {
        const a = (
          /** @type {String} */
          o.getAttribute("id")
        );
        if (t.has(a)) {
          let u = o;
          for (; u; ) {
            let d = e.get(u);
            if (d == null && (d = /* @__PURE__ */ new Set(), e.set(u, d)), d.add(a), u === n) break;
            u = u.parentElement;
          }
        }
      }
    }
    function r(e, t) {
      const n = h(e), i = h(t), o = s(n, i);
      let a = /* @__PURE__ */ new Map();
      l(a, o, e, n);
      const u = t.__idiomorphRoot || t;
      return l(a, o, u, i), { persistentIds: o, idMap: a };
    }
    function s(e, t) {
      let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
      for (const { id: a, tagName: u } of e)
        i.has(a) ? n.add(a) : i.set(a, u);
      let o = /* @__PURE__ */ new Set();
      for (const { id: a, tagName: u } of t)
        o.has(a) ? n.add(a) : i.get(a) === u && o.add(a);
      for (const a of n)
        o.delete(a);
      return o;
    }
    return c;
  })(), { normalizeElement: E, normalizeParent: N } = /* @__PURE__ */ (function() {
    const c = /* @__PURE__ */ new WeakSet();
    function g(l) {
      return l instanceof Document ? l.documentElement : l;
    }
    function f(l) {
      if (l == null)
        return document.createElement("div");
      if (typeof l == "string")
        return f(h(l));
      if (c.has(
        /** @type {Element} */
        l
      ))
        return (
          /** @type {Element} */
          l
        );
      if (l instanceof Node) {
        if (l.parentNode)
          return (
            /** @type {any} */
            new p(l)
          );
        {
          const r = document.createElement("div");
          return r.append(l), r;
        }
      } else {
        const r = document.createElement("div");
        for (const s of [...l])
          r.append(s);
        return r;
      }
    }
    class p {
      /** @param {Node} node */
      constructor(r) {
        this.originalNode = r, this.realParentNode = /** @type {Element} */
        r.parentNode, this.previousSibling = r.previousSibling, this.nextSibling = r.nextSibling;
      }
      /** @returns {Node[]} */
      get childNodes() {
        const r = [];
        let s = this.previousSibling ? this.previousSibling.nextSibling : this.realParentNode.firstChild;
        for (; s && s != this.nextSibling; )
          r.push(s), s = s.nextSibling;
        return r;
      }
      /**
       * @param {string} selector
       * @returns {Element[]}
       */
      querySelectorAll(r) {
        return this.childNodes.reduce(
          (s, e) => {
            if (e instanceof Element) {
              e.matches(r) && s.push(e);
              const t = e.querySelectorAll(r);
              for (let n = 0; n < t.length; n++)
                s.push(t[n]);
            }
            return s;
          },
          /** @type {Element[]} */
          []
        );
      }
      /**
       * @param {Node} node
       * @param {Node} referenceNode
       * @returns {Node}
       */
      insertBefore(r, s) {
        return this.realParentNode.insertBefore(r, s);
      }
      /**
       * @param {Node} node
       * @param {Node} referenceNode
       * @returns {Node}
       */
      moveBefore(r, s) {
        return this.realParentNode.moveBefore(r, s);
      }
      /**
       * for later use with populateIdMapWithTree to halt upwards iteration
       * @returns {Node}
       */
      get __idiomorphRoot() {
        return this.originalNode;
      }
    }
    function h(l) {
      let r = new DOMParser(), s = l.replace(
        /<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,
        ""
      );
      if (s.match(/<\/html>/) || s.match(/<\/head>/) || s.match(/<\/body>/)) {
        let e = r.parseFromString(l, "text/html");
        if (s.match(/<\/html>/))
          return c.add(e), e;
        {
          let t = e.firstChild;
          return t && c.add(t), t;
        }
      } else {
        let t = (
          /** @type {HTMLTemplateElement} */
          r.parseFromString(
            "<body><template>" + l + "</template></body>",
            "text/html"
          ).body.querySelector("template").content
        );
        return c.add(t), t;
      }
    }
    return { normalizeElement: g, normalizeParent: f };
  })();
  return {
    morph: b,
    defaults: T
  };
})();
const q = ({ target: m }) => {
  V();
  const T = document.head.cloneNode(!0), b = m.innerHTML;
  return {
    renderJS(A, v) {
      if (!v && !A) {
        const S = 'script[name="outlet-script"]';
        return m.innerHTML = b, document.head.querySelector(S).remove(), Promise.resolve(m);
      }
      return m.innerHTML = `<${A}></${A}>`, new Promise((S, L) => {
        const H = document.createElement("script");
        H.setAttribute("name", "outlet-script"), H.src = v, H.onload = () => S(m), H.onerror = L, document.head.appendChild(H);
      }).catch((S) => {
        throw "TypeError: Failed to fetch";
      });
    },
    render(A) {
      return A ? fetch(A).then((v) => v.text()).then((v) => {
        const S = [], L = new URL(A), I = new DOMParser().parseFromString(v, "text/html"), k = I.documentElement.querySelector("body"), E = k.querySelectorAll("script, link, style"), N = I.documentElement.querySelector("head");
        return E.forEach((c) => {
          N.appendChild(c);
        }), R.morph(document.head, N, {
          callbacks: {
            beforeNodeAdded: O(S, L)
          }
        }), new Promise((c) => {
          m.innerHTML = k == null ? void 0 : k.innerHTML, Promise.allSettled(S).then(() => c(m));
        });
      }).catch((v) => {
        throw v;
      }) : (R.morph(document.head, T), m.innerHTML = b, Promise.resolve(m));
    }
  };
}, V = () => {
  document.head.querySelectorAll("script, link, style").forEach((m) => m.setAttribute("im-preserve", "true"));
}, O = (m, T) => (b) => {
  if (b.src && b.getAttribute("src").startsWith("/")) {
    const { pathname: A, search: v } = new URL(b.src);
    b.src = T.origin + A + v;
  } else if (b.href && b.getAttribute("href").startsWith("/")) {
    const { pathname: A, search: v } = new URL(b.href);
    b.href = T.origin + A + v;
  }
  return b.src && b.localName == "script" && m.push(new Promise((A, v) => {
    b.addEventListener("load", A), b.addEventListener("error", v);
  })), m;
};
export {
  q as Outlet
};
