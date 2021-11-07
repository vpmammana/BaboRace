<!DOCTYPE html> 
<!--- BaboRace - Desenvolvido por Victor Pellegrini Mammana - 2021_10_16 --->
<!--- Desenhos por Victoria Mammana --->
<html lang="en">
<meta charset="ISO-8859-1">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

	<head>
		<title>
		Entendendo a relatividade
		</title>
	</head>
<style>

.exemplo {
	position: absolute;
	box-sizing: border-box ;

}

img {
	display: block;
}

table {
	padding: 0px;
	border-spacing: 0px;
	border-collapse: collapse;
}

tr,td {
}

input[type="button"] {
	font-size: 1em;
	line-height: 1em;
	padding: 1px;
	background-color: red;
	color: black;
}

input[type="text"]{
    font-size: 1em;
    line-height: 1em;
    display: inline-block;
    padding: 0px;
    width: 2rem;
    border: 1px solid black;
}

body{
  background-color: blue;
  background: -moz-radial-gradient(center, ellipse cover, #0047ea 0%, #151515 100%);
  background: radial-gradient(#0047ea, #151515);
  height: 100vh;
  overflow: hidden;
}

#comandos {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 6%;
	padding: 0px;
	border: 1px solid white;	
	z-index: 100;
	background-color: blue;
	overflow: hidden;
}


#nao_opaco { 
	width: 21%;
	height:94%;
	position: absolute;
	top: 6%;
	left: 79%;
	z-index: 200;
	overflow: hidden;
	opacity: 0.3;
	background-color: gray;
}


#contem {
	width: 21%;
	height:94%;
	position: absolute;
	top: 6%;
	left: 79%;
	z-index: 1000;
	overflow: hidden;
	opacity: 0.9;
	background-color: none;
}

#principal {
	position: absolute;
	top: 7%;
	left: 0px;
	width: 3000px;
	height: 3000px;
	padding: 0px;
	border: 1px solid red;	
	box-sizing: border-box;
}

	#programa {
		width: 100%;
		height: 100%;
		position: absolute;
		border: 1px solid black;
		overflow: scroll;
		scroll-behavior: smooth;
	}
</style>

<body>


<?php

$arr_cookie_options = array (
                'expires' => time() + 60*60*24*30,
                'path' => '/',
                'domain' => '34.95.214.164', // leading dot for compatibility or use subdomain
                'secure' => false,     // or false
                'httponly' => false,    // or false
                'samesite' => 'Strict' // None || Lax  || Strict
                );

if(!isset($_COOKIE['BaboRace'])) {
    setcookie('BaboRace',rand(1,100000) , $arr_cookie_options); // 86400 = 1 day
}
//else
//{
//echo $_COOKIE['lg'];
//	if ($chave == $_COOKIE['lg']) {
//		echo "bateu";
//	}
//	else {echo "Não bateu";}
//}
?>

