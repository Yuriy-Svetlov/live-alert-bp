
var arr_base = {};
var child_classes = [];

class App{
	constructor() {
		this.registerClass(this);
	}

	registerClass(classes){
		child_classes.push(classes);
	}

	static getBaseMap(){
		return arr_base;
	}

}
export default App;



export function render(classRoot, elementRoot){

	arr_base["elementRoot"] = elementRoot;


	let cl =  new classRoot();

	// Before render
	beforeRender();

	elementRoot.insertAdjacentHTML('beforeend', cl.render());

	// After render
	afterRender();
}


export function beforeRender(){
	for (let i = child_classes.length - 1; i >= 0; i--) {
		if(typeof child_classes[i].beforeRender === 'function'){
			child_classes[i].beforeRender();
		}
	}
}


export function afterRender(){
	for (let i = child_classes.length - 1; i >= 0; i--) {
		if(typeof child_classes[i].afterRender === 'function'){
			child_classes[i].afterRender();
		}
	}
}

