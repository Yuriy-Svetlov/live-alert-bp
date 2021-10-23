import AppElement from './../classes/app/AppElement'
import tempAppRoot  from './../../build/templates/AppRoot.html';

const elRoot = 'AppRoot';

class AppRoot extends AppElement{


	constructor(data) {
		super(data);

		this.data = data;				
	}


	static getElement(){
		return super.getElementID('element_root', elRoot);
	}


	static getLinearProgress(){
		return super.getElementID('linear_progress', 'AppRoot__linear_progress');
	}


	beforeRender(){
		
	}


	afterRender(){
		
	}


	render($obj){
		super.r(() => {
			//------------------------
			const app = {};
			app.components = {};

			$obj.innerHTML = tempAppRoot(app);
			//------------------------
		}, $obj, el_root);	
	} 

}

export default AppRoot;

