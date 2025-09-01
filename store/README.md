# store

Oni, A state machine Store that ressembles Redux but simpler.
Documentation: [Oni](https://github.com/Javiani/Oni)

```ts
Store( initialState: Object , actions: Object )
```


## Usage

```js
import { Store } from 'jails.std/store'

const initialState = {
    loading: false,
    items: []
}

export const store = Store(initialState, {
    FETCH: (state, payload, { dispatch }) => {
        
        fetch('/some/async/service')
            .then( data => dispatch('LOADED', { data }))

        // Update only the desired property
        return {
            loading: true
        }
    },

    LOADED: (state, { data }) => {
        return {
            items: data,
            loading: false
        }
    }
})
```
