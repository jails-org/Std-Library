# router

```ts 
Router( options?:GrapnelOptions ) : GrapnelInstance
```

Grapnel, the smallest Javascript router with named parameters.

Documentation : https://github.com/baseprime/grapnel

## Usage

```js
import { Router } from 'jails.stdlib/router'

const router = new Router()

// http://localhost:3000/#/home
// http://localhost:3000/#/about

router.get('/', (page) => console.log(page))

```
