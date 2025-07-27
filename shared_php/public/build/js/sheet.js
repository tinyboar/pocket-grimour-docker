"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["js/sheet"],{

/***/ "./assets/js/sheet.js":
/*!****************************!*\
  !*** ./assets/js/sheet.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_Dialog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Dialog.js */ "./assets/js/classes/Dialog.js");
/* harmony import */ var _utils_elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/elements.js */ "./assets/js/utils/elements.js");
/* harmony import */ var _lib_qrcode_svg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/qrcode-svg.js */ "./assets/js/lib/qrcode-svg.js");


 // Generate the QR code.

(0,_utils_elements_js__WEBPACK_IMPORTED_MODULE_1__.lookupOne)("#qr-code").append((0,_lib_qrcode_svg_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
  msg: window.location.href,
  ecl: "L"
})); // Activate the dialogs.

(0,_utils_elements_js__WEBPACK_IMPORTED_MODULE_1__.lookup)("[data-dialog]").forEach(function (trigger) {
  trigger.dialog = _classes_Dialog_js__WEBPACK_IMPORTED_MODULE_0__["default"].createFromTrigger(trigger);
}); // Force the details to be open when printing.

function openAllDetails() {
  (0,_utils_elements_js__WEBPACK_IMPORTED_MODULE_1__.lookupCached)(".details").forEach(function (details) {
    if (details.dataset.open) {
      return;
    }

    details.dataset.open = details.open;
    details.open = true;
  });
}

function closeDetails() {
  (0,_utils_elements_js__WEBPACK_IMPORTED_MODULE_1__.lookupCached)(".details").forEach(function (details) {
    if (!details.dataset.open) {
      return;
    }

    details.open = details.dataset.open === "true";
    delete details.dataset.open;
  });
}

var printQuery = window.matchMedia("print");
printQuery.addEventListener("change", function (_ref) {
  var matches = _ref.matches;

  if (matches) {
    openAllDetails();
  } else {
    closeDetails();
  }
});

if (printQuery.matches) {
  openAllDetails();
}

window.addEventListener("beforeprint", openAllDetails);
window.addEventListener("afterprint", closeDetails); // Change Language.

