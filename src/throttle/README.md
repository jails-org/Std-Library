## throttle
```ts 
throttle( fn: Function, timeInterval? = 100 )
```

Limits a function's execution to at most once per specified time interval.


### Usage

```js
import { throttle } from 'jails.stdlib/throttle'

const onscroll = throttle(() => {
  console.log('throttling scroll')
})

window.addEventListener('scroll', onscroll)

```

