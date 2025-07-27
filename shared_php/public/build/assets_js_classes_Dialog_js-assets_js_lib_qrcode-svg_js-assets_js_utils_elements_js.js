"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["assets_js_classes_Dialog_js-assets_js_lib_qrcode-svg_js-assets_js_utils_elements_js"],{

/***/ "./assets/js/classes/Dialog.js":
/*!*************************************!*\
  !*** ./assets/js/classes/Dialog.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dialog)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Wraps the HTML dialogs to add the ability to remotely show/hide them, as well
 * as triggering events when they show/hide.
 */
var Dialog = /*#__PURE__*/function () {
  /**
   * Creates the Dialog instance.
   *
   * @param {Element} dialog
   *        Dialog element.
   */
  function Dialog(dialog) {
    _classCallCheck(this, Dialog);

    /**
     * The dialog element that this instance wraps.
     * @type {Element}
     */
    this.dialog = dialog;
    this.constructor.observer.observe(dialog, {
      attributes: true,
      attributeFilter: ["open"]
    });
    this.run();
  }
  /**
   * Processes everything that would need to happen when the dialog instance
   * is created. This allows us to subclass {@link Dialog} more easily.
   */


  _createClass(Dialog, [{
    key: "run",
    value: function run() {
      this.addListeners();
    }
    /**
     * Adds event listeners to key elements.
     */

  }, {
    key: "addListeners",
    value: function addListeners() {
      var _dialog$getAttribute,
          _this = this;

      var dialog = this.dialog;
      var hideOn = ((_dialog$getAttribute = dialog.getAttribute("data-dialog-hide-on")) === null || _dialog$getAttribute === void 0 ? void 0 : _dialog$getAttribute.trim().split(/\s/)) || [];

      if (hideOn.includes("click")) {
        dialog.addEventListener("click", function () {
          return _this.hide();
        });
      }

      if (hideOn.includes("backdrop")) {
        dialog.addEventListener("click", function (_ref) {
          var target = _ref.target;

          if (!dialog.firstElementChild.contains(target)) {
            _this.hide();
          }
        });
      }

      dialog.addEventListener("click", function (_ref2) {
        var target = _ref2.target;
        var hide = target.closest("[data-dialog-hide]");

        if (hide) {
          _this.hide();
        }
      });
    }
    /**
     * Makes the dialog show.
     */

  }, {
    key: "show",
    value: function show() {
      this.dialog.showModal();
    }
    /**
     * Makes the dialog hide.
     */

  }, {
    key: "hide",
    value: function hide() {
      this.dialog.close();
    }
    /**
     * Exposes {@link Dialog#dialog}.
     *
     * @return {Element}
     *         Dialog element.
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.dialog;
    }
    /**
     * Binds a handler to an event that's triggered on {@link Dialog#dialog}.
     *
     * @param {String} eventName
     *        Name of the event to listen for.
     * @param {Function} handler
     *        Handler to execute when the event is heard.
     */

  }, {
    key: "on",
    value: function on(eventName, handler) {
      this.dialog.addEventListener(eventName, handler);
    }
    /**
     * Removes a handler from an event that's triggered on
     * {@link Dialog#dialog}.
     *
     * @param {String} eventName
     *        Name of the event whose handler should be removed.
     * @param {Function} handler
     *        Handler to remove.
     */

  }, {
    key: "off",
    value: function off(eventName, handler) {
      this.dialog.removeEventListener(eventName, handler);
    }
  }], [{
    key: "SHOW",
    get:
    /**
     * The show event name.
     * @type {String}
     */
    function get() {
      return "dialog-show";
    }
    /**
     * The hide event name.
     * @type {String}
     */

  }, {
    key: "HIDE",
    get: function get() {
      return "dialog-hide";
    }
    /**
     * An observer that listens for dialogs showing and hiding.
     * @type {MutationObserver}
     */

  }, {
    key: "createFromTrigger",
    value:
    /**
     * A helper function that creates a {@link Dialog} instance from the given
     * trigger.
     *
     * @param  {Element} trigger
     *         Trigger element that should make a dialog show when it's clicked.
     * @return {Dialog}
     *         Dialog instance.
     */
    function createFromTrigger(trigger) {
      var selector = trigger.dataset.dialog;
      var dialog = this.create(document.querySelector(selector));
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        dialog.show();
      });
      return dialog;
    }
    /**
     * Creates a {@link Dialog} instance from the given dialog element.
     *
     * @param  {Element} dialog
     *         Dialog element.
     * @return {Dialog}
     *         Dialog instance.
     */

  }, {
    key: "create",
    value: function create(dialog) {
      var cache = this.cache;
      var instance = cache.get(dialog);

      if (!instance) {
        instance = new this(dialog);
        cache.set(dialog, instance);
      }

      return instance;
    }
  }]);

  return Dialog;
}();

_defineProperty(Dialog, "observer", new MutationObserver(function (mutations) {
  mutations.forEach(function (_ref3) {
    var target = _ref3.target,
        attributeName = _ref3.attributeName;
    target.dispatchEvent(new CustomEvent(target.getAttribute(attributeName) === "" ? Dialog.SHOW : Dialog.HIDE, {
      bubbles: true,
      cancelable: false
    }));
  });
}));

_defineProperty(Dialog, "cache", new WeakMap());



/***/ }),