<div id="nao_opaco"></div>
<div id="contem">
<div id="programa">
</div>
</div>
<div id="comandos">
<!---<table width="10%" cellspacing="0">--->
<!---	<tr>--->
<!---		<td><input type="button" value="Gira Móvel" onclick="window.controle.selecionado.gira(document.getElementById('delta_graus').value,document.getElementById('passos').value);"></td>--->
<!---		<td><input id="delta_graus" size="4" type="text"  placeholder="delta_graus"></td>--->
<!---		<td><input id="passos" type="text" size="4" placeholder="passos"></td>--->
<!---		<td width="30px"></td>--->
<!---		<td width="100px"></td>--->
<!---		<td><input type="button" value="Impulso X" onclick="window.controle.selecionado.Fx = document.getElementById('impulso_X').value;"></td>--->
<!---		<td><input id="impulso_X" type="text" size="4" placeholder="impulso_X"></td>--->
<!---		<td><input type="button" value="Para o Giro" onclick="window.controle.selecionado.para_giro();"></td><td></td><td></td>--->
<!---		<td><input type="button" value="Ação" onclick="acao();"></td><td></td><td></td>--->
<!---	</tr>--->
<!---	<tr>--->
<!---		<td><input type="button" value="Deslizar" onclick="window.controle.selecionado.desliza( document.getElementById('x_percentual').value, document.getElementById('y_percentual').value, document.getElementById('passos_posicao').value);"></td>--->
<!---		<td><input id="x_percentual" size="4" type="text" placeholder="x_%"></td>--->
<!---		<td><input id="y_percentual" type="text" size="4" placeholder="y_%"></td>--->
<!---		<td><input id="passos_posicao" type="text" size="4" placeholder="passos"></td>--->
<!---		<td width="100px"></td>--->
<!---		<td><input type="button" value="Impulso Y" onclick="window.controle.selecionado.Fy = document.getElementById('impulso_Y').value;"></td>--->
<!---		<td><input id="impulso_Y" type="text" size="4" placeholder="impulso_Y"></td>--->
<!---	<td><input type="button" value="Para Deslizamento" onclick="window.controle.selecionado.para_desliza();"></td><td></td><td></td>--->
<!------>
<!---	</tr>--->
<!---</table>--->

<!--- <input id="botao_repeticao" type="button" value="REPETE" onclick="window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'repeticao'); "> --->
<!--- <input id="botao_desvio" type="button" value="SE" onclick="window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'desvio'); "> --->
<!--- <input id="botao_Fx" type="button" value="Fx" onclick="window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'Fx'); "> --->
<!--- <input id="botao_Fy" type="button" value="Fy" onclick="window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'Fy'); "> --->
<!--- <input id="botao_espera" type="button" value="ESPERA" onclick="window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'delay'); "> --->
<!--- <input id="botao_va_para_x" type="button" value="Va para X" onclick="window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'va_para_x'); "> --->
<!--- <input id="botao_va_para_y" type="button" value="Va para Y" onclick="window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'va_para_y'); "> --->
<!--- <input id="botao_reset" type="button" value="RESET" onclick="window.config.reset=true;"> --->

<table style="color: white; float: right; ">
<tr>
<td>
<div class="texto" style="color: white; float: right; ">
Autor: Victor Pellegrini Mammana &nbsp
<br>CEMADEN<br>
Design: Babolina
</div>
</td>
<td>
<table>
<tr>
<td><input id="help" class="extra" type="button" style="float: right; width: 80px; height: 40px; " value="help " onclick="alert('Os botões ao lado permitem inserir comandos no código à direita. Com as setas voce pode mudar o ponto de inserção. Com o delete voce pode apagar um comando. Quando estiver com o ponto de inserção num determinado local, o comando abaixo comecará a piscar, indicando que você pode entrar no bloco com a seta à direta. Seta à esquerda sai do bloco. Delete apaga o comando ou bloco que estiver abaixo do ponto de inserção.O Espaco dispara o codigo.')"/>
</td>
</tr>
<tr>
<td>
<input id="sair" class="extra" type="button" style="float: right; width: 80px; height: 40px;" value="Sair" onclick="window.usuarios.logout(); window.open(url_retorna, '_self')" />
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>

<div id="principal">


</div>
<script>

var url_retorna;
var whoami;
var razao_botoes = 0.4;

var params = {};
location.search.slice(1).split("&").forEach(function(pair) {
   pair = pair.split("=");
   params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        whoami=decodeURIComponent(pair[1]);
});
//alert(whoami);



function busca_url_retorna(){
           var resposta="";
           var url='../php/retorna.php';
           var oReq=new XMLHttpRequest();
           oReq.open("GET", url, false);
           oReq.onload = function (e) {
                     url_retorna=oReq.responseText;
                     }
           oReq.send();
}


function ajusta_tamanho_componentes_texto(container){

let i;
let textos = document.getElementsByClassName("texto");
for (i=0; i < textos.length; i++)
{	

	texto = textos[i];
	texto.style.fontSize = 0.25*(container.clientHeight)/2 + "px";
	console.log(0.25*(container.clientHeight)/2 + "px");

}

}

