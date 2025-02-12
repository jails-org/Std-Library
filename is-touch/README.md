
# isTouch
```ts 
isTouch() : boolean
```

A simple version to detect if device has touch. It checks if it has `touchstart` in window.

### Usage

```js
import { isTouch } from 'jails.std/is-touch'

async function main () {
  console.log( isTouch() ) // true if there's touchstart on window, or false otherwise.
}

```
