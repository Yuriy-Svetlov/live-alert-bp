
class AppElement{
	constructor() {
		init(this);

	}

	static beforeRender(this_, $obj, el_root){
		
		// Remove root contaner
		if($obj !== undefined){
			el_root = document.getElementById(el_root);
			if(el_root !== null){
				el_root.remove();
			}
		}		

		// Reset of variables
		this_.constructor.vars = {};

		// Storing all class data
		this_.constructor.classData = {};


		oneBeforeRender(this_);
		beforeRender(this_);
		AppElement.array_cllass.push(this_);	
	}


	static afterRender(){
		let local_array = AppElement.array_cllass;

		AppElement.array_cllass = [];

		for (var i = 0; i < local_array.length; i++) {
			oneAfterRender(local_array[i]);
			afterRender(local_array[i]);			
		}
	}


	r(fun, $obj, el_root){
		if(AppElement.array_cllass === undefined){
			AppElement.array_cllass = [];
		}

		//------------------------	
		AppElement.beforeRender(this, $obj, el_root);
		//------------------------


		if($obj !== undefined){
			fun();

			//---------------------------------
			// Set function [Updata render]
			//---------------------------------
			this.constructor.service.array_child_cllass = AppElement.array_cllass;
			this.update_elements_init = function(data){
				const array_cllass = this.constructor.service.array_child_cllass;
				for (var i = 0; i < array_cllass.length; i++) {

					if(typeof array_cllass[i].update === 'function'){
						array_cllass[i].update(data);		
					}		
				}	
			}
			//---------------------------------

			AppElement.afterRender();
		}else{
			return fun();
		}	
	} 


	static getElementID(id) {
		if(this.vars === undefined){
			return undefined;
		}

		if(this.vars[id] === undefined){
			this.vars[id] = document.getElementById(id);
			return this.vars[id];
		}	
		return this.vars[id];
	}


	static getElementClassName(variable, id) {
		if(this.vars[variable] === undefined){
			this.vars[variable] = document.getElementsByClassName(id);
			return this.vars[variable];
		}	
		return this.vars[variable];
	}

}

export default AppElement;


function init(this_) {
	if(!Object.prototype.hasOwnProperty.call(this_.constructor, 'service')){
	  this_.constructor.service = {};
	}

	if(!Object.prototype.hasOwnProperty.call(this_.constructor, 'vars')){
		this_.constructor.vars = {};
	}
}


function oneBeforeRender(this_) {
	if(this_.constructor.service.oneBeforeRender === undefined){
		this_.constructor.service.oneBeforeRender = true;

		if(typeof this_.oneBeforeRender === 'function'){
			this_.oneBeforeRender();
		}
	}			
}


function beforeRender(this_) {
	if(typeof this_.beforeRender === 'function'){
		this_.beforeRender();
	}			
}


function oneAfterRender(this_) {
	if(this_.constructor.service.oneAfterRender === undefined){
		this_.constructor.service.oneAfterRender = true;

		if(typeof this_.oneAfterRender === 'function'){
			this_.oneAfterRender();		
		}
	}			
}

function afterRender(this_) {
	if(typeof this_.afterRender === 'function'){
		this_.afterRender(this_);	
	}		
}
