import AppElement from './../../classes/app/AppElement'
import tempDashboard  from './../../../build/templates/components/approot/Dashboard.html';
import { 
	LinearProgress__onClick,
} from './../../action/components/approot/Dashboard'

const elRoot = 'Dashboard';

class Dashboard extends AppElement{

	constructor(data) {
		super(data);
		this.data = data;
	}

	static getRoot(){
		return document.getElementById(elRoot);
	}

	static getLinearProgress(){
		return super.getElementID('Dashboard__linear_progress');
	}
	
	afterRender(){
		LinearProgress__onClick();
	}

	render(){
		return super.r(() => {
			return tempDashboard({});
		});	
	} 

	renderAsync($obj){
		super.r(() => {
			$obj.innerHTML = tempDashboard({});
		}, $obj, elRoot);	
	}
}


export default Dashboard;
