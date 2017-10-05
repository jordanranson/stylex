class Stylex {
  constructor () {
    this.ruleIndex = 0
    this.rules = {}

    const isClient = typeof window !== 'undefined'
    this.isClient = isClient

    if (isClient) {
      let styleTag = document.getElementById('styleVars')

      if (styleTag === null) {
        styleTag = document.createElement('style')

        styleTag.appendChild(document.createTextNode(''))
        styleTag.setAttribute('rel', 'stylesheet')
        styleTag.setAttribute('type', 'text/css')
        styleTag.setAttribute('id', 'styleVars')

        document.head.appendChild(styleTag)
      }

      this.el = styleTag
      this.sheet = styleTag.sheet
    }
  }

  set (varname, props, value, important) {
    const { hyphenate } = this

    const newRules = {}

    if (typeof props === 'object') {
      for (let key in props) {
        if (typeof props[key] === 'object') {
          if (typeof props[key].value === 'undefined') {
            // This is a nested child
            if (typeof newRules[varname + key] === 'undefined') {
              newRules[varname + key] = {}
            }
            for (let j in props[key]) {
              if (typeof props[key][j] === 'object') {
                // This is a style schema
                const value = props[key][j].value + (props[key][j].important ? ' !important' : '')
                newRules[varname + key][hyphenate(j)] = value
              } else {
                // This is a k/v pair
                newRules[varname + key][hyphenate(j)] = props[key][j]
              }
            }
          } else {
            // This is a style schema
            if (typeof newRules[varname] === 'undefined') {
              newRules[varname] = {}
            }
            const value = props[key].value + (props[key].important ? ' !important' : '')
            newRules[varname][hyphenate(key)] = value
          }
        } else {
          // This is a k/v pair
          if (typeof newRules[varname] === 'undefined') {
            newRules[varname] = {}
          }
          newRules[varname][hyphenate(key)] = props[key]
        }
      }
    } else {
      newRules[varname] = {}
      newRules[varname][hyphenate(props)] = value + (important ? ' !important' : '')
    }

    for (let key in newRules) {
      this._setRule(key, newRules[key])
    }

    return {
      then (cb) {
        setTimeout(cb, 0)
      }
    }
  }

  _setRule (key, props) {
    const { rules, sheet, isClient } = this

    if (typeof rules[key] === 'undefined') {
      rules[key] = { index: this.ruleIndex++, props: {} }
    } else {
      if (isClient) sheet.deleteRule(rules[key].index)
    }

    const styles = []
    for (let k in props) {
      const v = props[k]
      styles.push(`${k}:${v}`)
    }

    rules[key].props = props
    if (isClient) sheet.insertRule(`.var--${key} { ${styles.join(';')} }`, rules[key].index)
  }

  hyphenate (str) {
    return str.split(/(?=[A-Z])/).join('-').toLowerCase()
  }
}

if (typeof exports !== 'undefined') {
  exports.default = Stylex
} else {
  window.Stylex = Stylex
}
