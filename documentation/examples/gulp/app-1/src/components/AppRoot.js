import AppElement from './../classes/app/AppElement'
import tempAppRoot  from './../../build/templates/components/AppRoot.html';
import compDashboard from './approot/Dashboard.js';
import {
	resize,
} from './../styles/js/panel'

const elRoot = 'AppRoot';

class AppRoot extends AppElement{

	constructor(data) {
		super(data);

		this.data = data;
		this.components = {};				
	}

	static getRoot(){
		return document.getElementById(elRoot);
	}

	static getContainer(){
		return document.getElementById('AppRoot__container');
	}

	static getLinearProgress(){
		return super.getElementID('AppRoot__linear_progress');
	}

	beforeRender(){
		this.components.Dashboard = new compDashboard(this.data);
	}

	afterRender(){
		resize();
	}

	render($obj){
		super.r(() => {
			const data = {};
			data.components = {};
			data.components.Dashboard = this.components.Dashboard.render();

			$obj.innerHTML = tempAppRoot(data);
		}, $obj, elRoot);	
	}
}

export default AppRoot;
