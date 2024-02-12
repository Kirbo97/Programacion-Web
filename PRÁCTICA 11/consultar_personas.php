<?php
	header("Content-type: text/xml");
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT ");
	
	$xml = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
	$xml .= "<resultado>";
	for($i=0;$i<10;$i++){	
		$xml .= "<registro>";
			$xml .= "<cedula>099999999".$i."</cedula>";
			$xml .= "<nombres>Pedro</nombres>";
			$xml .= "<apellidos>Fernandez</apellidos>";
			$xml .= "<edad>2".$i."</edad>";
		$xml .= "</registro>";
	}
	$xml .= "</resultado>";
	
	echo $xml;
?>