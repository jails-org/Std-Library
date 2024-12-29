
# importCss
```ts 
importCss( url: string ) : Promise<Event>
```

Returns a promise when Css is loaded


### Usage 

```ts 
import { importCss } from 'jails.std/import-css'

importCss('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css')
  .then( (event) => {
    console.log(event, 'swiper css loaded') 
  })
  .catch( (event) => {
    console.error('error on loading swiper css') 
  })
```