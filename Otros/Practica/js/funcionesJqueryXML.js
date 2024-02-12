function consultarPersonasJqueryXML(){
	console.log("Ejecutando consultarPersonasJqueryXML")
	var tipo = document.getElementById("tipo").value;
	var descripcion = $("#descripcion").val();
	$.ajax(
		{
			url:"ctrl_persona.php",
			data: "op=consultar&tipo="+tipo+"&descripcion="+descripcion,
			dataType: "xml",
			type: "GET",
			success: mostrarPersonasJqueryXML
		}
	);
	return false;
}

function mostrarPersonasJqueryXML(respuesta){
	var html = '<table border="1" id="tabla1"><caption>Listado de Usuarios Registrados</caption><thead><tr><th width="10%">Usuario</th><th width="35%">Correo</th><th width="35%">Contraseña</th><th width="10%"></th></tr></thead><tbody>';
	var i=0;

	$(respuesta).find('registro').each(function(){
		var usuario = $(this).find('usuario').text();
		var correo = $(this).find('correo').text();
		var contraseña = $(this).find('contraseña').text();
		
		if(i++%2==0){
			html +=  "<tr>";
		}else{
			html +=  "<tr  class='odd'>";
		}
		html +=  "<td>"+usuario+"</td><td id='"+usuario+"_correo'>"+correo+"</td><td id='"+usuario+"_contraseña'>"+contraseña+"</td><td id='"+usuario+"_iconos'><img class='icono' src='img/editar.png' onclick='edicionPersona(\""+usuario+"\",true)' />&nbsp;&nbsp;<img class='icono' src='img/eliminar.png' onclick='eliminarPersona(\""+usuario+"\")' /></td></tr>";		
	});


	html += "<tfoot><tr><td colspan='5'>Total registros: "+i+"</td></tr></tfoot>";
	html +="</table>";
	$("#resultado").html(html);
}