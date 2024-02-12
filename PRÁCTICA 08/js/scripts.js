var c=2,l=1;

function crearTabla(){
	var nf = document.getElementById("nf").value;
	var nc = document.getElementById("nc").value;

	var tabla = document.createElement("table");
	tabla.setAttribute("border","1");

	for (var i = 0; i < nf; i++) {
		var fila = document.createElement("tr");
		for (var j = 0; j < nc; j++) {
			var col = document.createElement("td");
			var texto = document.createTextNode("F"+(i+1)+"C"+(j+1));
			col.appendChild(texto);
			fila.appendChild(col);
		}
		tabla.appendChild(fila);
	}
	document.body.appendChild(tabla);
}

function añadirlista(){
	var con = document.getElementById("opciones");
	var nuevo = document.createElement("option");
	nuevo.text = l;
	con.add(nuevo)
	l++;
}

function moverPizq(){
	var con = document.getElementById("mensaje");
    if(c==3){
	  con.setAttribute("align", "center");
    } else if(c==2) {
      con.setAttribute("align", "left");
    }
    if(c>1){ c--; }
}

function moverPder(){
	var con = document.getElementById("mensaje");
    if(c==1){
	 con.setAttribute("align", "center");
    } else if(c==2){
	 con.setAttribute("align", "right"); 
    }
    if(c<3){ c++; }
}