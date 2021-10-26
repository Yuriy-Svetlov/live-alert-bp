/* ================================= */
/*  Panel model 1.0 */
/* ================================= */ 

export function resize(){
  setMeasureLoginPanel(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, document.getElementById("conteiner-2"), document.getElementById("conteiner-1"));

  window.addEventListener("resize", function(){
    setMeasureLoginPanel(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, document.getElementById("conteiner-2"), document.getElementById("conteiner-1"));
  });
}


export function refresh(){
  setMeasureLoginPanel(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, document.getElementById("conteiner-2"), document.getElementById("conteiner-1"));
}


function setMeasureLoginPanel(height_win, $conteiner_2, $conteiner_1){
  if(height_win >= $conteiner_2.offsetHeight + 10){
    $conteiner_2.style.marginTop = "-"+$conteiner_2.offsetHeight / 2+"px";

    $conteiner_1.style.position = "absolute";
    $conteiner_1.style.height = "0px";
    $conteiner_1.style.padding = "0px";

    document.getElementById("background__").style.height = "100%";
  }else{
    $conteiner_2.style.marginTop = "0px";

    $conteiner_1.style.position = "relative";
    $conteiner_1.style.height = "auto";
    $conteiner_1.style.padding = "10px";

    document.getElementById("background__").style.height = document.body.scrollHeight+"px";
  }   

  setTimeout(function(){ 
    $conteiner_1.style.opacity = '1.0';
  }, 10);
}
