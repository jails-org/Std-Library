
export const Channel = ({
	target  = null as any,  
	accept  = [] as any, 
	origin  = location.origin
}) => {

	const win = target?.contentWindow || target 
	const events = {}
	
	window.addEventListener('message', (e) => {
		if( accept.includes('*') || accept.includes(e.origin) ) {
			const { payload, event } = e.data 
			if( events[event] ) {
				events[event].apply(null, payload)
			}
		} else {
			throw {
				type	: 'ACCESS DENIED', 
				message	: 'Cant receive message from: ' + e.origin
			}
		}
	})

	return {

		on(name, callback) {
			events[name] = callback
		},

		emit(event, ...payload) {
			win.postMessage({ event, payload }, origin)
		},

		remove(name) {
			delete events[name]
		}
	}
}