function ajusta_tamanho_componentes_extras(container){

let i;
let extras = document.getElementsByClassName("extra");
console.log("Extras")
console.log(extras);
let razao_extra;
for (i=0; i < extras.length; i++)
{	

	let extra = extras[i];
setTimeout(
function (){
	razao_extra = razao_botoes;
	console.log(razao_extra);
	extra.style.height = container.clientHeight/2 + "px";
	extra.style.fontSize = 0.7*(container.clientHeight)/2 + "px";
	extra.style.width = ((container.clientHeight/2) /razao_extra) + "px";
},300

)
}

}

function ajusta_tamanho_do_exemplo(container, exemplo_entrada, borda_str){

let altura = parseInt(container.getBoundingClientRect().height);
let borda =parseInt(borda_str.replace("px","")) / 1.5;
let exemplo = exemplo_entrada.children[0].children[0];

//console.log(exemplo);
//console.log(exemplo.innerHTML);
//console.log(exemplo.getBoundingClientRect().height);
//console.log(exemplo.parentElement);
//console.log(exemplo.parentElement.parentElement);
	exemplo.style.display = "block";
	exemplo.style.visibility = "visible";
	exemplo.style.fontSize = altura *0.4 + "px"; 	
	exemplo.parentElement.style.top = "0px";
	exemplo.parentElement.style.padding = "0px";
	exemplo.parentElement.style.height = exemplo.style.fontSize;
	exemplo.parentElement.parentElement.style.height = exemplo.getBoundingClientRect().height + "px";
	exemplo.style.top="0px";
	exemplo.parentElement.style.width = exemplo.getBoundingClientRect().width + borda + "px";

	exemplo.parentElement.parentElement.style.width = exemplo.parentElement.style.width;
	return parseInt(exemplo.parentElement.parentElement.style.width.replace("px","")) + borda;	


}

function ajusta_tamanho_de_todos_exemplos(container){

let exemplos = document.getElementsByClassName("exemplo");
let i;
let altura = parseInt(container.getBoundingClientRect().height);
let pos_x = 0;

espacamento = comandos.getBoundingClientRect().height * 0.1;
correcao_borda = Math.floor(comandos.getBoundingClientRect().height * 0.02);

for (i=0; i < exemplos.length; i++){
	exemplo = exemplos[i];
	console.log("altura: "+altura+" antes get: "+ exemplo.getBoundingClientRect().width);
	exemplo.style.fontSize = altura *0.3 + "px"; 
	console.log("depois get: "+ exemplo.getBoundingClientRect().width);
	exemplo.style.display = "block";
	exemplo.style.visibility = "visible";
	exemplo.parentElement.style.top = "0px";
	exemplo.parentElement.style.padding = "0px";
	exemplo.parentElement.style.height = exemplo.style.fontSize;
	console.log("Font: "+exemplo.style.fontSize);
	exemplo.parentElement.parentElement.style.height = exemplo.getBoundingClientRect().height + "px";
	console.log(exemplo.parentElement.parentElement);
	exemplo.style.borderWidth = correcao_borda + "px";
	exemplo.style.top="0px";
	exemplo.parentElement.style.width = exemplo.getBoundingClientRect().width + "px";
	exemplo.parentElement.style.left = "0px";
	exemplo.parentElement.parentElement.style.width = exemplo.parentElement.style.width;
	exemplo.parentElement.parentElement.style.left = pos_x + "px";
	pos_x = pos_x + exemplo.clientWidth + espacamento;
	
}


}

function limpa_todos_blink(config){
let i;

let lista = document.getElementsByClassName(config.classe_div);
for (i=0; i < lista.length; i++) {
	lista[i].style.pai.fim_blink();
	
} 

}



function swap(lista, indice_origem, indice_destino){

let troca = lista[indice_origem];
lista[indice_origem] = lista[indice_destino];
lista[indice_destino] = troca;

}

