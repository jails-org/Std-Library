declare const window: any

export const Shell = (dependencies) => {

	return window.___Shell___ = {
		...dependencies,
		...window.___Shell___
	}
}

export const mfe = ({ timeout =  5000 } = {}) => {
	
	const cache = {}
 
	return {

		renderJS({ target, tag, src }) {
	
			target.innerHTML = `<${tag}></${tag}>`

			return new Promise((resolve, reject) => {
				const script = document.createElement('script')
				script.src = src 
				script.async = true 
				script.onload = () => resolve( target )
				script.onerror = (e) => reject({
					type: 'error',
					message: `[mfe] - ${e.type} loading script`
				})
				document.head.appendChild(script)
			})
		},

		render( target, path ) {

			return fetch( path )
				.then( res => res.text() )
				.then( html => {

					const promises 	= []
					const url 		= new URL( path )
					const parser 	= new DOMParser()
					const doc 		= parser.parseFromString( html, 'text/html' )
					const content 	= doc.documentElement.querySelector('body')
					
					if( !cache[path] ) {
						const all  = content.querySelectorAll('script, link[rel="stylesheet"], style')
						const head = doc.documentElement.querySelector('head')
						
						all.forEach( node => { head.appendChild(node) })

						head.querySelectorAll('link[rel="stylesheet"], style, script')
							.forEach( node => {
								if( node.localName == 'script' && node.src ) {
									const script = document.createElement('script')
									script.setAttribute('type', 'module')
									script.setAttribute('src', node.getAttribute('src'))
									baseUrls( script, url, promises, timeout )
									document.head.appendChild(script)
								} else {
									baseUrls( node, url, promises, timeout )
									document.head.appendChild(node)
								}
							})

						cache[ path ] = promises
					}
					
					return new Promise((resolve, reject) => {
						Promise.all( cache[path] )
							.then(() => {
								target.innerHTML = content?.innerHTML
								resolve(target)
							})
							.catch(err => {
								reject({
									type: 'error',
									message: '[mfe] - Unexpected error : ' + err
								})
							})
					})
				})

				.catch( err => {
					throw err 
				})
		}
	}
}

const baseUrls = ( node, url, promises, timeout ) => {

	if( node.src && node.getAttribute('src').startsWith('/') ) {
		const { pathname, search } = new URL(node.src)
		node.src = url.origin + pathname + search
	} else if( node.href && node.getAttribute('href').startsWith('/') ) {
		const { pathname, search } = new URL(node.href)
		node.href = url.origin + pathname + search
	}

	if( node.src || (node.href && node.rel == 'stylesheet') ) {
		
		promises.push( new Promise((resolve, reject) => {
			
			const clock = setTimeout(() => {
				reject({
					type: 'error',
					message: `[mfe] - Timeout exceeded ${node} resolving after milisseconds.`
				})
			}, timeout)
	
			node.addEventListener('load', () => {
				clearTimeout(clock)
				resolve(node)
			})
	
			node.addEventListener('error', () => {
				clearTimeout(clock)
				reject({
					type: 'error',
					message: `[mfe] - Error to fetch : ${ node.src }`
				})
			})
		}))
	}
	
	return promises
}