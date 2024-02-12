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
	var html = '<table border="1" id="tabla1"><caption>Listado de Personas JSON</caption><thead><tr><th width="10%">C&eacute;dula</th><th width="35%">Nombres</th><th width="35%">Apellidos</th><th width="10%">Edad</th><th width="10%"></th></tr></thead><tbody>';

	$.each(respuesta,function(i,item){
		if(i++%2==0){
			html +=  "<tr>";
		}else{
			html +=  "<tr  class='odd'>";
		}
		html +=  "<td>"+item.cedula+"</td><td id='"+item.cedula+"_nombres'>"+item.nombres+"</td><td id='"+item.cedula+"_apellidos'>"+item.apellidos+"</td><td id='"+item.cedula+"_edad'>"+item.edad+"</td><td id='"+item.cedula+"_iconos'><img class='icono' src='img/editar.png' onclick='edicionPersona(\""+item.cedula+"\",true)' />&nbsp;&nbsp;<img class='icono' src='img/eliminar.png' onclick='eliminarPersona(\""+item.cedula+"\")' /></td></tr>";		
	});

	html += "<tfoot><tr><td colspan='5'>Total registros: "+resultado.length+"</td></tr></tfoot>";
	html +="</table>";
	$("#resultado").html(html);
}