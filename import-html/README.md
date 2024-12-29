
# importHtml
```ts 
importHtml( url: string, options?: fetchOptions ) : Promise<Response, string>
```

Returns a promise when Html is loaded. It accepts options from `fetch` api.

### Usage 

```ts 
import { importHtml } from 'jails.std/import-html'

importHtml('https://html-mock.fly.dev/tag/table?class=table%20table-bordered')
  .then( ({ response: Response, html: string }) => {
    console.log({ response, html })
  })
```
