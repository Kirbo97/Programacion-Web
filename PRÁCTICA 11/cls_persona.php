<?php
require_once('db/MysqliDb.php');

class cls_persona{
	public $datos = array();
	public $tabla = "persona";

	function __construct($request){	
	  //var_dump("<pre>",$request,"</pre>");
	  //die(); 		  
	  $numero 	= count($request);
	  $tags 	= array_keys($request); 
	  $valores 	= array_values($request);

	  /*var_dump("<pre>",$request,"</pre>");
	  var_dump("<pre>",$tags,"</pre>");
	  var_dump("<pre>",$valores,"</pre>");*/
	  
	  for($i=0;$i<$numero;$i++)
		$this->datos[$tags[$i]]=$valores[$i];				
		//$$tags[$i]=$valores[$i];	
	  //var_dump("<pre>",$this->datos,"</pre>");	
	}

function consultar_personas(){
		$base 	= new MysqliDb('localhost','root','','base_ejemplo');
		$tipo	= $this->datos["tipo"];
		$descripcion = $this->datos["descripcion"];  

		//var_dump("<pre>",$this->datos,"</pre>");
		
		if($tipo=="todos")
			$sql	= "SELECT * FROM persona";	
		else
			$sql	= sprintf("SELECT * FROM persona WHERE %s LIKE '%%%s%%'",$base->escape($tipo),$base->escape($descripcion));

		$resultado = $base->query($sql);
	
		$xml = "<?xml version='1.0' encoding='UTF-8' ?>";
		$xml .= "<registros>";		
		
		foreach($resultado as $reg){
			//var_dump("<pre>",$reg,"</pre>");			
			$xml .= "<registro>";			
			$numero 	= count($reg);
			$tags 		= array_keys($reg);
			$valores	= array_values($reg);

			//var_dump("<pre>",$reg,"</pre>");
			//print_r($reg);
			//die();
			
			for($i =0; $i<$numero; $i++)
				$xml .= "<".$tags[$i].">".$valores[$i]."</".$tags[$i].">";

			$xml .= "</registro>";
		}
		$xml .= "</registros>";	
		return $xml;
	
	}
	
	function ingresar_persona(){
		$base 	= new MysqliDb('localhost','root','','base_ejemplo');
		$cedula		= $base->escape($this->datos["cedula"]);
		$nombres 	= $base->escape($this->datos["nombres"]);   
		$apellidos 	= $base->escape($this->datos["apellidos"]);   
		$edad	 	= $base->escape($this->datos["edad"]);  

		$estado = "true";
		$mensaje = "Se ingresó correctamente";
		
		$datos = array('cedula' => $cedula,'nombres' => $nombres,'apellidos' => $apellidos,'edad' => $edad);
		$resultado = $base->insert('persona', $datos);		

		if(gettype($resultado)=="boolean" && $resultado==false){
			$estado = "false";
			$mensaje = "Ocurrió un error en el ingreso.";
		}

		
		$xml = "<?xml version='1.0' encoding='UTF-8' ?>";
		$xml .= "<resultado>";				
		$xml .= "<estado>".$estado."</estado>";
		$xml .= "<mensaje>".$mensaje."</mensaje>";
		$xml .= "</resultado>";	
		
		return $xml;	
	}

	function eliminar_persona(){
		$base 	= new MysqliDb('localhost','root','','base_ejemplo');
		$cedula		= $base->escape($this->datos["cedula"]);
		$estado = "true";
		$mensaje = "Se eliminó correctamente";
		
		$base->where('cedula', $cedula);
		$resultado = $base->delete('persona');
		
		
		if(!$resultado){
			$estado = "false";
			$mensaje = "Ocurrió un error en la eliminación";
		}
		
		$xml = "<?xml version='1.0' encoding='UTF-8' ?>";
		$xml .= "<resultado>";				
		$xml .= "<estado>".$estado."</estado>";
		$xml .= "<mensaje>".$mensaje."</mensaje>";
		$xml .= "</resultado>";	
		
		return $xml;	
	}	
	
	function editar_persona(){
	$base 	= new MysqliDb('localhost','root','','base_ejemplo');
	   
	$mensaje   = "Se ha realizado la edición con éxito";
	$estado_resultado = "true";
	$cedula  = $base->escape($this->datos["cedula"]);
	$nombres  = $base->escape($this->datos["nombres"]);
	$apellidos  = $base->escape($this->datos["apellidos"]);
	$edad  = $base->escape($this->datos["edad"]);

	$datos = array('nombres' => $nombres,'apellidos' => $apellidos,'edad' => $edad);
	$base->where('cedula', $cedula);
	$resultado = $base->update('persona', $datos);
	 
	 if(!$resultado){
	   $estado_resultado = "false";
	   $mensaje    = "No se ha realizado ningún cambio";
	 }

	 $xml = "<?xml version='1.0' encoding='UTF-8' ?>";
	 $xml .= "<resultado>";
	 $xml .= "<estado>".$estado_resultado."</estado>";
	 $xml .= "<mensaje>".$mensaje."</mensaje>";  
	 $xml .= "</resultado>";
					
	 return $xml;
  }	
	
}

?>