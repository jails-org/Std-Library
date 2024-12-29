# &lt;form-validation /&gt;

For validations and masks. It's a `<form />` element child.

[Example on StackBlitz](https://stackblitz.com/edit/jails-form-validation?file=index.ts)

---

##### Model
```ts
form: {
  errors: {},
  fields: {},
  touched: {},
  isValid: false
}
```

##### Events

###### `form-validation:submit`
Fired when form is **valid**, provides a `formData` instance of input values and raw data with key and value pairs with names and values of form inputs.

```ts
on('form-validation:submit', ({ formData, data }) => {})
```

##### `form-validation:error` 
Fired when form is **invalid**, provides a map with errors fields.

```ts
on('form-validation:error', ({ errors }) => {})
```

---


### Usage


##### main.ts
```ts
import * as formValidation from 'jails.pandora/form-validation'
import rules from './my-custom-rules'

jails.register('form-validation', formValidation, { ...rules })
jails.start()
```

**IMPORTANT:** You have to provide a configuration file with your own set of validations and masks. Explained later.

##### index.html

```html
<form novalidate>
    
    <form-validation>
        
        <div class="form-group">
          <label>Username*</label>
          <input type="text" name="username" data-validation="required" html-value="form.fields.username" />
          <p html-if="form.errors.username" html-inner="form.errors.username"></p>
        </div>

        <div class="form-group">
          <label>Email*</label>
          <input type="email" name="email" data-validation="required email" html-value="form.fields.email" />
          <p html-if="form.errors.email" html-inner="form.errors.email"></p>
        </div>

        <div class="form-group">
          <label>Age</label>
          <input type="text" name="age" data-mask="age" html-value="form.fields.age" />
        </div>

        <button type="submit">Send</button>

    </form-validation>

</form>
```

##### my-custom-rules/index.ts
```ts
export default {
    
    validations : {
        
        required(value, input, form) {
            if (!value) return { ok: false, message: 'This field is required'}
            return { ok: true }
        },
    
        email(value, input, form) {
            if (!value) return { ok: true }
            if (!value.match(/(.*)@(.*)\.\w{2,}/)) return { ok: false, message: 'Invalid email' }
            return { ok: true }
        },
    
        number(value, input, form) {
            if (value.match(/\D/g)) return { ok: false, message:'This field takes only number' }
            return { ok: true }
        }
    },

    masks: {
        number(value, input, form) {
            return value.replace(/\D/, '')
        }
    }
}
```
 
To see how to inject this dependency, go back to the [usage](#usage) section.