function isCharNumber(c) {
  return c >= '0' && c <= '9';
}

function scroll_programa(programa){
let correcao_y = 0;
let elemento = programa.style.ponto_de_insercao.face;
//console.log("elemento funcao");
//console.log(elemento);
while (elemento != programa){
	correcao_y = correcao_y +parseInt( elemento.style.top.replace("px",""));
	elemento = elemento.parentElement;
	//console.log("correcao_y: " + correcao_y);
}

if ( ((correcao_y +  3* parseInt(programa.style.ponto_de_insercao.face.style.height.replace("px","")) ) - programa.scrollTop) > parseInt(contem.clientHeight))
{

	programa.scrollTop=parseInt( (correcao_y + 3* parseInt(programa.style.ponto_de_insercao.face.style.height.replace("px",""))) - parseInt(contem.clientHeight) );
	//console.log("scroll top -> "+programa.scrollTop+ " contem_height: "+contem.clientHeight+ " correcao_y: "+correcao_y);
}

if (correcao_y< programa.scrollTop) {
        let itz = parseInt(correcao_y - 4 * parseInt(programa.style.ponto_de_insercao.face.style.height.replace("px","")));
	if (itz > 0)
	{
		programa.scrollTop = itz ;
	}
	else
	{
		programa.scrollTop = 0;
	}
}

}

document.addEventListener("keydown",
function (e){
window.config.parametro_de_tamanho = comandos.getBoundingClientRect().height;
window.controle.central.inatividade = Date.now();
//console.log("teste");
//console.log(e.key);
if (e.target.className == "entrada") {

	if (!(e.key == "ArrowUp" || e.key == "ArrowDown")) {return;}
}

let pai =  programa.style.ponto_de_insercao.elemento_pai;

if (e.keyCode == 32 ) { limpa_todos_blink(window.config);
			 if (window.config.em_execucao) 
				{
					window.config.reset = true; 
					setTimeout(function () {if (window.config.em_execucao) {alert("Nao foi possivel parar a execucao!");} else {window.bloco1.monta_executavel(programa.style.principal);}}, 1000);
				}
			else {
				window.bloco1.monta_executavel(programa.style.principal);
			}

		      }

if (e.key == "Delete" || e.key == "Backspace") { // hackead para apple que fornece backspace quando digita delete
	if (pai.indice_ponto_de_blinking <= pai.instrucoes.length - 1 && pai.indice_ponto_de_blinking >0)
	{
		let removed3 = pai.instrucoes.splice(pai.indice_ponto_de_blinking,1);
		removed3[0].face.remove();
		removed3[0]={};
		removed3=[];
		document.getElementById('programa').style.principal.innerHTML=''; 
		document.getElementById('programa').style.principal.mostra();
		limpa_todos_blink(window.config);
		return;
	
	} 

}		


if (e.key == "ArrowUp") { if (pai.indice_ponto_de_insercao>0) { swap(pai.instrucoes,pai.indice_ponto_de_insercao, pai.indice_ponto_de_insercao - 1);  pai.indice_ponto_de_insercao--; } }
if (e.key == "ArrowDown") { if (pai.indice_ponto_de_insercao< pai.instrucoes.length - 1) { swap(pai.instrucoes,pai.indice_ponto_de_insercao, pai.indice_ponto_de_insercao + 1);  pai.indice_ponto_de_insercao++; } }
if (e.key == "ArrowRight") { if (pai.indice_ponto_de_blinking <= pai.instrucoes.length - 1 && pai.indice_ponto_de_blinking >0) 
				{ 
				if (["desvio", "principal", "repeticao"].includes(pai.instrucoes[pai.indice_ponto_de_blinking].tipo) ) {
					programa.style.ponto_de_insercao = pai.instrucoes[pai.indice_ponto_de_blinking].ativa_ponto_de_insercao(0); // coloca no comeco
					var removed2 = pai.instrucoes.splice(pai.indice_ponto_de_insercao,1); 
								//console.log("direita");
								//console.log(removed2[0]);
								removed2[0].face.remove();
								removed2[0]={};
								removed2=[];
								document.getElementById('programa').style.principal.innerHTML=''; 
								document.getElementById('programa').style.principal.mostra();
								limpa_todos_blink(window.config);
								return;

				}
				} 
			}

if (e.key == "ArrowLeft") { 
	if ( pai.elemento_pai != document.getElementById("programa")) {
		let removed = pai.instrucoes.splice(pai.indice_ponto_de_insercao,1);  
		pai.indice_ponto_de_insercao=-1;
		let guarda = pai.elemento_pai.indice_ponto_de_insercao;
		//alert(guarda);
		programa.style.ponto_de_insercao = pai.elemento_pai.ativa_ponto_de_insercao(guarda);
		programa.style.ponto_de_insercao.elemento_pai.indice_ponto_de_insercao = guarda;
		//console.log("esquerda");
		//console.log(removed);
		removed[0].face.remove();
		removed[0]={};
		removed=[];
		limpa_todos_blink(window.config);	
		document.getElementById('programa').style.principal.innerHTML=''; 
		document.getElementById('programa').style.principal.mostra();
		scroll_programa(programa);
		return;
	}
}

pai.indice_ponto_de_blinking = pai.indice_ponto_de_insercao + 1;

limpa_todos_blink(window.config);
if (pai.indice_ponto_de_blinking <= pai.instrucoes.length - 1) { 
		if (["desvio", "principal", "repeticao"].includes(pai.instrucoes[pai.indice_ponto_de_blinking].tipo) ) {
				pai.instrucoes[pai.indice_ponto_de_blinking].inicia_blink();
		}
}

document.getElementById('programa').style.principal.innerHTML=''; 
document.getElementById('programa').style.principal.mostra();
//console.log(contem.clientHeight + " - " + programa.style.ponto_de_insercao.face.style.top.replace("px","") );

scroll_programa(programa);

}, false
)

