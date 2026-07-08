
export const cancelable = (fn) => {
	let callId = 0

	return (...args) => {
		const thisCall = ++callId

		return new Promise((resolve, reject) => {
			fn(...args)
				.then((val) => {
					if (thisCall === callId) resolve(val) // only last call resolves
				})
				.catch((err) => {
					if (thisCall === callId) reject(err) // only last call rejects on real error
				})
		})
	}
}