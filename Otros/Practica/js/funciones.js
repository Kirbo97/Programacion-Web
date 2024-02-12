function validarFormulario(){
	var usuario	= document.getElementById("usuario").value;
	var correo 	= document.getElementById("correo").value;
	var contraseña 	= document.getElementById("contraseña").value;
	if(usuario == "" || correo == "" || contraseña == ""){
		alert("Formulario incompleto");
	}else{
		ingresarPersona(usuario,correo,contraseña);
	}
	return false;
}

function ingresarPersona(usuario,correo,contraseña){
	var url = "ctrl_persona.php?op=ingresar&usuario="+usuario+"&correo="+correo+"&contraseña="+contraseña;
	var ai 	= new AJAXInteraction(url,mostrarResultado,"XML");
	ai.doGet();
}

function mostrarResultado(respuesta){
	var resultado = respuesta.getElementsByTagName("estado")[0].firstChild.nodeValue;
	var mensaje = respuesta.getElementsByTagName("mensaje")[0].firstChild.nodeValue;
	if(resultado=="true"){
		alert(mensaje);
		document.frmIngresoPersona.reset();
		document.frmIngresoPersona.usuario.focus();
		consultarPersonas();
	}else{
		alert(mensaje);
	}
}

function consultarPersonas(){
	var tipo = document.getElementById("tipo").value;
	var descripcion = document.getElementById("descripcion").value;
	var url = "ctrl_persona.php?op=consultar&tipo="+tipo+"&descripcion="+descripcion;
	var ai 	= new AJAXInteraction(url,mostrarPersonas,"XML");
	ai.doGet();
	return false;
}

function mostrarPersonas(respuesta){
	var resultado = document.getElementById("resultado");
	var personas = respuesta.getElementsByTagName("registro");

	var html = '<table border="1" id="tabla1"><caption>Listado de Usuarios Registrados</caption><thead><tr><th width="10%">Usuario</th><th width="35%">Correo</th><th width="35%">Contraseña</th><th width="10%"></th></tr></thead><tbody>';
	for (var i = 0; i < personas.length; i++) {
		var persona = personas[i];
		var campos = persona.childNodes;
		var usuario = campos[0].firstChild.nodeValue;
		var correo = campos[1].firstChild.nodeValue;
		var contraseña = campos[2].firstChild.nodeValue;
		
		if(i%2==0){
			html +=  "<tr>";
		}else{
			html +=  "<tr  class='odd'>";
		}
		html +=  "<td>"+usuario+"</td><td id='"+usuario+"_correo'>"+correo+"</td><td id='"+usuario+"_contraseña'>"+contraseña+"</td><td id='"+usuario+"_iconos'><img class='icono' src='img/editar.png' onclick='edicionPersona(\""+usuario+"\",true)' />&nbsp;&nbsp;<img class='icono' src='img/eliminar.png' onclick='eliminarPersona(\""+usuario+"\")' /></td></tr>";		
		
	}	
	html += "<tfoot><tr><td colspan='5'>Total registros: "+personas.length+"</td></tr></tfoot>";
	html +="</table>";
	resultado.innerHTML = html;
}

function edicionPersona(id,activar){
	var td_correo 		= document.getElementById(id+"_correo");
	var td_contraseña 	= document.getElementById(id+"_contraseña");
	var td_iconos 		= document.getElementById(id+"_iconos");
	
	if(activar){
		var correo 	= td_correo.firstChild.nodeValue;
		var contraseña 	= td_contraseña.firstChild.nodeValue;
		td_correo.setAttribute("value",correo);
		td_contraseña.setAttribute("value",contraseña);
		limpiarContenidoColumnas(td_correo,td_contraseña);	
		mostrarInput(td_correo,correo,'20%',id+"_txt_correo");
		mostrarInput(td_contraseña,contraseña,'20%',id+"_txt_contraseña");
		mostrarIconos(td_iconos,id,"edicion");		
	}else{
		var correo 	= td_correo.getAttribute("value");
		var contraseña 	= td_contraseña.getAttribute("value");
		td_correo.innerHTML = correo;
		td_contraseña.innerHTML = contraseña;
		mostrarIconos(td_iconos,id,"mantenimiento");
	}

}

function limpiarContenidoColumnas(td_correo,td_contraseña){
	td_correo.innerHTML = "";
	td_contraseña.innerHTML = "";
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
	var correo = document.getElementById(id+"_txt_correo").value;
	var contraseña = document.getElementById(id+"_txt_contraseña").value;
	var url = "ctrl_persona.php?op=editar&correo="+correo+"&contraseña="+contraseña+"&usuario="+id;
	var ai = new AJAXInteraction(url,mostrarResultado,"XML");
	ai.doGet();
}

function eliminarPersona(id){
	if(confirm("Desea eliminar el registro?")){
		var url = "ctrl_persona.php?op=eliminar&usuario="+id;
		var ai = new AJAXInteraction(url,mostrarResultado,"XML");
		ai.doGet();
	}
}


