function consultarPersonasJqueryJSON(){
	var tipo = document.getElementById("tipo").value;
	var descripcion = $("#descripcion").val();
	$.ajax(
		{
			url:"ctrl_persona.php",
			data: "op=consultar&tipo="+tipo+"&descripcion="+descripcion,
			dataType: "json",
			type: "GET",
			success: mostrarPersonasJqueryJSON
		}
	);
	return false;
}

function mostrarPersonasJqueryJSON(respuesta){
	var html = '<table border="1" id="tabla1"><caption>Listado de Usuarios Registrados</caption><thead><tr><th width="10%">Usuario</th><th width="35%">Correo</th><th width="35%">Contraseña</th><th width="10%"></th></tr></thead><tbody>';

	$.each(respuesta,function(i,item){
		if(i++%2==0){
			html +=  "<tr>";
		}else{
			html +=  "<tr  class='odd'>";
		}
		html +=  "<td>"+item.usuario+"</td><td id='"+item.usuario+"_correo'>"+item.correo+"</td><td id='"+item.usuario+"_contraseña'>"+item.contraseña+"</td><td id='"+item.usuario+"_iconos'><img class='icono' src='img/editar.png' onclick='edicionPersona(\""+item.usuario+"\",true)' />&nbsp;&nbsp;<img class='icono' src='img/eliminar.png' onclick='eliminarPersona(\""+item.usuario+"\")' /></td></tr>";		
	});

	html += "<tfoot><tr><td colspan='5'>Total registros: "+resultado.length+"</td></tr></tfoot>";
	html +="</table>";
	$("#resultado").html(html);
}