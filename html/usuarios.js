class usuario{
constructor(apelido){
	this.apelido = apelido;
	this.carrega_dados_usuario(apelido);
}




carrega_dados_usuario(apelido){

var resposta = "";
var url = '../php/busca_usuario.php?usuario='+apelido;
var oReq = new XMLHttpRequest();
let that=this;
oReq.open("GET", url, false);
oReq.onload = function (e) {
          resposta = oReq.responseText;
	  that.guarda_autenticando = JSON.parse(resposta);
          }
oReq.send();
}

set autenticando(valor){
 	this.guarda_autenticando = valor;
}

get autenticando(){
this.carrega_dados_usuario(this.apelido);
return  this.guarda_autenticando;

}

} // fim class usuario

export class usuarios {

constructor (whoami){
	this.websocket = null;
	this.apelido = whoami;
	this.numero_maximo_usuarios = 30;
	this.usuario = new usuario(whoami); // carrega os dados do usuario que estah tentando autenticar
	this.usuario_local = this.usuario.autenticando;
	this.usuarios = {};
	this.cookie = "sem_cookie";
	this.lista_de_fantasias = {};
}


carrega_json_na_matriz(matriz_destino, matriz_origem){

let i;

for (i=0; i < matriz_origem.length; i++){
	let elemento = matriz_origem[i];
	matriz_destino[elemento.id_usuario] = elemento;
}
}

carrega_lista_fantasias(id_usuario){

var resposta = "";
var url = '../php/busca_lista_de_fantasias.php?id_usuario='+id_usuario;
var oReq = new XMLHttpRequest();

let that=this;
oReq.open("GET", url, false);
oReq.onload = function (e) {
		resposta = oReq.responseText;
		let resposta2=JSON.parse(resposta);
		console.log("id_usuario -> "+id_usuario + " resposta -> "+ resposta);
		console.log(resposta2);
		that.lista_de_fantasias[id_usuario] = resposta2;
}
oReq.send();
}





carrega_lista_usuarios(){

this.usuarios.length = 0;
var resposta = "";
var url = '../php/busca_lista_de_usuarios.php';
var oReq = new XMLHttpRequest();

let that=this;
oReq.open("GET", url, false);
oReq.onload = function (e) {
		resposta = oReq.responseText;
		let resposta2=JSON.parse(resposta);
		that.carrega_json_na_matriz(that.usuarios, resposta2);
		console.log(that.usuarios);
		that.debug = resposta2;
	for (var key in that.usuarios) {
	    if (Object.prototype.hasOwnProperty.call(that.usuarios, key)) {
		if (key != "length") {that.carrega_lista_fantasias(that.usuarios[key].id_usuario);}
        // use val
    }
}
	
//		that.usuarios.forEach( function(elemento, indice) {that.carrega_lista_fantasias(indice);});
			}
oReq.send();
}

login(){

var resposta = "";
var url = '../php/login_usuario.php?id_usuario='+this.usuario_local.id+'&operacao=in&cookie='+this.cookie;
var oReq = new XMLHttpRequest();
let that=this;
oReq.open("GET", url, false);
oReq.onload = function (e) {
          resposta = oReq.responseText;
	
	that.websocket.msg_login(that.usuarios[that.usuario_local.id].apelido, that.usuarios[that.usuario_local.id].id_usuario);

//	  if (resposta=="sucesso") { return true;}
//	  else { return false;}
          }
oReq.send();
}

logout(){


var resposta = "";
var url = '../php/login_usuario.php?id_usuario='+this.usuario_local.id+'&operacao=out&cookie=sem_cookie';
var oReq = new XMLHttpRequest();
let that=this;
oReq.open("GET", url, false);
oReq.onload = function (e) {
          resposta = oReq.responseText;
	let este_usuario = that.usuarios[that.usuario_local.id];
	that.websocket.msg_posicao(este_usuario.apelido, este_usuario.id_usuario, este_usuario.id_fantasia, este_usuario.x_inicial, este_usuario.y_inicial);	
	that.websocket.msg_logout(that.usuarios[that.usuario_local.id].apelido, that.usuarios[that.usuario_local.id].id_usuario);
          }
oReq.send();
}

}
