
export const throttle = (fn:Function, wait:number = 100) => {
	let time = Date.now()
	return (...args) => {
		if ((time + wait - Date.now()) < 0) {
			fn(...args)
			time = Date.now()
		}
	}
}