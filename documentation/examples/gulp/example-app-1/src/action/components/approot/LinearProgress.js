'use strict';

import LinearProgress from './../../../components/approot/LinearProgress'
import AppRoot from './../../../components/AppRoot';
import {
  linearProgress,
} from './../AppRoot'
import { 
  create as createDashboard,
} from './Dashboard'


export function start__onClick(){
  LinearProgress.getStart().onclick = function () {
	  linearProgress(true);
  }
}


export function stop__onClick(){
  LinearProgress.getStop().onclick = function () {
	  linearProgress(false);
  }
}


export function back__onClick(){
  LinearProgress.getBack().onclick = function () {
    createDashboard();
  }
}

var el;

export function create(data = {}, update = false){
  if(update !== true || el === undefined){
    el = new LinearProgress(data);
    el.renderAsync(AppRoot.getContainer()); 
  }else{
    if(AppRoot.getRoot() === null){
      return false;
    }
    el.update_elements_init(data);  
  }
}
