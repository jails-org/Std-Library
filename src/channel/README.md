# channel

```ts 
Channel({
  target?: Window | HTMLIFrameElement,
  accept?: string[],
  origin?: string
}) 
```


# 📬 Channel API Documentation

The `channel` utility provides a lightweight, secure interface for sending and receiving messages between windows or iframes using `postMessage`.

---

## ✅ Features

* Easy dispatch and subscription to custom message actions.
* Secure origin validation.
* Works with iframes or separate window contexts.

---

## 🧪 Usage

### Parent Page

```ts
import { Channel } from 'jails.stdlib/channel'

const channel = Channel({
  target: document.getElementById('myIframe'), // <iframe id="myIframe" />
  accept: ['*']         // Allowed origins
})

// Send message to iframe
channel.send('hello', { user: 'Alice' })

// Add more listeners later
channel.on('hi', (data) => {
  console.log('Iframe said hi!', data)
})
```

### Iframe Page

```ts
const channel = Channel({
  target: window.parent,
  accept: ['*']
})
```

---

## 🧹 API

### `Channel(options)`

Creates a new Channel instance.

#### Options:

| Option    | Type                          | Description                             |
| --------- | ----------------------------- | --------------------------------------- |
| `target`  | `Window \| HTMLIFrameElement` | Target to send messages to              |
| `accept`  | `string[]`                    | Allowed origins (`['*']` to accept all) |
| `origin`  | `string`                      | The origin used when sending messages, `default`: location.origin |

---

### `.emit(event: string, payload?: any)`

Sends a message to the target window.

```ts
channel.emit('say:hi', { name: 'Bob' })
```

---

### `.on(event: string, callback: function )`

Listen to an event from the target window.

```ts
channel.on('logout', () => console.log('Logging out...'))
```

---

## 🔒 Security Notes

* Always **specify allowed origins** in `accept` to avoid cross-site scripting risks.
* Avoid using `'*'` unless absolutely necessary (e.g., during development).
