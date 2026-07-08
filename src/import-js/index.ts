
export const importJs = ( url:string, { async = true }: Options = {} as Options ) => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src = url
		script.async = async
		script.onload = resolve
		script.onerror = reject
		document.head.appendChild(script)
	})
}

type Options = {
	async?:true
}