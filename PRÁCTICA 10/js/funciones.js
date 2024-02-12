function validarUsuario(){
	var usuario = document.getElementById("usuario").value;
	var url = "validarUsuario.php?usuario="+usuario;
	var ai = new AJAXInteraction(url,mostrarResultado,'TEXT');
	ai.doGet();
}

function mostrarResultado(respuesta){
	var resultado = document.getElementById("resultado");
	if(respuesta=="1"){
		resultado.innerHTML = "<span style='color:green'>Usuario correcto</span>";
	}else{
		resultado.innerHTML = "<span style='color:red'>Usuario incorrecto</span>";
	}

}