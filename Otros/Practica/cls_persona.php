<?php
require_once('db/MysqliDb.php');

class cls_persona{
	public $datos = array();
	public $tabla = "persona";

	function __construct($request){	
	  $numero 	= count($request);
	  $tags 	= array_keys($request); 
	  $valores 	= array_values($request);
	  
	  for($i=0;$i<$numero;$i++)
		$this->datos[$tags[$i]]=$valores[$i];		
	}

function consultar_personas(){
		$base 	= new MysqliDb('localhost','root','','base_ejemplo');
		$tipo	= $this->datos["tipo"];
		$descripcion = $this->datos["descripcion"];  
		
		if($tipo=="todos")
			$sql	= "SELECT * FROM persona";	
		else
			$sql	= sprintf("SELECT * FROM persona WHERE %s LIKE '%%%s%%'",$base->escape($tipo),$base->escape($descripcion));

		$resultado = $base->query($sql);
	
		$xml = "<?xml version='1.0' encoding='UTF-8' ?>";
		$xml .= "<registros>";		
		
		foreach($resultado as $reg){		
			$xml .= "<registro>";			
			$numero 	= count($reg);
			$tags 		= array_keys($reg);
			$valores	= array_values($reg);
			
			for($i =0; $i<$numero; $i++)
				$xml .= "<".$tags[$i].">".$valores[$i]."</".$tags[$i].">";

			$xml .= "</registro>";
		}
		$xml .= "</registros>";	
		return $xml;
	
	}
	
	function ingresar_persona(){
		$base 	= new MysqliDb('localhost','root','','base_ejemplo');
		$usuario	= $base->escape($this->datos["usuario"]);
		$correo 	= $base->escape($this->datos["correo"]);   
		$contraseña 	= $base->escape($this->datos["contraseña"]);   

		$estado = "true";
		$mensaje = "Se ingresó correctamente";
		
		$datos = array('usuario' => $usuario,'correo' => $correo,'contraseña' => $contraseña);
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
		$usuario		= $base->escape($this->datos["usuario"]);
		$estado = "true";
		$mensaje = "Se eliminó correctamente";
		
		$base->where('usuario', $usuario);
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
	$usuario  = $base->escape($this->datos["usuario"]);
	$correo  = $base->escape($this->datos["correo"]);
	$contraseña  = $base->escape($this->datos["contraseña"]);

	$datos = array('correo' => $correo,'contraseña' => $contraseña);
	$base->where('usuario', $usuario);
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