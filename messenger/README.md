# messenger

```ts 
messenger({
  target?: Window | HTMLIFrameElement,
  accept?: string[],
  actions?: Record<string, (payload: any) => void>,
  origin?: string
}) 
```
# 📬 Messenger API Documentation

The `messenger` utility provides a lightweight, secure interface for sending and receiving messages between windows or iframes using `postMessage`.

---

## ✅ Features

* Easy dispatch and subscription to custom message actions.
* Secure origin validation.
* Works with iframes or separate window contexts.
* Extensible via `subscribe`.

---

## 🧪 Usage

### Parent Page

```ts
import { messenger } from 'jails.std/messenger'

const msg = messenger({
  target: document.getElementById('myIframe'), // <iframe id="myIframe" />
  accept: ['https://child-app.com'],           // Allowed origins
  actions: {
    reply(data) {
      console.log('Received from iframe:', data)
    }
  }
})

// Send message to iframe
msg.dispatch('init', { user: 'Alice' })

// Add more listeners later
msg.subscribe({
  status: (msg) => console.log('Status update:', msg)
})
```

### Iframe Page

```ts
const msg = messenger({
  target: window.parent,
  accept: ['https://parent-app.com'],
  actions: {
    init(data){
      console.log('Init from parent:', data)
      msg.dispatch('reply', { received: true })
    }
  }
})
```

---

## 🧹 API

### `messenger(options)`

Creates a new Messenger instance.

#### Options:

| Option    | Type                          | Description                             |
| --------- | ----------------------------- | --------------------------------------- |
| `target`  | `Window \| HTMLIFrameElement` | Target to send messages to              |
| `accept`  | `string[]`                    | Allowed origins (`['*']` to accept all) |
| `actions` | `Record<string, Function>`    | Message handlers keyed by action name   |
| `origin`  | `string`                      | The origin used when sending messages   |

---

### `.dispatch(action: string, payload?: any)`

Sends a message to the target window.

```ts
msg.dispatch('sayHello', { name: 'Bob' })
```

---

### `.subscribe(newActions: Record<string, Function>)`

Adds more actions to the messenger at runtime.

```ts
msg.subscribe({ logout: () => console.log('Logging out...') })
```

---

## 🔒 Security Notes

* Always **specify allowed origins** in `accept` to avoid cross-site scripting risks.
* Avoid using `'*'` unless absolutely necessary (e.g., during development).
