# stylex
Reactive CSS library. Globally configure "virtual CSS variables" and update styles in real time.

```js
/*
 * Example usage
 */
 
import Stylex from 'stylex'

const stylex = new Stylex()

const colors = ['#6C5B7B', '#C06C84', '#F67280']
let curColor = 0

stylex.set('button', {
  color: 'white',
  backgroundColor: '#355C7D'
})
  
setInterval(() => {
	const color = colors[curColor]
	curColor = (curColor+1) % colors.length
  stylex.set('button', 'backgroundColor', color, () => {
  	//console.log(color)
  })
}, 1000)
```
