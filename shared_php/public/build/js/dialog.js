"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["js/dialog"],{

/***/ "./assets/js/dialog.js":
/*!*****************************!*\
  !*** ./assets/js/dialog.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_dialog_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/dialog-polyfill.js */ "./assets/js/lib/dialog-polyfill.js");

var dialogs = document.querySelectorAll("dialog");
dialogs.forEach(function (dialog) {
  dialog.classList.add("dialog--polyfilled");
  _lib_dialog_polyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerDialog(dialog);
}); // Attempt to fix a bug on Firefox Mobile where the overlay wouldn't cover the
// entire screen when the browser UI changed size - #109.

var observer = new MutationObserver(function (list) {
  list.forEach(function (_ref) {
    var type = _ref.type,
        attributeName = _ref.attributeName,
        target = _ref.target;

    if (type !== "attributes" || attributeName !== "open" || !target.open) {
      return;
    }

    var width = "".concat(document.body.offsetWidth, "px");
    var height = "".concat(document.body.offsetHeight, "px");
    var backdrop = target.nextSibling;

    if (backdrop.className.match(/\bbackdrop\b/)) {
      backdrop.style.setProperty("--width", width);
      backdrop.style.setProperty("--height", height);
    }

    var overlay = document.querySelector("._dialog_overlay");

    if (overlay) {
      overlay.style.setProperty("--width", width);
      overlay.style.setProperty("--height", height);
    }
  });
});
dialogs.forEach(function (dialog) {
  return observer.observe(dialog, {
    attributes: true
  });
});

/***/ }),

/***/ "./assets/js/lib/dialog-polyfill.js":
/*!******************************************!*\
  !*** ./assets/js/lib/dialog-polyfill.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// https://github.com/GoogleChrome/dialog-polyfill
// nb. This is for IE10 and lower _only_.
var supportCustomEvent = window.CustomEvent;

if (!supportCustomEvent || _typeof(supportCustomEvent) === 'object') {
  supportCustomEvent = function CustomEvent(event, x) {
    x = x || {};
    var ev = document.createEvent('CustomEvent');
    ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
    return ev;
  };

  supportCustomEvent.prototype = window.Event.prototype;
}
/**
 * Dispatches the passed event to both an "on<type>" handler as well as via the
 * normal dispatch operation. Does not bubble.
 *
 * @param {!EventTarget} target
 * @param {!Event} event
 * @return {boolean}
 */


function safeDispatchEvent(target, event) {
  var check = 'on' + event.type.toLowerCase();

  if (typeof target[check] === 'function') {
    target[check](event);
  }

  return target.dispatchEvent(event);
}
/**
 * @param {Element} el to check for stacking context
 * @return {boolean} whether this el or its parents creates a stacking context
 */


function createsStackingContext(el) {
  while (el && el !== document.body) {
    var s = window.getComputedStyle(el);

    var invalid = function invalid(k, ok) {
      return !(s[k] === undefined || s[k] === ok);
    };

    if (s.opacity < 1 || invalid('zIndex', 'auto') || invalid('transform', 'none') || invalid('mixBlendMode', 'normal') || invalid('filter', 'none') || invalid('perspective', 'none') || s['isolation'] === 'isolate' || s.position === 'fixed' || s.webkitOverflowScrolling === 'touch') {
      return true;
    }

    el = el.parentElement;
  }

  return false;
}
/**
 * Finds the nearest <dialog> from the passed element.
 *
 * @param {Element} el to search from
 * @return {HTMLDialogElement} dialog found
 */


function findNearestDialog(el) {
  while (el) {
    if (el.localName === 'dialog') {
      return (
        /** @type {HTMLDialogElement} */
        el
      );
    }

    if (el.parentElement) {
      el = el.parentElement;
    } else if (el.parentNode) {
      el = el.parentNode.host;
    } else {
      el = null;
    }
  }

  return null;
}
/**
 * Blur the specified element, as long as it's not the HTML body element.
 * This works around an IE9/10 bug - blurring the body causes Windows to
 * blur the whole application.
 *
 * @param {Element} el to blur
 */


function safeBlur(el) {
  // Find the actual focused element when the active element is inside a shadow root
  while (el && el.shadowRoot && el.shadowRoot.activeElement) {
    el = el.shadowRoot.activeElement;
  }

  if (el && el.blur && el !== document.body) {
    el.blur();
  }
}
/**
 * @param {!NodeList} nodeList to search
 * @param {Node} node to find
 * @return {boolean} whether node is inside nodeList
 */


function inNodeList(nodeList, node) {
  for (var i = 0; i < nodeList.length; ++i) {
    if (nodeList[i] === node) {
      return true;
    }
  }

  return false;
}
/**
 * @param {HTMLFormElement} el to check
 * @return {boolean} whether this form has method="dialog"
 */


function isFormMethodDialog(el) {
  if (!el || !el.hasAttribute('method')) {
    return false;
  }

  return el.getAttribute('method').toLowerCase() === 'dialog';
}
/**
 * @param {!DocumentFragment|!Element} hostElement
 * @return {?Element}
 */


function findFocusableElementWithin(hostElement) {
  // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
  // alternative involves stepping through and trying to focus everything.
  var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
  var query = opts.map(function (el) {
    return el + ':not([disabled])';
  }); // TODO(samthor): tabindex values that are not numeric are not focusable.

  query.push('[tabindex]:not([disabled]):not([tabindex=""])'); // tabindex != "", not disabled

  var target = hostElement.querySelector(query.join(', '));

  if (!target && 'attachShadow' in Element.prototype) {
    // If we haven't found a focusable target, see if the host element contains an element
    // which has a shadowRoot.
    // Recursively search for the first focusable item in shadow roots.
    var elems = hostElement.querySelectorAll('*');

    for (var i = 0; i < elems.length; i++) {
      if (elems[i].tagName && elems[i].shadowRoot) {
        target = findFocusableElementWithin(elems[i].shadowRoot);

        if (target) {
          break;
        }
      }
    }
  }

  return target;
}
/**
 * Determines if an element is attached to the DOM.
 * @param {Element} element to check
 * @return {boolean} whether the element is in DOM
 */


function isConnected(element) {
  return element.isConnected || document.body.contains(element);
}
/**
 * @param {!Event} event
 * @return {?Element}
 */


function findFormSubmitter(event) {
  if (event.submitter) {
    return event.submitter;
  }

  var form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return null;
  }

  var submitter = dialogPolyfill.formSubmitter;

  if (!submitter) {
    var target = event.target;
    var root = 'getRootNode' in target && target.getRootNode() || document;
    submitter = root.activeElement;
  }

  if (!submitter || submitter.form !== form) {
    return null;
  }

  return submitter;
}
/**
 * @param {!Event} event
 */


function maybeHandleSubmit(event) {
  if (event.defaultPrevented) {
    return;
  }

  var form =
  /** @type {!HTMLFormElement} */
  event.target; // We'd have a value if we clicked on an imagemap.

  var value = dialogPolyfill.imagemapUseValue;
  var submitter = findFormSubmitter(event);

  if (value === null && submitter) {
    value = submitter.value;
  } // There should always be a dialog as this handler is added specifically on them, but check just
  // in case.


  var dialog = findNearestDialog(form);

  if (!dialog) {
    return;
  } // Prefer formmethod on the button.


  var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');

  if (formmethod !== 'dialog') {
    return;
  }

  event.preventDefault();

  if (value != null) {
    // nb. we explicitly check against null/undefined
    dialog.close(value);
  } else {
    dialog.close();
  }
}
/**
 * @param {!HTMLDialogElement} dialog to upgrade
 * @constructor
 */


function dialogPolyfillInfo(dialog) {
  this.dialog_ = dialog;
  this.replacedStyleTop_ = false;
  this.openAsModal_ = false; // Set a11y role. Browsers that support dialog implicitly know this already.

  if (!dialog.hasAttribute('role')) {
    dialog.setAttribute('role', 'dialog');
  }

  dialog.show = this.show.bind(this);
  dialog.showModal = this.showModal.bind(this);
  dialog.close = this.close.bind(this);
  dialog.addEventListener('submit', maybeHandleSubmit, false);

  if (!('returnValue' in dialog)) {
    dialog.returnValue = '';
  }

  if ('MutationObserver' in window) {
    var mo = new MutationObserver(this.maybeHideModal.bind(this));
    mo.observe(dialog, {
      attributes: true,
      attributeFilter: ['open']
    });
  } else {
    // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
    // seem to fire even if the element was removed as part of a parent removal. Use the removed
    // events to force downgrade (useful if removed/immediately added).
    var removed = false;

    var cb = function () {
      removed ? this.downgradeModal() : this.maybeHideModal();
      removed = false;
    }.bind(this);

    var timeout;

    var delayModel = function delayModel(ev) {
      if (ev.target !== dialog) {
        return;
      } // not for a child element


      var cand = 'DOMNodeRemoved';
      removed |= ev.type.substr(0, cand.length) === cand;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(cb, 0);
    };

    ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function (name) {
      dialog.addEventListener(name, delayModel);
    });
  } // Note that the DOM is observed inside DialogManager while any dialog
  // is being displayed as a modal, to catch modal removal from the DOM.


  Object.defineProperty(dialog, 'open', {
    set: this.setOpen.bind(this),
    get: dialog.hasAttribute.bind(dialog, 'open')
  });
  this.backdrop_ = document.createElement('div');
  this.backdrop_.className = 'backdrop';
  this.backdrop_.addEventListener('mouseup', this.backdropMouseEvent_.bind(this));
  this.backdrop_.addEventListener('mousedown', this.backdropMouseEvent_.bind(this));
  this.backdrop_.addEventListener('click', this.backdropMouseEvent_.bind(this));
}

dialogPolyfillInfo.prototype =
/** @type {HTMLDialogElement.prototype} */
{
  get dialog() {
    return this.dialog_;
  },

  /**
   * Maybe remove this dialog from the modal top layer. This is called when
   * a modal dialog may no longer be tenable, e.g., when the dialog is no
   * longer open or is no longer part of the DOM.
   */
  maybeHideModal: function maybeHideModal() {
    if (this.dialog_.hasAttribute('open') && isConnected(this.dialog_)) {
      return;
    }

    this.downgradeModal();
  },

  /**
   * Remove this dialog from the modal top layer, leaving it as a non-modal.
   */
  downgradeModal: function downgradeModal() {
    if (!this.openAsModal_) {
      return;
    }

    this.openAsModal_ = false;
    this.dialog_.style.zIndex = ''; // This won't match the native <dialog> exactly because if the user set top on a centered
    // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
    // possible to polyfill this perfectly.

    if (this.replacedStyleTop_) {
      this.dialog_.style.top = '';
      this.replacedStyleTop_ = false;
    } // Clear the backdrop and remove from the manager.


    this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
    dialogPolyfill.dm.removeDialog(this);
  },

  /**
   * @param {boolean} value whether to open or close this dialog
   */
  setOpen: function setOpen(value) {
    if (value) {
      this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
    } else {
      this.dialog_.removeAttribute('open');
      this.maybeHideModal(); // nb. redundant with MutationObserver
    }
  },

  /**
   * Handles mouse events ('mouseup', 'mousedown', 'click') on the fake .backdrop element, redirecting them as if
   * they were on the dialog itself.
   *
   * @param {!Event} e to redirect
   */
  backdropMouseEvent_: function backdropMouseEvent_(e) {
    if (!this.dialog_.hasAttribute('tabindex')) {
      // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
      // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
      // would not be needed - clicks would move the implicit cursor there.
      var fake = document.createElement('div');
      this.dialog_.insertBefore(fake, this.dialog_.firstChild);
      fake.tabIndex = -1;
      fake.focus();
      this.dialog_.removeChild(fake);
    } else {
      this.dialog_.focus();
    }

    var redirectedEvent = document.createEvent('MouseEvents');
    redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
    this.dialog_.dispatchEvent(redirectedEvent);
    e.stopPropagation();
  },

  /**
   * Focuses on the first focusable element within the dialog. This will always blur the current
   * focus, even if nothing within the dialog is found.
   */
  focus_: function focus_() {
    // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
    var target = this.dialog_.querySelector('[autofocus]:not([disabled])');

    if (!target && this.dialog_.tabIndex >= 0) {
      target = this.dialog_;
    }

    if (!target) {
      target = findFocusableElementWithin(this.dialog_);
    }

    safeBlur(document.activeElement);
    target && target.focus();
  },

  /**
   * Sets the zIndex for the backdrop and dialog.
   *
   * @param {number} dialogZ
   * @param {number} backdropZ
   */
  updateZIndex: function updateZIndex(dialogZ, backdropZ) {
    if (dialogZ < backdropZ) {
      throw new Error('dialogZ should never be < backdropZ');
    }

    this.dialog_.style.zIndex = dialogZ;
    this.backdrop_.style.zIndex = backdropZ;
  },

  /**
   * Shows the dialog. If the dialog is already open, this does nothing.
   */
  show: function show() {
    if (!this.dialog_.open) {
      this.setOpen(true);
      this.focus_();
    }
  },

  /**
   * Show this dialog modally.
   */
  showModal: function showModal() {
    if (this.dialog_.hasAttribute('open')) {
      throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
    }

    if (!isConnected(this.dialog_)) {
      throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
    }

    if (!dialogPolyfill.dm.pushDialog(this)) {
      throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
    }

    if (createsStackingContext(this.dialog_.parentElement)) {
      console.warn('A dialog is being shown inside a stacking context. ' + 'This may cause it to be unusable. For more information, see this link: ' + 'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');
    }

    this.setOpen(true);
    this.openAsModal_ = true; // Optionally center vertically, relative to the current viewport.

    if (dialogPolyfill.needsCentering(this.dialog_)) {
      dialogPolyfill.reposition(this.dialog_);
      this.replacedStyleTop_ = true;
    } else {
      this.replacedStyleTop_ = false;
    } // Insert backdrop.


    this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling); // Focus on whatever inside the dialog.

    this.focus_();
  },

  /**
   * Closes this HTMLDialogElement. This is optional vs clearing the open
   * attribute, however this fires a 'close' event.
   *
   * @param {string=} opt_returnValue to use as the returnValue
   */
  close: function close(opt_returnValue) {
    if (!this.dialog_.hasAttribute('open')) {
      throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
    }

    this.setOpen(false); // Leave returnValue untouched in case it was set directly on the element

    if (opt_returnValue !== undefined) {
      this.dialog_.returnValue = opt_returnValue;
    } // Triggering "close" event for any attached listeners on the <dialog>.


    var closeEvent = new supportCustomEvent('close', {
      bubbles: false,
      cancelable: false
    });
    safeDispatchEvent(this.dialog_, closeEvent);
  }
};
var dialogPolyfill = {};

