function cambiarEstilo(){
	var mensaje = document.getElementById("mensaje");
	var claseActual = mensaje.getAttribute("class");
	var claseFinal = claseActual;
	if(claseActual == "estilo1"){
		claseFinal = "estilo2";
	}else if(claseActual == "estilo2"){
		claseFinal = "estilo1";
	}
	mensaje.setAttribute("class",claseFinal);
}