
export const delay = ( milisseconds:number = 100 ) => ( data? ) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve( data ), milisseconds )
	})
}