dialogPolyfill.reposition = function (element) {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
  element.style.top = Math.max(scrollTop, topValue) + 'px';
};

dialogPolyfill.isInlinePositionSetByStylesheet = function (element) {
  for (var i = 0; i < document.styleSheets.length; ++i) {
    var styleSheet = document.styleSheets[i];
    var cssRules = null; // Some browsers throw on cssRules.

    try {
      cssRules = styleSheet.cssRules;
    } catch (e) {}

    if (!cssRules) {
      continue;
    }

    for (var j = 0; j < cssRules.length; ++j) {
      var rule = cssRules[j];
      var selectedNodes = null; // Ignore errors on invalid selector texts.

      try {
        selectedNodes = document.querySelectorAll(rule.selectorText);
      } catch (e) {}

      if (!selectedNodes || !inNodeList(selectedNodes, element)) {
        continue;
      }

      var cssTop = rule.style.getPropertyValue('top');
      var cssBottom = rule.style.getPropertyValue('bottom');

      if (cssTop && cssTop !== 'auto' || cssBottom && cssBottom !== 'auto') {
        return true;
      }
    }
  }

  return false;
};

dialogPolyfill.needsCentering = function (dialog) {
  var computedStyle = window.getComputedStyle(dialog);

  if (computedStyle.position !== 'absolute') {
    return false;
  } // We must determine whether the top/bottom specified value is non-auto.  In
  // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
  // Firefox returns the used value. So we do this crazy thing instead: check
  // the inline style and then go through CSS rules.


  if (dialog.style.top !== 'auto' && dialog.style.top !== '' || dialog.style.bottom !== 'auto' && dialog.style.bottom !== '') {
    return false;
  }

  return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
};
/**
 * @param {!Element} element to force upgrade
 */


dialogPolyfill.forceRegisterDialog = function (element) {
  if (window.HTMLDialogElement || element.showModal) {
    console.warn('This browser already supports <dialog>, the polyfill ' + 'may not work correctly', element);
  }

  if (element.localName !== 'dialog') {
    throw new Error('Failed to register dialog: The element is not a dialog.');
  }

  new dialogPolyfillInfo(
  /** @type {!HTMLDialogElement} */
  element);
};
/**
 * @param {!Element} element to upgrade, if necessary
 */


dialogPolyfill.registerDialog = function (element) {
  if (!element.showModal) {
    dialogPolyfill.forceRegisterDialog(element);
  }
};
/**
 * @constructor
 */


dialogPolyfill.DialogManager = function () {
  /** @type {!Array<!dialogPolyfillInfo>} */
  this.pendingDialogStack = [];
  var checkDOM = this.checkDOM_.bind(this); // The overlay is used to simulate how a modal dialog blocks the document.
  // The blocking dialog is positioned on top of the overlay, and the rest of
  // the dialogs on the pending dialog stack are positioned below it. In the
  // actual implementation, the modal dialog stacking is controlled by the
  // top layer, where z-index has no effect.

  this.overlay = document.createElement('div');
  this.overlay.className = '_dialog_overlay';
  this.overlay.addEventListener('click', function (e) {
    this.forwardTab_ = undefined;
    e.stopPropagation();
    checkDOM([]); // sanity-check DOM
  }.bind(this));
  this.handleKey_ = this.handleKey_.bind(this);
  this.handleFocus_ = this.handleFocus_.bind(this);
  this.zIndexLow_ = 100000;
  this.zIndexHigh_ = 100000 + 150;
  this.forwardTab_ = undefined;

  if ('MutationObserver' in window) {
    this.mo_ = new MutationObserver(function (records) {
      var removed = [];
      records.forEach(function (rec) {
        for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
          if (!(c instanceof Element)) {
            continue;
          } else if (c.localName === 'dialog') {
            removed.push(c);
          }

          removed = removed.concat(c.querySelectorAll('dialog'));
        }
      });
      removed.length && checkDOM(removed);
    });
  }
};
/**
 * Called on the first modal dialog being shown. Adds the overlay and related
 * handlers.
 */


dialogPolyfill.DialogManager.prototype.blockDocument = function () {
  document.documentElement.addEventListener('focus', this.handleFocus_, true);
  document.addEventListener('keydown', this.handleKey_);
  this.mo_ && this.mo_.observe(document, {
    childList: true,
    subtree: true
  });
};
/**
 * Called on the first modal dialog being removed, i.e., when no more modal
 * dialogs are visible.
 */


dialogPolyfill.DialogManager.prototype.unblockDocument = function () {
  document.documentElement.removeEventListener('focus', this.handleFocus_, true);
  document.removeEventListener('keydown', this.handleKey_);
  this.mo_ && this.mo_.disconnect();
};
/**
 * Updates the stacking of all known dialogs.
 */


dialogPolyfill.DialogManager.prototype.updateStacking = function () {
  var zIndex = this.zIndexHigh_;

  for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
    dpi.updateZIndex(--zIndex, --zIndex);

    if (i === 0) {
      this.overlay.style.zIndex = --zIndex;
    }
  } // Make the overlay a sibling of the dialog itself.


  var last = this.pendingDialogStack[0];

  if (last) {
    var p = last.dialog.parentNode || document.body;
    p.appendChild(this.overlay);
  } else if (this.overlay.parentNode) {
    this.overlay.parentNode.removeChild(this.overlay);
  }
};
/**
 * @param {Element} candidate to check if contained or is the top-most modal dialog
 * @return {boolean} whether candidate is contained in top dialog
 */


dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function (candidate) {
  while (candidate = findNearestDialog(candidate)) {
    for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
      if (dpi.dialog === candidate) {
        return i === 0; // only valid if top-most
      }
    }

    candidate = candidate.parentElement;
  }

  return false;
};

dialogPolyfill.DialogManager.prototype.handleFocus_ = function (event) {
  var target = event.composedPath ? event.composedPath()[0] : event.target;

  if (this.containedByTopDialog_(target)) {
    return;
  }

  if (document.activeElement === document.documentElement) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  safeBlur(
  /** @type {Element} */
  target);

  if (this.forwardTab_ === undefined) {
    return;
  } // move focus only from a tab key


  var dpi = this.pendingDialogStack[0];
  var dialog = dpi.dialog;
  var position = dialog.compareDocumentPosition(target);

  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    if (this.forwardTab_) {
      // forward
      dpi.focus_();
    } else if (target !== document.documentElement) {
      // backwards if we're not already focused on <html>
      document.documentElement.focus();
    }
  }

  return false;
};

dialogPolyfill.DialogManager.prototype.handleKey_ = function (event) {
  this.forwardTab_ = undefined;

  if (event.keyCode === 27) {
    event.preventDefault();
    event.stopPropagation();
    var cancelEvent = new supportCustomEvent('cancel', {
      bubbles: false,
      cancelable: true
    });
    var dpi = this.pendingDialogStack[0];

    if (dpi && safeDispatchEvent(dpi.dialog, cancelEvent)) {
      dpi.dialog.close();
    }
  } else if (event.keyCode === 9) {
    this.forwardTab_ = !event.shiftKey;
  }
};
/**
 * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
 * removed and immediately readded don't stay modal, they become normal.
 *
 * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
 */


dialogPolyfill.DialogManager.prototype.checkDOM_ = function (removed) {
  // This operates on a clone because it may cause it to change. Each change also calls
  // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
  // at a time?!
  var clone = this.pendingDialogStack.slice();
  clone.forEach(function (dpi) {
    if (removed.indexOf(dpi.dialog) !== -1) {
      dpi.downgradeModal();
    } else {
      dpi.maybeHideModal();
    }
  });
};
/**
 * @param {!dialogPolyfillInfo} dpi
 * @return {boolean} whether the dialog was allowed
 */


dialogPolyfill.DialogManager.prototype.pushDialog = function (dpi) {
  var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;

  if (this.pendingDialogStack.length >= allowed) {
    return false;
  }

  if (this.pendingDialogStack.unshift(dpi) === 1) {
    this.blockDocument();
  }

  this.updateStacking();
  return true;
};
/**
 * @param {!dialogPolyfillInfo} dpi
 */


dialogPolyfill.DialogManager.prototype.removeDialog = function (dpi) {
  var index = this.pendingDialogStack.indexOf(dpi);

  if (index === -1) {
    return;
  }

  this.pendingDialogStack.splice(index, 1);

  if (this.pendingDialogStack.length === 0) {
    this.unblockDocument();
  }

  this.updateStacking();
};

dialogPolyfill.dm = new dialogPolyfill.DialogManager();
dialogPolyfill.formSubmitter = null;
dialogPolyfill.imagemapUseValue = null;
/**
 * Installs global handlers, such as click listers and native method overrides. These are needed
 * even if a no dialog is registered, as they deal with <form method="dialog">.
 */

