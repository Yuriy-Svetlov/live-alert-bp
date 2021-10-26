import sass from './../../build/styles/css/index.css';

(function css(){
  let obj = document.createElement('style');
  
  obj.innerHTML = sass + " "; 
  document.getElementsByTagName('head')[0].appendChild(obj);    
})();

