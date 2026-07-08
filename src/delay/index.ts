
export const delay = ( milisseconds:number = 100 ) => ( data? ) : any => {
	return new Promise((resolve) => {
		setTimeout(() => resolve( data ), milisseconds )
	})
}