function acao(){


window.controle.selecionado.desliza(0.1,0,300); 


//window.movel1.gira(1,2000)

}

document.getElementById("principal").addEventListener("focusout", function (e) {alert(e.activeElement);});

busca_url_retorna();
</script>

<script type="module">
	import { movel } from "./objetos.js";
	import { controle_geral } from "./objetos.js";
	import { configuracoes } from "./mod_bloco.js";
	import { bloco } from "./mod_bloco.js";
	import { usuarios } from "./usuarios.js";
	import { websocketa } from "./websocketa.js";

function insere_bloco(objeto, tipo){
window.controle.central.inatividade = Date.now();

let objeto_itz = new bloco(window.config, null, null, objeto.esquerda, objeto.topo, tipo, objeto.guarda_altura, objeto.guarda_largura, objeto);
objeto.insere_instrucao(objeto_itz);
document.getElementById('programa').style.principal.innerHTML=''; document.getElementById('programa').style.principal.mostra();
scroll_programa(programa);
}

window.insere_bloco = insere_bloco;

window.addEventListener("unload", 
function (){
window.usuarios.logout();
}
);


window.addEventListener("load", 
function () {

window.controle = new controle_geral(document.getElementById("principal")); // principal eh onde estah o tabuleiro
window.controle.espacamento_superior = document.getElementById("comandos").clientHeight; 
window.controle.palco.carrega_json_cenario(); // palco eh onde estah o tabuleiro
window.conexao_socket = new websocketa();
window.conexao_socket.controle = window.controle;
window.controle.socket = window.conexao_socket;

setTimeout(function (){
	window.usuarios = new usuarios(whoami);
window.usuarios.cookie = <?php echo "'".$_COOKIE['BaboRace']."'"; ?>;
window.usuarios.websocket = window.conexao_socket;
window.controle.usuarios = window.usuarios;
window.controle.url_retorna = url_retorna;


window.usuarios.carrega_lista_usuarios();
//alert(window.usuarios.usuario_local.on_line);

while (window.usuarios.usuario_local.on_line=="in" && window.usuarios.cookie == window.usuarios.usuario_local.cookie){ // ja estah logado - note que se o cookie lido no cliente for igual ao da base, deixa logar.
	alert("O usuário "+whoami+" já está logado. Quer tentar mais uma vez?");
	window.usuarios.usuario_local =window.usuarios.usuario.autenticando;
}
console.log("usuario_local");
console.log(window.usuarios.usuario_local);

window.usuarios.login();
//let mensagem_login ='{"tipo":"login","user":"'+window.usuarios.usuarios[window.usuarios.usuario_local.id].apelido+'"}' ;
//window.conexao_socket.manda_mensagem(mensagem_login);
window.usuarios.usuarios[window.usuarios.usuario_local.id].online = "in";
}, 2000);

setTimeout(
function ()
{
window.controle.cria_moveis_dos_usuarios();
}
, 2500
);


setTimeout(function (){
	//alert(window.movel1.estado_prop);
	if (window.controle.central.estado_prop == "falhou"){
	alert("Não foi possível carregar o arquivo: "+window.controle.central.fantasia.src);
	throw new Error ('Não foi possível ler o arquivo de imagem');
	}

	window.controle.inicia_animacao();


var contem =  document.getElementById("contem");
var programa = document.getElementById("programa");
var comandos = document.getElementById("comandos");

var espacamento    = comandos.getBoundingClientRect().height * 0.1;
var correcao_borda = comandos.getBoundingClientRect().height * 0.02;

programa.style.width = contem.getBoundingClientRect().width + "px";
programa.style.height = contem.getBoundingClientRect().height + "px";
//programa.style.height = "600px";
//alert(contem.getBoundingClientRect().width);
//contem.style.width = programa.offsetWidth + "px";
//contem.style.height = programa.offsetHeight; 
	

window.config = new configuracoes(programa, comandos.getBoundingClientRect().height, programa.getBoundingClientRect().width);
//window.config.topo=parseInt(document.getElementById("comandos").getBoundingClientRect().height) * 0.001; // usando comandos como escala
//window.config.altura =  parseInt(document.getElementById("comandos").getBoundingClientRect().height) * 0.5;
//window.config.altura_insercao = parseInt(document.getElementById("comandos").getBoundingClientRect().height) * 0.5;
//window.config.font_ponto_insercao = window.config.altura_insercao/1.1 ;
//window.config.fonte_tamanho = window.config.font_ponto_insercao; 
//window.config.padding_inferior = parseInt(document.getElementById("comandos").getBoundingClientRect().height) * 0.2;
window.bloco1 = new bloco(window.config, null, null, window.config.esquerda, window.config.topo, "principal", window.config.altura, window.config.largura, window.config.elemento_pai);
window.config.movel = window.controle.central;
//	window.controle.central.posicao_percentual_x=window.controle.posicao_inicial_percentual_x; // sempre posicione o movel depois do config
//	window.controle.central.posicao_percentual_y=window.controle.posicao_inicial_percentual_y + window.controle.objetos_em_cena.indexOf(window.controle.central);

window.config_comandos = new configuracoes(comandos, comandos.getBoundingClientRect().height, programa.getBoundingClientRect().width);
//window.config_comandos.topo=parseInt(document.getElementById("comandos").getBoundingClientRect().height) * 0.05;
//window.config_comandos.altura =  parseInt(document.getElementById("comandos").getBoundingClientRect().height) * 0.5;
//window.config_comandos.largura = 200;


window.bloco_repete = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "repeticao_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_repete.face.addEventListener ("click",
function () {window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'repeticao');});
bloco_repete.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_repete.face, window.config_comandos.borderradius);

window.config_comandos.esquerda = window.config_comandos.esquerda + window.config_comandos.largura + espacamento;
window.bloco_va_para_x = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "va_para_x_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_va_para_x.face.addEventListener ("click",
function () {window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'va_para_x');});
bloco_va_para_x.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_va_para_x.face, window.config_comandos.borderradius);

