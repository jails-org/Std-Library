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
	const { validations, masks } = dependencies
	const form = elm.querySelector('input,select,textarea')?.form
	let fields = getFields(form)

	main((_) => {
		on('input', 'input, textarea, select', update)
		on('input', DMASK, handleMask)
		on('focus', DVALIDATION, touch)
		on('input', DVALIDATION, validate('input'))
		on('change', DVALIDATION, validate('change'))
		on('blur', DVALIDATION, validate('blur'))

		form.addEventListener('reset', reset)
		form.addEventListener('submit', onsubmit)

		initialValues()
	})

	const initialValues = () => {
		if (!validations) {
			throw new Error(
				'<form-validation> - No validations provided in dependencies'
			)
		}
		const fields = getInitialValues()
		state.set((s) => (s.form.fields = fields))
	}

	const getInitialValues = () => {
		const fields_ = {}
		fields.forEach((name) => (fields_[name] = ''))
		return fields_
	}

	const validate = (type) => (e) => {
		const input = e.target
		const name = input.name
		const value = getValueOfField(input, form)
		const validationList = input.dataset.validation.split(/\s/)
		const errorsList = []
		const currentState = state.get()

		validationList.forEach((validation) => {
			if (validation in validations) {
				const { ok, message } = validations[validation](
					value,
					input,
					form
				)
				if (!ok) {
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
		state.set((s) => (s.form.fields[name] = value))
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
			if (mask && mask in masks) {
				const fn = masks[mask]
				value = fn(value, e.target, e.target.form)
			}
		})

		state.set((s) => (s.form.fields[e.target.name] = value || ''))
	}

	const touch = (e) => {
		state.set((s) => (s.form.touched[e.target.name] = true))
	}

	const reset = () => {
		fields = getFields(form)
		state.set({
			form: {
				...model.form,
				fields: getInitialValues(),
			},
		})
	}
}

export const model = {
	form: {
		errors: {},
		fields: {},
		touched: {},
		isValid: false,
	},
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
		.filter((field) => field.name)
		.forEach((field) => list.add(field.name))
	return list
}