/***/ "./assets/js/lib/qrcode-svg.js":
/*!*************************************!*\
  !*** ./assets/js/lib/qrcode-svg.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QRCode)
/* harmony export */ });
/** https://github.com/datalog/qrcode-svg under MIT license */
function QRCode(r) {
  var n,
      t,
      o,
      e,
      a = [],
      f = [],
      i = Math.max,
      u = Math.min,
      h = Math.abs,
      v = Math.ceil,
      c = /^[0-9]*$/,
      s = /^[A-Z0-9 $%*+.\/:-]*$/,
      l = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",
      g = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]],
      d = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]],
      m = {
    L: [0, 1],
    M: [1, 0],
    Q: [2, 3],
    H: [3, 2]
  },
      p = function p(r, n) {
    for (var t = 0, o = 8; o--;) {
      t = t << 1 ^ 285 * (t >>> 7) ^ (n >>> o & 1) * r;
    }

    return t;
  },
      C = function C(r, n) {
    for (var t = [], o = r.length, e = o; e;) {
      for (var a = r[o - e--] ^ t.shift(), f = n.length; f--;) {
        t[f] ^= p(n[f], a);
      }
    }

    return t;
  },
      w = function w(r) {
    for (var n = [function () {
      return 0 == (t + o) % 2;
    }, function () {
      return 0 == t % 2;
    }, function () {
      return 0 == o % 3;
    }, function () {
      return 0 == (t + o) % 3;
    }, function () {
      return 0 == ((t / 2 | 0) + (o / 3 | 0)) % 2;
    }, function () {
      return 0 == t * o % 2 + t * o % 3;
    }, function () {
      return 0 == (t * o % 2 + t * o % 3) % 2;
    }, function () {
      return 0 == ((t + o) % 2 + t * o % 3) % 2;
    }][r], t = e; t--;) {
      for (var o = e; o--;) {
        f[t][o] || (a[t][o] ^= n());
      }
    }
  },
      b = function b() {
    for (var r = function r(_r, n) {
      n[6] || (_r += e), n.shift(), n.push(_r);
    }, n = function n(_n, o, a) {
      return _n && (r(o, a), o = 0), r(o += e, a), t(a);
    }, t = function t(r) {
      var n = r[5],
          t = n > 0 && r[4] == n && r[3] == 3 * n && r[2] == n && r[1] == n;
      return (t && r[6] >= 4 * n && r[0] >= n ? 1 : 0) + (t && r[0] >= 4 * n && r[6] >= n ? 1 : 0);
    }, o = 0, f = e * e, i = 0, u = e; u--;) {
      for (var c = [0, 0, 0, 0, 0, 0, 0], s = [0, 0, 0, 0, 0, 0, 0], l = !1, g = !1, d = 0, m = 0, p = e; p--;) {
        a[u][p] == l ? 5 == ++d ? o += 3 : d > 5 && o++ : (r(d, c), o += 40 * t(c), d = 1, l = a[u][p]), a[p][u] == g ? 5 == ++m ? o += 3 : m > 5 && o++ : (r(m, s), o += 40 * t(s), m = 1, g = a[p][u]);
        var C = a[u][p];
        C && i++, p && u && C == a[u][p - 1] && C == a[u - 1][p] && C == a[u - 1][p - 1] && (o += 3);
      }

      o += 40 * n(l, d, c) + 40 * n(g, m, s);
    }

    return o += 10 * (v(h(20 * i - 10 * f) / f) - 1);
  },
      A = function A(r, n, t) {
    for (; n--;) {
      t.push(r >>> n & 1);
    }
  },
      M = function M(r, n) {
    return r.numBitsCharCount[(n + 7) / 17 | 0];
  },
      B = function B(r, n) {
    return 0 != (r >>> n & 1);
  },
      x = function x(r, n) {
    for (var t = 0, o = r.length; o--;) {
      var e = r[o],
          a = M(e, n);
      if (1 << a <= e.numChars) return 1 / 0;
      t += 4 + a + e.bitData.length;
    }

    return t;
  },
      D = function D(r) {
    if (r < 1 || r > 40) throw "Version number out of range";
    var n = (16 * r + 128) * r + 64;

    if (r >= 2) {
      var t = r / 7 | 2;
      n -= (25 * t - 10) * t - 55, r >= 7 && (n -= 36);
    }

    return n;
  },
      I = function I(r, n) {
    for (var t = 2; -2 <= t; t--) {
      for (var o = 2; -2 <= o; o--) {
        E(r + o, n + t, 1 != i(h(o), h(t)));
      }
    }
  },
      H = function H(r, n) {
    for (var t = 4; -4 <= t; t--) {
      for (var o = 4; -4 <= o; o--) {
        var a = i(h(o), h(t)),
            f = r + o,
            u = n + t;
        0 <= f && f < e && 0 <= u && u < e && E(f, u, 2 != a && 4 != a);
      }
    }
  },
      $ = function $(r) {
    for (var n = t[1] << 3 | r, o = n, a = 10; a--;) {
      o = o << 1 ^ 1335 * (o >>> 9);
    }

    var f = 21522 ^ (n << 10 | o);
    if (f >>> 15 != 0) throw "Assertion error";

    for (a = 0; a <= 5; a++) {
      E(8, a, B(f, a));
    }

    E(8, 7, B(f, 6)), E(8, 8, B(f, 7)), E(7, 8, B(f, 8));

    for (a = 9; a < 15; a++) {
      E(14 - a, 8, B(f, a));
    }

    for (a = 0; a < 8; a++) {
      E(e - 1 - a, 8, B(f, a));
    }

    for (a = 8; a < 15; a++) {
      E(8, e - 15 + a, B(f, a));
    }

    E(8, e - 8, 1);
  },
      O = function O() {
    for (var r = e; r--;) {
      E(6, r, 0 == r % 2), E(r, 6, 0 == r % 2);
    }

    for (var t = function () {
      var r = [];
      if (n > 1) for (var t = 2 + (n / 7 | 0), o = 32 == n ? 26 : 2 * v((e - 13) / (2 * t - 2)); t--;) {
        r[t] = t * o + 6;
      }
      return r;
    }(), o = r = t.length; o--;) {
      for (var a = r; a--;) {
        0 == a && 0 == o || 0 == a && o == r - 1 || a == r - 1 && 0 == o || I(t[a], t[o]);
      }
    }

    H(3, 3), H(e - 4, 3), H(3, e - 4), $(0), function () {
      if (!(7 > n)) {
        for (var r = n, t = 12; t--;) {
          r = r << 1 ^ 7973 * (r >>> 11);
        }

        var o = n << 12 | r;
        if (t = 18, o >>> 18 != 0) throw "Assertion error";

        for (; t--;) {
          var a = e - 11 + t % 3,
              f = t / 3 | 0,
              i = B(o, t);
          E(a, f, i), E(f, a, i);
        }
      }
    }();
  },
      Q = function Q(r) {
    if (r.length != V(n, t)) throw "Invalid argument";

    for (var o = d[t[0]][n], e = g[t[0]][n], a = D(n) / 8 | 0, f = o - a % o, i = a / o | 0, u = [], h = function (r) {
      var n = 1,
          t = [];
      t[r - 1] = 1;

      for (var o = 0; o < r; o++) {
        for (var e = 0; e < r; e++) {
          t[e] = p(t[e], n) ^ t[e + 1];
        }

        n = p(n, 2);
      }

      return t;
    }(e), v = 0, c = 0; v < o; v++) {
      var s = r.slice(c, c + i - e + (v < f ? 0 : 1));
      c += s.length;
      var l = C(s, h);
      v < f && s.push(0), u.push(s.concat(l));
    }

    var m = [];

    for (v = 0; v < u[0].length; v++) {
      for (var w = 0; w < u.length; w++) {
        (v != i - e || w >= f) && m.push(u[w][v]);
      }
    }

    return m;
  },
      S = function S(r) {
    for (var n = [], t = (r = encodeURI(r), 0); t < r.length; t++) {
      "%" != r.charAt(t) ? n.push(r.charCodeAt(t)) : (n.push(parseInt(r.substr(t + 1, 2), 16)), t += 2);
    }

    return n;
  },
      V = function V(r, n) {
    return (D(r) / 8 | 0) - g[n[0]][r] * d[n[0]][r];
  },
      E = function E(r, n, t) {
    a[n][r] = t ? 1 : 0, f[n][r] = 1;
  },
      R = function R(r) {
    for (var n = [], t = 0, o = r; t < o.length; t++) {
      var e = o[t];
      A(e, 8, n);
    }

    return {
      modeBits: 4,
      numBitsCharCount: [8, 16, 16],
      numChars: r.length,
      bitData: n
    };
  },
      Z = function Z(r) {
    if (!c.test(r)) throw "String contains non-numeric characters";

    for (var n = [], t = 0; t < r.length;) {
      var o = u(r.length - t, 3);
      A(parseInt(r.substr(t, o), 10), 3 * o + 1, n), t += o;
    }

    return {
      modeBits: 1,
      numBitsCharCount: [10, 12, 14],
      numChars: r.length,
      bitData: n
    };
  },
      z = function z(r) {
    if (!s.test(r)) throw "String contains unencodable characters in alphanumeric mode";
    var n,
        t = [];

    for (n = 0; n + 2 <= r.length; n += 2) {
      var o = 45 * l.indexOf(r.charAt(n));
      o += l.indexOf(r.charAt(n + 1)), A(o, 11, t);
    }

    return n < r.length && A(l.indexOf(r.charAt(n)), 6, t), {
      modeBits: 2,
      numBitsCharCount: [9, 11, 13],
      numChars: r.length,
      bitData: t
    };
  },
      L = function L(r, n, t, o) {
    var e = function (r) {
      return "" == r ? [] : c.test(r) ? [Z(r)] : s.test(r) ? [z(r)] : [R(S(r))];
    }(r);

    return U(e, n, t, o);
  },
      N = function N(r, i, u, h) {
    t = i, o = h;

    for (var v = e = 4 * (n = r) + 17; v--;) {
      a[v] = [], f[v] = [];
    }

    if (O(), function (r) {
      for (var n = 0, t = 1, o = e - 1, i = o; i > 0; i -= 2) {
        6 == i && --i;

        for (var u = 0 > (t = -t) ? o : 0, h = 0; h < e; ++h) {
          for (var v = i; v > i - 2; --v) {
            f[u][v] || (a[u][v] = B(r[n >>> 3], 7 - (7 & n)), ++n);
          }

          u += t;
        }
      }
    }(Q(u)), 0 > o) {
      var c = 1e9;

      for (v = 8; v--;) {
        w(v), $(v);
        var s = b();
        c > s && (c = s, o = v), w(v);
      }
    }

    w(o), $(o), f = [];
  },
      U = function U(r, n, t, o, e, a) {
    if (void 0 === e && (e = 1), void 0 === a && (a = 40), void 0 === o && (o = -1), void 0 === t && (t = !0), !(1 <= e && e <= a && a <= 40) || o < -1 || o > 7) throw "Invalid value";

    for (var f = [], i = 236, h = [], v = e;;) {
      var c = x(r, v);
      if (c <= 8 * V(v, n)) break;
      if (v >= a) throw "Data too long";
      v++;
    }

    if (t) for (var s = (l = [m.H, m.Q, m.M]).length; s--;) {
      c <= 8 * V(v, l[s]) && (n = l[s]);
    }

    for (var l = 0; l < r.length; l++) {
      var g = r[l];
      A(g.modeBits, 4, f), A(g.numChars, M(g, v), f);

      for (var d = 0, p = g.bitData; d < p.length; d++) {
        f.push(p[d]);
      }
    }

    if (f.length != c) throw "Assertion error";
    var C = 8 * V(v, n);
    if (f.length > C) throw "Assertion error";
    if (A(0, u(4, C - f.length), f), A(0, (8 - f.length % 8) % 8, f), f.length % 8 != 0) throw "Assertion error";

    for (; f.length < C;) {
      A(i, 8, f), i ^= 253;
    }

    for (s = f.length; s--;) {
      h[s >>> 3] |= f[s] << 7 - (7 & s);
    }

    return N(v, n, h, o);
  };

  return function () {
    function n(r) {
      return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(r);
    }

    function t(r, n) {
      for (var t in r = document.createElementNS(s, r), n || {}) {
        r.setAttribute(t, n[t]);
      }

      return r;
    }

    var o,
        f,
        i,
        u,
        v,
        c,
        s = "http://www.w3.org/2000/svg",
        l = "",
        g = "string" == typeof r ? {
      msg: r
    } : r || {},
        d = g.pal || ["#000"],
        p = h(g.dim) || 256,
        C = [1, 0, 0, 1, c = (c = h(g.pad)) > -1 ? c : 4, c],
        w = n(w = d[0]) ? w : "#000",
        b = n(b = d[1]) ? b : 0,
        A = g.vrb ? 0 : 1;

    for (L(g.msg || "", m[g.ecl] || m.M, 0 == g.ecb ? 0 : 1, g.mtx), v = e + 2 * c, i = e; i--;) {
      for (u = 0, f = e; f--;) {
        a[i][f] && (A ? (u++, a[i][f - 1] || (l += "M" + f + "," + i + "h" + u + "v1h-" + u + "v-1z", u = 0)) : l += "M" + f + "," + i + "h1v1h-1v-1z");
      }
    }

    return o = t("svg", {
      viewBox: [0, 0, v, v].join(" "),
      width: p,
      height: p,
      fill: w,
      "shape-rendering": "crispEdges",
      xmlns: s,
      version: "1.1"
    }), b && o.appendChild(t("path", {
      fill: b,
      d: "M0,0V" + v + "H" + v + "V0H0Z"
    })), o.appendChild(t("path", {
      transform: "matrix(" + C + ")",
      d: l
    })), o;
  }();
}

/***/ }),

/***/ "./assets/js/utils/elements.js":
/*!*************************************!*\
  !*** ./assets/js/utils/elements.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   announceInput: () => (/* binding */ announceInput),
/* harmony export */   appendMany: () => (/* binding */ appendMany),
/* harmony export */   empty: () => (/* binding */ empty),
/* harmony export */   getIndex: () => (/* binding */ getIndex),
/* harmony export */   getLabel: () => (/* binding */ getLabel),
/* harmony export */   getLabelText: () => (/* binding */ getLabelText),
/* harmony export */   identify: () => (/* binding */ identify),
/* harmony export */   lookup: () => (/* binding */ lookup),
/* harmony export */   lookupCached: () => (/* binding */ lookupCached),
/* harmony export */   lookupOne: () => (/* binding */ lookupOne),
/* harmony export */   lookupOneCached: () => (/* binding */ lookupOneCached),
/* harmony export */   replaceContentsMany: () => (/* binding */ replaceContentsMany)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * A helper function for looking up elements, optionally from with a specified
 * context element.
 *
 * @param  {String} selector
 *         CSS selector to identify the elements.
 * @param  {Element} [context=document]
 *         Optional context, defaults to the document.
 * @return {Element[]}
 *         An array of elements matching the selector and within the given
 *         context. If there are no matches, an empty array is returned.
 */
