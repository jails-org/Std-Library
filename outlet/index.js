var B = (function() {
  const h = () => {
  }, y = {
    morphStyle: "outerHTML",
    callbacks: {
      beforeNodeAdded: h,
      afterNodeAdded: h,
      beforeNodeMorphed: h,
      afterNodeMorphed: h,
      beforeNodeRemoved: h,
      afterNodeRemoved: h,
      beforeAttributeUpdated: h
    },
    head: {
      style: "merge",
      shouldPreserve: (a) => a.getAttribute("im-preserve") === "true",
      shouldReAppend: (a) => a.getAttribute("im-re-append") === "true",
      shouldRemove: h,
      afterHeadMorphed: h
    },
    restoreFocus: !0
  };
  function g(a, m, c = {}) {
    a = E(a);
    const d = I(m), f = L(a, d, c), l = b(f, () => T(
      f,
      a,
      d,
      /** @param {MorphContext} ctx */
      (r) => r.morphStyle === "innerHTML" ? (S(r, a, d), Array.from(a.childNodes)) : M(r, a, d)
    ));
    return f.pantry.remove(), l;
  }
  function M(a, m, c) {
    const d = I(m);
    return S(
      a,
      d,
      c,
      // these two optional params are the secret sauce
      m,
      // start point for iteration
      m.nextSibling
      // end point for iteration
    ), Array.from(d.childNodes);
  }
  function b(a, m) {
    var n;
    if (!a.config.restoreFocus) return m();
    let c = (
      /** @type {HTMLInputElement|HTMLTextAreaElement|null} */
      document.activeElement
    );
    if (!(c instanceof HTMLInputElement || c instanceof HTMLTextAreaElement))
      return m();
    const { id: d, selectionStart: f, selectionEnd: l } = c, r = m();
    return d && d !== ((n = document.activeElement) == null ? void 0 : n.id) && (c = a.target.querySelector(`[id="${d}"]`), c == null || c.focus()), c && !c.selectionEnd && l && c.setSelectionRange(f, l), r;
  }
  const S = /* @__PURE__ */ (function() {
    function a(e, t, s, i = null, o = null) {
      t instanceof HTMLTemplateElement && s instanceof HTMLTemplateElement && (t = t.content, s = s.content), i || (i = t.firstChild);
      for (const u of s.childNodes) {
        if (i && i != o) {
          const p = c(
            e,
            u,
            i,
            o
          );
          if (p) {
            p !== i && f(e, i, p), H(p, u, e), i = p.nextSibling;
            continue;
          }
        }
        if (u instanceof Element && e.persistentIds.has(u.id)) {
          const p = l(
            t,
            u.id,
            i,
            e
          );
          H(p, u, e), i = p.nextSibling;
          continue;
        }
        const v = m(
          t,
          u,
          i,
          e
        );
        v && (i = v.nextSibling);
      }
      for (; i && i != o; ) {
        const u = i;
        i = i.nextSibling, d(e, u);
      }
    }
    function m(e, t, s, i) {
      if (i.callbacks.beforeNodeAdded(t) === !1) return null;
      if (i.idMap.has(t)) {
        const o = document.createElement(
          /** @type {Element} */
          t.tagName
        );
        return e.insertBefore(o, s), H(o, t, i), i.callbacks.afterNodeAdded(o), o;
      } else {
        const o = document.importNode(t, !0);
        return e.insertBefore(o, s), i.callbacks.afterNodeAdded(o), o;
      }
    }
    const c = /* @__PURE__ */ (function() {
      function e(i, o, u, v) {
        let p = null, k = o.nextSibling, R = 0, A = u;
        for (; A && A != v; ) {
          if (s(A, o)) {
            if (t(i, A, o))
              return A;
            p === null && (i.idMap.has(A) || (p = A));
          }
          if (p === null && k && s(A, k) && (R++, k = k.nextSibling, R >= 2 && (p = void 0)), A.contains(document.activeElement)) break;
          A = A.nextSibling;
        }
        return p || null;
      }
      function t(i, o, u) {
        let v = i.idMap.get(o), p = i.idMap.get(u);
        if (!p || !v) return !1;
        for (const k of v)
          if (p.has(k))
            return !0;
        return !1;
      }
      function s(i, o) {
        const u = (
          /** @type {Element} */
          i
        ), v = (
          /** @type {Element} */
          o
        );
        return u.nodeType === v.nodeType && u.tagName === v.tagName && // If oldElt has an `id` with possible state and it doesn't match newElt.id then avoid morphing.
        // We'll still match an anonymous node with an IDed newElt, though, because if it got this far,
        // its not persistent, and new nodes can't have any hidden state.
        (!u.id || u.id === v.id);
      }
      return e;
    })();
    function d(e, t) {
      var s;
      if (e.idMap.has(t))
        n(e.pantry, t, null);
      else {
        if (e.callbacks.beforeNodeRemoved(t) === !1) return;
        (s = t.parentNode) == null || s.removeChild(t), e.callbacks.afterNodeRemoved(t);
      }
    }
    function f(e, t, s) {
      let i = t;
      for (; i && i !== s; ) {
        let o = (
          /** @type {Node} */
          i
        );
        i = i.nextSibling, d(e, o);
      }
      return i;
    }
    function l(e, t, s, i) {
      const o = (
        /** @type {Element} - will always be found */
        i.target.id === t && i.target || i.target.querySelector(`[id="${t}"]`) || i.pantry.querySelector(`[id="${t}"]`)
      );
      return r(o, i), n(e, o, s), o;
    }
    function r(e, t) {
      const s = e.id;
      for (; e = e.parentNode; ) {
        let i = t.idMap.get(e);
        i && (i.delete(s), i.size || t.idMap.delete(e));
      }
    }
    function n(e, t, s) {
      if (e.moveBefore)
        try {
          e.moveBefore(t, s);
        } catch (i) {
          e.insertBefore(t, s);
        }
      else
        e.insertBefore(t, s);
    }
    return a;
  })(), H = /* @__PURE__ */ (function() {
    function a(r, n, e) {
      return e.ignoreActive && r === document.activeElement ? null : (e.callbacks.beforeNodeMorphed(r, n) === !1 || (r instanceof HTMLHeadElement && e.head.ignore || (r instanceof HTMLHeadElement && e.head.style !== "morph" ? N(
        r,
        /** @type {HTMLHeadElement} */
        n,
        e
      ) : (m(r, n, e), l(r, e) || S(e, r, n))), e.callbacks.afterNodeMorphed(r, n)), r);
    }
    function m(r, n, e) {
      let t = n.nodeType;
      if (t === 1) {
        const s = (
          /** @type {Element} */
          r
        ), i = (
          /** @type {Element} */
          n
        ), o = s.attributes, u = i.attributes;
        for (const v of u)
          f(v.name, s, "update", e) || s.getAttribute(v.name) !== v.value && s.setAttribute(v.name, v.value);
        for (let v = o.length - 1; 0 <= v; v--) {
          const p = o[v];
          if (p && !i.hasAttribute(p.name)) {
            if (f(p.name, s, "remove", e))
              continue;
            s.removeAttribute(p.name);
          }
        }
        l(s, e) || c(s, i, e);
      }
      (t === 8 || t === 3) && r.nodeValue !== n.nodeValue && (r.nodeValue = n.nodeValue);
    }
    function c(r, n, e) {
      if (r instanceof HTMLInputElement && n instanceof HTMLInputElement && n.type !== "file") {
        let t = n.value, s = r.value;
        d(r, n, "checked", e), d(r, n, "disabled", e), n.hasAttribute("value") ? s !== t && (f("value", r, "update", e) || (r.setAttribute("value", t), r.value = t)) : f("value", r, "remove", e) || (r.value = "", r.removeAttribute("value"));
      } else if (r instanceof HTMLOptionElement && n instanceof HTMLOptionElement)
        d(r, n, "selected", e);
      else if (r instanceof HTMLTextAreaElement && n instanceof HTMLTextAreaElement) {
        let t = n.value, s = r.value;
        if (f("value", r, "update", e))
          return;
        t !== s && (r.value = t), r.firstChild && r.firstChild.nodeValue !== t && (r.firstChild.nodeValue = t);
      }
    }
    function d(r, n, e, t) {
      const s = n[e], i = r[e];
      if (s !== i) {
        const o = f(
          e,
          r,
          "update",
          t
        );
        o || (r[e] = n[e]), s ? o || r.setAttribute(e, "") : f(e, r, "remove", t) || r.removeAttribute(e);
      }
    }
    function f(r, n, e, t) {
      return r === "value" && t.ignoreActiveValue && n === document.activeElement ? !0 : t.callbacks.beforeAttributeUpdated(r, n, e) === !1;
    }
    function l(r, n) {
      return !!n.ignoreActiveValue && r === document.activeElement && r !== document.body;
    }
    return a;
  })();
  function T(a, m, c, d) {
    if (a.head.block) {
      const f = m.querySelector("head"), l = c.querySelector("head");
      if (f && l) {
        const r = N(f, l, a);
        return Promise.all(r).then(() => {
          const n = Object.assign(a, {
            head: {
              block: !1,
              ignore: !0
            }
          });
          return d(n);
        });
      }
    }
    return d(a);
  }
  function N(a, m, c) {
    let d = [], f = [], l = [], r = [], n = /* @__PURE__ */ new Map();
    for (const t of m.children)
      n.set(t.outerHTML, t);
    for (const t of a.children) {
      let s = n.has(t.outerHTML), i = c.head.shouldReAppend(t), o = c.head.shouldPreserve(t);
      s || o ? i ? f.push(t) : (n.delete(t.outerHTML), l.push(t)) : c.head.style === "append" ? i && (f.push(t), r.push(t)) : c.head.shouldRemove(t) !== !1 && f.push(t);
    }
    r.push(...n.values());
    let e = [];
    for (const t of r) {
      let s = (
        /** @type {ChildNode} */
        document.createRange().createContextualFragment(t.outerHTML).firstChild
      );
      if (c.callbacks.beforeNodeAdded(s) !== !1) {
        if ("href" in s && s.href || "src" in s && s.src) {
          let i, o = new Promise(function(u) {
            i = u;
          });
          s.addEventListener("load", function() {
            i();
          }), e.push(o);
        }
        a.appendChild(s), c.callbacks.afterNodeAdded(s), d.push(s);
      }
    }
    for (const t of f)
      c.callbacks.beforeNodeRemoved(t) !== !1 && (a.removeChild(t), c.callbacks.afterNodeRemoved(t));
    return c.head.afterHeadMorphed(a, {
      added: d,
      kept: l,
      removed: f
    }), e;
  }
  const L = /* @__PURE__ */ (function() {
    function a(n, e, t) {
      const { persistentIds: s, idMap: i } = l(n, e), o = m(t), u = o.morphStyle || "outerHTML";
      if (!["innerHTML", "outerHTML"].includes(u))
        throw `Do not understand how to morph style ${u}`;
      return {
        target: n,
        newContent: e,
        config: o,
        morphStyle: u,
        ignoreActive: o.ignoreActive,
        ignoreActiveValue: o.ignoreActiveValue,
        restoreFocus: o.restoreFocus,
        idMap: i,
        persistentIds: s,
        pantry: c(),
        callbacks: o.callbacks,
        head: o.head
      };
    }
    function m(n) {
      let e = Object.assign({}, y);
      return Object.assign(e, n), e.callbacks = Object.assign(
        {},
        y.callbacks,
        n.callbacks
      ), e.head = Object.assign({}, y.head, n.head), e;
    }
    function c() {
      const n = document.createElement("div");
      return n.hidden = !0, document.body.insertAdjacentElement("afterend", n), n;
    }
    function d(n) {
      let e = Array.from(n.querySelectorAll("[id]"));
      return n.id && e.push(n), e;
    }
    function f(n, e, t, s) {
      for (const i of s)
        if (e.has(i.id)) {
          let o = i;
          for (; o; ) {
            let u = n.get(o);
            if (u == null && (u = /* @__PURE__ */ new Set(), n.set(o, u)), u.add(i.id), o === t) break;
            o = o.parentElement;
          }
        }
    }
    function l(n, e) {
      const t = d(n), s = d(e), i = r(t, s);
      let o = /* @__PURE__ */ new Map();
      f(o, i, n, t);
      const u = e.__idiomorphRoot || e;
      return f(o, i, u, s), { persistentIds: i, idMap: o };
    }
    function r(n, e) {
      let t = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
      for (const { id: o, tagName: u } of n)
        s.has(o) ? t.add(o) : s.set(o, u);
      let i = /* @__PURE__ */ new Set();
      for (const { id: o, tagName: u } of e)
        i.has(o) ? t.add(o) : s.get(o) === u && i.add(o);
      for (const o of t)
        i.delete(o);
      return i;
    }
    return a;
  })(), { normalizeElement: E, normalizeParent: I } = /* @__PURE__ */ (function() {
    const a = /* @__PURE__ */ new WeakSet();
    function m(l) {
      return l instanceof Document ? l.documentElement : l;
    }
    function c(l) {
      if (l == null)
        return document.createElement("div");
      if (typeof l == "string")
        return c(f(l));
      if (a.has(
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
            new d(l)
          );
        {
          const r = document.createElement("div");
          return r.append(l), r;
        }
      } else {
        const r = document.createElement("div");
        for (const n of [...l])
          r.append(n);
        return r;
      }
    }
    class d {
      /** @param {Node} node */
      constructor(r) {
        this.originalNode = r, this.realParentNode = /** @type {Element} */
        r.parentNode, this.previousSibling = r.previousSibling, this.nextSibling = r.nextSibling;
      }
      /** @returns {Node[]} */
      get childNodes() {
        const r = [];
        let n = this.previousSibling ? this.previousSibling.nextSibling : this.realParentNode.firstChild;
        for (; n && n != this.nextSibling; )
          r.push(n), n = n.nextSibling;
        return r;
      }
      /**
       * @param {string} selector
       * @returns {Element[]}
       */
      querySelectorAll(r) {
        return this.childNodes.reduce(
          (n, e) => {
            if (e instanceof Element) {
              e.matches(r) && n.push(e);
              const t = e.querySelectorAll(r);
              for (let s = 0; s < t.length; s++)
                n.push(t[s]);
            }
            return n;
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
      insertBefore(r, n) {
        return this.realParentNode.insertBefore(r, n);
      }
      /**
       * @param {Node} node
       * @param {Node} referenceNode
       * @returns {Node}
       */
      moveBefore(r, n) {
        return this.realParentNode.moveBefore(r, n);
      }
      /**
       * for later use with populateIdMapWithTree to halt upwards iteration
       * @returns {Node}
       */
      get __idiomorphRoot() {
        return this.originalNode;
      }
    }
    function f(l) {
      let r = new DOMParser(), n = l.replace(
        /<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,
        ""
      );
      if (n.match(/<\/html>/) || n.match(/<\/head>/) || n.match(/<\/body>/)) {
        let e = r.parseFromString(l, "text/html");
        if (n.match(/<\/html>/))
          return a.add(e), e;
        {
          let t = e.firstChild;
          return t && a.add(t), t;
        }
      } else {
        let t = (
          /** @type {HTMLTemplateElement} */
          r.parseFromString(
            "<body><template>" + l + "</template></body>",
            "text/html"
          ).body.querySelector("template").content
        );
        return a.add(t), t;
      }
    }
    return { normalizeElement: m, normalizeParent: c };
  })();
  return {
    morph: g,
    defaults: y
  };
})();
const O = ({ target: h }) => {
  V();
  const y = document.head.cloneNode(!0), g = h.innerHTML;
  return {
    renderJS(M, b) {
      if (!b && !M) {
        const S = 'script[name="outlet-script"]';
        return h.innerHTML = g, document.head.querySelector(S).remove(), Promise.resolve(h);
      }
      return h.innerHTML = `<${M}></${M}>`, new Promise((S, H) => {
        const T = document.createElement("script");
        T.setAttribute("name", "outlet-script"), T.src = b, T.onload = () => S(h), T.onerror = H, document.head.appendChild(T);
      }).catch((S) => {
        throw "TypeError: Failed to fetch";
      });
    },
    render(M) {
      return M ? fetch(M).then((b) => b.text()).then((b) => {
        const S = [], H = new URL(M), N = new DOMParser().parseFromString(b, "text/html"), L = N.documentElement.querySelector("body"), E = L.querySelectorAll("script, link, style"), I = N.documentElement.querySelector("head");
        return E.forEach((a) => {
          I.appendChild(a);
        }), B.morph(document.head, I, {
          callbacks: {
            beforeNodeAdded: q(S, H)
          }
        }), new Promise((a) => {
          h.innerHTML = L == null ? void 0 : L.innerHTML, Promise.allSettled(S).then(() => a(h));
        });
      }).catch((b) => {
        throw b;
      }) : (B.morph(document.head, y), h.innerHTML = g, Promise.resolve(h));
    }
  };
}, V = () => {
  document.head.querySelectorAll("script, link, style").forEach((h) => h.setAttribute("im-preserve", "true"));
}, q = (h, y) => (g) => {
  if (g.src && g.getAttribute("src").startsWith("/")) {
    const { pathname: M, search: b } = new URL(g.src);
    g.src = y.origin + M + b;
  } else if (g.href && g.getAttribute("href").startsWith("/")) {
    const { pathname: M, search: b } = new URL(g.href);
    g.href = y.origin + M + b;
  }
  return g.src && g.localName == "script" && h.push(new Promise((M, b) => {
    g.addEventListener("load", M), g.addEventListener("error", b);
  })), h;
};
export {
  O as Outlet
};
