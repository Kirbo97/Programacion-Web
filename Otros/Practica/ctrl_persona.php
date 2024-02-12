<?php
 include('cls_persona.php');
 header('Content-type: application/xml'); 
 header('Cache-Control: no-store, no-cache, must-revalidate');  
 

extract($_GET);

 
 $p = new cls_persona($_GET);

 switch($op){
	case 'consultar':
			$xml = $p->consultar_personas();
			//CONSULTA
			break;
	case 'ingresar':
			//INGRESO
			$xml = $p->ingresar_persona();
			break;
	case 'editar':
			//EDICION
			$xml = $p->editar_persona();
			break;
	case 'eliminar':
			//ELIMINACION
			$xml = $p->eliminar_persona();
			break;
 } 
 echo $xml;
?>