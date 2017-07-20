# stylex
Reactive CSS library. Globally configure "virtual CSS variables" and update styles in real time.

## Getting Started
```bash
npm install stylex-lib
```

## API Reference
```js
// Sets or updates a variable class
set(key, prop, value, [done])

/* Arguments
 * key - Name of the variable/css class.
 * prop - Name of the css property. Can be hyphenated or camel cased.
 * value - The value to set the property to.
 * done - (optional) Callback to be executed after update has been applied.
 */


// Sets or updates a variable class
set(key, props, [done])

/* Arguments
 * key - Name of the variable/css class.
 * props - JS object with key/value pairs of properties and values. Keys can be hyphenated or camel cased.
 * done - (optional) Callback to be executed after update has been applied.
 */


// Returns the (cached) style object for the specified variable
get(key)

/* Arguments
 * key - Name of the variable/css class.
 */


// Returns the (cached) value of a property for the specified variable
get(key, prop)

/* Arguments
 * key - Name of the variable/css class.
 * prop - (optional) Name of the css property. Can be hyphenated or camel cased.
 */


// Converts camel cased strings to hypenated strings
hyphenate(str)

/* Arguments
 * str - The string to be converted.
 */
```

## Example Usage
```html
<!DOCTYPE html>
<html>
<head>
  <style>
  .my-button {
    display: inline-block;
    padding: 10px 16px;
    font-family: sans-serif;
    font-size: 14px;
    background-color: #355C7D;
    border-radius: 3px;
    transition: background-color 250ms ease-in-out;
  }
  </style>

  <script src="https://unpkg.com/stylex-lib@1.0.2"></script>
  <script>
  const stylex = new Stylex()

  let curColor = 0
  const colors = ['#6C5B7B', '#C06C84', '#F67280']

  stylex.set('button', {
    color: 'white',
    backgroundColor: '#355C7D'
  })

  setInterval(() => {
    const color = colors[curColor]
    curColor = (curColor+1) % colors.length
    stylex.set('button', 'backgroundColor', color, () => {
      console.log(color)
    })
  }, 1000)
  </script>
</head>
<body>
  <div class="my-button var--button">My Button</div>
</body>
</html>
```

