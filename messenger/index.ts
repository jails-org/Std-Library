
export const Messenger = ({ 
	
	target  = null as any,  
	accept  = [] as any, 
	actions = {} as any,
	origin  = location.origin

} = {}) => {

	const win = target?.contentWindow || target

	window.addEventListener('message', ( event ) => {

		if( accept.includes('*') || accept.includes(event.origin) ) {
			const { action, payload } = event.data 
			if( action in actions ) {
				actions[ action ]( payload as any )
			}
		} else {
			throw {
				type	: 'ACCESS DENIED', 
				message	: 'Cant receive message from: ' + event.origin
			}
		}
	})
	
	return {

		dispatch( action: string, payload?: any ) {
			win.postMessage({ action, payload }, origin)
		},

		subscribe( actions_: any ) {
			actions = { ...actions_, ...actions }
		}
	}
}