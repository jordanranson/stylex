class Stylex {
  constructor () {
    this.ruleIndex = 0

    const styleTag = document.createElement('style')

    styleTag.appendChild(document.createTextNode(''))
    styleTag.setAttribute('rel', 'stylesheet')
    styleTag.setAttribute('type', 'text/css')
    styleTag.setAttribute('id', 'styleVars')

    document.head.appendChild(styleTag)

    this.el = styleTag
    this.sheet = styleTag.sheet

    this.rules = {}
  }

  set (key, prop, value, done) {
    const { rules, sheet, hyphenate } = this

    // Get or create rule
    let newRule = false
    let rule = rules[key]
    if (!rule) {
      newRule = true
      rule = { index: this.ruleIndex++ }
    }

    // Assign properties and values to the rule
    if (typeof prop === 'object') {
      for (let p in prop) {
        rule[hyphenate(p)] = prop[p]
      }
      done = value
    } else {
      prop = hyphenate(prop)
      rule[prop] = value
    }

    // Update the cached rule
    rules[key] = rule

    // Build an array of css strings for the sheet api
    const styles = []
    for (let p in rule) {
      const v = rule[p]
      styles.push(`${p}:${v}`)
    }

    // Delete to avoid conflicting styles
    if (!newRule) {
      sheet.deleteRule(rule.index)
    }
    sheet.insertRule(`.var--${key} { ${styles.join(';')} }`, rule.index)

    if (done) {
      done(key, rule)
    }
  }

  get (key, prop) {
    const { rules, hyphenate } = this

    const rule = rules[key]
    if (!rule) {
      return null
    }

    prop = hyphenate(prop)

    return prop
      ? (rule[prop] || null)
      : rule
  }

  hyphenate (str) {
    return str.split(/(?=[A-Z])/).join('-').toLowerCase()
  }
}

if (typeof module !== 'undefined') {
  module.exports = Stylex
}
