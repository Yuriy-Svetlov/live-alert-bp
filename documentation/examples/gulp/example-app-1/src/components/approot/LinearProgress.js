import AppElement from './../../classes/app/AppElement'
import tempLinearProgress from './../../../build/templates/components/approot/LinearProgress.html';
import { 
	start__onClick,
	stop__onClick,
	back__onClick,
} from './../../action/components/approot/LinearProgress'

const elRoot = 'LinearProgress';

class LinearProgress extends AppElement{

	constructor(data) {
		super(data);
		this.data = data;
	}

	static getRoot(){
		return super.getElementID(elRoot);
	}

	static getStart(){
		return super.getElementID('LinearProgress__start');
	}

	static getStop(){
		return super.getElementID('LinearProgress__stop');
	}

	static getBack(){
		return super.getElementID('LinearProgress__back');
	}
	
	afterRender(){
		start__onClick();
	    stop__onClick();
	    back__onClick();		
	}

	renderAsync($obj){
		super.r(() => {
			$obj.innerHTML = tempLinearProgress({});
		}, $obj, elRoot);	
	}
}


export default LinearProgress;
