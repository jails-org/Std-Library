## querystring
```ts 
querystring( variable: string ) : string
```

Returns a query string value.


### Usage

```js
import { querystring } from 'jails.stdlib/querystring'

// https://my-awesome-site.com?search=david
const { search } = querystring()
console.log( search ) // 'david'

```

