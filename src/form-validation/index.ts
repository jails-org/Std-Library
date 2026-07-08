const NAME = 'form-validation'
const DVALIDATION = `[data-validation]`
const DMASK = '[data-mask]'

export default function formValidation({
	main,
	elm,
	state,
	on,
	emit,
	dependencies,
	trigger,
}) {
	//
	const { ...entities } = dependencies
	const form = elm.querySelector('input,select,textarea')?.form
	let fields = getFields(form)

	main((_) => {
		on('input', 'input, textarea, select', update)
		on('input', DMASK, handleMask)
		on('input', DVALIDATION, validate('input'))
		on('change', DVALIDATION, validate('change'))
		on('blur', DVALIDATION, validate('blur'))
		on('focus', 'input, textarea, select', onfocus)
		on('blur', 'input, textarea, select', onblur)

		form.addEventListener('reset', reset)
		form.addEventListener('submit', onsubmit)

		initialValues()
	})

	elm.setValues = ( values ) => {
		state.set(s => (s.form.values = { ...s.form.values, ...values }))
	}

	const initialValues = () => {
		if (!entities) {
			throw new Error(
				'<form-validation> - No entities provided in dependencies'
			)
		}
		const fields = getInitialValues()
		state.set((s) => (s.form.values = fields))
	}

	const getInitialValues = () => {
		const fields_ = {}
		fields.forEach((name:string) => (fields_[name] = ''))
		return fields_
	}

	const onfocus = (e) => {
		const name = e.target.name
		state.set((s) => {
			s.form.touched[name] = true
			s.form.focused[name] = true
		})
	}

	const onblur = (e) => {
		const name = e.target.name
		state.set((s) => {
			s.form.focused[name] = false
		})
	}

	const validate = (type) => (e) => {
		const input = e.target
		const name = input.name
		const value = getValueOfField(input, form)
		const validationList = input.dataset.validation.split(/\s/)
		const errorsList = []
		const currentState = state.get()

		validationList.forEach((validation) => {
			if (validation in entities) {
				const entity = entities[validation]
				const ok = entity.validate( value, input, form )
				if (!ok) {
					const message = entity.message( value, input, form)
					errorsList.push(message)
				}
			}
		})

		if (errorsList.length) {
			if (type === 'input') {
				fields.add(input.name)
				state.set((s) => {
					s.form.isValid = false
					if (
						currentState.form.errors[name] &&
						errorsList[0] != currentState.form.errors[name]
					) {
						s.form.errors[name] = errorsList[0]
					}
				})
			} else if (type === 'blur' || type === 'change') {
				fields.add(input.name)
				state.set((s) => {
					s.form.errors[name] = errorsList[0]
					s.form.isValid = false
				})
			}
		} else {
			fields.delete(input.name)
			state.set((s) => {
				delete s.form.errors[name]
				if (!fields.size) {
					s.form.isValid = true
				}
			})
		}
	}

	const update = (e) => {
		const { name } = e.target
		const value = getValueOfField(e.target, form)
		state.set((s) => (s.form.values[name] = value))
	}

	const onsubmit = (e) => {
		e.preventDefault()
		trigger('blur', DVALIDATION)

		const data = state.get()
		const errors = data.form.errors
		const hasErrors = Object.keys(errors).length

		if (!hasErrors) {
			const data = serialize(e.target)
			emit(`${NAME}:submit`, { ...data })
		} else {
			emit(`${NAME}:error`, { errors })
		}
	}

	const handleMask = (e) => {
		let value = e.target.value
		const { mask } = e.target.dataset
		const allMasks = mask.split(/s/)

		allMasks.forEach((mask) => {
			if (entities[mask] && entities[mask].mask) {
				const fn = entities[mask].mask
				value = fn(value, e.target, e.target.form)
			}
		})

		state.set((s) => (s.form.values[e.target.name] = value || ''))
	}

	const reset = () => {
		fields = getFields(form)
		state.set({
			form: {
				...model.form,
				values: getInitialValues()
			}
		})
	}
}

export const model = {
	form: {
		errors: {},
		values: {},
		touched: {},
		isValid: false,
		focused: {}
	}
}

const serialize = (form) => {
	const formData = new FormData(form)
	const data = {}
	for (let [key, value] of formData) {
		data[key] = value
	}
	return { formData, data }
}

const getValueOfField = (field, form) => {
	const { name, type } = field
	if (type == 'checkbox') {
		return field.checked ? field.value : ''
	} else {
		return form[name].value
	}
}

const getFields = (form) => {
	const list = new Set()
	Array.from(form.elements)
		.filter((field:any) => field.name && field.dataset.validation)
		.forEach((field:any) => list.add(field.name))
	return list
}
