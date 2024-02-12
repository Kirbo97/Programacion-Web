function validarFormulario(){
	var cedula 		= document.getElementById("cedula").value;
	var nombres 	= document.getElementById("nombres").value;
	var apellidos 	= document.getElementById("apellidos").value;
	var edad 		= document.getElementById("edad").value;
	if(cedula == "" || nombres == "" || apellidos == "" || edad == ""){
		alert("Formulario incompleto");
	}else{
		ingresarPersona(cedula,nombres,apellidos,edad);
	}
	return false;
}

function ingresarPersona(cedula,nombres,apellidos,edad){
	var url = "ctrl_persona.php?op=ingresar&cedula="+cedula+"&nombres="+nombres+"&apellidos="+apellidos+"&edad="+edad;
	var ai 	= new AJAXInteraction(url,mostrarResultado,"XML");
	ai.doGet();
}

function mostrarResultado(respuesta){
	var resultado = respuesta.getElementsByTagName("estado")[0].firstChild.nodeValue;
	var mensaje = respuesta.getElementsByTagName("mensaje")[0].firstChild.nodeValue;
	if(resultado=="true"){
		alert(mensaje);
		document.frmIngresoPersona.reset();
		document.frmIngresoPersona.cedula.focus();
		consultarPersonas();
	}else{
		alert(mensaje);
	}
}

function consultarPersonas(){
	//var url = "personas.xml";
	//var url = "consultar_personas.php"
	var tipo = document.getElementById("tipo").value;
	var descripcion = document.getElementById("descripcion").value;
	var url = "ctrl_persona.php?op=consultar&tipo="+tipo+"&descripcion="+descripcion;
	var ai 	= new AJAXInteraction(url,mostrarPersonas,"XML");
	ai.doGet();
	return false;
}

function mostrarPersonas(respuesta){
	var resultado = document.getElementById("resultado");
	//var personas = respuesta.getElementsByTagName("persona");
	var personas = respuesta.getElementsByTagName("registro");

	var html = '<table border="1" id="tabla1"><caption>Listado de Personas</caption><thead><tr><th width="10%">C&eacute;dula</th><th width="35%">Nombres</th><th width="35%">Apellidos</th><th width="10%">Edad</th><th width="10%"></th></tr></thead><tbody>';
	for (var i = 0; i < personas.length; i++) {
		var persona = personas[i];
		var campos = persona.childNodes;
		var cedula = campos[0].firstChild.nodeValue;
		var nombres = campos[1].firstChild.nodeValue;
		var apellidos = campos[2].firstChild.nodeValue;
		var edad = campos[3].firstChild.nodeValue;
		
		if(i%2==0){
			html +=  "<tr>";
		}else{
			html +=  "<tr  class='odd'>";
		}
		html +=  "<td>"+cedula+"</td><td id='"+cedula+"_nombres'>"+nombres+"</td><td id='"+cedula+"_apellidos'>"+apellidos+"</td><td id='"+cedula+"_edad'>"+edad+"</td><td id='"+cedula+"_iconos'><img class='icono' src='img/editar.png' onclick='edicionPersona(\""+cedula+"\",true)' />&nbsp;&nbsp;<img class='icono' src='img/eliminar.png' onclick='eliminarPersona(\""+cedula+"\")' /></td></tr>";		
		
	}	
	html += "<tfoot><tr><td colspan='5'>Total registros: "+personas.length+"</td></tr></tfoot>";
	html +="</table>";
	resultado.innerHTML = html;
}

function edicionPersona(id,activar){
	var td_nombres 		= document.getElementById(id+"_nombres");
	var td_apellidos 	= document.getElementById(id+"_apellidos");
	var td_edad 		= document.getElementById(id+"_edad");
	var td_iconos 		= document.getElementById(id+"_iconos");
	
	if(activar){
		var nombres 	= td_nombres.firstChild.nodeValue;
		var apellidos 	= td_apellidos.firstChild.nodeValue;
		var edad 		= td_edad.firstChild.nodeValue;
		td_nombres.setAttribute("value",nombres);
		td_apellidos.setAttribute("value",apellidos);
		td_edad.setAttribute("value",edad);
		limpiarContenidoColumnas(td_nombres,td_apellidos,td_edad);	
		mostrarInput(td_nombres,nombres,'20%',id+"_txt_nombres");
		mostrarInput(td_apellidos,apellidos,'20%',id+"_txt_apellidos");
		mostrarInput(td_edad,edad,'3%',id+"_txt_edad");
		mostrarIconos(td_iconos,id,"edicion");		
	}else{
		var nombres 	= td_nombres.getAttribute("value");
		var apellidos 	= td_apellidos.getAttribute("value");
		var edad 		= td_edad.getAttribute("value");
		td_nombres.innerHTML = nombres;
		td_apellidos.innerHTML = apellidos;
		td_edad.innerHTML = edad;
		mostrarIconos(td_iconos,id,"mantenimiento");
	}

}

function limpiarContenidoColumnas(td_nombres,td_apellidos,td_edad){
	td_nombres.innerHTML = "";
	td_apellidos.innerHTML = "";
	td_edad.innerHTML = "";	
}

function mostrarInput(td,valor,ancho,id){
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.setAttribute("value",valor);
	txt.setAttribute("size",ancho);
	txt.setAttribute("id",id);
	td.appendChild(txt);
}

function mostrarIconos(td,id,tipo){
	if(tipo=="edicion")
		td.innerHTML = "<img class='icono' src='img/guardar.png' onclick='editarPersona(&#39;"+id+"&#39;)' />&nbsp;&nbsp;<img class='icono' src='img/cancelar.png' onclick='edicionPersona(\""+id+"\",false)' />";
	else if(tipo=="mantenimiento")
		td.innerHTML = "<img class='icono' src='img/editar.png' onclick='edicionPersona(&#39;"+id+"&#39;,true)' />&nbsp;&nbsp;<img class='icono' src='img/eliminar.png' onclick='eliminarPersona(\""+id+"\")'/>";
}

function editarPersona(id){
	var nombres = document.getElementById(id+"_txt_nombres").value;
	var apellidos = document.getElementById(id+"_txt_apellidos").value;
	var edad = document.getElementById(id+"_txt_edad").value;
	var url = "ctrl_persona.php?op=editar&nombres="+nombres+"&apellidos="+apellidos+"&edad="+edad+"&cedula="+id;
	var ai = new AJAXInteraction(url,mostrarResultado,"XML");
	ai.doGet();
}

function eliminarPersona(id){
	if(confirm("Desea eliminar el registro?")){
		var url = "ctrl_persona.php?op=eliminar&cedula="+id;
		var ai = new AJAXInteraction(url,mostrarResultado,"XML");
		ai.doGet();
	}
}


