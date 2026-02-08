# &lt;form-validation /&gt;

For validations and masks. It's a `<form />` element child.

[Example on StackBlitz](https://stackblitz.com/edit/jails-form-validation?file=index.ts)

---

##### Model
The local component state to be used on html template

```ts
form: {
  errors:  {}, // A set of errors of each field: e.g form.errors.username : 'Username is required'
  values:  {}, // A set of values of each field: e.g form.values.username : 'John Doe'
  touched: {}, // A set of touched fields : e.g form.touched.username : true | false 
  focused: {}, // A set of focused fields: e.g form.focused.username: true | false
  isValid: false // The state of the <form-validation> : true | false
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
import * as formValidation from 'jails.stdlib/form-validation'
import * as entities from './my-entities'

jails.register('form-validation', formValidation, { ...entities })
jails.start()
```

**IMPORTANT:** You have to provide a configuration file with your own set of validations and masks. Explained later.

##### index.html

```html
<form novalidate>
    
    <form-validation>
        
        <div class="form-group">
          <label>Username*</label>
          <input type="text" name="username" data-validation="required" html-value="form.values.username" />
          <p html-if="form.errors.username" html-inner="form.errors.username"></p>
        </div>

        <div class="form-group">
          <label>Email*</label>
          <input type="email" name="email" data-validation="required email" html-value="form.values.email" />
          <p html-if="form.errors.email" html-inner="form.errors.email"></p>
        </div>

        <div class="form-group">
          <label>Age</label>
          <input type="text" name="age" data-mask="age" html-value="form.values.age" />
        </div>

        <button type="submit">Send</button>

    </form-validation>

</form>
```

##### my-custom-rules/index.ts
You need to provide a map of entities that will be used to validate the kind of your form fields.
They all need to implement: `validate()`, `message()`. Optional: `mask()`.

##### Example

```ts
import * as formValidation from 'jails.stdlib/form-validation'
import { email, number, required } from './my-entities'

jails.register('form-validation', formValidation, { email, number, required })
jails.start()
```

**./my-entities.ts**

```ts
export const email = {
    validate( value, input, form ) {
       if (!value) return true
       if (!value.match(/(.*)@(.*)\.\w{2,}/)) return false
       return true
    },
    mask() {
        // I don't have a mask
    },
    message( value, input, form ) {
        return `Invalid Email`
    }
}

export const required = {
    validate(value, input, form) {
        if (!value) return false
        return true 
    },
    mask(value, input, form) {
        // I don't have a mask
    },
    message(value, input, form) {
        return `This field is required`
    }
}

export const number = {
    validate(value, input, form) {
        if (value.match(/\D/g)) return false
        return true 
    },
    mask(value, input, form) {
        return value.replace(/\D/, '')
    },
    message() {
       return `This field accepts only number` 
    }
}
```


##### element.setValues(...data)

If you want to set programatically values to the fields, you just have to get the node of `form-validation` element and use the public method `setValues()` passing data with `name` and `value` pairs.


```ts
export default function myComponent({ main, elm }) {

    const formValidation = elm.querySelector('form-validation') 

    main(() => {
        formValidation.setValues({
            'username': 'John Doe',
            'age': '41'
        })
    })
}
```