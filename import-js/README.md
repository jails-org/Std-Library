
# importJs
```ts 
importJs( url: string, options? = { async = true } ) : Promise<Event>
```

Returns a promise when script is loaded


### Usage 

```ts 
import { importJs } from 'jails.stdlib/import-js'

importJs('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js')
  .then( (event) => {
    console.log(event, 'swiper js loaded') 
  })
  .catch( (event) => { 
    console.error(event, 'error on loading swiper js') 
  })
```
