
import { Idiomorph } from 'idiomorph/dist/idiomorph.esm'

export const Outlet = ({ target: outlet }) => {

	preserveScriptsAndCss()

	const originalHead   = document.head.cloneNode(true)
	const originalOutlet = outlet.innerHTML

	return {

		renderJS( name, path? ) {
			
			if( !path && !name ) {
				const selector = 'script[name="outlet-script"]' 
				outlet.innerHTML = originalOutlet
				document.head.querySelector(selector).remove()
				return Promise.resolve() 
			}
			
			outlet.innerHTML = `<${name}></${name}>`

			return new Promise((resolve, reject) => {
				const script = document.createElement('script')
				script.setAttribute('name', 'outlet-script')
				script.src = path
				script.onload = resolve
				script.onerror = reject
				document.head.appendChild(script)
			})
			.catch(err => {
				throw 'TypeError: Failed to fetch'
			})
		},

		render( path? ) {

			if( !path ) {
				Idiomorph.morph( document.head, originalHead )
				outlet.innerHTML = originalOutlet
				return Promise.resolve(outlet)
			}

			return fetch( path )
				.then( res => res.text() )
				.then( html => {
					const promises 	= []
					const url 		= new URL( path )
					const parser 	= new DOMParser()
					const doc 		= parser.parseFromString( html, 'text/html' )
					const content 	= doc.documentElement.querySelector('body')
					const all 		= content.querySelectorAll('script, link, style')
					const head 		= doc.documentElement.querySelector('head')
					
					all.forEach( node => { head.appendChild(node) })

					Idiomorph.morph( document.head, head, {
						callbacks: { 
							beforeNodeAdded: onBeforeNodeAdded( promises, url ) 
						}
					})

					return new Promise((resolve) => {
						outlet.innerHTML = content?.innerHTML
						Promise.allSettled(promises).then(() => resolve(outlet))
					})
				})

				.catch( err => {
					throw err 
				})
		}
	}
}

const preserveScriptsAndCss = () => {
	document.head
		.querySelectorAll('script, link, style')
		.forEach( element => element.setAttribute('im-preserve', 'true') )
}

const onBeforeNodeAdded = (promises, url) => (node) => {
	
	if( node.src && node.getAttribute('src').startsWith('/') ) {
		const { pathname, search } = new URL(node.src)
		node.src = url.origin + pathname + search
	} else if( node.href && node.getAttribute('href').startsWith('/') ) {
		const { pathname, search } = new URL(node.href)
		node.href = url.origin + pathname + search	
	}

	if( node.src && node.localName == 'script' ) {
		promises.push( new Promise((resolve, reject) => {
			node.addEventListener('load', resolve)
			node.addEventListener('error', reject)
		}))
	}

	return promises
}