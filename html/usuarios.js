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

}

export class usuarios {

constructor (whoami){
	this.apelido = whoami;
	this.numero_maximo_usuarios = 30;
	this.usuario = new usuario(whoami); // carrega os dados do usuario que estah tentando autenticar
	this.usuario_local = this.usuario.autenticando;
	this.usuarios_remotos = [];
}

inicializa_lista_usuarios_remotos(){
	let i;
	for (i = 0; i < this.numero_maximo_usuarios; i++){
		this.usuarios_remotos.push(null);	
	}
}

carrega_lista_usuarios(){

this.usuarios_remotos.length = 0;
var resposta = "";
var url = '../php/busca_lista_de_usuarios.php';
var oReq = new XMLHttpRequest();

let that=this;
oReq.open("GET", url, false);
oReq.onload = function (e) {
		resposta = oReq.responseText;
		that.usuarios_remotos=JSON.parse(resposta);
		console.log(that.usuarios_remotos);
		
	}
oReq.send();
}

login(){



var resposta = "";
var url = '../php/login_usuario.php?id_usuario='+this.usuario_local.id+'&operacao=in';
var oReq = new XMLHttpRequest();

oReq.open("GET", url, false);
oReq.onload = function (e) {
          resposta = oReq.responseText;
//	  if (resposta=="sucesso") { return true;}
//	  else { return false;}
          }
oReq.send();
}

logout(){


var resposta = "";
var url = '../php/login_usuario.php?usuario='+this.usuario_local.id+'&operacao=out';
var oReq = new XMLHttpRequest();

oReq.open("GET", url, false);
oReq.onload = function (e) {
          resposta = oReq.responseText;
	  return resposta;
          }
oReq.send();
}

}