window.config_comandos.esquerda = window.config_comandos.esquerda + window.config_comandos.largura + espacamento;
window.bloco_va_para_y = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "va_para_y_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_va_para_y.face.addEventListener ("click",
function () {window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'va_para_y');});
bloco_va_para_y.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_va_para_y.face, window.config_comandos.borderradius);

window.config_comandos.esquerda = window.config_comandos.esquerda + window.config_comandos.largura + espacamento;
window.bloco_Fx = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "Fx_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_Fx.face.addEventListener ("click",
function () {window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'Fx');});
bloco_Fx.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_Fx.face, window.config_comandos.borderradius);

window.config_comandos.esquerda = window.config_comandos.esquerda + window.config_comandos.largura + espacamento;
window.bloco_Fy = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "Fy_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_Fy.face.addEventListener ("click",
function () {window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'Fy');});
bloco_Fy.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_Fy.face, window.config_comandos.borderradius);

window.config_comandos.esquerda = window.config_comandos.esquerda + window.config_comandos.largura + espacamento;
window.bloco_delay = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "delay_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_delay.face.addEventListener ("click",
function () {window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'delay');});
bloco_delay.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_delay.face, window.config_comandos.borderradius);

window.config_comandos.esquerda = window.config_comandos.esquerda + window.config_comandos.largura + espacamento;
window.bloco_freio = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "freio_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_freio.face.addEventListener ("click",
function () {window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'freio');});
bloco_freio.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_freio.face, window.config_comandos.borderradius);

