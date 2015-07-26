/**
 * [Please add a description.]
 */

"use strict";

exports.__esModule = true;
// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Binding = (function () {
  function Binding(_ref) {
    var existing = _ref.existing;
    var identifier = _ref.identifier;
    var scope = _ref.scope;
    var path = _ref.path;
    var kind = _ref.kind;

    _classCallCheck(this, Binding);

    this.constantViolations = [];
    this.constant = true;

    this.identifier = identifier;
    this.references = 0;
    this.referenced = false;

    this.scope = scope;
    this.path = path;
    this.kind = kind;

    this.hasValue = false;
    this.hasDeoptedValue = false;
    this.value = null;

    this.clearValue();

    if (existing) {
      this.constantViolations = [].concat(existing.path, existing.constantViolations, this.constantViolations);
    }
  }

  /**
   * [Please add a description.]
   */

  Binding.prototype.deoptValue = function deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.setValue = function setValue(value) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value = value;
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.clearValue = function clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue = false;
    this.value = null;
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.reassign = function reassign(path) {
    this.constant = false;
    this.constantViolations.push(path);
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.reference = function reference() {
    this.referenced = true;
    this.references++;
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.dereference = function dereference() {
    this.references--;
    this.referenced = !!this.references;
  };

  /**
   * [Please add a description.]
   */

  Binding.prototype.isCompatibleWithType = function isCompatibleWithType() {
    return false;
  };

  return Binding;
})();

exports["default"] = Binding;
module.exports = exports["default"];