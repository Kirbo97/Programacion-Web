<?php

$usuario = $_GET["usuario"];

sleep(5);
if($usuario=="admin"){
	echo "1";
}else{
	echo "0";
}


?>