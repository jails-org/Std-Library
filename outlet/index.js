var N = function() {
  const h = () => {
  }, S = {
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
      shouldPreserve: (c) => c.getAttribute("im-preserve") === "true",
      shouldReAppend: (c) => c.getAttribute("im-re-append") === "true",
      shouldRemove: h,
      afterHeadMorphed: h
    },
    restoreFocus: !0
  };
  function g(c, p, u = {}) {
    c = R(c);
    const f = E(p), d = L(c, f, u), a = b(d, () => T(
      d,
      c,
      f,
      /** @param {MorphContext} ctx */
      (r) => r.morphStyle === "innerHTML" ? (A(r, c, f), Array.from(c.childNodes)) : M(r, c, f)
    ));
    return d.pantry.remove(), a;
  }
  function M(c, p, u) {
    const f = E(p);
    let d = Array.from(f.childNodes);
    const a = d.indexOf(p), r = d.length - (a + 1);
    return A(
      c,
      f,
      u,
      // these two optional params are the secret sauce
      p,
      // start point for iteration
      p.nextSibling
      // end point for iteration
    ), d = Array.from(f.childNodes), d.slice(a, d.length - r);
  }
  function b(c, p) {
    var n;
    if (!c.config.restoreFocus) return p();
    let u = (
      /** @type {HTMLInputElement|HTMLTextAreaElement|null} */
      document.activeElement
    );
    if (!(u instanceof HTMLInputElement || u instanceof HTMLTextAreaElement))
      return p();
    const { id: f, selectionStart: d, selectionEnd: a } = u, r = p();
    return f && f !== ((n = document.activeElement) == null ? void 0 : n.id) && (u = c.target.querySelector(`#${f}`), u == null || u.focus()), u && !u.selectionEnd && a && u.setSelectionRange(d, a), r;
  }
  const A = /* @__PURE__ */ function() {
    function c(e, t, o, i = null, s = null) {
      t instanceof HTMLTemplateElement && o instanceof HTMLTemplateElement && (t = t.content, o = o.content), i || (i = t.firstChild);
      for (const l of o.childNodes) {
        if (i && i != s) {
          const m = u(
            e,
            l,
            i,
            s
          );
          if (m) {
            m !== i && d(e, i, m), H(m, l, e), i = m.nextSibling;
            continue;
          }
        }
        if (l instanceof Element && e.persistentIds.has(l.id)) {
          const m = a(
            t,
            l.id,
            i,
            e
          );
          H(m, l, e), i = m.nextSibling;
          continue;
        }
        const v = p(
          t,
          l,
          i,
          e
        );
        v && (i = v.nextSibling);
      }
      for (; i && i != s; ) {
        const l = i;
        i = i.nextSibling, f(e, l);
      }
    }
    function p(e, t, o, i) {
      if (i.callbacks.beforeNodeAdded(t) === !1) return null;
      if (i.idMap.has(t)) {
        const s = document.createElement(
          /** @type {Element} */
          t.tagName
        );
        return e.insertBefore(s, o), H(s, t, i), i.callbacks.afterNodeAdded(s), s;
      } else {
        const s = document.importNode(t, !0);
        return e.insertBefore(s, o), i.callbacks.afterNodeAdded(s), s;
      }
    }
    const u = /* @__PURE__ */ function() {
      function e(i, s, l, v) {
        let m = null, k = s.nextSibling, B = 0, y = l;
        for (; y && y != v; ) {
          if (o(y, s)) {
            if (t(i, y, s))
              return y;
            m === null && (i.idMap.has(y) || (m = y));
          }
          if (m === null && k && o(y, k) && (B++, k = k.nextSibling, B >= 2 && (m = void 0)), y.contains(document.activeElement)) break;
          y = y.nextSibling;
        }
        return m || null;
      }
      function t(i, s, l) {
        let v = i.idMap.get(s), m = i.idMap.get(l);
        if (!m || !v) return !1;
        for (const k of v)
          if (m.has(k))
            return !0;
        return !1;
      }
      function o(i, s) {
        const l = (
          /** @type {Element} */
          i
        ), v = (
          /** @type {Element} */
          s
        );
        return l.nodeType === v.nodeType && l.tagName === v.tagName && // If oldElt has an `id` with possible state and it doesn't match newElt.id then avoid morphing.
        // We'll still match an anonymous node with an IDed newElt, though, because if it got this far,
        // its not persistent, and new nodes can't have any hidden state.
        (!l.id || l.id === v.id);
      }
      return e;
    }();
    function f(e, t) {
      var o;
      if (e.idMap.has(t))
        n(e.pantry, t, null);
      else {
        if (e.callbacks.beforeNodeRemoved(t) === !1) return;
        (o = t.parentNode) == null || o.removeChild(t), e.callbacks.afterNodeRemoved(t);
      }
    }
    function d(e, t, o) {
      let i = t;
      for (; i && i !== o; ) {
        let s = (
          /** @type {Node} */
          i
        );
        i = i.nextSibling, f(e, s);
      }
      return i;
    }
    function a(e, t, o, i) {
      const s = (
        /** @type {Element} - will always be found */
        i.target.querySelector(`#${t}`) || i.pantry.querySelector(`#${t}`)
      );
      return r(s, i), n(e, s, o), s;
    }
    function r(e, t) {
      const o = e.id;
      for (; e = e.parentNode; ) {
        let i = t.idMap.get(e);
        i && (i.delete(o), i.size || t.idMap.delete(e));
      }
    }
    function n(e, t, o) {
      if (e.moveBefore)
        try {
          e.moveBefore(t, o);
        } catch (i) {
          e.insertBefore(t, o);
        }
      else
        e.insertBefore(t, o);
    }
    return c;
  }(), H = /* @__PURE__ */ function() {
    function c(r, n, e) {
      return e.ignoreActive && r === document.activeElement ? null : (e.callbacks.beforeNodeMorphed(r, n) === !1 || (r instanceof HTMLHeadElement && e.head.ignore || (r instanceof HTMLHeadElement && e.head.style !== "morph" ? I(
        r,
        /** @type {HTMLHeadElement} */
        n,
        e
      ) : (p(r, n, e), a(r, e) || A(e, r, n))), e.callbacks.afterNodeMorphed(r, n)), r);
    }
    function p(r, n, e) {
      let t = n.nodeType;
      if (t === 1) {
        const o = (
          /** @type {Element} */
          r
        ), i = (
          /** @type {Element} */
          n
        ), s = o.attributes, l = i.attributes;
        for (const v of l)
          d(v.name, o, "update", e) || o.getAttribute(v.name) !== v.value && o.setAttribute(v.name, v.value);
        for (let v = s.length - 1; 0 <= v; v--) {
          const m = s[v];
          if (m && !i.hasAttribute(m.name)) {
            if (d(m.name, o, "remove", e))
              continue;
            o.removeAttribute(m.name);
          }
        }
        a(o, e) || u(o, i, e);
      }
      (t === 8 || t === 3) && r.nodeValue !== n.nodeValue && (r.nodeValue = n.nodeValue);
    }
    function u(r, n, e) {
      if (r instanceof HTMLInputElement && n instanceof HTMLInputElement && n.type !== "file") {
        let t = n.value, o = r.value;
        f(r, n, "checked", e), f(r, n, "disabled", e), n.hasAttribute("value") ? o !== t && (d("value", r, "update", e) || (r.setAttribute("value", t), r.value = t)) : d("value", r, "remove", e) || (r.value = "", r.removeAttribute("value"));
      } else if (r instanceof HTMLOptionElement && n instanceof HTMLOptionElement)
        f(r, n, "selected", e);
      else if (r instanceof HTMLTextAreaElement && n instanceof HTMLTextAreaElement) {
        let t = n.value, o = r.value;
        if (d("value", r, "update", e))
          return;
        t !== o && (r.value = t), r.firstChild && r.firstChild.nodeValue !== t && (r.firstChild.nodeValue = t);
      }
    }
    function f(r, n, e, t) {
      const o = n[e], i = r[e];
      if (o !== i) {
        const s = d(
          e,
          r,
          "update",
          t
        );
        s || (r[e] = n[e]), o ? s || r.setAttribute(e, "") : d(e, r, "remove", t) || r.removeAttribute(e);
      }
    }
    function d(r, n, e, t) {
      return r === "value" && t.ignoreActiveValue && n === document.activeElement ? !0 : t.callbacks.beforeAttributeUpdated(r, n, e) === !1;
    }
    function a(r, n) {
      return !!n.ignoreActiveValue && r === document.activeElement && r !== document.body;
    }
    return c;
  }();
  function T(c, p, u, f) {
    if (c.head.block) {
      const d = p.querySelector("head"), a = u.querySelector("head");
      if (d && a) {
        const r = I(d, a, c);
        return Promise.all(r).then(() => {
          const n = Object.assign(c, {
            head: {
              block: !1,
              ignore: !0
            }
          });
          return f(n);
        });
      }
    }
    return f(c);
  }
  function I(c, p, u) {
    let f = [], d = [], a = [], r = [], n = /* @__PURE__ */ new Map();
    for (const t of p.children)
      n.set(t.outerHTML, t);
    for (const t of c.children) {
      let o = n.has(t.outerHTML), i = u.head.shouldReAppend(t), s = u.head.shouldPreserve(t);
      o || s ? i ? d.push(t) : (n.delete(t.outerHTML), a.push(t)) : u.head.style === "append" ? i && (d.push(t), r.push(t)) : u.head.shouldRemove(t) !== !1 && d.push(t);
    }
    r.push(...n.values());
    let e = [];
    for (const t of r) {
      let o = (
        /** @type {ChildNode} */
        document.createRange().createContextualFragment(t.outerHTML).firstChild
      );
      if (u.callbacks.beforeNodeAdded(o) !== !1) {
        if ("href" in o && o.href || "src" in o && o.src) {
          let i, s = new Promise(function(l) {
            i = l;
          });
          o.addEventListener("load", function() {
            i();
          }), e.push(s);
        }
        c.appendChild(o), u.callbacks.afterNodeAdded(o), f.push(o);
      }
    }
    for (const t of d)
      u.callbacks.beforeNodeRemoved(t) !== !1 && (c.removeChild(t), u.callbacks.afterNodeRemoved(t));
    return u.head.afterHeadMorphed(c, {
      added: f,
      kept: a,
      removed: d
    }), e;
  }
  const L = /* @__PURE__ */ function() {
    function c(n, e, t) {
      const { persistentIds: o, idMap: i } = a(n, e), s = p(t), l = s.morphStyle || "outerHTML";
      if (!["innerHTML", "outerHTML"].includes(l))
        throw `Do not understand how to morph style ${l}`;
      return {
        target: n,
        newContent: e,
        config: s,
        morphStyle: l,
        ignoreActive: s.ignoreActive,
        ignoreActiveValue: s.ignoreActiveValue,
        restoreFocus: s.restoreFocus,
        idMap: i,
        persistentIds: o,
        pantry: u(),
        callbacks: s.callbacks,
        head: s.head
      };
    }
    function p(n) {
      let e = Object.assign({}, S);
      return Object.assign(e, n), e.callbacks = Object.assign(
        {},
        S.callbacks,
        n.callbacks
      ), e.head = Object.assign({}, S.head, n.head), e;
    }
    function u() {
      const n = document.createElement("div");
      return n.hidden = !0, document.body.insertAdjacentElement("afterend", n), n;
    }
    function f(n) {
      let e = Array.from(n.querySelectorAll("[id]"));
      return n.id && e.push(n), e;
    }
    function d(n, e, t, o) {
      for (const i of o)
        if (e.has(i.id)) {
          let s = i;
          for (; s; ) {
            let l = n.get(s);
            if (l == null && (l = /* @__PURE__ */ new Set(), n.set(s, l)), l.add(i.id), s === t) break;
            s = s.parentElement;
          }
        }
    }
    function a(n, e) {
      const t = f(n), o = f(e), i = r(t, o);
      let s = /* @__PURE__ */ new Map();
      d(s, i, n, t);
      const l = e.__idiomorphRoot || e;
      return d(s, i, l, o), { persistentIds: i, idMap: s };
    }
    function r(n, e) {
      let t = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
      for (const { id: s, tagName: l } of n)
        o.has(s) ? t.add(s) : o.set(s, l);
      let i = /* @__PURE__ */ new Set();
      for (const { id: s, tagName: l } of e)
        i.has(s) ? t.add(s) : o.get(s) === l && i.add(s);
      for (const s of t)
        i.delete(s);
      return i;
    }
    return c;
  }(), { normalizeElement: R, normalizeParent: E } = /* @__PURE__ */ function() {
    const c = /* @__PURE__ */ new WeakSet();
    function p(a) {
      return a instanceof Document ? a.documentElement : a;
    }
    function u(a) {
      if (a == null)
        return document.createElement("div");
      if (typeof a == "string")
        return u(d(a));
      if (c.has(
        /** @type {Element} */
        a
      ))
        return (
          /** @type {Element} */
          a
        );
      if (a instanceof Node) {
        if (a.parentNode)
          return f(a);
        {
          const r = document.createElement("div");
          return r.append(a), r;
        }
      } else {
        const r = document.createElement("div");
        for (const n of [...a])
          r.append(n);
        return r;
      }
    }
    function f(a) {
      return (
        /** @type {Element} */
        /** @type {unknown} */
        {
          childNodes: [a],
          /** @ts-ignore - cover your eyes for a minute, tsc */
          querySelectorAll: (r) => {
            const n = a.querySelectorAll(r);
            return a.matches(r) ? [a, ...n] : n;
          },
          /** @ts-ignore */
          insertBefore: (r, n) => a.parentNode.insertBefore(r, n),
          /** @ts-ignore */
          moveBefore: (r, n) => a.parentNode.moveBefore(r, n),
          // for later use with populateIdMapWithTree to halt upwards iteration
          get __idiomorphRoot() {
            return a;
          }
        }
      );
    }
    function d(a) {
      let r = new DOMParser(), n = a.replace(
        /<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,
        ""
      );
      if (n.match(/<\/html>/) || n.match(/<\/head>/) || n.match(/<\/body>/)) {
        let e = r.parseFromString(a, "text/html");
        if (n.match(/<\/html>/))
          return c.add(e), e;
        {
          let t = e.firstChild;
          return t && c.add(t), t;
        }
      } else {
        let t = (
          /** @type {HTMLTemplateElement} */
          r.parseFromString(
            "<body><template>" + a + "</template></body>",
            "text/html"
          ).body.querySelector("template").content
        );
        return c.add(t), t;
      }
    }
    return { normalizeElement: p, normalizeParent: u };
  }();
  return {
    morph: g,
    defaults: S
  };
}();
const q = ({ target: h }) => {
  V();
  const S = document.head.cloneNode(!0), g = h.innerHTML;
  return {
    renderJS(M, b) {
      if (!b && !M) {
        const A = 'script[name="outlet-script"]';
        return h.innerHTML = g, document.head.querySelector(A).remove(), Promise.resolve();
      }
      return h.innerHTML = `<${M}></${M}>`, new Promise((A, H) => {
        const T = document.createElement("script");
        T.setAttribute("name", "outlet-script"), T.src = b, T.onload = A, T.onerror = H, document.head.appendChild(T);
      }).catch((A) => {
        throw "TypeError: Failed to fetch";
      });
    },
    render(M) {
      return M ? fetch(M).then((b) => b.text()).then((b) => {
        const A = [], H = new URL(M), I = new DOMParser().parseFromString(b, "text/html"), L = I.documentElement.querySelector("body"), R = L.querySelectorAll("script, link, style"), E = I.documentElement.querySelector("head");
        return R.forEach((c) => {
          E.appendChild(c);
        }), N.morph(document.head, E, {
          callbacks: {
            beforeNodeAdded: O(A, H)
          }
        }), new Promise((c) => {
          h.innerHTML = L == null ? void 0 : L.innerHTML, Promise.allSettled(A).then(() => c(h));
        });
      }).catch((b) => {
        throw b;
      }) : (N.morph(document.head, S), h.innerHTML = g, Promise.resolve(h));
    }
  };
}, V = () => {
  document.head.querySelectorAll("script, link, style").forEach((h) => h.setAttribute("im-preserve", "true"));
}, O = (h, S) => (g) => {
  if (g.src && g.getAttribute("src").startsWith("/")) {
    const { pathname: M, search: b } = new URL(g.src);
    g.src = S.origin + M + b;
  } else if (g.href && g.getAttribute("href").startsWith("/")) {
    const { pathname: M, search: b } = new URL(g.href);
    g.href = S.origin + M + b;
  }
  return g.src && g.localName == "script" && h.push(new Promise((M, b) => {
    g.addEventListener("load", M), g.addEventListener("error", b);
  })), h;
};
export {
  q as Outlet
};
