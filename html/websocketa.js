class config_socket{
	
constructor(){
	this.ip = "34.95.214.164";
	this.port = "9980"; // firewall do google cloud tem que liberar essa porta
	
}
}


export class websocketa{

constructor (){
	this.websocket_aberto = false;
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

trata_mensagem(){
	alert(this.mensagem_recebida);		
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
