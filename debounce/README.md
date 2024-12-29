
# debounce
```ts 
debounce( fn: Function, timeInterval? = 250 )
```

Delays a function's execution until after a specified pause in activity.


### Usage

```js
import { debounce } from 'jails.std/debounce'

const oninput = debounce(() => {
  console.log('debouncing input')
})

input.addEventListener('oninput', oninput)

```
