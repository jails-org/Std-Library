
# cancelable
```ts 
cancelable( fn: Function ) : Promise<any>
```

TIt ensures only the latest async call resolves, ignoring all previous ones, so `.then` runs only for the most recent success and `.catch` only for real errors.


### Usage

```js
import { cancelable } from 'jails.std/cancelable'

export const getService = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			Math.random() < 0.5
				? reject({ message: 'Got an error!' })
				: resolve({ message: 'Success!' })
		}, 5000)
	})
}

const cancelableGetService = cancelable(getService)

  cancelableGetService()
    .then((result) => console.log(result))
    .catch((err) => { console.log(err) })

  cancelableGetService()
    .then((result) => console.log(result))
    .catch((err) => { console.log(err) })

  cancelableGetService()
    .then((result) => console.log(result))
    .catch((err) => { console.log(err) })

```

Only the last `cancelableGetService()` callback will be called, ignoring the other calls.
