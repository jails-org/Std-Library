
export const querystring = () => {
	const params = new URLSearchParams( location.search )
	const obj = {}
	for(const [ key, value] of params ) {
		obj[key] = value
	}
	return obj
}