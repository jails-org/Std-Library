
export const importCss = ( url: string, options = null ) => {
	return new Promise((resolve, reject) => {
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = url 
		link.onload = resolve 
		link.onerror = reject
		document.head.appendChild(link)
	})
}