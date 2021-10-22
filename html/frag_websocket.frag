var websocket_aberto = false;

const conn_websocket = new WebSocket("ws://34.95.214.164:9980");

conn_websocket.onopen = function (e) {
	websocket_aberto = true;
	console.log("Conexão estabelecida");
}

conn_websocket.onmessage = function(event) {
console.log("recebeu mensagem");
document.getElementById("conversa").innerHTML=document.getElementById("conversa").innerHTML + "<br>" + event.data;
document.getElementById("conversa").scrollTo(0, document.getElementById("conversa").clientHeight );

//	     var lista_websocket=event.data.split("#");
//		     lista_websocket.forEach(percorre_websocket);
//
//		     function percorre_websocket(item, index) {
//			var valores_websocket=item.split(":");
//			if (document.getElementById(valores_websocket[0])) {
//				document.getElementById(valores_websocket[0]).style.left = valores_websocket[2];
//				document.getElementById(valores_websocket[0]).style.top = valores_websocket[3];
//			}
//		     }
//
//
}

function manda_no_websocket(mensagem){
console.log("manda no websocket" + websocket_aberto);
if (websocket_aberto) {console.log("vou mandar:"+mensagem); conn_websocket.send(whoami+": "+mensagem);} else { alert("Conexão não está aberta");};

}


