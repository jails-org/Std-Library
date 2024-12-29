export const importHtml = ( url:string, config: RequestInit = null ) => {
	return fetch( url, config )
		.then( response => response.text().then( html => ({ response, html  })) )
}