if (window.HTMLDialogElement === undefined) {
  /**
   * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
   * one that returns the correct value.
   */
  var testForm = document.createElement('form');
  testForm.setAttribute('method', 'dialog');

  if (testForm.method !== 'dialog') {
    var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');

    if (methodDescriptor) {
      // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
      // and don't bother to update the element.
      var realGet = methodDescriptor.get;

      methodDescriptor.get = function () {
        if (isFormMethodDialog(this)) {
          return 'dialog';
        }

        return realGet.call(this);
      };

      var realSet = methodDescriptor.set;
      /** @this {HTMLElement} */

      methodDescriptor.set = function (v) {
        if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
          return this.setAttribute('method', v);
        }

        return realSet.call(this, v);
      };

      Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
    }
  }
  /**
   * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
   * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
   * document.activeElement.
   */


  document.addEventListener('click', function (ev) {
    dialogPolyfill.formSubmitter = null;
    dialogPolyfill.imagemapUseValue = null;

    if (ev.defaultPrevented) {
      return;
    } // e.g. a submit which prevents default submission


    var target =
    /** @type {Element} */
    ev.target;

    if ('composedPath' in ev) {
      var path = ev.composedPath();
      target = path.shift() || target;
    }

    if (!target || !isFormMethodDialog(target.form)) {
      return;
    }

    var valid = target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1;

    if (!valid) {
      if (!(target.localName === 'input' && target.type === 'image')) {
        return;
      } // this is a <input type="image">, which can submit forms


      dialogPolyfill.imagemapUseValue = ev.offsetX + ',' + ev.offsetY;
    }

    var dialog = findNearestDialog(target);

    if (!dialog) {
      return;
    }

    dialogPolyfill.formSubmitter = target;
  }, false);
  /**
   * Global 'submit' handler. This handles submits of `method="dialog"` which are invalid, i.e.,
   * outside a dialog. They get prevented.
   */

  document.addEventListener('submit', function (ev) {
    var form = ev.target;
    var dialog = findNearestDialog(form);

    if (dialog) {
      return; // ignore, handle there
    }

    var submitter = findFormSubmitter(ev);
    var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');

    if (formmethod === 'dialog') {
      ev.preventDefault();
    }
  });
  /**
   * Replace the native HTMLFormElement.submit() method, as it won't fire the
   * submit event and give us a chance to respond.
   */

  var nativeFormSubmit = HTMLFormElement.prototype.submit;

  var replacementFormSubmit = function replacementFormSubmit() {
    if (!isFormMethodDialog(this)) {
      return nativeFormSubmit.call(this);
    }

    var dialog = findNearestDialog(this);
    dialog && dialog.close();
  };

  HTMLFormElement.prototype.submit = replacementFormSubmit;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dialogPolyfill);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/js/dialog.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWtCLENBQUMsSUFBRCxDQUF2QixFQUErQjtBQUM3QixhQUFPNkssZ0JBQWdCLENBQUNSLElBQWpCLENBQXNCLElBQXRCLENBQVA7QUFDRDs7QUFDRCxRQUFJek8sTUFBTSxHQUFHdUQsaUJBQWlCLENBQUMsSUFBRCxDQUE5QjtBQUNBdkQsSUFBQUEsTUFBTSxJQUFJQSxNQUFNLENBQUNpRyxLQUFQLEVBQVY7QUFDRCxHQU5EOztBQU9BVixFQUFBQSxlQUFlLENBQUNsRCxTQUFoQixDQUEwQjZNLE1BQTFCLEdBQW1DQyxxQkFBbkM7QUFDRDs7QUFFRCxpRUFBZXhQLGNBQWYsRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9kaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2xpYi9kaWFsb2ctcG9seWZpbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRpYWxvZ1BvbHlmaWxsIGZyb20gXCIuL2xpYi9kaWFsb2ctcG9seWZpbGwuanNcIjtcblxuY29uc3QgZGlhbG9ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaWFsb2dcIik7XG5cbmRpYWxvZ3MuZm9yRWFjaCgoZGlhbG9nKSA9PiB7XG5cbiAgICBkaWFsb2cuY2xhc3NMaXN0LmFkZChcImRpYWxvZy0tcG9seWZpbGxlZFwiKTtcbiAgICBkaWFsb2dQb2x5ZmlsbC5yZWdpc3RlckRpYWxvZyhkaWFsb2cpO1xuXG59KTtcblxuLy8gQXR0ZW1wdCB0byBmaXggYSBidWcgb24gRmlyZWZveCBNb2JpbGUgd2hlcmUgdGhlIG92ZXJsYXkgd291bGRuJ3QgY292ZXIgdGhlXG4vLyBlbnRpcmUgc2NyZWVuIHdoZW4gdGhlIGJyb3dzZXIgVUkgY2hhbmdlZCBzaXplIC0gIzEwOS5cbmNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGxpc3QpID0+IHtcblxuICAgIGxpc3QuZm9yRWFjaCgoeyB0eXBlLCBhdHRyaWJ1dGVOYW1lLCB0YXJnZXQgfSkgPT4ge1xuXG4gICAgICAgIGlmICh0eXBlICE9PSBcImF0dHJpYnV0ZXNcIiB8fCBhdHRyaWJ1dGVOYW1lICE9PSBcIm9wZW5cIiB8fCAhdGFyZ2V0Lm9wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gYCR7ZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aH1weGA7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGAke2RvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0fXB4YDtcblxuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IHRhcmdldC5uZXh0U2libGluZztcbiAgICAgICAgaWYgKGJhY2tkcm9wLmNsYXNzTmFtZS5tYXRjaCgvXFxiYmFja2Ryb3BcXGIvKSkge1xuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIHdpZHRoKTtcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLnNldFByb3BlcnR5KFwiLS1oZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLl9kaWFsb2dfb3ZlcmxheVwiKTtcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIHdpZHRoKTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuc2V0UHJvcGVydHkoXCItLWhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSk7XG5kaWFsb2dzLmZvckVhY2goKGRpYWxvZykgPT4gb2JzZXJ2ZXIub2JzZXJ2ZShkaWFsb2csIHsgYXR0cmlidXRlczogdHJ1ZSB9KSk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL2RpYWxvZy1wb2x5ZmlsbFxuLy8gbmIuIFRoaXMgaXMgZm9yIElFMTAgYW5kIGxvd2VyIF9vbmx5Xy5cbnZhciBzdXBwb3J0Q3VzdG9tRXZlbnQgPSB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG5pZiAoIXN1cHBvcnRDdXN0b21FdmVudCB8fCB0eXBlb2Ygc3VwcG9ydEN1c3RvbUV2ZW50ID09PSAnb2JqZWN0Jykge1xuICBzdXBwb3J0Q3VzdG9tRXZlbnQgPSBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgeCkge1xuICAgIHggPSB4IHx8IHt9O1xuICAgIHZhciBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGV2LmluaXRDdXN0b21FdmVudChldmVudCwgISF4LmJ1YmJsZXMsICEheC5jYW5jZWxhYmxlLCB4LmRldGFpbCB8fCBudWxsKTtcbiAgICByZXR1cm4gZXY7XG4gIH07XG4gIHN1cHBvcnRDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERpc3BhdGNoZXMgdGhlIHBhc3NlZCBldmVudCB0byBib3RoIGFuIFwib248dHlwZT5cIiBoYW5kbGVyIGFzIHdlbGwgYXMgdmlhIHRoZVxuICogbm9ybWFsIGRpc3BhdGNoIG9wZXJhdGlvbi4gRG9lcyBub3QgYnViYmxlLlxuICpcbiAqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7IUV2ZW50fSBldmVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gc2FmZURpc3BhdGNoRXZlbnQodGFyZ2V0LCBldmVudCkge1xuICB2YXIgY2hlY2sgPSAnb24nICsgZXZlbnQudHlwZS50b0xvd2VyQ2FzZSgpO1xuICBpZiAodHlwZW9mIHRhcmdldFtjaGVja10gPT09ICdmdW5jdGlvbicpIHtcbiAgICB0YXJnZXRbY2hlY2tdKGV2ZW50KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwgdG8gY2hlY2sgZm9yIHN0YWNraW5nIGNvbnRleHRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHdoZXRoZXIgdGhpcyBlbCBvciBpdHMgcGFyZW50cyBjcmVhdGVzIGEgc3RhY2tpbmcgY29udGV4dFxuICovXG5mdW5jdGlvbiBjcmVhdGVzU3RhY2tpbmdDb250ZXh0KGVsKSB7XG4gIHdoaWxlIChlbCAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgIHZhciBzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgIHZhciBpbnZhbGlkID0gZnVuY3Rpb24oaywgb2spIHtcbiAgICAgIHJldHVybiAhKHNba10gPT09IHVuZGVmaW5lZCB8fCBzW2tdID09PSBvayk7XG4gICAgfTtcblxuICAgIGlmIChzLm9wYWNpdHkgPCAxIHx8XG4gICAgICAgIGludmFsaWQoJ3pJbmRleCcsICdhdXRvJykgfHxcbiAgICAgICAgaW52YWxpZCgndHJhbnNmb3JtJywgJ25vbmUnKSB8fFxuICAgICAgICBpbnZhbGlkKCdtaXhCbGVuZE1vZGUnLCAnbm9ybWFsJykgfHxcbiAgICAgICAgaW52YWxpZCgnZmlsdGVyJywgJ25vbmUnKSB8fFxuICAgICAgICBpbnZhbGlkKCdwZXJzcGVjdGl2ZScsICdub25lJykgfHxcbiAgICAgICAgc1snaXNvbGF0aW9uJ10gPT09ICdpc29sYXRlJyB8fFxuICAgICAgICBzLnBvc2l0aW9uID09PSAnZml4ZWQnIHx8XG4gICAgICAgIHMud2Via2l0T3ZlcmZsb3dTY3JvbGxpbmcgPT09ICd0b3VjaCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBuZWFyZXN0IDxkaWFsb2c+IGZyb20gdGhlIHBhc3NlZCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwgdG8gc2VhcmNoIGZyb21cbiAqIEByZXR1cm4ge0hUTUxEaWFsb2dFbGVtZW50fSBkaWFsb2cgZm91bmRcbiAqL1xuZnVuY3Rpb24gZmluZE5lYXJlc3REaWFsb2coZWwpIHtcbiAgd2hpbGUgKGVsKSB7XG4gICAgaWYgKGVsLmxvY2FsTmFtZSA9PT0gJ2RpYWxvZycpIHtcbiAgICAgIHJldHVybiAvKiogQHR5cGUge0hUTUxEaWFsb2dFbGVtZW50fSAqLyAoZWwpO1xuICAgIH1cbiAgICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAoZWwucGFyZW50Tm9kZSkge1xuICAgICAgZWwgPSBlbC5wYXJlbnROb2RlLmhvc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQmx1ciB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIGFzIGxvbmcgYXMgaXQncyBub3QgdGhlIEhUTUwgYm9keSBlbGVtZW50LlxuICogVGhpcyB3b3JrcyBhcm91bmQgYW4gSUU5LzEwIGJ1ZyAtIGJsdXJyaW5nIHRoZSBib2R5IGNhdXNlcyBXaW5kb3dzIHRvXG4gKiBibHVyIHRoZSB3aG9sZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsIHRvIGJsdXJcbiAqL1xuZnVuY3Rpb24gc2FmZUJsdXIoZWwpIHtcbiAgLy8gRmluZCB0aGUgYWN0dWFsIGZvY3VzZWQgZWxlbWVudCB3aGVuIHRoZSBhY3RpdmUgZWxlbWVudCBpcyBpbnNpZGUgYSBzaGFkb3cgcm9vdFxuICB3aGlsZSAoZWwgJiYgZWwuc2hhZG93Um9vdCAmJiBlbC5zaGFkb3dSb290LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICBlbCA9IGVsLnNoYWRvd1Jvb3QuYWN0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGlmIChlbCAmJiBlbC5ibHVyICYmIGVsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgZWwuYmx1cigpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHshTm9kZUxpc3R9IG5vZGVMaXN0IHRvIHNlYXJjaFxuICogQHBhcmFtIHtOb2RlfSBub2RlIHRvIGZpbmRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHdoZXRoZXIgbm9kZSBpcyBpbnNpZGUgbm9kZUxpc3RcbiAqL1xuZnVuY3Rpb24gaW5Ob2RlTGlzdChub2RlTGlzdCwgbm9kZSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGVMaXN0W2ldID09PSBub2RlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEZvcm1FbGVtZW50fSBlbCB0byBjaGVja1xuICogQHJldHVybiB7Ym9vbGVhbn0gd2hldGhlciB0aGlzIGZvcm0gaGFzIG1ldGhvZD1cImRpYWxvZ1wiXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybU1ldGhvZERpYWxvZyhlbCkge1xuICBpZiAoIWVsIHx8ICFlbC5oYXNBdHRyaWJ1dGUoJ21ldGhvZCcpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpLnRvTG93ZXJDYXNlKCkgPT09ICdkaWFsb2cnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IURvY3VtZW50RnJhZ21lbnR8IUVsZW1lbnR9IGhvc3RFbGVtZW50XG4gKiBAcmV0dXJuIHs/RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gZmluZEZvY3VzYWJsZUVsZW1lbnRXaXRoaW4oaG9zdEVsZW1lbnQpIHtcbiAgLy8gTm90ZSB0aGF0IHRoaXMgaXMgJ2FueSBmb2N1c2FibGUgYXJlYScuIFRoaXMgbGlzdCBpcyBwcm9iYWJseSBub3QgZXhoYXVzdGl2ZSwgYnV0IHRoZVxuICAvLyBhbHRlcm5hdGl2ZSBpbnZvbHZlcyBzdGVwcGluZyB0aHJvdWdoIGFuZCB0cnlpbmcgdG8gZm9jdXMgZXZlcnl0aGluZy5cbiAgdmFyIG9wdHMgPSBbJ2J1dHRvbicsICdpbnB1dCcsICdrZXlnZW4nLCAnc2VsZWN0JywgJ3RleHRhcmVhJ107XG4gIHZhciBxdWVyeSA9IG9wdHMubWFwKGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIGVsICsgJzpub3QoW2Rpc2FibGVkXSknO1xuICB9KTtcbiAgLy8gVE9ETyhzYW10aG9yKTogdGFiaW5kZXggdmFsdWVzIHRoYXQgYXJlIG5vdCBudW1lcmljIGFyZSBub3QgZm9jdXNhYmxlLlxuICBxdWVyeS5wdXNoKCdbdGFiaW5kZXhdOm5vdChbZGlzYWJsZWRdKTpub3QoW3RhYmluZGV4PVwiXCJdKScpOyAgLy8gdGFiaW5kZXggIT0gXCJcIiwgbm90IGRpc2FibGVkXG4gIHZhciB0YXJnZXQgPSBob3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5LmpvaW4oJywgJykpO1xuXG4gIGlmICghdGFyZ2V0ICYmICdhdHRhY2hTaGFkb3cnIGluIEVsZW1lbnQucHJvdG90eXBlKSB7XG4gICAgLy8gSWYgd2UgaGF2ZW4ndCBmb3VuZCBhIGZvY3VzYWJsZSB0YXJnZXQsIHNlZSBpZiB0aGUgaG9zdCBlbGVtZW50IGNvbnRhaW5zIGFuIGVsZW1lbnRcbiAgICAvLyB3aGljaCBoYXMgYSBzaGFkb3dSb290LlxuICAgIC8vIFJlY3Vyc2l2ZWx5IHNlYXJjaCBmb3IgdGhlIGZpcnN0IGZvY3VzYWJsZSBpdGVtIGluIHNoYWRvdyByb290cy5cbiAgICB2YXIgZWxlbXMgPSBob3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGVsZW1zW2ldLnRhZ05hbWUgJiYgZWxlbXNbaV0uc2hhZG93Um9vdCkge1xuICAgICAgICB0YXJnZXQgPSBmaW5kRm9jdXNhYmxlRWxlbWVudFdpdGhpbihlbGVtc1tpXS5zaGFkb3dSb290KTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhbiBlbGVtZW50IGlzIGF0dGFjaGVkIHRvIHRoZSBET00uXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgdG8gY2hlY2tcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgaW4gRE9NXG4gKi9cbmZ1bmN0aW9uIGlzQ29ubmVjdGVkKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQuaXNDb25uZWN0ZWQgfHwgZG9jdW1lbnQuYm9keS5jb250YWlucyhlbGVtZW50KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZlbnRcbiAqIEByZXR1cm4gez9FbGVtZW50fVxuICovXG5mdW5jdGlvbiBmaW5kRm9ybVN1Ym1pdHRlcihldmVudCkge1xuICBpZiAoZXZlbnQuc3VibWl0dGVyKSB7XG4gICAgcmV0dXJuIGV2ZW50LnN1Ym1pdHRlcjtcbiAgfVxuXG4gIHZhciBmb3JtID0gZXZlbnQudGFyZ2V0O1xuICBpZiAoIShmb3JtIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIHN1Ym1pdHRlciA9IGRpYWxvZ1BvbHlmaWxsLmZvcm1TdWJtaXR0ZXI7XG4gIGlmICghc3VibWl0dGVyKSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB2YXIgcm9vdCA9ICgnZ2V0Um9vdE5vZGUnIGluIHRhcmdldCAmJiB0YXJnZXQuZ2V0Um9vdE5vZGUoKSB8fCBkb2N1bWVudCk7XG4gICAgc3VibWl0dGVyID0gcm9vdC5hY3RpdmVFbGVtZW50O1xuICB9XG5cbiAgaWYgKCFzdWJtaXR0ZXIgfHwgc3VibWl0dGVyLmZvcm0gIT09IGZvcm0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gc3VibWl0dGVyO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldmVudFxuICovXG5mdW5jdGlvbiBtYXliZUhhbmRsZVN1Ym1pdChldmVudCkge1xuICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZm9ybSA9IC8qKiBAdHlwZSB7IUhUTUxGb3JtRWxlbWVudH0gKi8gKGV2ZW50LnRhcmdldCk7XG5cbiAgLy8gV2UnZCBoYXZlIGEgdmFsdWUgaWYgd2UgY2xpY2tlZCBvbiBhbiBpbWFnZW1hcC5cbiAgdmFyIHZhbHVlID0gZGlhbG9nUG9seWZpbGwuaW1hZ2VtYXBVc2VWYWx1ZTtcbiAgdmFyIHN1Ym1pdHRlciA9IGZpbmRGb3JtU3VibWl0dGVyKGV2ZW50KTtcbiAgaWYgKHZhbHVlID09PSBudWxsICYmIHN1Ym1pdHRlcikge1xuICAgIHZhbHVlID0gc3VibWl0dGVyLnZhbHVlO1xuICB9XG5cbiAgLy8gVGhlcmUgc2hvdWxkIGFsd2F5cyBiZSBhIGRpYWxvZyBhcyB0aGlzIGhhbmRsZXIgaXMgYWRkZWQgc3BlY2lmaWNhbGx5IG9uIHRoZW0sIGJ1dCBjaGVjayBqdXN0XG4gIC8vIGluIGNhc2UuXG4gIHZhciBkaWFsb2cgPSBmaW5kTmVhcmVzdERpYWxvZyhmb3JtKTtcbiAgaWYgKCFkaWFsb2cpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBQcmVmZXIgZm9ybW1ldGhvZCBvbiB0aGUgYnV0dG9uLlxuICB2YXIgZm9ybW1ldGhvZCA9IHN1Ym1pdHRlciAmJiBzdWJtaXR0ZXIuZ2V0QXR0cmlidXRlKCdmb3JtbWV0aG9kJykgfHwgZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpO1xuICBpZiAoZm9ybW1ldGhvZCAhPT0gJ2RpYWxvZycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgIC8vIG5iLiB3ZSBleHBsaWNpdGx5IGNoZWNrIGFnYWluc3QgbnVsbC91bmRlZmluZWRcbiAgICBkaWFsb2cuY2xvc2UodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGRpYWxvZy5jbG9zZSgpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHshSFRNTERpYWxvZ0VsZW1lbnR9IGRpYWxvZyB0byB1cGdyYWRlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gZGlhbG9nUG9seWZpbGxJbmZvKGRpYWxvZykge1xuICB0aGlzLmRpYWxvZ18gPSBkaWFsb2c7XG4gIHRoaXMucmVwbGFjZWRTdHlsZVRvcF8gPSBmYWxzZTtcbiAgdGhpcy5vcGVuQXNNb2RhbF8gPSBmYWxzZTtcblxuICAvLyBTZXQgYTExeSByb2xlLiBCcm93c2VycyB0aGF0IHN1cHBvcnQgZGlhbG9nIGltcGxpY2l0bHkga25vdyB0aGlzIGFscmVhZHkuXG4gIGlmICghZGlhbG9nLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgZGlhbG9nLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgfVxuXG4gIGRpYWxvZy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG4gIGRpYWxvZy5zaG93TW9kYWwgPSB0aGlzLnNob3dNb2RhbC5iaW5kKHRoaXMpO1xuICBkaWFsb2cuY2xvc2UgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XG5cbiAgZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG1heWJlSGFuZGxlU3VibWl0LCBmYWxzZSk7XG5cbiAgaWYgKCEoJ3JldHVyblZhbHVlJyBpbiBkaWFsb2cpKSB7XG4gICAgZGlhbG9nLnJldHVyblZhbHVlID0gJyc7XG4gIH1cblxuICBpZiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuICAgIHZhciBtbyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMubWF5YmVIaWRlTW9kYWwuYmluZCh0aGlzKSk7XG4gICAgbW8ub2JzZXJ2ZShkaWFsb2csIHthdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnb3BlbiddfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gSUUxMCBhbmQgYmVsb3cgc3VwcG9ydC4gTm90ZSB0aGF0IERPTU5vZGVSZW1vdmVkIGV0YyBmaXJlIF9iZWZvcmVfIHJlbW92YWwuIFRoZXkgYWxzb1xuICAgIC8vIHNlZW0gdG8gZmlyZSBldmVuIGlmIHRoZSBlbGVtZW50IHdhcyByZW1vdmVkIGFzIHBhcnQgb2YgYSBwYXJlbnQgcmVtb3ZhbC4gVXNlIHRoZSByZW1vdmVkXG4gICAgLy8gZXZlbnRzIHRvIGZvcmNlIGRvd25ncmFkZSAodXNlZnVsIGlmIHJlbW92ZWQvaW1tZWRpYXRlbHkgYWRkZWQpLlxuICAgIHZhciByZW1vdmVkID0gZmFsc2U7XG4gICAgdmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgICByZW1vdmVkID8gdGhpcy5kb3duZ3JhZGVNb2RhbCgpIDogdGhpcy5tYXliZUhpZGVNb2RhbCgpO1xuICAgICAgcmVtb3ZlZCA9IGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICB2YXIgdGltZW91dDtcbiAgICB2YXIgZGVsYXlNb2RlbCA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICBpZiAoZXYudGFyZ2V0ICE9PSBkaWFsb2cpIHsgcmV0dXJuOyB9ICAvLyBub3QgZm9yIGEgY2hpbGQgZWxlbWVudFxuICAgICAgdmFyIGNhbmQgPSAnRE9NTm9kZVJlbW92ZWQnO1xuICAgICAgcmVtb3ZlZCB8PSAoZXYudHlwZS5zdWJzdHIoMCwgY2FuZC5sZW5ndGgpID09PSBjYW5kKTtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoY2IsIDApO1xuICAgIH07XG4gICAgWydET01BdHRyTW9kaWZpZWQnLCAnRE9NTm9kZVJlbW92ZWQnLCAnRE9NTm9kZVJlbW92ZWRGcm9tRG9jdW1lbnQnXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGRpYWxvZy5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGRlbGF5TW9kZWwpO1xuICAgIH0pO1xuICB9XG4gIC8vIE5vdGUgdGhhdCB0aGUgRE9NIGlzIG9ic2VydmVkIGluc2lkZSBEaWFsb2dNYW5hZ2VyIHdoaWxlIGFueSBkaWFsb2dcbiAgLy8gaXMgYmVpbmcgZGlzcGxheWVkIGFzIGEgbW9kYWwsIHRvIGNhdGNoIG1vZGFsIHJlbW92YWwgZnJvbSB0aGUgRE9NLlxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkaWFsb2csICdvcGVuJywge1xuICAgIHNldDogdGhpcy5zZXRPcGVuLmJpbmQodGhpcyksXG4gICAgZ2V0OiBkaWFsb2cuaGFzQXR0cmlidXRlLmJpbmQoZGlhbG9nLCAnb3BlbicpXG4gIH0pO1xuXG4gIHRoaXMuYmFja2Ryb3BfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMuYmFja2Ryb3BfLmNsYXNzTmFtZSA9ICdiYWNrZHJvcCc7XG4gIHRoaXMuYmFja2Ryb3BfLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnICAsIHRoaXMuYmFja2Ryb3BNb3VzZUV2ZW50Xy5iaW5kKHRoaXMpKTtcbiAgdGhpcy5iYWNrZHJvcF8uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5iYWNrZHJvcE1vdXNlRXZlbnRfLmJpbmQodGhpcykpO1xuICB0aGlzLmJhY2tkcm9wXy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycgICAgLCB0aGlzLmJhY2tkcm9wTW91c2VFdmVudF8uYmluZCh0aGlzKSk7XG59XG5cbmRpYWxvZ1BvbHlmaWxsSW5mby5wcm90b3R5cGUgPSAvKiogQHR5cGUge0hUTUxEaWFsb2dFbGVtZW50LnByb3RvdHlwZX0gKi8gKHtcblxuICBnZXQgZGlhbG9nKCkge1xuICAgIHJldHVybiB0aGlzLmRpYWxvZ187XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1heWJlIHJlbW92ZSB0aGlzIGRpYWxvZyBmcm9tIHRoZSBtb2RhbCB0b3AgbGF5ZXIuIFRoaXMgaXMgY2FsbGVkIHdoZW5cbiAgICogYSBtb2RhbCBkaWFsb2cgbWF5IG5vIGxvbmdlciBiZSB0ZW5hYmxlLCBlLmcuLCB3aGVuIHRoZSBkaWFsb2cgaXMgbm9cbiAgICogbG9uZ2VyIG9wZW4gb3IgaXMgbm8gbG9uZ2VyIHBhcnQgb2YgdGhlIERPTS5cbiAgICovXG4gIG1heWJlSGlkZU1vZGFsOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5kaWFsb2dfLmhhc0F0dHJpYnV0ZSgnb3BlbicpICYmIGlzQ29ubmVjdGVkKHRoaXMuZGlhbG9nXykpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5kb3duZ3JhZGVNb2RhbCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhpcyBkaWFsb2cgZnJvbSB0aGUgbW9kYWwgdG9wIGxheWVyLCBsZWF2aW5nIGl0IGFzIGEgbm9uLW1vZGFsLlxuICAgKi9cbiAgZG93bmdyYWRlTW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5vcGVuQXNNb2RhbF8pIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5vcGVuQXNNb2RhbF8gPSBmYWxzZTtcbiAgICB0aGlzLmRpYWxvZ18uc3R5bGUuekluZGV4ID0gJyc7XG5cbiAgICAvLyBUaGlzIHdvbid0IG1hdGNoIHRoZSBuYXRpdmUgPGRpYWxvZz4gZXhhY3RseSBiZWNhdXNlIGlmIHRoZSB1c2VyIHNldCB0b3Agb24gYSBjZW50ZXJlZFxuICAgIC8vIHBvbHlmaWxsIGRpYWxvZywgdGhhdCB0b3AgZ2V0cyB0aHJvd24gYXdheSB3aGVuIHRoZSBkaWFsb2cgaXMgY2xvc2VkLiBOb3Qgc3VyZSBpdCdzXG4gICAgLy8gcG9zc2libGUgdG8gcG9seWZpbGwgdGhpcyBwZXJmZWN0bHkuXG4gICAgaWYgKHRoaXMucmVwbGFjZWRTdHlsZVRvcF8pIHtcbiAgICAgIHRoaXMuZGlhbG9nXy5zdHlsZS50b3AgPSAnJztcbiAgICAgIHRoaXMucmVwbGFjZWRTdHlsZVRvcF8gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBDbGVhciB0aGUgYmFja2Ryb3AgYW5kIHJlbW92ZSBmcm9tIHRoZSBtYW5hZ2VyLlxuICAgIHRoaXMuYmFja2Ryb3BfLnBhcmVudE5vZGUgJiYgdGhpcy5iYWNrZHJvcF8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmJhY2tkcm9wXyk7XG4gICAgZGlhbG9nUG9seWZpbGwuZG0ucmVtb3ZlRGlhbG9nKHRoaXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIHdoZXRoZXIgdG8gb3BlbiBvciBjbG9zZSB0aGlzIGRpYWxvZ1xuICAgKi9cbiAgc2V0T3BlbjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuZGlhbG9nXy5oYXNBdHRyaWJ1dGUoJ29wZW4nKSB8fCB0aGlzLmRpYWxvZ18uc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWxvZ18ucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgICB0aGlzLm1heWJlSGlkZU1vZGFsKCk7ICAvLyBuYi4gcmVkdW5kYW50IHdpdGggTXV0YXRpb25PYnNlcnZlclxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSGFuZGxlcyBtb3VzZSBldmVudHMgKCdtb3VzZXVwJywgJ21vdXNlZG93bicsICdjbGljaycpIG9uIHRoZSBmYWtlIC5iYWNrZHJvcCBlbGVtZW50LCByZWRpcmVjdGluZyB0aGVtIGFzIGlmXG4gICAqIHRoZXkgd2VyZSBvbiB0aGUgZGlhbG9nIGl0c2VsZi5cbiAgICpcbiAgICogQHBhcmFtIHshRXZlbnR9IGUgdG8gcmVkaXJlY3RcbiAgICovXG4gIGJhY2tkcm9wTW91c2VFdmVudF86IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoIXRoaXMuZGlhbG9nXy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcbiAgICAgIC8vIENsaWNraW5nIG9uIHRoZSBiYWNrZHJvcCBzaG91bGQgbW92ZSB0aGUgaW1wbGljaXQgY3Vyc29yLCBldmVuIGlmIGRpYWxvZyBjYW5ub3QgYmVcbiAgICAgIC8vIGZvY3VzZWQuIENyZWF0ZSBhIGZha2UgdGhpbmcgdG8gZm9jdXMgb24uIElmIHRoZSBiYWNrZHJvcCB3YXMgX2JlZm9yZV8gdGhlIGRpYWxvZywgdGhpc1xuICAgICAgLy8gd291bGQgbm90IGJlIG5lZWRlZCAtIGNsaWNrcyB3b3VsZCBtb3ZlIHRoZSBpbXBsaWNpdCBjdXJzb3IgdGhlcmUuXG4gICAgICB2YXIgZmFrZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5kaWFsb2dfLmluc2VydEJlZm9yZShmYWtlLCB0aGlzLmRpYWxvZ18uZmlyc3RDaGlsZCk7XG4gICAgICBmYWtlLnRhYkluZGV4ID0gLTE7XG4gICAgICBmYWtlLmZvY3VzKCk7XG4gICAgICB0aGlzLmRpYWxvZ18ucmVtb3ZlQ2hpbGQoZmFrZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nXy5mb2N1cygpO1xuICAgIH1cblxuICAgIHZhciByZWRpcmVjdGVkRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICByZWRpcmVjdGVkRXZlbnQuaW5pdE1vdXNlRXZlbnQoZS50eXBlLCBlLmJ1YmJsZXMsIGUuY2FuY2VsYWJsZSwgd2luZG93LFxuICAgICAgICBlLmRldGFpbCwgZS5zY3JlZW5YLCBlLnNjcmVlblksIGUuY2xpZW50WCwgZS5jbGllbnRZLCBlLmN0cmxLZXksXG4gICAgICAgIGUuYWx0S2V5LCBlLnNoaWZ0S2V5LCBlLm1ldGFLZXksIGUuYnV0dG9uLCBlLnJlbGF0ZWRUYXJnZXQpO1xuICAgIHRoaXMuZGlhbG9nXy5kaXNwYXRjaEV2ZW50KHJlZGlyZWN0ZWRFdmVudCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSxcblxuICAvKipcbiAgICogRm9jdXNlcyBvbiB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgd2l0aGluIHRoZSBkaWFsb2cuIFRoaXMgd2lsbCBhbHdheXMgYmx1ciB0aGUgY3VycmVudFxuICAgKiBmb2N1cywgZXZlbiBpZiBub3RoaW5nIHdpdGhpbiB0aGUgZGlhbG9nIGlzIGZvdW5kLlxuICAgKi9cbiAgZm9jdXNfOiBmdW5jdGlvbigpIHtcbiAgICAvLyBGaW5kIGVsZW1lbnQgd2l0aCBgYXV0b2ZvY3VzYCBhdHRyaWJ1dGUsIG9yIGZhbGwgYmFjayB0byB0aGUgZmlyc3QgZm9ybS90YWJpbmRleCBjb250cm9sLlxuICAgIHZhciB0YXJnZXQgPSB0aGlzLmRpYWxvZ18ucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c106bm90KFtkaXNhYmxlZF0pJyk7XG4gICAgaWYgKCF0YXJnZXQgJiYgdGhpcy5kaWFsb2dfLnRhYkluZGV4ID49IDApIHtcbiAgICAgIHRhcmdldCA9IHRoaXMuZGlhbG9nXztcbiAgICB9XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRhcmdldCA9IGZpbmRGb2N1c2FibGVFbGVtZW50V2l0aGluKHRoaXMuZGlhbG9nXyk7XG4gICAgfVxuICAgIHNhZmVCbHVyKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgIHRhcmdldCAmJiB0YXJnZXQuZm9jdXMoKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyB0aGUgekluZGV4IGZvciB0aGUgYmFja2Ryb3AgYW5kIGRpYWxvZy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRpYWxvZ1pcbiAgICogQHBhcmFtIHtudW1iZXJ9IGJhY2tkcm9wWlxuICAgKi9cbiAgdXBkYXRlWkluZGV4OiBmdW5jdGlvbihkaWFsb2daLCBiYWNrZHJvcFopIHtcbiAgICBpZiAoZGlhbG9nWiA8IGJhY2tkcm9wWikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkaWFsb2daIHNob3VsZCBuZXZlciBiZSA8IGJhY2tkcm9wWicpO1xuICAgIH1cbiAgICB0aGlzLmRpYWxvZ18uc3R5bGUuekluZGV4ID0gZGlhbG9nWjtcbiAgICB0aGlzLmJhY2tkcm9wXy5zdHlsZS56SW5kZXggPSBiYWNrZHJvcFo7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkaWFsb2cuIElmIHRoZSBkaWFsb2cgaXMgYWxyZWFkeSBvcGVuLCB0aGlzIGRvZXMgbm90aGluZy5cbiAgICovXG4gIHNob3c6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5kaWFsb2dfLm9wZW4pIHtcbiAgICAgIHRoaXMuc2V0T3Blbih0cnVlKTtcbiAgICAgIHRoaXMuZm9jdXNfKCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTaG93IHRoaXMgZGlhbG9nIG1vZGFsbHkuXG4gICAqL1xuICBzaG93TW9kYWw6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmRpYWxvZ18uaGFzQXR0cmlidXRlKCdvcGVuJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGV4ZWN1dGUgXFwnc2hvd01vZGFsXFwnIG9uIGRpYWxvZzogVGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBvcGVuLCBhbmQgdGhlcmVmb3JlIGNhbm5vdCBiZSBvcGVuZWQgbW9kYWxseS4nKTtcbiAgICB9XG4gICAgaWYgKCFpc0Nvbm5lY3RlZCh0aGlzLmRpYWxvZ18pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBleGVjdXRlIFxcJ3Nob3dNb2RhbFxcJyBvbiBkaWFsb2c6IFRoZSBlbGVtZW50IGlzIG5vdCBpbiBhIERvY3VtZW50LicpO1xuICAgIH1cbiAgICBpZiAoIWRpYWxvZ1BvbHlmaWxsLmRtLnB1c2hEaWFsb2codGhpcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGV4ZWN1dGUgXFwnc2hvd01vZGFsXFwnIG9uIGRpYWxvZzogVGhlcmUgYXJlIHRvbyBtYW55IG9wZW4gbW9kYWwgZGlhbG9ncy4nKTtcbiAgICB9XG5cbiAgICBpZiAoY3JlYXRlc1N0YWNraW5nQ29udGV4dCh0aGlzLmRpYWxvZ18ucGFyZW50RWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGUud2FybignQSBkaWFsb2cgaXMgYmVpbmcgc2hvd24gaW5zaWRlIGEgc3RhY2tpbmcgY29udGV4dC4gJyArXG4gICAgICAgICAgJ1RoaXMgbWF5IGNhdXNlIGl0IHRvIGJlIHVudXNhYmxlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoaXMgbGluazogJyArXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvZGlhbG9nLXBvbHlmaWxsLyNzdGFja2luZy1jb250ZXh0Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRPcGVuKHRydWUpO1xuICAgIHRoaXMub3BlbkFzTW9kYWxfID0gdHJ1ZTtcblxuICAgIC8vIE9wdGlvbmFsbHkgY2VudGVyIHZlcnRpY2FsbHksIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHZpZXdwb3J0LlxuICAgIGlmIChkaWFsb2dQb2x5ZmlsbC5uZWVkc0NlbnRlcmluZyh0aGlzLmRpYWxvZ18pKSB7XG4gICAgICBkaWFsb2dQb2x5ZmlsbC5yZXBvc2l0aW9uKHRoaXMuZGlhbG9nXyk7XG4gICAgICB0aGlzLnJlcGxhY2VkU3R5bGVUb3BfID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXBsYWNlZFN0eWxlVG9wXyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEluc2VydCBiYWNrZHJvcC5cbiAgICB0aGlzLmRpYWxvZ18ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5iYWNrZHJvcF8sIHRoaXMuZGlhbG9nXy5uZXh0U2libGluZyk7XG5cbiAgICAvLyBGb2N1cyBvbiB3aGF0ZXZlciBpbnNpZGUgdGhlIGRpYWxvZy5cbiAgICB0aGlzLmZvY3VzXygpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhpcyBIVE1MRGlhbG9nRWxlbWVudC4gVGhpcyBpcyBvcHRpb25hbCB2cyBjbGVhcmluZyB0aGUgb3BlblxuICAgKiBhdHRyaWJ1dGUsIGhvd2V2ZXIgdGhpcyBmaXJlcyBhICdjbG9zZScgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gb3B0X3JldHVyblZhbHVlIHRvIHVzZSBhcyB0aGUgcmV0dXJuVmFsdWVcbiAgICovXG4gIGNsb3NlOiBmdW5jdGlvbihvcHRfcmV0dXJuVmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuZGlhbG9nXy5oYXNBdHRyaWJ1dGUoJ29wZW4nKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZXhlY3V0ZSBcXCdjbG9zZVxcJyBvbiBkaWFsb2c6IFRoZSBlbGVtZW50IGRvZXMgbm90IGhhdmUgYW4gXFwnb3BlblxcJyBhdHRyaWJ1dGUsIGFuZCB0aGVyZWZvcmUgY2Fubm90IGJlIGNsb3NlZC4nKTtcbiAgICB9XG4gICAgdGhpcy5zZXRPcGVuKGZhbHNlKTtcblxuICAgIC8vIExlYXZlIHJldHVyblZhbHVlIHVudG91Y2hlZCBpbiBjYXNlIGl0IHdhcyBzZXQgZGlyZWN0bHkgb24gdGhlIGVsZW1lbnRcbiAgICBpZiAob3B0X3JldHVyblZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZGlhbG9nXy5yZXR1cm5WYWx1ZSA9IG9wdF9yZXR1cm5WYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyaW5nIFwiY2xvc2VcIiBldmVudCBmb3IgYW55IGF0dGFjaGVkIGxpc3RlbmVycyBvbiB0aGUgPGRpYWxvZz4uXG4gICAgdmFyIGNsb3NlRXZlbnQgPSBuZXcgc3VwcG9ydEN1c3RvbUV2ZW50KCdjbG9zZScsIHtcbiAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgY2FuY2VsYWJsZTogZmFsc2VcbiAgICB9KTtcbiAgICBzYWZlRGlzcGF0Y2hFdmVudCh0aGlzLmRpYWxvZ18sIGNsb3NlRXZlbnQpO1xuICB9XG5cbn0pO1xuXG52YXIgZGlhbG9nUG9seWZpbGwgPSB7fTtcblxuZGlhbG9nUG9seWZpbGwucmVwb3NpdGlvbiA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgdmFyIHNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIHZhciB0b3BWYWx1ZSA9IHNjcm9sbFRvcCArICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBlbGVtZW50Lm9mZnNldEhlaWdodCkgLyAyO1xuICBlbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgubWF4KHNjcm9sbFRvcCwgdG9wVmFsdWUpICsgJ3B4Jztcbn07XG5cbmRpYWxvZ1BvbHlmaWxsLmlzSW5saW5lUG9zaXRpb25TZXRCeVN0eWxlc2hlZXQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgc3R5bGVTaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldO1xuICAgIHZhciBjc3NSdWxlcyA9IG51bGw7XG4gICAgLy8gU29tZSBicm93c2VycyB0aHJvdyBvbiBjc3NSdWxlcy5cbiAgICB0cnkge1xuICAgICAgY3NzUnVsZXMgPSBzdHlsZVNoZWV0LmNzc1J1bGVzO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgaWYgKCFjc3NSdWxlcykgeyBjb250aW51ZTsgfVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY3NzUnVsZXMubGVuZ3RoOyArK2opIHtcbiAgICAgIHZhciBydWxlID0gY3NzUnVsZXNbal07XG4gICAgICB2YXIgc2VsZWN0ZWROb2RlcyA9IG51bGw7XG4gICAgICAvLyBJZ25vcmUgZXJyb3JzIG9uIGludmFsaWQgc2VsZWN0b3IgdGV4dHMuXG4gICAgICB0cnkge1xuICAgICAgICBzZWxlY3RlZE5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnNlbGVjdG9yVGV4dCk7XG4gICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICBpZiAoIXNlbGVjdGVkTm9kZXMgfHwgIWluTm9kZUxpc3Qoc2VsZWN0ZWROb2RlcywgZWxlbWVudCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgY3NzVG9wID0gcnVsZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0b3AnKTtcbiAgICAgIHZhciBjc3NCb3R0b20gPSBydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JvdHRvbScpO1xuICAgICAgaWYgKChjc3NUb3AgJiYgY3NzVG9wICE9PSAnYXV0bycpIHx8IChjc3NCb3R0b20gJiYgY3NzQm90dG9tICE9PSAnYXV0bycpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5kaWFsb2dQb2x5ZmlsbC5uZWVkc0NlbnRlcmluZyA9IGZ1bmN0aW9uKGRpYWxvZykge1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpYWxvZyk7XG4gIGlmIChjb21wdXRlZFN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gV2UgbXVzdCBkZXRlcm1pbmUgd2hldGhlciB0aGUgdG9wL2JvdHRvbSBzcGVjaWZpZWQgdmFsdWUgaXMgbm9uLWF1dG8uICBJblxuICAvLyBXZWJLaXQvQmxpbmssIGNoZWNraW5nIGNvbXB1dGVkU3R5bGUudG9wID09ICdhdXRvJyBpcyBzdWZmaWNpZW50LCBidXRcbiAgLy8gRmlyZWZveCByZXR1cm5zIHRoZSB1c2VkIHZhbHVlLiBTbyB3ZSBkbyB0aGlzIGNyYXp5IHRoaW5nIGluc3RlYWQ6IGNoZWNrXG4gIC8vIHRoZSBpbmxpbmUgc3R5bGUgYW5kIHRoZW4gZ28gdGhyb3VnaCBDU1MgcnVsZXMuXG4gIGlmICgoZGlhbG9nLnN0eWxlLnRvcCAhPT0gJ2F1dG8nICYmIGRpYWxvZy5zdHlsZS50b3AgIT09ICcnKSB8fFxuICAgICAgKGRpYWxvZy5zdHlsZS5ib3R0b20gIT09ICdhdXRvJyAmJiBkaWFsb2cuc3R5bGUuYm90dG9tICE9PSAnJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuICFkaWFsb2dQb2x5ZmlsbC5pc0lubGluZVBvc2l0aW9uU2V0QnlTdHlsZXNoZWV0KGRpYWxvZyk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsZW1lbnQgdG8gZm9yY2UgdXBncmFkZVxuICovXG5kaWFsb2dQb2x5ZmlsbC5mb3JjZVJlZ2lzdGVyRGlhbG9nID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICBpZiAod2luZG93LkhUTUxEaWFsb2dFbGVtZW50IHx8IGVsZW1lbnQuc2hvd01vZGFsKSB7XG4gICAgY29uc29sZS53YXJuKCdUaGlzIGJyb3dzZXIgYWxyZWFkeSBzdXBwb3J0cyA8ZGlhbG9nPiwgdGhlIHBvbHlmaWxsICcgK1xuICAgICAgICAnbWF5IG5vdCB3b3JrIGNvcnJlY3RseScsIGVsZW1lbnQpO1xuICB9XG4gIGlmIChlbGVtZW50LmxvY2FsTmFtZSAhPT0gJ2RpYWxvZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZWdpc3RlciBkaWFsb2c6IFRoZSBlbGVtZW50IGlzIG5vdCBhIGRpYWxvZy4nKTtcbiAgfVxuICBuZXcgZGlhbG9nUG9seWZpbGxJbmZvKC8qKiBAdHlwZSB7IUhUTUxEaWFsb2dFbGVtZW50fSAqLyAoZWxlbWVudCkpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50IHRvIHVwZ3JhZGUsIGlmIG5lY2Vzc2FyeVxuICovXG5kaWFsb2dQb2x5ZmlsbC5yZWdpc3RlckRpYWxvZyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50LnNob3dNb2RhbCkge1xuICAgIGRpYWxvZ1BvbHlmaWxsLmZvcmNlUmVnaXN0ZXJEaWFsb2coZWxlbWVudCk7XG4gIH1cbn07XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmRpYWxvZ1BvbHlmaWxsLkRpYWxvZ01hbmFnZXIgPSBmdW5jdGlvbigpIHtcbiAgLyoqIEB0eXBlIHshQXJyYXk8IWRpYWxvZ1BvbHlmaWxsSW5mbz59ICovXG4gIHRoaXMucGVuZGluZ0RpYWxvZ1N0YWNrID0gW107XG5cbiAgdmFyIGNoZWNrRE9NID0gdGhpcy5jaGVja0RPTV8uYmluZCh0aGlzKTtcblxuICAvLyBUaGUgb3ZlcmxheSBpcyB1c2VkIHRvIHNpbXVsYXRlIGhvdyBhIG1vZGFsIGRpYWxvZyBibG9ja3MgdGhlIGRvY3VtZW50LlxuICAvLyBUaGUgYmxvY2tpbmcgZGlhbG9nIGlzIHBvc2l0aW9uZWQgb24gdG9wIG9mIHRoZSBvdmVybGF5LCBhbmQgdGhlIHJlc3Qgb2ZcbiAgLy8gdGhlIGRpYWxvZ3Mgb24gdGhlIHBlbmRpbmcgZGlhbG9nIHN0YWNrIGFyZSBwb3NpdGlvbmVkIGJlbG93IGl0LiBJbiB0aGVcbiAgLy8gYWN0dWFsIGltcGxlbWVudGF0aW9uLCB0aGUgbW9kYWwgZGlhbG9nIHN0YWNraW5nIGlzIGNvbnRyb2xsZWQgYnkgdGhlXG4gIC8vIHRvcCBsYXllciwgd2hlcmUgei1pbmRleCBoYXMgbm8gZWZmZWN0LlxuICB0aGlzLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9ICdfZGlhbG9nX292ZXJsYXknO1xuICB0aGlzLm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5mb3J3YXJkVGFiXyA9IHVuZGVmaW5lZDtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNoZWNrRE9NKFtdKTsgIC8vIHNhbml0eS1jaGVjayBET01cbiAgfS5iaW5kKHRoaXMpKTtcblxuICB0aGlzLmhhbmRsZUtleV8gPSB0aGlzLmhhbmRsZUtleV8uYmluZCh0aGlzKTtcbiAgdGhpcy5oYW5kbGVGb2N1c18gPSB0aGlzLmhhbmRsZUZvY3VzXy5iaW5kKHRoaXMpO1xuXG4gIHRoaXMuekluZGV4TG93XyA9IDEwMDAwMDtcbiAgdGhpcy56SW5kZXhIaWdoXyA9IDEwMDAwMCArIDE1MDtcblxuICB0aGlzLmZvcndhcmRUYWJfID0gdW5kZWZpbmVkO1xuXG4gIGlmICgnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XG4gICAgdGhpcy5tb18gPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihyZWNvcmRzKSB7XG4gICAgICB2YXIgcmVtb3ZlZCA9IFtdO1xuICAgICAgcmVjb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uKHJlYykge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgYzsgYyA9IHJlYy5yZW1vdmVkTm9kZXNbaV07ICsraSkge1xuICAgICAgICAgIGlmICghKGMgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChjLmxvY2FsTmFtZSA9PT0gJ2RpYWxvZycpIHtcbiAgICAgICAgICAgIHJlbW92ZWQucHVzaChjKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVtb3ZlZCA9IHJlbW92ZWQuY29uY2F0KGMucXVlcnlTZWxlY3RvckFsbCgnZGlhbG9nJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlbW92ZWQubGVuZ3RoICYmIGNoZWNrRE9NKHJlbW92ZWQpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCBvbiB0aGUgZmlyc3QgbW9kYWwgZGlhbG9nIGJlaW5nIHNob3duLiBBZGRzIHRoZSBvdmVybGF5IGFuZCByZWxhdGVkXG4gKiBoYW5kbGVycy5cbiAqL1xuZGlhbG9nUG9seWZpbGwuRGlhbG9nTWFuYWdlci5wcm90b3R5cGUuYmxvY2tEb2N1bWVudCA9IGZ1bmN0aW9uKCkge1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmhhbmRsZUZvY3VzXywgdHJ1ZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleV8pO1xuICB0aGlzLm1vXyAmJiB0aGlzLm1vXy5vYnNlcnZlKGRvY3VtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBvbiB0aGUgZmlyc3QgbW9kYWwgZGlhbG9nIGJlaW5nIHJlbW92ZWQsIGkuZS4sIHdoZW4gbm8gbW9yZSBtb2RhbFxuICogZGlhbG9ncyBhcmUgdmlzaWJsZS5cbiAqL1xuZGlhbG9nUG9seWZpbGwuRGlhbG9nTWFuYWdlci5wcm90b3R5cGUudW5ibG9ja0RvY3VtZW50ID0gZnVuY3Rpb24oKSB7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuaGFuZGxlRm9jdXNfLCB0cnVlKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Xyk7XG4gIHRoaXMubW9fICYmIHRoaXMubW9fLmRpc2Nvbm5lY3QoKTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgc3RhY2tpbmcgb2YgYWxsIGtub3duIGRpYWxvZ3MuXG4gKi9cbmRpYWxvZ1BvbHlmaWxsLkRpYWxvZ01hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVN0YWNraW5nID0gZnVuY3Rpb24oKSB7XG4gIHZhciB6SW5kZXggPSB0aGlzLnpJbmRleEhpZ2hfO1xuXG4gIGZvciAodmFyIGkgPSAwLCBkcGk7IGRwaSA9IHRoaXMucGVuZGluZ0RpYWxvZ1N0YWNrW2ldOyArK2kpIHtcbiAgICBkcGkudXBkYXRlWkluZGV4KC0tekluZGV4LCAtLXpJbmRleCk7XG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS56SW5kZXggPSAtLXpJbmRleDtcbiAgICB9XG4gIH1cblxuICAvLyBNYWtlIHRoZSBvdmVybGF5IGEgc2libGluZyBvZiB0aGUgZGlhbG9nIGl0c2VsZi5cbiAgdmFyIGxhc3QgPSB0aGlzLnBlbmRpbmdEaWFsb2dTdGFja1swXTtcbiAgaWYgKGxhc3QpIHtcbiAgICB2YXIgcCA9IGxhc3QuZGlhbG9nLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQuYm9keTtcbiAgICBwLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gIH0gZWxzZSBpZiAodGhpcy5vdmVybGF5LnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLm92ZXJsYXkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gY2FuZGlkYXRlIHRvIGNoZWNrIGlmIGNvbnRhaW5lZCBvciBpcyB0aGUgdG9wLW1vc3QgbW9kYWwgZGlhbG9nXG4gKiBAcmV0dXJuIHtib29sZWFufSB3aGV0aGVyIGNhbmRpZGF0ZSBpcyBjb250YWluZWQgaW4gdG9wIGRpYWxvZ1xuICovXG5kaWFsb2dQb2x5ZmlsbC5EaWFsb2dNYW5hZ2VyLnByb3RvdHlwZS5jb250YWluZWRCeVRvcERpYWxvZ18gPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgd2hpbGUgKGNhbmRpZGF0ZSA9IGZpbmROZWFyZXN0RGlhbG9nKGNhbmRpZGF0ZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgZHBpOyBkcGkgPSB0aGlzLnBlbmRpbmdEaWFsb2dTdGFja1tpXTsgKytpKSB7XG4gICAgICBpZiAoZHBpLmRpYWxvZyA9PT0gY2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBpID09PSAwOyAgLy8gb25seSB2YWxpZCBpZiB0b3AtbW9zdFxuICAgICAgfVxuICAgIH1cbiAgICBjYW5kaWRhdGUgPSBjYW5kaWRhdGUucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5kaWFsb2dQb2x5ZmlsbC5EaWFsb2dNYW5hZ2VyLnByb3RvdHlwZS5oYW5kbGVGb2N1c18gPSBmdW5jdGlvbihldmVudCkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQuY29tcG9zZWRQYXRoID8gZXZlbnQuY29tcG9zZWRQYXRoKClbMF0gOiBldmVudC50YXJnZXQ7XG5cbiAgaWYgKHRoaXMuY29udGFpbmVkQnlUb3BEaWFsb2dfKHRhcmdldCkpIHsgcmV0dXJuOyB9XG5cbiAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgeyByZXR1cm47IH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgc2FmZUJsdXIoLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAodGFyZ2V0KSk7XG5cbiAgaWYgKHRoaXMuZm9yd2FyZFRhYl8gPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH0gIC8vIG1vdmUgZm9jdXMgb25seSBmcm9tIGEgdGFiIGtleVxuXG4gIHZhciBkcGkgPSB0aGlzLnBlbmRpbmdEaWFsb2dTdGFja1swXTtcbiAgdmFyIGRpYWxvZyA9IGRwaS5kaWFsb2c7XG4gIHZhciBwb3NpdGlvbiA9IGRpYWxvZy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbih0YXJnZXQpO1xuICBpZiAocG9zaXRpb24gJiBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX1BSRUNFRElORykge1xuICAgIGlmICh0aGlzLmZvcndhcmRUYWJfKSB7XG4gICAgICAvLyBmb3J3YXJkXG4gICAgICBkcGkuZm9jdXNfKCk7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgLy8gYmFja3dhcmRzIGlmIHdlJ3JlIG5vdCBhbHJlYWR5IGZvY3VzZWQgb24gPGh0bWw+XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5kaWFsb2dQb2x5ZmlsbC5EaWFsb2dNYW5hZ2VyLnByb3RvdHlwZS5oYW5kbGVLZXlfID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy5mb3J3YXJkVGFiXyA9IHVuZGVmaW5lZDtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB2YXIgY2FuY2VsRXZlbnQgPSBuZXcgc3VwcG9ydEN1c3RvbUV2ZW50KCdjYW5jZWwnLCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgICB2YXIgZHBpID0gdGhpcy5wZW5kaW5nRGlhbG9nU3RhY2tbMF07XG4gICAgaWYgKGRwaSAmJiBzYWZlRGlzcGF0Y2hFdmVudChkcGkuZGlhbG9nLCBjYW5jZWxFdmVudCkpIHtcbiAgICAgIGRwaS5kaWFsb2cuY2xvc2UoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gOSkge1xuICAgIHRoaXMuZm9yd2FyZFRhYl8gPSAhZXZlbnQuc2hpZnRLZXk7XG4gIH1cbn07XG5cbi8qKlxuICogRmluZHMgYW5kIGRvd25ncmFkZXMgYW55IGtub3duIG1vZGFsIGRpYWxvZ3MgdGhhdCBhcmUgbm8gbG9uZ2VyIGRpc3BsYXllZC4gRGlhbG9ncyB0aGF0IGFyZVxuICogcmVtb3ZlZCBhbmQgaW1tZWRpYXRlbHkgcmVhZGRlZCBkb24ndCBzdGF5IG1vZGFsLCB0aGV5IGJlY29tZSBub3JtYWwuXG4gKlxuICogQHBhcmFtIHshQXJyYXk8IUhUTUxEaWFsb2dFbGVtZW50Pn0gcmVtb3ZlZCB0aGF0IGhhdmUgZGVmaW5pdGVseSBiZWVuIHJlbW92ZWRcbiAqL1xuZGlhbG9nUG9seWZpbGwuRGlhbG9nTWFuYWdlci5wcm90b3R5cGUuY2hlY2tET01fID0gZnVuY3Rpb24ocmVtb3ZlZCkge1xuICAvLyBUaGlzIG9wZXJhdGVzIG9uIGEgY2xvbmUgYmVjYXVzZSBpdCBtYXkgY2F1c2UgaXQgdG8gY2hhbmdlLiBFYWNoIGNoYW5nZSBhbHNvIGNhbGxzXG4gIC8vIHVwZGF0ZVN0YWNraW5nLCB3aGljaCBvbmx5IGFjdHVhbGx5IG5lZWRzIHRvIGhhcHBlbiBvbmNlLiBCdXQgd2hvIHJlbW92ZXMgbWFueSBtb2RhbCBkaWFsb2dzXG4gIC8vIGF0IGEgdGltZT8hXG4gIHZhciBjbG9uZSA9IHRoaXMucGVuZGluZ0RpYWxvZ1N0YWNrLnNsaWNlKCk7XG4gIGNsb25lLmZvckVhY2goZnVuY3Rpb24oZHBpKSB7XG4gICAgaWYgKHJlbW92ZWQuaW5kZXhPZihkcGkuZGlhbG9nKSAhPT0gLTEpIHtcbiAgICAgIGRwaS5kb3duZ3JhZGVNb2RhbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcGkubWF5YmVIaWRlTW9kYWwoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0geyFkaWFsb2dQb2x5ZmlsbEluZm99IGRwaVxuICogQHJldHVybiB7Ym9vbGVhbn0gd2hldGhlciB0aGUgZGlhbG9nIHdhcyBhbGxvd2VkXG4gKi9cbmRpYWxvZ1BvbHlmaWxsLkRpYWxvZ01hbmFnZXIucHJvdG90eXBlLnB1c2hEaWFsb2cgPSBmdW5jdGlvbihkcGkpIHtcbiAgdmFyIGFsbG93ZWQgPSAodGhpcy56SW5kZXhIaWdoXyAtIHRoaXMuekluZGV4TG93XykgLyAyIC0gMTtcbiAgaWYgKHRoaXMucGVuZGluZ0RpYWxvZ1N0YWNrLmxlbmd0aCA+PSBhbGxvd2VkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0aGlzLnBlbmRpbmdEaWFsb2dTdGFjay51bnNoaWZ0KGRwaSkgPT09IDEpIHtcbiAgICB0aGlzLmJsb2NrRG9jdW1lbnQoKTtcbiAgfVxuICB0aGlzLnVwZGF0ZVN0YWNraW5nKCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0geyFkaWFsb2dQb2x5ZmlsbEluZm99IGRwaVxuICovXG5kaWFsb2dQb2x5ZmlsbC5EaWFsb2dNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVEaWFsb2cgPSBmdW5jdGlvbihkcGkpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5wZW5kaW5nRGlhbG9nU3RhY2suaW5kZXhPZihkcGkpO1xuICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuXG4gIHRoaXMucGVuZGluZ0RpYWxvZ1N0YWNrLnNwbGljZShpbmRleCwgMSk7XG4gIGlmICh0aGlzLnBlbmRpbmdEaWFsb2dTdGFjay5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLnVuYmxvY2tEb2N1bWVudCgpO1xuICB9XG4gIHRoaXMudXBkYXRlU3RhY2tpbmcoKTtcbn07XG5cbmRpYWxvZ1BvbHlmaWxsLmRtID0gbmV3IGRpYWxvZ1BvbHlmaWxsLkRpYWxvZ01hbmFnZXIoKTtcbmRpYWxvZ1BvbHlmaWxsLmZvcm1TdWJtaXR0ZXIgPSBudWxsO1xuZGlhbG9nUG9seWZpbGwuaW1hZ2VtYXBVc2VWYWx1ZSA9IG51bGw7XG5cbi8qKlxuICogSW5zdGFsbHMgZ2xvYmFsIGhhbmRsZXJzLCBzdWNoIGFzIGNsaWNrIGxpc3RlcnMgYW5kIG5hdGl2ZSBtZXRob2Qgb3ZlcnJpZGVzLiBUaGVzZSBhcmUgbmVlZGVkXG4gKiBldmVuIGlmIGEgbm8gZGlhbG9nIGlzIHJlZ2lzdGVyZWQsIGFzIHRoZXkgZGVhbCB3aXRoIDxmb3JtIG1ldGhvZD1cImRpYWxvZ1wiPi5cbiAqL1xuaWYgKHdpbmRvdy5IVE1MRGlhbG9nRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG5cbiAgLyoqXG4gICAqIElmIEhUTUxGb3JtRWxlbWVudCB0cmFuc2xhdGVzIG1ldGhvZD1cIkRJQUxPR1wiIGludG8gJ2dldCcsIHRoZW4gcmVwbGFjZSB0aGUgZGVzY3JpcHRvciB3aXRoXG4gICAqIG9uZSB0aGF0IHJldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUuXG4gICAqL1xuICB2YXIgdGVzdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIHRlc3RGb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ2RpYWxvZycpO1xuICBpZiAodGVzdEZvcm0ubWV0aG9kICE9PSAnZGlhbG9nJykge1xuICAgIHZhciBtZXRob2REZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihIVE1MRm9ybUVsZW1lbnQucHJvdG90eXBlLCAnbWV0aG9kJyk7XG4gICAgaWYgKG1ldGhvZERlc2NyaXB0b3IpIHtcbiAgICAgIC8vIG5iLiBTb21lIG9sZGVyIGlPUyBhbmQgb2xkZXIgUGhhbnRvbUpTIGZhaWwgdG8gcmV0dXJuIHRoZSBkZXNjcmlwdG9yLiBEb24ndCBkbyBhbnl0aGluZ1xuICAgICAgLy8gYW5kIGRvbid0IGJvdGhlciB0byB1cGRhdGUgdGhlIGVsZW1lbnQuXG4gICAgICB2YXIgcmVhbEdldCA9IG1ldGhvZERlc2NyaXB0b3IuZ2V0O1xuICAgICAgbWV0aG9kRGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzRm9ybU1ldGhvZERpYWxvZyh0aGlzKSkge1xuICAgICAgICAgIHJldHVybiAnZGlhbG9nJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhbEdldC5jYWxsKHRoaXMpO1xuICAgICAgfTtcbiAgICAgIHZhciByZWFsU2V0ID0gbWV0aG9kRGVzY3JpcHRvci5zZXQ7XG4gICAgICAvKiogQHRoaXMge0hUTUxFbGVtZW50fSAqL1xuICAgICAgbWV0aG9kRGVzY3JpcHRvci5zZXQgPSBmdW5jdGlvbih2KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdi50b0xvd2VyQ2FzZSgpID09PSAnZGlhbG9nJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgdik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWxTZXQuY2FsbCh0aGlzLCB2KTtcbiAgICAgIH07XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTEZvcm1FbGVtZW50LnByb3RvdHlwZSwgJ21ldGhvZCcsIG1ldGhvZERlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHbG9iYWwgJ2NsaWNrJyBoYW5kbGVyLCB0byBjYXB0dXJlIHRoZSA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiPiBvciA8YnV0dG9uPiBlbGVtZW50IHdoaWNoIGhhc1xuICAgKiBzdWJtaXR0ZWQgYSA8Zm9ybSBtZXRob2Q9XCJkaWFsb2dcIj4uIE5lZWRlZCBhcyBTYWZhcmkgYW5kIG90aGVycyBkb24ndCByZXBvcnQgdGhpcyBpbnNpZGVcbiAgICogZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5cbiAgICovXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICBkaWFsb2dQb2x5ZmlsbC5mb3JtU3VibWl0dGVyID0gbnVsbDtcbiAgICBkaWFsb2dQb2x5ZmlsbC5pbWFnZW1hcFVzZVZhbHVlID0gbnVsbDtcbiAgICBpZiAoZXYuZGVmYXVsdFByZXZlbnRlZCkgeyByZXR1cm47IH0gIC8vIGUuZy4gYSBzdWJtaXQgd2hpY2ggcHJldmVudHMgZGVmYXVsdCBzdWJtaXNzaW9uXG5cbiAgICB2YXIgdGFyZ2V0ID0gLyoqIEB0eXBlIHtFbGVtZW50fSAqLyAoZXYudGFyZ2V0KTtcbiAgICBpZiAoJ2NvbXBvc2VkUGF0aCcgaW4gZXYpIHtcbiAgICAgIHZhciBwYXRoID0gZXYuY29tcG9zZWRQYXRoKCk7XG4gICAgICB0YXJnZXQgPSBwYXRoLnNoaWZ0KCkgfHwgdGFyZ2V0O1xuICAgIH1cbiAgICBpZiAoIXRhcmdldCB8fCAhaXNGb3JtTWV0aG9kRGlhbG9nKHRhcmdldC5mb3JtKSkgeyByZXR1cm47IH1cblxuICAgIHZhciB2YWxpZCA9ICh0YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcgJiYgWydidXR0b24nLCAnaW5wdXQnXS5pbmRleE9mKHRhcmdldC5sb2NhbE5hbWUpID4gLTEpO1xuICAgIGlmICghdmFsaWQpIHtcbiAgICAgIGlmICghKHRhcmdldC5sb2NhbE5hbWUgPT09ICdpbnB1dCcgJiYgdGFyZ2V0LnR5cGUgPT09ICdpbWFnZScpKSB7IHJldHVybjsgfVxuICAgICAgLy8gdGhpcyBpcyBhIDxpbnB1dCB0eXBlPVwiaW1hZ2VcIj4sIHdoaWNoIGNhbiBzdWJtaXQgZm9ybXNcbiAgICAgIGRpYWxvZ1BvbHlmaWxsLmltYWdlbWFwVXNlVmFsdWUgPSBldi5vZmZzZXRYICsgJywnICsgZXYub2Zmc2V0WTtcbiAgICB9XG5cbiAgICB2YXIgZGlhbG9nID0gZmluZE5lYXJlc3REaWFsb2codGFyZ2V0KTtcbiAgICBpZiAoIWRpYWxvZykgeyByZXR1cm47IH1cblxuICAgIGRpYWxvZ1BvbHlmaWxsLmZvcm1TdWJtaXR0ZXIgPSB0YXJnZXQ7XG5cbiAgfSwgZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBHbG9iYWwgJ3N1Ym1pdCcgaGFuZGxlci4gVGhpcyBoYW5kbGVzIHN1Ym1pdHMgb2YgYG1ldGhvZD1cImRpYWxvZ1wiYCB3aGljaCBhcmUgaW52YWxpZCwgaS5lLixcbiAgICogb3V0c2lkZSBhIGRpYWxvZy4gVGhleSBnZXQgcHJldmVudGVkLlxuICAgKi9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXYpIHtcbiAgICB2YXIgZm9ybSA9IGV2LnRhcmdldDtcbiAgICB2YXIgZGlhbG9nID0gZmluZE5lYXJlc3REaWFsb2coZm9ybSk7XG4gICAgaWYgKGRpYWxvZykge1xuICAgICAgcmV0dXJuOyAgLy8gaWdub3JlLCBoYW5kbGUgdGhlcmVcbiAgICB9XG5cbiAgICB2YXIgc3VibWl0dGVyID0gZmluZEZvcm1TdWJtaXR0ZXIoZXYpO1xuICAgIHZhciBmb3JtbWV0aG9kID0gc3VibWl0dGVyICYmIHN1Ym1pdHRlci5nZXRBdHRyaWJ1dGUoJ2Zvcm1tZXRob2QnKSB8fCBmb3JtLmdldEF0dHJpYnV0ZSgnbWV0aG9kJyk7XG4gICAgaWYgKGZvcm1tZXRob2QgPT09ICdkaWFsb2cnKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgdGhlIG5hdGl2ZSBIVE1MRm9ybUVsZW1lbnQuc3VibWl0KCkgbWV0aG9kLCBhcyBpdCB3b24ndCBmaXJlIHRoZVxuICAgKiBzdWJtaXQgZXZlbnQgYW5kIGdpdmUgdXMgYSBjaGFuY2UgdG8gcmVzcG9uZC5cbiAgICovXG4gIHZhciBuYXRpdmVGb3JtU3VibWl0ID0gSFRNTEZvcm1FbGVtZW50LnByb3RvdHlwZS5zdWJtaXQ7XG4gIHZhciByZXBsYWNlbWVudEZvcm1TdWJtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFpc0Zvcm1NZXRob2REaWFsb2codGhpcykpIHtcbiAgICAgIHJldHVybiBuYXRpdmVGb3JtU3VibWl0LmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHZhciBkaWFsb2cgPSBmaW5kTmVhcmVzdERpYWxvZyh0aGlzKTtcbiAgICBkaWFsb2cgJiYgZGlhbG9nLmNsb3NlKCk7XG4gIH07XG4gIEhUTUxGb3JtRWxlbWVudC5wcm90b3R5cGUuc3VibWl0ID0gcmVwbGFjZW1lbnRGb3JtU3VibWl0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkaWFsb2dQb2x5ZmlsbDtcbiJdLCJuYW1lcyI6WyJkaWFsb2dQb2x5ZmlsbCIsImRpYWxvZ3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZGlhbG9nIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVnaXN0ZXJEaWFsb2ciLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJsaXN0IiwidHlwZSIsImF0dHJpYnV0ZU5hbWUiLCJ0YXJnZXQiLCJvcGVuIiwid2lkdGgiLCJib2R5Iiwib2Zmc2V0V2lkdGgiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJiYWNrZHJvcCIsIm5leHRTaWJsaW5nIiwiY2xhc3NOYW1lIiwibWF0Y2giLCJzdHlsZSIsInNldFByb3BlcnR5Iiwib3ZlcmxheSIsInF1ZXJ5U2VsZWN0b3IiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsInN1cHBvcnRDdXN0b21FdmVudCIsIndpbmRvdyIsIkN1c3RvbUV2ZW50IiwiZXZlbnQiLCJ4IiwiZXYiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwicHJvdG90eXBlIiwiRXZlbnQiLCJzYWZlRGlzcGF0Y2hFdmVudCIsImNoZWNrIiwidG9Mb3dlckNhc2UiLCJkaXNwYXRjaEV2ZW50IiwiY3JlYXRlc1N0YWNraW5nQ29udGV4dCIsImVsIiwicyIsImdldENvbXB1dGVkU3R5bGUiLCJpbnZhbGlkIiwiayIsIm9rIiwidW5kZWZpbmVkIiwib3BhY2l0eSIsInBvc2l0aW9uIiwid2Via2l0T3ZlcmZsb3dTY3JvbGxpbmciLCJwYXJlbnRFbGVtZW50IiwiZmluZE5lYXJlc3REaWFsb2ciLCJsb2NhbE5hbWUiLCJwYXJlbnROb2RlIiwiaG9zdCIsInNhZmVCbHVyIiwic2hhZG93Um9vdCIsImFjdGl2ZUVsZW1lbnQiLCJibHVyIiwiaW5Ob2RlTGlzdCIsIm5vZGVMaXN0Iiwibm9kZSIsImkiLCJsZW5ndGgiLCJpc0Zvcm1NZXRob2REaWFsb2ciLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJmaW5kRm9jdXNhYmxlRWxlbWVudFdpdGhpbiIsImhvc3RFbGVtZW50Iiwib3B0cyIsInF1ZXJ5IiwibWFwIiwicHVzaCIsImpvaW4iLCJFbGVtZW50IiwiZWxlbXMiLCJ0YWdOYW1lIiwiaXNDb25uZWN0ZWQiLCJlbGVtZW50IiwiY29udGFpbnMiLCJmaW5kRm9ybVN1Ym1pdHRlciIsInN1Ym1pdHRlciIsImZvcm0iLCJIVE1MRm9ybUVsZW1lbnQiLCJmb3JtU3VibWl0dGVyIiwicm9vdCIsImdldFJvb3ROb2RlIiwibWF5YmVIYW5kbGVTdWJtaXQiLCJkZWZhdWx0UHJldmVudGVkIiwidmFsdWUiLCJpbWFnZW1hcFVzZVZhbHVlIiwiZm9ybW1ldGhvZCIsInByZXZlbnREZWZhdWx0IiwiY2xvc2UiLCJkaWFsb2dQb2x5ZmlsbEluZm8iLCJkaWFsb2dfIiwicmVwbGFjZWRTdHlsZVRvcF8iLCJvcGVuQXNNb2RhbF8iLCJzZXRBdHRyaWJ1dGUiLCJzaG93IiwiYmluZCIsInNob3dNb2RhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXR1cm5WYWx1ZSIsIm1vIiwibWF5YmVIaWRlTW9kYWwiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJyZW1vdmVkIiwiY2IiLCJkb3duZ3JhZGVNb2RhbCIsInRpbWVvdXQiLCJkZWxheU1vZGVsIiwiY2FuZCIsInN1YnN0ciIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJuYW1lIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJzZXQiLCJzZXRPcGVuIiwiZ2V0IiwiYmFja2Ryb3BfIiwiY3JlYXRlRWxlbWVudCIsImJhY2tkcm9wTW91c2VFdmVudF8iLCJ6SW5kZXgiLCJ0b3AiLCJyZW1vdmVDaGlsZCIsImRtIiwicmVtb3ZlRGlhbG9nIiwicmVtb3ZlQXR0cmlidXRlIiwiZSIsImZha2UiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwidGFiSW5kZXgiLCJmb2N1cyIsInJlZGlyZWN0ZWRFdmVudCIsImluaXRNb3VzZUV2ZW50Iiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsImN0cmxLZXkiLCJhbHRLZXkiLCJzaGlmdEtleSIsIm1ldGFLZXkiLCJidXR0b24iLCJyZWxhdGVkVGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZm9jdXNfIiwidXBkYXRlWkluZGV4IiwiZGlhbG9nWiIsImJhY2tkcm9wWiIsIkVycm9yIiwicHVzaERpYWxvZyIsImNvbnNvbGUiLCJ3YXJuIiwibmVlZHNDZW50ZXJpbmciLCJyZXBvc2l0aW9uIiwib3B0X3JldHVyblZhbHVlIiwiY2xvc2VFdmVudCIsInNjcm9sbFRvcCIsImRvY3VtZW50RWxlbWVudCIsInRvcFZhbHVlIiwiaW5uZXJIZWlnaHQiLCJNYXRoIiwibWF4IiwiaXNJbmxpbmVQb3NpdGlvblNldEJ5U3R5bGVzaGVldCIsInN0eWxlU2hlZXRzIiwic3R5bGVTaGVldCIsImNzc1J1bGVzIiwiaiIsInJ1bGUiLCJzZWxlY3RlZE5vZGVzIiwic2VsZWN0b3JUZXh0IiwiY3NzVG9wIiwiZ2V0UHJvcGVydHlWYWx1ZSIsImNzc0JvdHRvbSIsImNvbXB1dGVkU3R5bGUiLCJib3R0b20iLCJmb3JjZVJlZ2lzdGVyRGlhbG9nIiwiSFRNTERpYWxvZ0VsZW1lbnQiLCJEaWFsb2dNYW5hZ2VyIiwicGVuZGluZ0RpYWxvZ1N0YWNrIiwiY2hlY2tET00iLCJjaGVja0RPTV8iLCJmb3J3YXJkVGFiXyIsImhhbmRsZUtleV8iLCJoYW5kbGVGb2N1c18iLCJ6SW5kZXhMb3dfIiwiekluZGV4SGlnaF8iLCJtb18iLCJyZWNvcmRzIiwicmVjIiwiYyIsInJlbW92ZWROb2RlcyIsImNvbmNhdCIsImJsb2NrRG9jdW1lbnQiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwidW5ibG9ja0RvY3VtZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpc2Nvbm5lY3QiLCJ1cGRhdGVTdGFja2luZyIsImRwaSIsImxhc3QiLCJwIiwiYXBwZW5kQ2hpbGQiLCJjb250YWluZWRCeVRvcERpYWxvZ18iLCJjYW5kaWRhdGUiLCJjb21wb3NlZFBhdGgiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsIk5vZGUiLCJET0NVTUVOVF9QT1NJVElPTl9QUkVDRURJTkciLCJrZXlDb2RlIiwiY2FuY2VsRXZlbnQiLCJjbG9uZSIsInNsaWNlIiwiaW5kZXhPZiIsImFsbG93ZWQiLCJ1bnNoaWZ0IiwiaW5kZXgiLCJzcGxpY2UiLCJ0ZXN0Rm9ybSIsIm1ldGhvZCIsIm1ldGhvZERlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJyZWFsR2V0IiwiY2FsbCIsInJlYWxTZXQiLCJ2IiwicGF0aCIsInNoaWZ0IiwidmFsaWQiLCJvZmZzZXRYIiwib2Zmc2V0WSIsIm5hdGl2ZUZvcm1TdWJtaXQiLCJzdWJtaXQiLCJyZXBsYWNlbWVudEZvcm1TdWJtaXQiXSwic291cmNlUm9vdCI6IiJ9