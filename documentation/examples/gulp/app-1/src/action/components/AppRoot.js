'use strict';

import AppRoot from './../../components/AppRoot.js'

export function linearProgress($start){
  if($start){
    AppRoot.getLinearProgress().classList.add("linear_progress_line-start");
  }else{
	  AppRoot.getLinearProgress().classList.remove("linear_progress_line-start");
  }
}
