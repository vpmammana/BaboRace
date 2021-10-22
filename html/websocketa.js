class config_socket{
	
constructor(){
	this.ip = "34.95.214.164";
	this.port = "9980"; // firewall do google cloud tem que liberar essa porta
	
}
}


export class websocketa{

constructor (){
	this.websocket_aberto = false;
	this.controle = null;
	this.config_socket = new config_socket();
	this.conn_websocket = new WebSocket("ws://"+this.config_socket.ip+":"+this.config_socket.port);
	let that=this;
	this.conn_websocket.onopen = function (e) {
		that.websocket_aberto = true;
		console.log("Conexão estabelecida");
	}
	this.conn_websocket.onmessage = function(event) {
		console.log("recebeu mensagem");
		that.mensagem_recebida = event.data;
		that.trata_mensagem();
	}

} // fim constructor websocketa

posiciona(usuario, id_usuario, x, y){

let i;

for (i=0; i < this.controle.objetos_remotos.length; i++){
	let objeto = this.controle.objetos_remotos[i];
	if (objeto.id_usuario == id_usuario){
		objeto.posicao_percentual_x = x;
		objeto.posicao_percentual_y = y;
	}
}

}

trata_mensagem(){
	let msg_json = JSON.parse(this.mensagem_recebida);
	if (msg_json.tipo = "pos") {
		this.posiciona(msg_json.user, msg_json.id_u, msg_json.x, msg_json.y);
	}
//	alert(this.mensagem_recebida);		
} // fim trata_mensagem

manda_mensagem(mensagem){
	if (this.websocket_aberto) {console.log("vou mandar:"+mensagem); this.conn_websocket.send(mensagem);} else { alert("Conexão websocket não está aberta");};
} // fim manda_mensagem

msg_posicao(usuario, id_usuario, id_fantasia, x,y){
	this.mensagem_a_enviar= '{"tipo":"pos","user":"'+usuario+'","id_u":"'+id_usuario+'","id_f":"'+id_fantasia+'","x":"'+x+'","y":"'+y+'"}';
this.manda_mensagem(this.mensagem_a_enviar);
} // fim msg_posicao

msg_login(usuario, id_usuario){
	this.mensagem_a_enviar= '{"tipo":"in","user":"'+usuario+'","id_u":"'+id_usuario+'"}';
this.manda_mensagem(this.mensagem_a_enviar);

} // fim msg_login

msg_logout(usuario, id_usuario){
	this.mensagem_a_enviar= '{"tipo":"out","user":"'+usuario+'","id_u":"'+id_usuario+'"}';
this.manda_mensagem(this.mensagem_a_enviar);
} // msg_logout

} // fim classe websocketa
