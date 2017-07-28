'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stylex = function () {
  function Stylex() {
    _classCallCheck(this, Stylex);

    this.ruleIndex = 0;

    var styleTag = document.createElement('style');

    styleTag.appendChild(document.createTextNode(''));
    styleTag.setAttribute('rel', 'stylesheet');
    styleTag.setAttribute('type', 'text/css');
    styleTag.setAttribute('id', 'styleVars');

    document.head.appendChild(styleTag);

    this.el = styleTag;
    this.sheet = styleTag.sheet;

    this.rules = {};
  }

  _createClass(Stylex, [{
    key: 'set',
    value: function set(key, prop, value, done) {
      var rules = this.rules,
          sheet = this.sheet,
          hyphenate = this.hyphenate;

      // Get or create rule

      var newRule = false;
      var rule = rules[key];
      if (!rule) {
        newRule = true;
        rule = { index: this.ruleIndex++ };
      }

      // Assign properties and values to the rule
      if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
        for (var p in prop) {
          rule[hyphenate(p)] = prop[p];
        }
        done = value;
      } else {
        prop = hyphenate(prop);
        rule[prop] = value;
      }

      // Update the cached rule
      rules[key] = rule;

      // Build an array of css strings for the sheet api
      var styles = [];
      for (var _p in rule) {
        var v = rule[_p];
        styles.push(_p + ':' + v);
      }

      // Delete to avoid conflicting styles
      if (!newRule) {
        sheet.deleteRule(rule.index);
      }
      sheet.insertRule('.var--' + key + ' { ' + styles.join(';') + ' }', rule.index);

      if (done) {
        done(key, rule);
      }
    }
  }, {
    key: 'get',
    value: function get(key, prop) {
      var rules = this.rules,
          hyphenate = this.hyphenate;


      var rule = rules[key];
      if (!rule) {
        return null;
      }

      prop = hyphenate(prop);

      return prop ? rule[prop] || null : rule;
    }
  }, {
    key: 'hyphenate',
    value: function hyphenate(str) {
      return str.split(/(?=[A-Z])/).join('-').toLowerCase();
    }
  }]);

  return Stylex;
}();

if (typeof module !== 'undefined') {
  module.exports = Stylex;
}
