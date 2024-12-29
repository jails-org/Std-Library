
## isVisible
```ts 
isVisible( target: HTMLElement, { root = null, rootMargin :'0px', threshold: 0 }?: IntersectionObserverOptions )
```

A simple version of Intersection Observer API, that only handles the case where the callback is fired once for a specific `HTMLElement`. 
It also wraps it in `Promise` so it can be used with `await` for more convinience.


### Usage

```js
import { isVisible } from 'jails.std/is-visible'

async function main () {

  const element = document.querySelector('#target')
  await isVisible( element )

  console.log('Element is visible!')
}

```
