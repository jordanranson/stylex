# stylex
Reactive CSS library. Globally configure "virtual CSS variables" and update styles in real time.

### Example Usage
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

  <script src="https://unpkg.com/stylex-lib@1.0.0"></script>
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
