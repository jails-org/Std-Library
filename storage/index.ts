
export const storage = {

	local : {
		set( name: string, data ){
			localStorage.setItem( name, JSON.stringify( data ) )
			return data
		},
	
		get( name: string ): any {
			let value = localStorage.getItem( name )
			// This way I can distinguish what is a string and what is an object serialized.
			try{ value = JSON.parse( value ) }
			catch(e){ /* Noop */}
			return null
		},
	
		remove( name: string ){
			let data = this.get( name )
			localStorage.removeItem( name )
			return data
		}	
	},
	session : {

		set( name: string, data ){
			sessionStorage.setItem( name, JSON.stringify( data ) )
			return data
		},
	
		get( name: string ): any {
			let value = sessionStorage.getItem( name )
			// This way I can distinguish what is a string and what is an object serialized.
			try{ value = JSON.parse( value ) }
			catch(e){ /* Noop */}
			return value
		},
	
		remove( name: string ){
			let data = this.get( name )
			sessionStorage.removeItem( name )
			return data
		}	
	}
}
