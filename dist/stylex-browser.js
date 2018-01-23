'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Stylex = function () {
  function Stylex() {
    _classCallCheck(this, Stylex);

    this.ruleIndex = 0;
    this.rules = {};

    var isClient = typeof window !== 'undefined';
    this.isClient = isClient;

    if (isClient) {
      var styleTag = document.getElementById('styleVars');

      if (styleTag === null) {
        styleTag = document.createElement('style');

        styleTag.appendChild(document.createTextNode(''));
        styleTag.setAttribute('rel', 'stylesheet');
        styleTag.setAttribute('type', 'text/css');
        styleTag.setAttribute('id', 'styleVars');

        document.head.appendChild(styleTag);
      }

      this.el = styleTag;
      this.sheet = styleTag.sheet;
    }
  }

  _createClass(Stylex, [{
    key: 'set',
    value: function set(varname, props, value, important) {
      var hyphenate = this.hyphenate;


      var newRules = {};

      if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) === 'object') {
        for (var key in props) {
          if (_typeof(props[key]) === 'object') {
            if (typeof props[key].value === 'undefined') {
              // This is a nested child
              if (typeof newRules[varname + key] === 'undefined') {
                newRules[varname + key] = {};
              }
              for (var j in props[key]) {
                if (_typeof(props[key][j]) === 'object') {
                  // This is a style schema
                  var _value = props[key][j].value + (props[key][j].important ? ' !important' : '');
                  newRules[varname + key][hyphenate(j)] = _value;
                } else {
                  // This is a k/v pair
                  newRules[varname + key][hyphenate(j)] = props[key][j];
                }
              }
            } else {
              // This is a style schema
              if (typeof newRules[varname] === 'undefined') {
                newRules[varname] = {};
              }
              var _value2 = props[key].value + (props[key].important ? ' !important' : '');
              newRules[varname][hyphenate(key)] = _value2;
            }
          } else {
            // This is a k/v pair
            if (typeof newRules[varname] === 'undefined') {
              newRules[varname] = {};
            }
            newRules[varname][hyphenate(key)] = props[key];
          }
        }
      } else {
        newRules[varname] = {};
        newRules[varname][hyphenate(props)] = value + (important ? ' !important' : '');
      }

      for (var _key in newRules) {
        this._setRule(_key, newRules[_key]);
      }

      return {
        then: function then(cb) {
          setTimeout(cb, 0);
        }
      };
    }
  }, {
    key: '_setRule',
    value: function _setRule(key, props) {
      var rules = this.rules,
          sheet = this.sheet,
          isClient = this.isClient;


      if (typeof rules[key] === 'undefined') {
        rules[key] = { index: this.ruleIndex++, props: {} };
      } else {
        if (isClient) sheet.deleteRule(rules[key].index);
      }

      var styles = [];
      for (var k in props) {
        var v = props[k];
        styles.push(k + ':' + v);
      }

      rules[key].props = props;
      if (isClient) sheet.insertRule('.var--' + key + ' { ' + styles.join(';') + ' }', rules[key].index);
    }
  }, {
    key: 'hyphenate',
    value: function hyphenate(str) {
      return str.split(/(?=[A-Z])/).join('-').toLowerCase();
    } 
  }]);

  return Stylex;
}();
