# outlet
```ts 
outlet( target: string ) : OutletInstance
```
Outlet allows you to render external pages within your application as if it were a SPA. It loads the HTML, JavaScript, and CSS of the target page into a designated DOM element of your choice.

---

## Markup
```html
<main data-outlet></main>
```

## .render
```ts 
render( url: string ) : Promise<target: HTMLElement>
```

```ts
import { Oultet } from 'jails.stdlib/outlet'

const target = document.querySelector('[data-outlet]')
const outlet = Outlet({ target })

outlet.render('http://localhost:3001/') // Renders html, css and javascript from a application running on localhost:3001
outlet.render() // Renders the initial state from the page before rendering localhost:3001 and clear css, js and html loaded from the last 
```

## .renderJS
```ts 
renderJS( element: string, url: string ) : Promise<element: HTMLElement>
```

If you have a JavaScript-based SPA hosted at a URL—meaning the script is self-executing and handles rendering the HTML, CSS, and JavaScript functionalities—you can use the renderJS method.

This method requires a custom element, provided as a string in the first argument, and the second argument should be the URL of the hosted JavaScript file.

```ts
renderJS('my-component', 'http://localhost:8000/test.js')
```

In the example above, make sure your JavaScript initializes the application targeting the my-component element. This ensures a contract between your shell application and the remote application.


## Important
For the render version, you need to ensure that the target application has CORS enabled, as Outlet makes a fetch request to the target application behind the scenes to render its HTML within your current application.