function lookup(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return _toConsumableArray(context.querySelectorAll(selector));
}
/**
 * A helper function for looking up a single element, optionally from with a
 * specified context element.
 *
 * @param  {String} selector
 *         CSS selector to identify the elements.
 * @param  {Element} [context=document]
 *         Optional context, defaults to the document.
 * @return {Element|undefined}
 *         The first matching element or undefined if no element can be found.
 */

function lookupOne(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return lookup(selector, context)[0];
}
/**
 * A cache for the lookups. The context element is used as the key.
 * @type {WeakMap}
 * @private
 */

var lookupCache = new WeakMap();
/**
 * Returns an array of elements matching the given CSS selector and within the
 * given context element. The results are cached before being returned.
 *
 * @param  {String} selector
 *         CSS selector to identify the elements.
 * @param  {Element} [context=document]
 *         Optional context, defaults to the document.
 * @return {Element[]}
 *         An array of elements matching the selector and within the given
 *         context. If there are no matches, an empty array is returned.
 */

function lookupCached(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var cache = lookupCache.get(context);

  if (!cache) {
    cache = Object.create(null);
    lookupCache.set(context, cache);
  }

  if (!cache[selector]) {
    cache[selector] = lookup(selector, context);
  }

  return cache[selector];
}
/**
 * Returns the first element matching the given CSS selector and within the
 * given context element. The result is cached before being returned.
 *
 * @param  {String} selector
 *         CSS selector to identify the elements.
 * @param  {Element} [context=document]
 *         Optional context, defaults to the document.
 * @return {Element|undefined}
 *         The first matching element or undefined if no element can be found.
 */

function lookupOneCached(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return lookupCached(selector, context)[0];
}
/**
 * A counter that increases to create a unique number.
 * @type {Number}
 * @private
 */

var identifyCounter = 0;
/**
 * Returns the ID of the given element. If the element has no ID, a unique one
 * is generated and assigned to the element before being returned.
 *
 * @param  {Element} element
 *         Element to identify.
 * @param  {String} [prefix="anonymous-element-"]
 *         Optional generated ID prefix.
 * @return {String}
 *         ID of the given element.
 */

function identify(element) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "anonymous-element-";
  var id = element.id;

  if (!id) {
    do {
      id = prefix + identifyCounter;
      identifyCounter += 1; // document.getElementById() is faster than our lookupOne().
    } while (document.getElementById(id));

    element.id = id;
  }

  return id;
}
/**
 * Appends all the entries in the given list to the given target.
 *
 * @param  {Element} target
 *         Element that should have all the entries appended to it.
 * @param  {Array} list
 *         Items that should be appended to the target.
 * @return {Element}
 *         The given target.
 */

function appendMany(target, list) {
  target.append(list.reduce(function (fragment, item) {
    fragment.append(item);
    return fragment;
  }, document.createDocumentFragment()));
  return target;
}
/**
 * Empties the given element before returning it.
 *
 * @param  {Element} element
 *         Element that should be emptied.
 * @return {Element}
 *         Emptied element.
 */

function empty(element) {
  element.innerHTML = "";
  return element;
}
/**
 * Replaces the contents with all the items that have been given. This is a
 * combination of {@link empty} and {@link appendMany}.
 *
 * @param  {Element} target
 *         Element that should have all the entries appended to it after it's
 *         been emptied.
 * @param  {Array} list
 *         Items that should be appended to the target.
 * @return {Element}
 *         The given target.
 */

function replaceContentsMany(target, list) {
  return appendMany(empty(target), list);
}
/**
 * Gets the label for the given input element.
 *
 * @param  {Element} input
 *         Input element whose label should be returned.
 * @return {Element|undefined}
 *         Either the input's label or undefined if the label cannot be found.
 */

function getLabel(input) {
  var aria = input.getAttribute("aria-labelledby");

  if (typeof aria === "string") {
    return lookupOne("#".concat(aria));
  }

  var id = input.getAttribute("id");

  if (typeof id === "string") {
    return lookupOne("label[for=\"".concat(id, "\"]"));
  }

  var closest = input.closest("label");

  if (closest) {
    return closest;
  }
}
/**
 * Gets the trimmed text of the label for the given input.
 *
 * @param  {Element} input
 *         Input whose label text should be returned.
 * @return {String}
 *         The input's label text. If the label cannot be found, an empty string
 *         is returned.
 */

function getLabelText(input) {
  var _getLabel;

  var aria = input.getAttribute("aria-label");

  if (typeof aria === "string") {
    return aria.trim();
  }

  return ((_getLabel = getLabel(input)) === null || _getLabel === void 0 ? void 0 : _getLabel.textContent.trim()) || "";
}
/**
 * Triggers the appropriate events for an input having changed, in the correct
 * (or, at least, a consistent) order. If the given input does not exist or is
 * not an input then nothing happens.
 *
 * @param {Element} input
 *        Input element.
 */

function announceInput(input) {
  var _input$nodeName;

  var expectedNodeNames = ["input", "select", "textarea"];

  if (!input || !expectedNodeNames.includes((_input$nodeName = input.nodeName) === null || _input$nodeName === void 0 ? void 0 : _input$nodeName.toLowerCase())) {
    return;
  }

  input.dispatchEvent(new Event("input", {
    bubbles: true
  }));
  input.dispatchEvent(new Event("change", {
    bubbles: true
  }));
}
/**
 * Gets the element's index.
 *
 * @param  {Element} element
 *         The element whose index should be returned.
 * @return {Number}
 *         The element's index, or -1 if it can't be worked out.
 */

