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
	var html = '<table border="3" id="tabla1"><caption>Listado de Personas</caption><thead><tr><th width="10%">C&eacute;dula</th><th width="35%">Nombres</th><th width="35%">Apellidos</th><th width="10%">Edad</th><th width="10%"></th></tr></thead><tbody>';
	var i=0;

	$(respuesta).find('registro').each(function(){
		var cedula = $(this).find('cedula').text();
		var nombres = $(this).find('nombres').text();
		var apellidos = $(this).find('apellidos').text();
		var edad = $(this).find('edad').text();
		
		if(i++%2==0){
			html +=  "<tr>";
		}else{
			html +=  "<tr  class='odd'>";
		}
		html +=  "<td>"+cedula+"</td><td id='"+cedula+"_nombres'>"+nombres+"</td><td id='"+cedula+"_apellidos'>"+apellidos+"</td><td id='"+cedula+"_edad'>"+edad+"</td><td id='"+cedula+"_iconos'><img class='icono' src='img/editar.png' onclick='edicionPersona(\""+cedula+"\",true)' />&nbsp;&nbsp;<img class='icono' src='img/eliminar.png' onclick='eliminarPersona(\""+cedula+"\")' /></td></tr>";		
	});


	html += "<tfoot><tr><td colspan='5'>Total registros: "+i+"</td></tr></tfoot>";
	html +="</table>";
	$("#resultado").html(html);
}