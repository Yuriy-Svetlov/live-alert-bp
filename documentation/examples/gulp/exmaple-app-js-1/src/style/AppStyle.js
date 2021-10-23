import index from './../../build/style/css/index.css';

function style(){
	//====================
	// AppRoot style
	//====================
	var obj = document.createElement('style');
	obj.innerHTML = 
	index + " "; 
	document.getElementsByTagName('head')[0].appendChild(obj);    
	//====================	
}

export default style();