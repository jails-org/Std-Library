
export const querystring = ( variable ) => {
	const params = new URLSearchParams( location.search )
	return params.get( variable )
}