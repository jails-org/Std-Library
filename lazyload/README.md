# lazyload

```ts 
LazyLoad ( options: LazyLoadOptions ): LazyLoadInstance
```

A package to deal with lazy loading images.
It's in fact the [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload) library, so anything you need to know it's on their documentation.

### Usage

```ts 

import { Lazyload } from 'jails.std/lazyload'

function main () {

  document.addEventListener('DOMContentLoaded', () => {
    new Lazyload({
      elements_selector: 'img[data-src]'
    })  
  })
}
```

```html 
<img data-src="some/image/resource/image.png" alt="Some image" />
```