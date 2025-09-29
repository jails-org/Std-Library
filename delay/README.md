## delay
```ts 
delay( milliseconds? = 100 ) => ( data: any? ) : Promise<any>
```

Delays the next `.then` promise chain.

### Usage

```js
import { delay } from 'jails.stdlib/delay'

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then( response => response.json() )
  .then( delay(2000) )
  .then( data => console.log( data ) )
```