'use strict';

import Dashboard from './../../../components/approot/Dashboard'
import AppRoot from './../../../components/AppRoot'
import { 
  create as createLinearProgress,
} from './LinearProgress'

export function LinearProgress__onClick(){
  Dashboard.getLinearProgress().onclick = function () {
	  createLinearProgress();
  }
}

var el;

export function create(data = {}, update = false){
  if(update !== true || el === undefined){
    el = new Dashboard(data);
    el.renderAsync(AppRoot.getContainer()); 
  }else{
    if(AppRoot.getRoot() === null){
      return false;
    }
    el.update_elements_init(data);  
  }
}
