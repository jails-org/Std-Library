# mfe

```ts 
mfe ({ timeout?= 5000 } = {}): MFEInstance
```

A package to embed an external front-end application into the current application. 

If resources failed to load, promise is rejected after **timeout** milisseconds.

### Usage

It can embed a full html, css, js from an external url.

```ts 

import { mfe } from 'jails.stdlib/mfe'

function main () {

  const microfrontend = mfe()
  const target = document.querySelector('#target')

  microfrontend
    .render( helloworld, 'http://localhost:4000' )
    .then(( target ) => console.log(target, 'is ready'))
    .catch( err => console.error(err) )
}
```

**Important** : Loading html files externally means that you will face some issues with C.O.R.S, so be aware of that.

It can also embed a single page app from a external `.js` file. 

```ts 

import { mfe } from 'jails.stdlib/mfe'

function main () {

  const microfrontend = mfe()
  const target = document.querySelector('#target')

  microfrontend.renderJS({
    target: test,
    tag   : 'my-component', // <my-component></my-component> your external js should mount in this custom element.
    src   : 'http://localhost:8000/test.js'
  })
    .then(( target ) => console.log(target, 'is ready'))
    .catch( err => console.error(err) )
}
```

### Shell()
You might need to share data from your shell to your microfrontends.
Instead of doing that manually by using a global variable, you can use `Shell()` function to create 
a channel where you can communicate your shell with your MFE's.

Example:

#### On shell

`main.ts`

```ts
import { Shell } from 'jails.stdlib/mfe'

export const shell = Shell({
  somevariable,
  someFunction, 
  someInstance,
  ...etc
})

```

#### On MFE

`main.ts`

```ts 
import { Shell } from 'jails.stdlib/mfe'

export const shell = Shell({
  somevariable,
  somefunction
})
```

You have to guarantee that you'll provide the MFE dependencies on your Shell aswell.