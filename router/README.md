# router

Grapnel, the smallest Javascript router with named parameters.

- Information & Docs : [Grapnel](https://github.com/baseprime/grapnel)


```ts 
Router( options?:GrapnelOptions ) : GrapnelInstance
```

## Usage

```js
import Router from 'jails.pandora/router'

const router = new Router()

// http://localhost:3000/#/home
// http://localhost:3000/#/about

router.get('/', (page) => console.log(page))

```