function getIndex(element) {
  return Array.prototype.findIndex.call(element.parentNode.children, function (item) {
    return item === element;
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzX2pzX2NsYXNzZXNfRGlhbG9nX2pzLWFzc2V0c19qc19saWJfcXJjb2RlLXN2Z19qcy1hc3NldHNfanNfdXRpbHNfZWxlbWVudHNfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBLE07QUFtR2pCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLGtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBRWhCO0FBQ1I7QUFDQTtBQUNBO0FBQ1EsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJDLE9BQTFCLENBQWtDSCxNQUFsQyxFQUEwQztBQUN0Q0ksTUFBQUEsVUFBVSxFQUFFLElBRDBCO0FBRXRDQyxNQUFBQSxlQUFlLEVBQUUsQ0FBQyxNQUFEO0FBRnFCLEtBQTFDO0FBS0EsU0FBS0MsR0FBTDtBQUVIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7Ozs7O1dBQ0ksZUFBTTtBQUNGLFdBQUtDLFlBQUw7QUFDSDtBQUVEO0FBQ0o7QUFDQTs7OztXQUNJLHdCQUFlO0FBQUE7QUFBQTs7QUFFWCxVQUNJUCxNQURKLEdBRUksSUFGSixDQUNJQSxNQURKO0FBR0EsVUFBTVEsTUFBTSxHQUNSLHlCQUFBUixNQUFNLENBQUNTLFlBQVAsQ0FBb0IscUJBQXBCLCtFQUE0Q0MsSUFBNUMsR0FBbURDLEtBQW5ELENBQXlELElBQXpELE1BQWtFLEVBRHRFOztBQUlBLFVBQUlILE1BQU0sQ0FBQ0ksUUFBUCxDQUFnQixPQUFoQixDQUFKLEVBQThCO0FBQzFCWixRQUFBQSxNQUFNLENBQUNhLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDO0FBQUEsaUJBQU0sS0FBSSxDQUFDQyxJQUFMLEVBQU47QUFBQSxTQUFqQztBQUNIOztBQUVELFVBQUlOLE1BQU0sQ0FBQ0ksUUFBUCxDQUFnQixVQUFoQixDQUFKLEVBQWlDO0FBRTdCWixRQUFBQSxNQUFNLENBQUNhLGdC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RUFBdkUsRUFBMEUsRUFBMUUsRUFBNkUsRUFBN0UsRUFBZ0YsRUFBaEYsRUFBbUYsRUFBbkYsRUFBc0YsRUFBdEYsRUFBeUYsRUFBekYsRUFBNEYsRUFBNUYsRUFBK0YsRUFBL0YsRUFBa0csRUFBbEcsRUFBcUcsRUFBckcsRUFBd0csRUFBeEcsRUFBMkcsRUFBM0csQ0FBdkcsRUFBc04sQ0FBQyxDQUFDLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFBMEIsRUFBMUIsRUFBNkIsRUFBN0IsRUFBZ0MsRUFBaEMsRUFBbUMsRUFBbkMsRUFBc0MsRUFBdEMsRUFBeUMsRUFBekMsRUFBNEMsRUFBNUMsRUFBK0MsRUFBL0MsRUFBa0QsRUFBbEQsRUFBcUQsRUFBckQsRUFBd0QsRUFBeEQsRUFBMkQsRUFBM0QsRUFBOEQsRUFBOUQsRUFBaUUsRUFBakUsRUFBb0UsRUFBcEUsRUFBdUUsRUFBdkUsRUFBMEUsRUFBMUUsRUFBNkUsRUFBN0UsRUFBZ0YsRUFBaEYsRUFBbUYsRUFBbkYsRUFBc0YsRUFBdEYsRUFBeUYsRUFBekYsRUFBNEYsRUFBNUYsRUFBK0YsRUFBL0YsRUFBa0csRUFBbEcsRUFBcUcsRUFBckcsRUFBd0csRUFBeEcsRUFBMkcsRUFBM0csRUFBOEcsRUFBOUcsQ0FBdE4sRUFBd1UsQ0FBQyxDQUFDLENBQUYsRUFBSSxDQUFKLEVBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBWixFQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsRUFBeEIsRUFBMkIsRUFBM0IsRUFBOEIsRUFBOUIsRUFBaUMsRUFBakMsRUFBb0MsRUFBcEMsRUFBdUMsRUFBdkMsRUFBMEMsRUFBMUMsRUFBNkMsRUFBN0MsRUFBZ0QsRUFBaEQsRUFBbUQsRUFBbkQs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LElBQVUsQ0FBQ0ssaUJBQWlCLENBQUNsSixRQUFsQixvQkFBMkI2SSxLQUFLLENBQUNNLFFBQWpDLG9EQUEyQixnQkFBZ0JDLFdBQWhCLEVBQTNCLENBQWYsRUFBMEU7QUFDdEU7QUFDSDs7QUFFRFAsRUFBQUEsS0FBSyxDQUFDaEgsYUFBTixDQUFvQixJQUFJd0gsS0FBSixDQUFVLE9BQVYsRUFBbUI7QUFDbkNwSCxJQUFBQSxPQUFPLEVBQUU7QUFEMEIsR0FBbkIsQ0FBcEI7QUFHQTRHLEVBQUFBLEtBQUssQ0FBQ2hILGFBQU4sQ0FBb0IsSUFBSXdILEtBQUosQ0FBVSxRQUFWLEVBQW9CO0FBQ3BDcEgsSUFBQUEsT0FBTyxFQUFFO0FBRDJCLEdBQXBCLENBQXBCO0FBSUg7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLFNBQVNxSCxRQUFULENBQWtCeEIsT0FBbEIsRUFBMkI7QUFFOUIsU0FBT3lCLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsU0FBaEIsQ0FBMEJDLElBQTFCLENBQ0g1QixPQUFPLENBQUM2QixVQUFSLENBQW1CQyxRQURoQixFQUVILFVBQUNyQixJQUFEO0FBQUEsV0FBVUEsSUFBSSxLQUFLVCxPQUFuQjtBQUFBLEdBRkcsQ0FBUDtBQUtILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY2xhc3Nlcy9EaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2xpYi9xcmNvZGUtc3ZnLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy91dGlscy9lbGVtZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdyYXBzIHRoZSBIVE1MIGRpYWxvZ3MgdG8gYWRkIHRoZSBhYmlsaXR5IHRvIHJlbW90ZWx5IHNob3cvaGlkZSB0aGVtLCBhcyB3ZWxsXG4gKiBhcyB0cmlnZ2VyaW5nIGV2ZW50cyB3aGVuIHRoZXkgc2hvdy9oaWRlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFsb2cge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNob3cgZXZlbnQgbmFtZS5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgU0hPVygpIHtcbiAgICAgICAgcmV0dXJuIFwiZGlhbG9nLXNob3dcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaGlkZSBldmVudCBuYW1lLlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgc3RhdGljIGdldCBISURFKCkge1xuICAgICAgICByZXR1cm4gXCJkaWFsb2ctaGlkZVwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuIG9ic2VydmVyIHRoYXQgbGlzdGVucyBmb3IgZGlhbG9ncyBzaG93aW5nIGFuZCBoaWRpbmcuXG4gICAgICogQHR5cGUge011dGF0aW9uT2JzZXJ2ZXJ9XG4gICAgICovXG4gICAgc3RhdGljIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuXG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKCh7IHRhcmdldCwgYXR0cmlidXRlTmFtZSB9KSA9PiB7XG5cbiAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkgPT09IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLlNIT1dcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLkhJREVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQSBjYWNoZSBvZiBhbGwgZGlhbG9nIGVsZW1lbnRzIHRvIHtAbGluayBEaWFsb2d9IGluc3RhbmNlcy5cbiAgICAgKiBAdHlwZSB7V2Vha01hcH1cbiAgICAgKi9cbiAgICBzdGF0aWMgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG4gICAgLyoqXG4gICAgICogQSBoZWxwZXIgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEge0BsaW5rIERpYWxvZ30gaW5zdGFuY2UgZnJvbSB0aGUgZ2l2ZW5cbiAgICAgKiB0cmlnZ2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7RWxlbWVudH0gdHJpZ2dlclxuICAgICAqICAgICAgICAgVHJpZ2dlciBlbGVtZW50IHRoYXQgc2hvdWxkIG1ha2UgYSBkaWFsb2cgc2hvdyB3aGVuIGl0J3MgY2xpY2tlZC5cbiAgICAgKiBAcmV0dXJuIHtEaWFsb2d9XG4gICAgICogICAgICAgICBEaWFsb2cgaW5zdGFuY2UuXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZUZyb21UcmlnZ2VyKHRyaWdnZXIpIHtcblxuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRyaWdnZXIuZGF0YXNldC5kaWFsb2c7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMuY3JlYXRlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcblxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkaWFsb2cuc2hvdygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2c7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEge0BsaW5rIERpYWxvZ30gaW5zdGFuY2UgZnJvbSB0aGUgZ2l2ZW4gZGlhbG9nIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtFbGVtZW50fSBkaWFsb2dcbiAgICAgKiAgICAgICAgIERpYWxvZyBlbGVtZW50LlxuICAgICAqIEByZXR1cm4ge0RpYWxvZ31cbiAgICAgKiAgICAgICAgIERpYWxvZyBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKGRpYWxvZykge1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNhY2hlXG4gICAgICAgIH0gPSB0aGlzO1xuICAgICAgICBsZXQgaW5zdGFuY2UgPSBjYWNoZS5nZXQoZGlhbG9nKTtcblxuICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IHRoaXMoZGlhbG9nKTtcbiAgICAgICAgICAgIGNhY2hlLnNldChkaWFsb2csIGluc3RhbmNlKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgRGlhbG9nIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBkaWFsb2dcbiAgICAgKiAgICAgICAgRGlhbG9nIGVsZW1lbnQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGlhbG9nKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaWFsb2cgZWxlbWVudCB0aGF0IHRoaXMgaW5zdGFuY2Ugd3JhcHMuXG4gICAgICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaWFsb2cgPSBkaWFsb2c7XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3Iub2JzZXJ2ZXIub2JzZXJ2ZShkaWFsb2csIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcIm9wZW5cIl1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ydW4oKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyBldmVyeXRoaW5nIHRoYXQgd291bGQgbmVlZCB0byBoYXBwZW4gd2hlbiB0aGUgZGlhbG9nIGluc3RhbmNlXG4gICAgICogaXMgY3JlYXRlZC4gVGhpcyBhbGxvd3MgdXMgdG8gc3ViY2xhc3Mge0BsaW5rIERpYWxvZ30gbW9yZSBlYXNpbHkuXG4gICAgICovXG4gICAgcnVuKCkge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIGtleSBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBhZGRMaXN0ZW5lcnMoKSB7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZGlhbG9nXG4gICAgICAgIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBoaWRlT24gPSAoXG4gICAgICAgICAgICBkaWFsb2cuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaWFsb2ctaGlkZS1vblwiKT8udHJpbSgpLnNwbGl0KC9cXHMvKSB8fCBbXVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChoaWRlT24uaW5jbHVkZXMoXCJjbGlja1wiKSkge1xuICAgICAgICAgICAgZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGlkZU9uLmluY2x1ZGVzKFwiYmFja2Ryb3BcIikpIHtcblxuICAgICAgICAgICAgZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFkaWFsb2cuZmlyc3RFbGVtZW50Q2hpbGQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGhpZGUgPSB0YXJnZXQuY2xvc2VzdChcIltkYXRhLWRpYWxvZy1oaWRlXVwiKTtcblxuICAgICAgICAgICAgaWYgKGhpZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2VzIHRoZSBkaWFsb2cgc2hvdy5cbiAgICAgKi9cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyB0aGUgZGlhbG9nIGhpZGUuXG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaWFsb2cuY2xvc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2VzIHtAbGluayBEaWFsb2cjZGlhbG9nfS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAgICogICAgICAgICBEaWFsb2cgZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2c7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYSBoYW5kbGVyIHRvIGFuIGV2ZW50IHRoYXQncyB0cmlnZ2VyZWQgb24ge0BsaW5rIERpYWxvZyNkaWFsb2d9LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqICAgICAgICBOYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiAgICAgICAgSGFuZGxlciB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IGlzIGhlYXJkLlxuICAgICAqL1xuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLmRpYWxvZy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGhhbmRsZXIgZnJvbSBhbiBldmVudCB0aGF0J3MgdHJpZ2dlcmVkIG9uXG4gICAgICoge0BsaW5rIERpYWxvZyNkaWFsb2d9LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqICAgICAgICBOYW1lIG9mIHRoZSBldmVudCB3aG9zZSBoYW5kbGVyIHNob3VsZCBiZSByZW1vdmVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiAgICAgICAgSGFuZGxlciB0byByZW1vdmUuXG4gICAgICovXG4gICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLmRpYWxvZy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgfVxuXG59XG4iLCIvKiogaHR0cHM6Ly9naXRodWIuY29tL2RhdGFsb2cvcXJjb2RlLXN2ZyB1bmRlciBNSVQgbGljZW5zZSAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUVJDb2RlKHIpe3ZhciBuLHQsbyxlLGE9W10sZj1bXSxpPU1hdGgubWF4LHU9TWF0aC5taW4saD1NYXRoLmFicyx2PU1hdGguY2VpbCxjPS9eWzAtOV0qJC8scz0vXltBLVowLTkgJCUqKy5cXC86LV0qJC8sbD1cIjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWiAkJSorLS4vOlwiLGc9W1stMSw3LDEwLDE1LDIwLDI2LDE4LDIwLDI0LDMwLDE4LDIwLDI0LDI2LDMwLDIyLDI0LDI4LDMwLDI4LDI4LDI4LDI4LDMwLDMwLDI2LDI4LDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwXSxbLTEsMTAsMTYsMjYsMTgsMjQsMTYsMTgsMjIsMjIsMjYsMzAsMjIsMjIsMjQsMjQsMjgsMjgsMjYsMjYsMjYsMjYsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjgsMjhdLFstMSwxMywyMiwxOCwyNiwxOCwyNCwxOCwyMiwyMCwyNCwyOCwyNiwyNCwyMCwzMCwyNCwyOCwyOCwyNiwzMCwyOCwzMCwzMCwzMCwzMCwyOCwzMCwzMCwzMCwzMCwzMCwzMCwzMCwzMCwzMCwzMCwzMCwzMCwzMCwzMF0sWy0xLDE3LDI4LDIyLDE2LDIyLDI4LDI2LDI2LDI0LDI4LDI0LDI4LDIyLDI0LDI0LDMwLDI4LDI4LDI2LDI4LDMwLDI0LDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwLDMwXV0sZD1bWy0xLDEsMSwxLDEsMSwyLDIsMiwyLDQsNCw0LDQsNCw2LDYsNiw2LDcsOCw4LDksOSwxMCwxMiwxMiwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwxOSwyMCwyMSwyMiwyNCwyNV0sWy0xLDEsMSwxLDIsMiw0LDQsNCw1LDUsNSw4LDksOSwxMCwxMCwxMSwxMywxNCwxNiwxNywxNywxOCwyMCwyMSwyMywyNSwyNiwyOCwyOSwzMSwzMywzNSwzNywzOCw0MCw0Myw0NSw0Nyw0OV0sWy0xLDEsMSwyLDIsNCw0LDYsNiw4LDgsOCwxMCwxMiwxNiwxMiwxNywxNiwxOCwyMSwyMCwyMywyMywyNSwyNywyOSwzNCwzNCwzNSwzOCw0MCw0Myw0NSw0OCw1MSw1Myw1Niw1OSw2Miw2NSw2OF0sWy0xLDEsMSwyLDQsNCw0LDUsNiw4LDgsMTEsMTEsMTYsMTYsMTgsMTYsMTksMjEsMjUsMjUsMjUsMzQsMzAsMzIsMzUsMzcsNDAsNDIsNDUsNDgsNTEsNTQsNTcsNjAsNjMsNjYsNzAsNzQsNzcsODFdXSxtPXtMOlswLDFdLE06WzEsMF0sUTpbMiwzXSxIOlszLDJdfSxwPWZ1bmN0aW9uKHIsbil7Zm9yKHZhciB0PTAsbz04O28tLTspdD10PDwxXjI4NSoodD4+PjcpXihuPj4+byYxKSpyO3JldHVybiB0fSxDPWZ1bmN0aW9uKHIsbil7Zm9yKHZhciB0PVtdLG89ci5sZW5ndGgsZT1vO2U7KWZvcih2YXIgYT1yW28tZS0tXV50LnNoaWZ0KCksZj1uLmxlbmd0aDtmLS07KXRbZl1ePXAobltmXSxhKTtyZXR1cm4gdH0sdz1mdW5jdGlvbihyKXtmb3IodmFyIG49W2Z1bmN0aW9uKCl7cmV0dXJuIDA9PSh0K28pJTJ9LGZ1bmN0aW9uKCl7cmV0dXJuIDA9PXQlMn0sZnVuY3Rpb24oKXtyZXR1cm4gMD09byUzfSxmdW5jdGlvbigpe3JldHVybiAwPT0odCtvKSUzfSxmdW5jdGlvbigpe3JldHVybiAwPT0oKHQvMnwwKSsoby8zfDApKSUyfSxmdW5jdGlvbigpe3JldHVybiAwPT10Km8lMit0Km8lM30sZnVuY3Rpb24oKXtyZXR1cm4gMD09KHQqbyUyK3QqbyUzKSUyfSxmdW5jdGlvbigpe3JldHVybiAwPT0oKHQrbyklMit0Km8lMyklMn1dW3JdLHQ9ZTt0LS07KWZvcih2YXIgbz1lO28tLTspZlt0XVtvXXx8KGFbdF1bb11ePW4oKSl9LGI9ZnVuY3Rpb24oKXtmb3IodmFyIHI9ZnVuY3Rpb24ocixuKXtuWzZdfHwocis9ZSksbi5zaGlmdCgpLG4ucHVzaChyKX0sbj1mdW5jdGlvbihuLG8sYSl7cmV0dXJuIG4mJihyKG8sYSksbz0wKSxyKG8rPWUsYSksdChhKX0sdD1mdW5jdGlvbihyKXt2YXIgbj1yWzVdLHQ9bj4wJiZyWzRdPT1uJiZyWzNdPT0zKm4mJnJbMl09PW4mJnJbMV09PW47cmV0dXJuKHQmJnJbNl0+PTQqbiYmclswXT49bj8xOjApKyh0JiZyWzBdPj00Km4mJnJbNl0+PW4/MTowKX0sbz0wLGY9ZSplLGk9MCx1PWU7dS0tOyl7Zm9yKHZhciBjPVswLDAsMCwwLDAsMCwwXSxzPVswLDAsMCwwLDAsMCwwXSxsPSExLGc9ITEsZD0wLG09MCxwPWU7cC0tOyl7YVt1XVtwXT09bD81PT0rK2Q/bys9MzpkPjUmJm8rKzoocihkLGMpLG8rPTQwKnQoYyksZD0xLGw9YVt1XVtwXSksYVtwXVt1XT09Zz81PT0rK20/bys9MzptPjUmJm8rKzoocihtLHMpLG8rPTQwKnQocyksbT0xLGc9YVtwXVt1XSk7dmFyIEM9YVt1XVtwXTtDJiZpKysscCYmdSYmQz09YVt1XVtwLTFdJiZDPT1hW3UtMV1bcF0mJkM9PWFbdS0xXVtwLTFdJiYobys9Myl9bys9NDAqbihsLGQsYykrNDAqbihnLG0scyl9cmV0dXJuIG8rPTEwKih2KGgoMjAqaS0xMCpmKS9mKS0xKX0sQT1mdW5jdGlvbihyLG4sdCl7Zm9yKDtuLS07KXQucHVzaChyPj4+biYxKX0sTT1mdW5jdGlvbihyLG4pe3JldHVybiByLm51bUJpdHNDaGFyQ291bnRbKG4rNykvMTd8MF19LEI9ZnVuY3Rpb24ocixuKXtyZXR1cm4gMCE9KHI+Pj5uJjEpfSx4PWZ1bmN0aW9uKHIsbil7Zm9yKHZhciB0PTAsbz1yLmxlbmd0aDtvLS07KXt2YXIgZT1yW29dLGE9TShlLG4pO2lmKDE8PGE8PWUubnVtQ2hhcnMpcmV0dXJuIDEvMDt0Kz00K2ErZS5iaXREYXRhLmxlbmd0aH1yZXR1cm4gdH0sRD1mdW5jdGlvbihyKXtpZihyPDF8fHI+NDApdGhyb3dcIlZlcnNpb24gbnVtYmVyIG91dCBvZiByYW5nZVwiO3ZhciBuPSgxNipyKzEyOCkqcis2NDtpZihyPj0yKXt2YXIgdD1yLzd8MjtuLT0oMjUqdC0xMCkqdC01NSxyPj03JiYobi09MzYpfXJldHVybiBufSxJPWZ1bmN0aW9uKHIsbil7Zm9yKHZhciB0PTI7LTI8PXQ7dC0tKWZvcih2YXIgbz0yOy0yPD1vO28tLSlFKHIrbyxuK3QsMSE9aShoKG8pLGgodCkpKX0sSD1mdW5jdGlvbihyLG4pe2Zvcih2YXIgdD00Oy00PD10O3QtLSlmb3IodmFyIG89NDstNDw9bztvLS0pe3ZhciBhPWkoaChvKSxoKHQpKSxmPXIrbyx1PW4rdDswPD1mJiZmPGUmJjA8PXUmJnU8ZSYmRShmLHUsMiE9YSYmNCE9YSl9fSwkPWZ1bmN0aW9uKHIpe2Zvcih2YXIgbj10WzFdPDwzfHIsbz1uLGE9MTA7YS0tOylvPW88PDFeMTMzNSoobz4+PjkpO3ZhciBmPTIxNTIyXihuPDwxMHxvKTtpZihmPj4+MTUhPTApdGhyb3dcIkFzc2VydGlvbiBlcnJvclwiO2ZvcihhPTA7YTw9NTthKyspRSg4LGEsQihmLGEpKTtFKDgsNyxCKGYsNikpLEUoOCw4LEIoZiw3KSksRSg3LDgsQihmLDgpKTtmb3IoYT05O2E8MTU7YSsrKUUoMTQtYSw4LEIoZixhKSk7Zm9yKGE9MDthPDg7YSsrKUUoZS0xLWEsOCxCKGYsYSkpO2ZvcihhPTg7YTwxNTthKyspRSg4LGUtMTUrYSxCKGYsYSkpO0UoOCxlLTgsMSl9LE89ZnVuY3Rpb24oKXtmb3IodmFyIHI9ZTtyLS07KUUoNixyLDA9PXIlMiksRShyLDYsMD09ciUyKTtmb3IodmFyIHQ9ZnVuY3Rpb24oKXt2YXIgcj1bXTtpZihuPjEpZm9yKHZhciB0PTIrKG4vN3wwKSxvPTMyPT1uPzI2OjIqdigoZS0xMykvKDIqdC0yKSk7dC0tOylyW3RdPXQqbys2O3JldHVybiByfSgpLG89cj10Lmxlbmd0aDtvLS07KWZvcih2YXIgYT1yO2EtLTspMD09YSYmMD09b3x8MD09YSYmbz09ci0xfHxhPT1yLTEmJjA9PW98fEkodFthXSx0W29dKTtIKDMsMyksSChlLTQsMyksSCgzLGUtNCksJCgwKSxmdW5jdGlvbigpe2lmKCEoNz5uKSl7Zm9yKHZhciByPW4sdD0xMjt0LS07KXI9cjw8MV43OTczKihyPj4+MTEpO3ZhciBvPW48PDEyfHI7aWYodD0xOCxvPj4+MTghPTApdGhyb3dcIkFzc2VydGlvbiBlcnJvclwiO2Zvcig7dC0tOyl7dmFyIGE9ZS0xMSt0JTMsZj10LzN8MCxpPUIobyx0KTtFKGEsZixpKSxFKGYsYSxpKX19fSgpfSxRPWZ1bmN0aW9uKHIpe2lmKHIubGVuZ3RoIT1WKG4sdCkpdGhyb3dcIkludmFsaWQgYXJndW1lbnRcIjtmb3IodmFyIG89ZFt0WzBdXVtuXSxlPWdbdFswXV1bbl0sYT1EKG4pLzh8MCxmPW8tYSVvLGk9YS9vfDAsdT1bXSxoPWZ1bmN0aW9uKHIpe3ZhciBuPTEsdD1bXTt0W3ItMV09MTtmb3IodmFyIG89MDtvPHI7bysrKXtmb3IodmFyIGU9MDtlPHI7ZSsrKXRbZV09cCh0W2VdLG4pXnRbZSsxXTtuPXAobiwyKX1yZXR1cm4gdH0oZSksdj0wLGM9MDt2PG87disrKXt2YXIgcz1yLnNsaWNlKGMsYytpLWUrKHY8Zj8wOjEpKTtjKz1zLmxlbmd0aDt2YXIgbD1DKHMsaCk7djxmJiZzLnB1c2goMCksdS5wdXNoKHMuY29uY2F0KGwpKX12YXIgbT1bXTtmb3Iodj0wO3Y8dVswXS5sZW5ndGg7disrKWZvcih2YXIgdz0wO3c8dS5sZW5ndGg7dysrKSh2IT1pLWV8fHc+PWYpJiZtLnB1c2godVt3XVt2XSk7cmV0dXJuIG19LFM9ZnVuY3Rpb24ocil7Zm9yKHZhciBuPVtdLHQ9KHI9ZW5jb2RlVVJJKHIpLDApO3Q8ci5sZW5ndGg7dCsrKVwiJVwiIT1yLmNoYXJBdCh0KT9uLnB1c2goci5jaGFyQ29kZUF0KHQpKToobi5wdXNoKHBhcnNlSW50KHIuc3Vic3RyKHQrMSwyKSwxNikpLHQrPTIpO3JldHVybiBufSxWPWZ1bmN0aW9uKHIsbil7cmV0dXJuKEQocikvOHwwKS1nW25bMF1dW3JdKmRbblswXV1bcl19LEU9ZnVuY3Rpb24ocixuLHQpe2Fbbl1bcl09dD8xOjAsZltuXVtyXT0xfSxSPWZ1bmN0aW9uKHIpe2Zvcih2YXIgbj1bXSx0PTAsbz1yO3Q8by5sZW5ndGg7dCsrKXt2YXIgZT1vW3RdO0EoZSw4LG4pfXJldHVybnttb2RlQml0czo0LG51bUJpdHNDaGFyQ291bnQ6WzgsMTYsMTZdLG51bUNoYXJzOnIubGVuZ3RoLGJpdERhdGE6bn19LFo9ZnVuY3Rpb24ocil7aWYoIWMudGVzdChyKSl0aHJvd1wiU3RyaW5nIGNvbnRhaW5zIG5vbi1udW1lcmljIGNoYXJhY3RlcnNcIjtmb3IodmFyIG49W10sdD0wO3Q8ci5sZW5ndGg7KXt2YXIgbz11KHIubGVuZ3RoLXQsMyk7QShwYXJzZUludChyLnN1YnN0cih0LG8pLDEwKSwzKm8rMSxuKSx0Kz1vfXJldHVybnttb2RlQml0czoxLG51bUJpdHNDaGFyQ291bnQ6WzEwLDEyLDE0XSxudW1DaGFyczpyLmxlbmd0aCxiaXREYXRhOm59fSx6PWZ1bmN0aW9uKHIpe2lmKCFzLnRlc3QocikpdGhyb3dcIlN0cmluZyBjb250YWlucyB1bmVuY29kYWJsZSBjaGFyYWN0ZXJzIGluIGFscGhhbnVtZXJpYyBtb2RlXCI7dmFyIG4sdD1bXTtmb3Iobj0wO24rMjw9ci5sZW5ndGg7bis9Mil7dmFyIG89NDUqbC5pbmRleE9mKHIuY2hhckF0KG4pKTtvKz1sLmluZGV4T2Yoci5jaGFyQXQobisxKSksQShvLDExLHQpfXJldHVybiBuPHIubGVuZ3RoJiZBKGwuaW5kZXhPZihyLmNoYXJBdChuKSksNix0KSx7bW9kZUJpdHM6MixudW1CaXRzQ2hhckNvdW50Ols5LDExLDEzXSxudW1DaGFyczpyLmxlbmd0aCxiaXREYXRhOnR9fSxMPWZ1bmN0aW9uKHIsbix0LG8pe3ZhciBlPWZ1bmN0aW9uKHIpe3JldHVyblwiXCI9PXI/W106Yy50ZXN0KHIpP1taKHIpXTpzLnRlc3Qocik/W3oocildOltSKFMocikpXX0ocik7cmV0dXJuIFUoZSxuLHQsbyl9LE49ZnVuY3Rpb24ocixpLHUsaCl7dD1pLG89aDtmb3IodmFyIHY9ZT00KihuPXIpKzE3O3YtLTspYVt2XT1bXSxmW3ZdPVtdO2lmKE8oKSxmdW5jdGlvbihyKXtmb3IodmFyIG49MCx0PTEsbz1lLTEsaT1vO2k+MDtpLT0yKXs2PT1pJiYtLWk7Zm9yKHZhciB1PTA+KHQ9LXQpP286MCxoPTA7aDxlOysraCl7Zm9yKHZhciB2PWk7dj5pLTI7LS12KWZbdV1bdl18fChhW3VdW3ZdPUIocltuPj4+M10sNy0oNyZuKSksKytuKTt1Kz10fX19KFEodSkpLDA+byl7dmFyIGM9MWU5O2Zvcih2PTg7di0tOyl7dyh2KSwkKHYpO3ZhciBzPWIoKTtjPnMmJihjPXMsbz12KSx3KHYpfX13KG8pLCQobyksZj1bXX0sVT1mdW5jdGlvbihyLG4sdCxvLGUsYSl7aWYodm9pZCAwPT09ZSYmKGU9MSksdm9pZCAwPT09YSYmKGE9NDApLHZvaWQgMD09PW8mJihvPS0xKSx2b2lkIDA9PT10JiYodD0hMCksISgxPD1lJiZlPD1hJiZhPD00MCl8fG88LTF8fG8+Nyl0aHJvd1wiSW52YWxpZCB2YWx1ZVwiO2Zvcih2YXIgZj1bXSxpPTIzNixoPVtdLHY9ZTs7KXt2YXIgYz14KHIsdik7aWYoYzw9OCpWKHYsbikpYnJlYWs7aWYodj49YSl0aHJvd1wiRGF0YSB0b28gbG9uZ1wiO3YrK31pZih0KWZvcih2YXIgcz0obD1bbS5ILG0uUSxtLk1dKS5sZW5ndGg7cy0tOyljPD04KlYodixsW3NdKSYmKG49bFtzXSk7Zm9yKHZhciBsPTA7bDxyLmxlbmd0aDtsKyspe3ZhciBnPXJbbF07QShnLm1vZGVCaXRzLDQsZiksQShnLm51bUNoYXJzLE0oZyx2KSxmKTtmb3IodmFyIGQ9MCxwPWcuYml0RGF0YTtkPHAubGVuZ3RoO2QrKylmLnB1c2gocFtkXSl9aWYoZi5sZW5ndGghPWMpdGhyb3dcIkFzc2VydGlvbiBlcnJvclwiO3ZhciBDPTgqVih2LG4pO2lmKGYubGVuZ3RoPkMpdGhyb3dcIkFzc2VydGlvbiBlcnJvclwiO2lmKEEoMCx1KDQsQy1mLmxlbmd0aCksZiksQSgwLCg4LWYubGVuZ3RoJTgpJTgsZiksZi5sZW5ndGglOCE9MCl0aHJvd1wiQXNzZXJ0aW9uIGVycm9yXCI7Zm9yKDtmLmxlbmd0aDxDOylBKGksOCxmKSxpXj0yNTM7Zm9yKHM9Zi5sZW5ndGg7cy0tOyloW3M+Pj4zXXw9ZltzXTw8Ny0oNyZzKTtyZXR1cm4gTih2LG4saCxvKX07cmV0dXJuIGZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihyKXtyZXR1cm4vXiNbMC05YS1mXXszfSg/OlswLTlhLWZdezN9KT8kL2kudGVzdChyKX1mdW5jdGlvbiB0KHIsbil7Zm9yKHZhciB0IGluIHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHMsciksbnx8e30pci5zZXRBdHRyaWJ1dGUodCxuW3RdKTtyZXR1cm4gcn12YXIgbyxmLGksdSx2LGMscz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsbD1cIlwiLGc9XCJzdHJpbmdcIj09dHlwZW9mIHI/e21zZzpyfTpyfHx7fSxkPWcucGFsfHxbXCIjMDAwXCJdLHA9aChnLmRpbSl8fDI1NixDPVsxLDAsMCwxLGM9KGM9aChnLnBhZCkpPi0xP2M6NCxjXSx3PW4odz1kWzBdKT93OlwiIzAwMFwiLGI9bihiPWRbMV0pP2I6MCxBPWcudnJiPzA6MTtmb3IoTChnLm1zZ3x8XCJcIixtW2cuZWNsXXx8bS5NLDA9PWcuZWNiPzA6MSxnLm10eCksdj1lKzIqYyxpPWU7aS0tOylmb3IodT0wLGY9ZTtmLS07KWFbaV1bZl0mJihBPyh1KyssYVtpXVtmLTFdfHwobCs9XCJNXCIrZitcIixcIitpK1wiaFwiK3UrXCJ2MWgtXCIrdStcInYtMXpcIix1PTApKTpsKz1cIk1cIitmK1wiLFwiK2krXCJoMXYxaC0xdi0xelwiKTtyZXR1cm4gbz10KFwic3ZnXCIse3ZpZXdCb3g6WzAsMCx2LHZdLmpvaW4oXCIgXCIpLHdpZHRoOnAsaGVpZ2h0OnAsZmlsbDp3LFwic2hhcGUtcmVuZGVyaW5nXCI6XCJjcmlzcEVkZ2VzXCIseG1sbnM6cyx2ZXJzaW9uOlwiMS4xXCJ9KSxiJiZvLmFwcGVuZENoaWxkKHQoXCJwYXRoXCIse2ZpbGw6YixkOlwiTTAsMFZcIit2K1wiSFwiK3YrXCJWMEgwWlwifSkpLG8uYXBwZW5kQ2hpbGQodChcInBhdGhcIix7dHJhbnNmb3JtOlwibWF0cml4KFwiK0MrXCIpXCIsZDpsfSkpLG99KCl9XG4iLCIvKipcbiAqIEEgaGVscGVyIGZ1bmN0aW9uIGZvciBsb29raW5nIHVwIGVsZW1lbnRzLCBvcHRpb25hbGx5IGZyb20gd2l0aCBhIHNwZWNpZmllZFxuICogY29udGV4dCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gc2VsZWN0b3JcbiAqICAgICAgICAgQ1NTIHNlbGVjdG9yIHRvIGlkZW50aWZ5IHRoZSBlbGVtZW50cy5cbiAqIEBwYXJhbSAge0VsZW1lbnR9IFtjb250ZXh0PWRvY3VtZW50XVxuICogICAgICAgICBPcHRpb25hbCBjb250ZXh0LCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtFbGVtZW50W119XG4gKiAgICAgICAgIEFuIGFycmF5IG9mIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzZWxlY3RvciBhbmQgd2l0aGluIHRoZSBnaXZlblxuICogICAgICAgICBjb250ZXh0LiBJZiB0aGVyZSBhcmUgbm8gbWF0Y2hlcywgYW4gZW1wdHkgYXJyYXkgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb29rdXAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkge1xuICAgIHJldHVybiBbLi4uY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV07XG59XG5cbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gZm9yIGxvb2tpbmcgdXAgYSBzaW5nbGUgZWxlbWVudCwgb3B0aW9uYWxseSBmcm9tIHdpdGggYVxuICogc3BlY2lmaWVkIGNvbnRleHQgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiAgICAgICAgIENTUyBzZWxlY3RvciB0byBpZGVudGlmeSB0aGUgZWxlbWVudHMuXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBbY29udGV4dD1kb2N1bWVudF1cbiAqICAgICAgICAgT3B0aW9uYWwgY29udGV4dCwgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7RWxlbWVudHx1bmRlZmluZWR9XG4gKiAgICAgICAgIFRoZSBmaXJzdCBtYXRjaGluZyBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiBubyBlbGVtZW50IGNhbiBiZSBmb3VuZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvb2t1cE9uZShzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSB7XG4gICAgcmV0dXJuIGxvb2t1cChzZWxlY3RvciwgY29udGV4dClbMF07XG59XG5cbi8qKlxuICogQSBjYWNoZSBmb3IgdGhlIGxvb2t1cHMuIFRoZSBjb250ZXh0IGVsZW1lbnQgaXMgdXNlZCBhcyB0aGUga2V5LlxuICogQHR5cGUge1dlYWtNYXB9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBsb29rdXBDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBlbGVtZW50cyBtYXRjaGluZyB0aGUgZ2l2ZW4gQ1NTIHNlbGVjdG9yIGFuZCB3aXRoaW4gdGhlXG4gKiBnaXZlbiBjb250ZXh0IGVsZW1lbnQuIFRoZSByZXN1bHRzIGFyZSBjYWNoZWQgYmVmb3JlIGJlaW5nIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gc2VsZWN0b3JcbiAqICAgICAgICAgQ1NTIHNlbGVjdG9yIHRvIGlkZW50aWZ5IHRoZSBlbGVtZW50cy5cbiAqIEBwYXJhbSAge0VsZW1lbnR9IFtjb250ZXh0PWRvY3VtZW50XVxuICogICAgICAgICBPcHRpb25hbCBjb250ZXh0LCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtFbGVtZW50W119XG4gKiAgICAgICAgIEFuIGFycmF5IG9mIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzZWxlY3RvciBhbmQgd2l0aGluIHRoZSBnaXZlblxuICogICAgICAgICBjb250ZXh0LiBJZiB0aGVyZSBhcmUgbm8gbWF0Y2hlcywgYW4gZW1wdHkgYXJyYXkgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb29rdXBDYWNoZWQoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkge1xuXG4gICAgbGV0IGNhY2hlID0gbG9va3VwQ2FjaGUuZ2V0KGNvbnRleHQpO1xuXG4gICAgaWYgKCFjYWNoZSkge1xuXG4gICAgICAgIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbG9va3VwQ2FjaGUuc2V0KGNvbnRleHQsIGNhY2hlKTtcblxuICAgIH1cblxuICAgIGlmICghY2FjaGVbc2VsZWN0b3JdKSB7XG4gICAgICAgIGNhY2hlW3NlbGVjdG9yXSA9IGxvb2t1cChzZWxlY3RvciwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlW3NlbGVjdG9yXTtcblxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgbWF0Y2hpbmcgdGhlIGdpdmVuIENTUyBzZWxlY3RvciBhbmQgd2l0aGluIHRoZVxuICogZ2l2ZW4gY29udGV4dCBlbGVtZW50LiBUaGUgcmVzdWx0IGlzIGNhY2hlZCBiZWZvcmUgYmVpbmcgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvclxuICogICAgICAgICBDU1Mgc2VsZWN0b3IgdG8gaWRlbnRpZnkgdGhlIGVsZW1lbnRzLlxuICogQHBhcmFtICB7RWxlbWVudH0gW2NvbnRleHQ9ZG9jdW1lbnRdXG4gKiAgICAgICAgIE9wdGlvbmFsIGNvbnRleHQsIGRlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm4ge0VsZW1lbnR8dW5kZWZpbmVkfVxuICogICAgICAgICBUaGUgZmlyc3QgbWF0Y2hpbmcgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgbm8gZWxlbWVudCBjYW4gYmUgZm91bmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb29rdXBPbmVDYWNoZWQoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkge1xuICAgIHJldHVybiBsb29rdXBDYWNoZWQoc2VsZWN0b3IsIGNvbnRleHQpWzBdO1xufVxuXG4vKipcbiAqIEEgY291bnRlciB0aGF0IGluY3JlYXNlcyB0byBjcmVhdGUgYSB1bmlxdWUgbnVtYmVyLlxuICogQHR5cGUge051bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmxldCBpZGVudGlmeUNvdW50ZXIgPSAwO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIElEIG9mIHRoZSBnaXZlbiBlbGVtZW50LiBJZiB0aGUgZWxlbWVudCBoYXMgbm8gSUQsIGEgdW5pcXVlIG9uZVxuICogaXMgZ2VuZXJhdGVkIGFuZCBhc3NpZ25lZCB0byB0aGUgZWxlbWVudCBiZWZvcmUgYmVpbmcgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudFxuICogICAgICAgICBFbGVtZW50IHRvIGlkZW50aWZ5LlxuICogQHBhcmFtICB7U3RyaW5nfSBbcHJlZml4PVwiYW5vbnltb3VzLWVsZW1lbnQtXCJdXG4gKiAgICAgICAgIE9wdGlvbmFsIGdlbmVyYXRlZCBJRCBwcmVmaXguXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiAgICAgICAgIElEIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnkoZWxlbWVudCwgcHJlZml4ID0gXCJhbm9ueW1vdXMtZWxlbWVudC1cIikge1xuXG4gICAgbGV0IHtcbiAgICAgICAgaWRcbiAgICB9ID0gZWxlbWVudDtcblxuICAgIGlmICghaWQpIHtcblxuICAgICAgICBkbyB7XG5cbiAgICAgICAgICAgIGlkID0gcHJlZml4ICsgaWRlbnRpZnlDb3VudGVyO1xuICAgICAgICAgICAgaWRlbnRpZnlDb3VudGVyICs9IDE7XG5cbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKSBpcyBmYXN0ZXIgdGhhbiBvdXIgbG9va3VwT25lKCkuXG4gICAgICAgIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG5cbiAgICAgICAgZWxlbWVudC5pZCA9IGlkO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIGlkO1xuXG59XG5cbi8qKlxuICogQXBwZW5kcyBhbGwgdGhlIGVudHJpZXMgaW4gdGhlIGdpdmVuIGxpc3QgdG8gdGhlIGdpdmVuIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSB0YXJnZXRcbiAqICAgICAgICAgRWxlbWVudCB0aGF0IHNob3VsZCBoYXZlIGFsbCB0aGUgZW50cmllcyBhcHBlbmRlZCB0byBpdC5cbiAqIEBwYXJhbSAge0FycmF5fSBsaXN0XG4gKiAgICAgICAgIEl0ZW1zIHRoYXQgc2hvdWxkIGJlIGFwcGVuZGVkIHRvIHRoZSB0YXJnZXQuXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICogICAgICAgICBUaGUgZ2l2ZW4gdGFyZ2V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kTWFueSh0YXJnZXQsIGxpc3QpIHtcblxuICAgIHRhcmdldC5hcHBlbmQoXG4gICAgICAgIGxpc3QucmVkdWNlKChmcmFnbWVudCwgaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmQoaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XG5cbiAgICAgICAgfSwgZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuXG59XG5cbi8qKlxuICogRW1wdGllcyB0aGUgZ2l2ZW4gZWxlbWVudCBiZWZvcmUgcmV0dXJuaW5nIGl0LlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnRcbiAqICAgICAgICAgRWxlbWVudCB0aGF0IHNob3VsZCBiZSBlbXB0aWVkLlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqICAgICAgICAgRW1wdGllZCBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuLyoqXG4gKiBSZXBsYWNlcyB0aGUgY29udGVudHMgd2l0aCBhbGwgdGhlIGl0ZW1zIHRoYXQgaGF2ZSBiZWVuIGdpdmVuLiBUaGlzIGlzIGFcbiAqIGNvbWJpbmF0aW9uIG9mIHtAbGluayBlbXB0eX0gYW5kIHtAbGluayBhcHBlbmRNYW55fS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSB0YXJnZXRcbiAqICAgICAgICAgRWxlbWVudCB0aGF0IHNob3VsZCBoYXZlIGFsbCB0aGUgZW50cmllcyBhcHBlbmRlZCB0byBpdCBhZnRlciBpdCdzXG4gKiAgICAgICAgIGJlZW4gZW1wdGllZC5cbiAqIEBwYXJhbSAge0FycmF5fSBsaXN0XG4gKiAgICAgICAgIEl0ZW1zIHRoYXQgc2hvdWxkIGJlIGFwcGVuZGVkIHRvIHRoZSB0YXJnZXQuXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICogICAgICAgICBUaGUgZ2l2ZW4gdGFyZ2V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUNvbnRlbnRzTWFueSh0YXJnZXQsIGxpc3QpIHtcbiAgICByZXR1cm4gYXBwZW5kTWFueShlbXB0eSh0YXJnZXQpLCBsaXN0KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsYWJlbCBmb3IgdGhlIGdpdmVuIGlucHV0IGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gaW5wdXRcbiAqICAgICAgICAgSW5wdXQgZWxlbWVudCB3aG9zZSBsYWJlbCBzaG91bGQgYmUgcmV0dXJuZWQuXG4gKiBAcmV0dXJuIHtFbGVtZW50fHVuZGVmaW5lZH1cbiAqICAgICAgICAgRWl0aGVyIHRoZSBpbnB1dCdzIGxhYmVsIG9yIHVuZGVmaW5lZCBpZiB0aGUgbGFiZWwgY2Fubm90IGJlIGZvdW5kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFiZWwoaW5wdXQpIHtcblxuICAgIGNvbnN0IGFyaWEgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIik7XG5cbiAgICBpZiAodHlwZW9mIGFyaWEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGxvb2t1cE9uZShgIyR7YXJpYX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IGlucHV0LmdldEF0dHJpYnV0ZShcImlkXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gbG9va3VwT25lKGBsYWJlbFtmb3I9XCIke2lkfVwiXWApO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb3Nlc3QgPSBpbnB1dC5jbG9zZXN0KFwibGFiZWxcIik7XG5cbiAgICBpZiAoY2xvc2VzdCkge1xuICAgICAgICByZXR1cm4gY2xvc2VzdDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB0cmltbWVkIHRleHQgb2YgdGhlIGxhYmVsIGZvciB0aGUgZ2l2ZW4gaW5wdXQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gaW5wdXRcbiAqICAgICAgICAgSW5wdXQgd2hvc2UgbGFiZWwgdGV4dCBzaG91bGQgYmUgcmV0dXJuZWQuXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiAgICAgICAgIFRoZSBpbnB1dCdzIGxhYmVsIHRleHQuIElmIHRoZSBsYWJlbCBjYW5ub3QgYmUgZm91bmQsIGFuIGVtcHR5IHN0cmluZ1xuICogICAgICAgICBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExhYmVsVGV4dChpbnB1dCkge1xuXG4gICAgY29uc3QgYXJpYSA9IGlucHV0LmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XG5cbiAgICBpZiAodHlwZW9mIGFyaWEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGFyaWEudHJpbSgpO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRMYWJlbChpbnB1dCk/LnRleHRDb250ZW50LnRyaW0oKSB8fCBcIlwiO1xuXG59XG5cbi8qKlxuICogVHJpZ2dlcnMgdGhlIGFwcHJvcHJpYXRlIGV2ZW50cyBmb3IgYW4gaW5wdXQgaGF2aW5nIGNoYW5nZWQsIGluIHRoZSBjb3JyZWN0XG4gKiAob3IsIGF0IGxlYXN0LCBhIGNvbnNpc3RlbnQpIG9yZGVyLiBJZiB0aGUgZ2l2ZW4gaW5wdXQgZG9lcyBub3QgZXhpc3Qgb3IgaXNcbiAqIG5vdCBhbiBpbnB1dCB0aGVuIG5vdGhpbmcgaGFwcGVucy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGlucHV0XG4gKiAgICAgICAgSW5wdXQgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFubm91bmNlSW5wdXQoaW5wdXQpIHtcblxuICAgIGNvbnN0IGV4cGVjdGVkTm9kZU5hbWVzID0gW1wiaW5wdXRcIiwgXCJzZWxlY3RcIiwgXCJ0ZXh0YXJlYVwiXTtcblxuICAgIGlmICghaW5wdXQgfHwgIWV4cGVjdGVkTm9kZU5hbWVzLmluY2x1ZGVzKGlucHV0Lm5vZGVOYW1lPy50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICB9KSk7XG4gICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIiwge1xuICAgICAgICBidWJibGVzOiB0cnVlXG4gICAgfSkpO1xuXG59XG5cbi8qKlxuICogR2V0cyB0aGUgZWxlbWVudCdzIGluZGV4LlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnRcbiAqICAgICAgICAgVGhlIGVsZW1lbnQgd2hvc2UgaW5kZXggc2hvdWxkIGJlIHJldHVybmVkLlxuICogQHJldHVybiB7TnVtYmVyfVxuICogICAgICAgICBUaGUgZWxlbWVudCdzIGluZGV4LCBvciAtMSBpZiBpdCBjYW4ndCBiZSB3b3JrZWQgb3V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5kZXgoZWxlbWVudCkge1xuXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXguY2FsbChcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgICAoaXRlbSkgPT4gaXRlbSA9PT0gZWxlbWVudFxuICAgICk7XG5cbn1cbiJdLCJuYW1lcyI6WyJEaWFsb2ciLCJkaWFsb2ciLCJjb25zdHJ1Y3RvciIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJydW4iLCJhZGRMaXN0ZW5lcnMiLCJoaWRlT24iLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwic3BsaXQiLCJpbmNsdWRlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoaWRlIiwidGFyZ2V0IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJzaG93TW9kYWwiLCJjbG9zZSIsImV2ZW50TmFtZSIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidHJpZ2dlciIsInNlbGVjdG9yIiwiZGF0YXNldCIsImNyZWF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNob3ciLCJjYWNoZSIsImluc3RhbmNlIiwiZ2V0Iiwic2V0IiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsImZvckVhY2giLCJhdHRyaWJ1dGVOYW1lIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiU0hPVyIsIkhJREUiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsIldlYWtNYXAiLCJRUkNvZGUiLCJyIiwibiIsInQiLCJvIiwiYSIsImYiLCJpIiwiTWF0aCIsIm1heCIsInUiLCJtaW4iLCJoIiwiYWJzIiwidiIsImNlaWwiLCJjIiwicyIsImwiLCJnIiwiZCIsIm0iLCJMIiwiTSIsIlEiLCJIIiwicCIsIkMiLCJsZW5ndGgiLCJzaGlmdCIsInciLCJiIiwicHVzaCIsIkEiLCJudW1CaXRzQ2hhckNvdW50IiwiQiIsIngiLCJudW1DaGFycyIsImJpdERhdGEiLCJEIiwiSSIsIkUiLCIkIiwiTyIsIlYiLCJzbGljZSIsImNvbmNhdCIsIlMiLCJlbmNvZGVVUkkiLCJjaGFyQXQiLCJjaGFyQ29kZUF0IiwicGFyc2VJbnQiLCJzdWJzdHIiLCJSIiwibW9kZUJpdHMiLCJaIiwidGVzdCIsInoiLCJpbmRleE9mIiwiVSIsIk4iLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRBdHRyaWJ1dGUiLCJtc2ciLCJwYWwiLCJkaW0iLCJwYWQiLCJ2cmIiLCJlY2wiLCJlY2IiLCJtdHgiLCJ2aWV3Qm94Iiwiam9pbiIsIndpZHRoIiwiaGVpZ2h0IiwiZmlsbCIsInhtbG5zIiwidmVyc2lvbiIsImFwcGVuZENoaWxkIiwidHJhbnNmb3JtIiwibG9va3VwIiwiY29udGV4dCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsb29rdXBPbmUiLCJsb29rdXBDYWNoZSIsImxvb2t1cENhY2hlZCIsIk9iamVjdCIsImxvb2t1cE9uZUNhY2hlZCIsImlkZW50aWZ5Q291bnRlciIsImlkZW50aWZ5IiwiZWxlbWVudCIsInByZWZpeCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRNYW55IiwibGlzdCIsImFwcGVuZCIsInJlZHVjZSIsImZyYWdtZW50IiwiaXRlbSIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJlbXB0eSIsImlubmVySFRNTCIsInJlcGxhY2VDb250ZW50c01hbnkiLCJnZXRMYWJlbCIsImlucHV0IiwiYXJpYSIsImdldExhYmVsVGV4dCIsInRleHRDb250ZW50IiwiYW5ub3VuY2VJbnB1dCIsImV4cGVjdGVkTm9kZU5hbWVzIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50IiwiZ2V0SW5kZXgiLCJBcnJheSIsInByb3RvdHlwZSIsImZpbmRJbmRleCIsImNhbGwiLCJwYXJlbnROb2RlIiwiY2hpbGRyZW4iXSwic291cmNlUm9vdCI6IiJ9