window.config_comandos.esquerda = window.config_comandos.esquerda + window.config_comandos.largura + espacamento;
window.bloco_desvio = new bloco(config_comandos, null, null, config_comandos.esquerda, config_comandos.topo, "desvio_exemplo", config_comandos.altura, config_comandos.largura, config_comandos.elemento_pai);
window.bloco_desvio.face.addEventListener ("click",
function () {alert("Este comando ainda não está disponível. Aguarde a próxima versão."); return; window.insere_bloco(document.getElementById('programa').style.ponto_de_insercao.elemento_pai, 'desvio');});
bloco_desvio.mostra();
window.config_comandos.largura = ajusta_tamanho_do_exemplo(comandos, window.bloco_desvio.face, window.config_comandos.borderradius);


ajusta_tamanho_componentes_extras(comandos);
ajusta_tamanho_componentes_texto(comandos);


programa.style.principal = bloco1;
programa.style.ponto_de_insercao =  bloco1.ativa_ponto_de_insercao(0);
bloco1.mostra(0);
//ajusta_tamanho_de_todos_exemplos(comandos);


const retamanho = new ResizeObserver(entries => {
        for (const entry of entries) {
setTimeout ( function () 
	{
		ajusta_tamanho_de_todos_exemplos(comandos);
	}, 300);
setTimeout ( function () 
	{
		window.controle.palco.tabuleiro.style.top = "0px";
		window.controle.palco.tabuleiro.style.left = "0px";
		window.controle.central.posicao_percentual_x = window.controle.central.posicao_percentual_x; // para forcar reposicionamento do scroll
	}, 500);

ajusta_tamanho_componentes_extras(comandos);
ajusta_tamanho_componentes_texto(comandos);
window.config.parametro_de_tamanho = comandos.getBoundingClientRect().height;
window.config.parametro_de_largura = programa.getBoundingClientRect().width;
window.config_comandos.parametro_de_tamanho =  comandos.getBoundingClientRect().height;

programa.style.height = contem.getBoundingClientRect().height + "px";
programa.style.width = contem.getBoundingClientRect().width   + "px";
programa.style.principal.innerHTML=''; 
programa.style.principal.mostra();

console.log("Altura: "+document.getElementById("comandos").clientHeight);
        }
});

retamanho.observe(document.body);


	},3500);
});
						//window.movel1.posiciona_percentual(50,50);
    </script>
</body>
</html>

