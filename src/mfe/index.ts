declare const window: any

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
				script.onerror = (e:Event) => reject({
					type: 'error',
					message: `[mfe] - ${e.type} loading script`
				})
				document.head.appendChild(script)
			})
		},

		async render( target: any, uri: string ) {

			if( !target ) {
				return new Promise((resolve, reject) => {
					throw {
						type: 'not-found',
						data: { target, path: uri },
						message: '[mfe] - Target not found'
					}
				})
			}

			if( !cache[uri] ) {
				
				cache[uri] 			= []
				const html 	 		= await fetch( uri ).then( res => res.text() )
				const parser	 	= new DOMParser()
				const doc 	 		= parser.parseFromString( html, 'text/html' )
				const assets 		= doc.querySelectorAll( 'link[rel="stylesheet"], style' )
				const scripts 		= doc.querySelectorAll( 'script' )
				const url 	 		= new URL( uri )
				const promises: any = []
		
				assets.forEach((asset: any) => {
					
					switch( asset.localName ) {
						
						case 'link':
		
							const link = document.createElement( 'link' )
							
							link.setAttribute( 'rel', 'stylesheet' )
							link.setAttribute( 'href',  new URL( asset.getAttribute( 'href' ) || '', url ).href )
							
							promises.push( new Promise((resolve, reject) => {
								link.onload = () => resolve( true )
								link.onerror = () => reject( new Error( `Failed to load ${link.href}` ))	
							}))
							
							document.head.appendChild( link )
		
						break
		
						case 'style': 
		
							const style = document.createElement( 'style' )
							style.innerHTML = asset.innerHTML
							document.head.appendChild( style )
		
						break
					}
		
				})
		
				const promiseScripts = []
		
				scripts.forEach( script => {
					promiseScripts.push(() => {
						return new Promise((resolve, reject) => {
							const s = document.createElement('script')
				
							// Copy attributes
							for (const attr of script.attributes) {
								s.setAttribute(attr.name, attr.value)
							}
				
							if( script.text ) {
								s.text = script.text 
								document.head.appendChild(s)
								resolve(script)
								return 
							}
							
							if( script.src ) {
								s.setAttribute( 'src',  new URL( script.getAttribute( 'src' ) || '', url ).href )
								s.onload = resolve 
								s.onerror = reject
								document.head.appendChild(s)
							}
						})
					})
				})
		
				return new Promise((resolve) => {
					Promise.allSettled( promises )
						.then(() => target.innerHTML = doc.body.innerHTML )
						.then(() => runSequentially(promiseScripts))
						.then(() => setTimeout(resolve, 1000))
						.then(() => cache[uri].forEach(({target}) => target.innerHTML = doc.body.innerHTML))
				})
			} else {
				cache[uri].push({ target })
			}
		}
	}
}

export const Shell = ( config = {} ) => {
	
	if( !window.___Shell___ ) {
		window.___Shell___ = { ...config }
		return window.___Shell___
	} else {
		window.___Shell___ = { ...config, ...window.___Shell___ }
		return window.___Shell___
	}
}

const runSequentially = async ( promiseFactories ) => {
	const results = []
	for (const factory of promiseFactories) {
		const result = await factory()
		results.push(result)
	}
	return results
}