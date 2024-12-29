export const importHtml = ( url, config = null ) => {
	return fetch( url, config )
		.then( response => response.text().then( html => ({ response, html  })) )
}