(0,_utils_elements_js__WEBPACK_IMPORTED_MODULE_1__.lookupOne)("#locale-form").addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = (0,_utils_elements_js__WEBPACK_IMPORTED_MODULE_1__.lookupOneCached)("#select-locale").value;
});
(0,_utils_elements_js__WEBPACK_IMPORTED_MODULE_1__.lookupOneCached)("#select-locale").addEventListener("change", function (_ref2) {
  var target = _ref2.target;
  target.form.requestSubmit();
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["assets_js_classes_Dialog_js-assets_js_lib_qrcode-svg_js-assets_js_utils_elements_js"], () => (__webpack_exec__("./assets/js/sheet.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2hlZXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7Q0FRQTs7QUFDQUUsNkRBQVMsQ0FBQyxVQUFELENBQVQsQ0FBc0JJLE1BQXRCLENBQTZCRCw4REFBTSxDQUFDO0FBQ2hDRSxFQUFBQSxHQUFHLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFEVztBQUVoQ0MsRUFBQUEsR0FBRyxFQUFFO0FBRjJCLENBQUQsQ0FBbkMsRSxDQUtBOztBQUNBViwwREFBTSxDQUFDLGVBQUQsQ0FBTixDQUF3QlcsT0FBeEIsQ0FBZ0MsVUFBQ0MsT0FBRCxFQUFhO0FBQ3pDQSxFQUFBQSxPQUFPLENBQUNDLE1BQVIsR0FBaUJkLDBEQUFNLENBQUNlLGlCQUFQLENBQXlCRixPQUF6QixDQUFqQjtBQUNILENBRkQsRSxDQUlBOztBQUNBLFNBQVNHLGNBQVQsR0FBMEI7QUFFdEJiLEVBQUFBLGdFQUFZLENBQUMsVUFBRCxDQUFaLENBQXlCUyxPQUF6QixDQUFpQyxVQUFDSyxPQUFELEVBQWE7QUFFMUMsUUFBSUEsT0FBTyxDQUFDQyxPQUFSLENBQWdCQyxJQUFwQixFQUEwQjtBQUN0QjtBQUNIOztBQUVERixJQUFBQSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0JDLElBQWhCLEdBQXVCRixPQUFPLENBQUNFLElBQS9CO0FBQ0FGLElBQUFBLE9BQU8sQ0FBQ0UsSUFBUixHQUFlLElBQWY7QUFFSCxHQVREO0FBV0g7O0FBRUQsU0FBU0MsWUFBVCxHQUF3QjtBQUVwQmpCLEVBQUFBLGdFQUFZLENBQUMsVUFBRCxDQUFaLENBQXlCUyxPQUF6QixDQUFpQyxVQUFDSyxPQUFELEVBQWE7QUFFMUMsUUFBSSxDQUFDQSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0JDLElBQXJCLEVBQTJCO0FBQ3ZCO0FBQ0g7O0FBRURGLElBQUFBLE9BQU8sQ0FBQ0UsSUFBUixHQUFlRixPQUFPLENBQUNDLE9BQVIsQ0FBZ0JDLElBQWhCLEtBQXlCLE1BQXhDO0FBQ0EsV0FBT0YsT0FBTyxDQUFDQyxPQUFSLENBQWdCQyxJQUF2QjtBQUVILEdBVEQ7QUFXSDs7QUFFRCxJQUFNRSxVQUFVLEdBQUdiLE1BQU0sQ0FBQ2MsVUFBUCxDQUFrQixPQUFsQixDQUFuQjtBQUNBRCxVQUFVLENBQUNFLGdCQUFYLENBQTRCLFFBQTVCLEVBQXNDLGdCQUFpQjtBQUFBLE1BQWRDLE9BQWMsUUFBZEEsT0FBYzs7QUFFbkQsTUFBSUEsT0FBSixFQUFhO0FBQ1RSLElBQUFBLGNBQWM7QUFDakIsR0FGRCxNQUVPO0FBQ0hJLElBQUFBLFlBQVk7QUFDZjtBQUVKLENBUkQ7O0FBVUEsSUFBSUMsVUFBVSxDQUFDRyxPQUFmLEVBQXdCO0FBQ3BCUixFQUFBQSxjQUFjO0FBQ2pCOztBQUVEUixNQUFNLENBQUNlLGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDUCxjQUF2QztBQUNBUixNQUFNLENBQUNlLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDSCxZQUF0QyxFLENBRUE7O0FBQ0FsQiw2REFBUyxDQUFDLGNBQUQsQ0FBVCxDQUEwQnFCLGdCQUExQixDQUEyQyxRQUEzQyxFQUFxRCxVQUFDRSxDQUFELEVBQU87QUFDeERBLEVBQUFBLENBQUMsQ0FBQ0MsY0FBRjtBQUNBbEIsRUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1Qk4sbUVBQWUsQ0FBQyxnQkFBRCxDQUFmLENBQWtDdUIsS0FBekQ7QUFDSCxDQUhEO0FBSUF2QixtRUFBZSxDQUFDLGdCQUFELENBQWYsQ0FBa0NtQixnQkFBbEMsQ0FBbUQsUUFBbkQsRUFBNkQsaUJBQWdCO0FBQUEsTUFBYkssTUFBYSxTQUFiQSxNQUFhO0FBQ3pFQSxFQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWUMsYUFBWjtBQUNILENBRkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9zaGVldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlhbG9nIGZyb20gXCIuL2NsYXNzZXMvRGlhbG9nLmpzXCI7XG5pbXBvcnQge1xuICAgIGxvb2t1cCxcbiAgICBsb29rdXBPbmUsXG4gICAgbG9va3VwQ2FjaGVkLFxuICAgIGxvb2t1cE9uZUNhY2hlZFxufSBmcm9tIFwiLi91dGlscy9lbGVtZW50cy5qc1wiO1xuaW1wb3J0IFFSQ29kZSBmcm9tIFwiLi9saWIvcXJjb2RlLXN2Zy5qc1wiO1xuXG4vLyBHZW5lcmF0ZSB0aGUgUVIgY29kZS5cbmxvb2t1cE9uZShcIiNxci1jb2RlXCIpLmFwcGVuZChRUkNvZGUoe1xuICAgIG1zZzogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgZWNsOiBcIkxcIlxufSkpO1xuXG4vLyBBY3RpdmF0ZSB0aGUgZGlhbG9ncy5cbmxvb2t1cChcIltkYXRhLWRpYWxvZ11cIikuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgIHRyaWdnZXIuZGlhbG9nID0gRGlhbG9nLmNyZWF0ZUZyb21UcmlnZ2VyKHRyaWdnZXIpO1xufSk7XG5cbi8vIEZvcmNlIHRoZSBkZXRhaWxzIHRvIGJlIG9wZW4gd2hlbiBwcmludGluZy5cbmZ1bmN0aW9uIG9wZW5BbGxEZXRhaWxzKCkge1xuXG4gICAgbG9va3VwQ2FjaGVkKFwiLmRldGFpbHNcIikuZm9yRWFjaCgoZGV0YWlscykgPT4ge1xuXG4gICAgICAgIGlmIChkZXRhaWxzLmRhdGFzZXQub3Blbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWlscy5kYXRhc2V0Lm9wZW4gPSBkZXRhaWxzLm9wZW47XG4gICAgICAgIGRldGFpbHMub3BlbiA9IHRydWU7XG5cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBjbG9zZURldGFpbHMoKSB7XG5cbiAgICBsb29rdXBDYWNoZWQoXCIuZGV0YWlsc1wiKS5mb3JFYWNoKChkZXRhaWxzKSA9PiB7XG5cbiAgICAgICAgaWYgKCFkZXRhaWxzLmRhdGFzZXQub3Blbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWlscy5vcGVuID0gZGV0YWlscy5kYXRhc2V0Lm9wZW4gPT09IFwidHJ1ZVwiO1xuICAgICAgICBkZWxldGUgZGV0YWlscy5kYXRhc2V0Lm9wZW47XG5cbiAgICB9KTtcblxufVxuXG5jb25zdCBwcmludFF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoXCJwcmludFwiKTtcbnByaW50UXVlcnkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoeyBtYXRjaGVzIH0pID0+IHtcblxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIG9wZW5BbGxEZXRhaWxzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2VEZXRhaWxzKCk7XG4gICAgfVxuXG59KTtcblxuaWYgKHByaW50UXVlcnkubWF0Y2hlcykge1xuICAgIG9wZW5BbGxEZXRhaWxzKCk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JlcHJpbnRcIiwgb3BlbkFsbERldGFpbHMpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhZnRlcnByaW50XCIsIGNsb3NlRGV0YWlscyk7XG5cbi8vIENoYW5nZSBMYW5ndWFnZS5cbmxvb2t1cE9uZShcIiNsb2NhbGUtZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbG9va3VwT25lQ2FjaGVkKFwiI3NlbGVjdC1sb2NhbGVcIikudmFsdWU7XG59KTtcbmxvb2t1cE9uZUNhY2hlZChcIiNzZWxlY3QtbG9jYWxlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICB0YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG59KTtcbiJdLCJuYW1lcyI6WyJEaWFsb2ciLCJsb29rdXAiLCJsb29rdXBPbmUiLCJsb29rdXBDYWNoZWQiLCJsb29rdXBPbmVDYWNoZWQiLCJRUkNvZGUiLCJhcHBlbmQiLCJtc2ciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJlY2wiLCJmb3JFYWNoIiwidHJpZ2dlciIsImRpYWxvZyIsImNyZWF0ZUZyb21UcmlnZ2VyIiwib3BlbkFsbERldGFpbHMiLCJkZXRhaWxzIiwiZGF0YXNldCIsIm9wZW4iLCJjbG9zZURldGFpbHMiLCJwcmludFF1ZXJ5IiwibWF0Y2hNZWRpYSIsImFkZEV2ZW50TGlzdGVuZXIiLCJtYXRjaGVzIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJ0YXJnZXQiLCJmb3JtIiwicmVxdWVzdFN1Ym1pdCJdLCJzb3VyY2VSb290IjoiIn0=