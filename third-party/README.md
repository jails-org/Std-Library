# third-party

```ts 
thirdParty( name: string ): Promise<HTMLScriptElement>
```

A package that has some utilities functions to manage third-party cdn scripts like: **analytics**, **appDynamics**, etc.
Enables the developer to run third-party scripts at a convenient time, integrating those scripts into the app flow.

<br />

### Usage
Set your third-party snippet anywhere in your Layout our html page. 
That code will not be executed on page load due to its `type="text/third-party"` property.

```html
<script data-name="analytics" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX" type="text/third-party">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXX');
</script> 
```
<br />
<br />

The `thirdParty` will execute the text script code and then will load the cdn library if there's any `src` property setted.
This way you can have the control of third party code execution and when it should be executed inside your application flow.

```js
import { thirdParty } from 'jails.stdlib/third-party'

export const analytics = thirdParty('analytics')

function main() {

 analytics.then(() => {
    // Now you know that window.dataLayer is available
    console.log( window.dataLayer )
  })
}
```

The string arguments have to match with the `data-name` attribute in the `script` tag. That way you can have many other third-party scripts and reference each of them separately.