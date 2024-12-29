
export const isVisible = ( target:HTMLElement, { root = null, rootMargin = '0px', threshold = 0 }: Options = {} as Options) => {
	return new Promise((resolve, reject) => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach( entry => {
				if( entry.isIntersecting ) {
					resolve(entries)
					observer.unobserve( target)
				}
			})
		}, { root, rootMargin, threshold })
		observer.observe( target )
	})
}

type Options = {
	root?: HTMLElement
	rootMargin?: string 
	threshold?: number
}