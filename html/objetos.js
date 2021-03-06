// BaboRace - Desenvolvido por Victor Pellegrini Mammana - 2021_10_16

// é preciso avaliar se transitio="all 0.05s linear" eh realmente necessario para o this.controle.central... serah que eh? 
// cuidado quando coloca animacao em objetos fixos. Por algum motivo corrompe o posicionamento. Eu acredito que seja um problema de timing
// cuidado com o timing de acrescenta_objeto_x

function noSegmento(px, py, qx, qy, rx, ry){

        if (qx <= Math.max(px,rx) && qx >= Math.min(px, rx) && qy <= Math.max(py, ry) && qy >= Math.min(py, ry)) return true;
        return false;

}

function orientacao(px, py, qx, qy, rx, ry){
        var val = (qy - py) * (rx - qx) - (qx - px) * (ry - qy);

        if (val == 0) {return 0;}

        return (val>0)? 1: 2;

}

function interseccao_retas(p1_x, p1_y, q1_x, q1_y, p2_x, p2_y, q2_x, q2_y){
// esta funcao verifica se a reta formada entre p1-q1 intersecta a reta formada entre p2-q2
        var o1=orientacao(p1_x, p1_y, q1_x, q1_y, p2_x, p2_y);
        var o2=orientacao(p1_x, p1_y, q1_x, q1_y, q2_x, q2_y);
        var o3=orientacao(p2_x, p2_y, q2_x, q2_y, p1_x, p1_y);
        var o4=orientacao(p2_x, p2_y, q2_x, q2_y, q1_x, q1_y);

        if (o1 != o2 && o3 != o4){
                return true;
        }

        // Casos Especiais

        if (o1 == 0 && noSegmento(p1_x, p1_y, p2_x, p2_y, q1_x, q1_y)) {return true;}
        if (o2 == 0 && noSegmento(p1_x, p1_y, q2_x, q2_y, q1_x, q1_y)) {return true;}
        if (o3 == 0 && noSegmento(p2_x, p2_y, p1_x, p1_y, q2_x, q2_y)) {return true;}
        if (o4 == 0 && noSegmento(p2_x, p2_y, q1_x, q1_y, q2_x, q2_y)) {return true;}

        return false;
}




function intersect(a, b) { // retorna a interseccao de duas arrays, obtida do stackoverflow https://stackoverflow.com/questions/16227197/compute-intersection-of-two-arrays-in-javascript/16227294#16227294
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}


function doOverlap( l1x, l1y,  r1x, r1y,  l2x, l2y,  r2x, r2y) {
//console.log(l1x+ " - " + l1y+ " - " +  r1x+ " - " + r1y+ " - " +  l2x+ " - " + l2y+ " - " +  r2x+ " - " + r2y);
 	// fonte: geeksforgeeks
        // To check if either rectangle is actually a line
        // For example : l1 ={-1,0} r1={1,1} l2={0,-1} r2={0,1}
 
        if (l1x == r1x || l1y == r1y ||
        l2x == r2x || l2y == r2y) {
            // the line cannot have positive overlap
            return false;
        }
 
        // If one rectangle is on left side of other
        if (l1x >= r2x || l2x >= r1x) {
            return false;
        }
 
        // If one rectangle is above other
        if (r1y <= l2y || r2y <= l1y) {
            return false;
        }
 
        return true;
    }

class sistema_de_colisao {

constructor (largura_tabuleiro, altura_tabuleiro, controle){
	this.controle = controle;
	this.largura_tabuleiro = largura_tabuleiro;
	this.altura_tabuleiro = altura_tabuleiro;
	this.matriz_colisao_x = [];
	this.matriz_colisao_y = [];
	//this.inicializa_matrizes(); Nao precisa inicializar as matrizes se for usar o metodo preenche. Nao eh proibido, mas eh inutil

}

inicializa_matrizes(){
	let i;
  	for (i=0; i < this.largura_tabuleiro + 1; i++) {
		let objetos=[];
		this.matriz_colisao_x.push(objetos);
	}
	let j;
  	for (j=0; j < this.altura_tabuleiro + 1; j++) {
		let objetos=[];
		this.matriz_colisao_y.push(objetos);
	}
}


preenche_matriz_x (){ // preenche a partir de uma lista de objetos cuja colisao tem que ser monitorada. Mas pode ser preenchido de outra forma
// este metodo de preenchimento requer que toda a lista de objetos que colidem seja conhecida a priori e tem que zerar as matrizes
	let i,j;
	this.matriz_colisao_x.length = 0;
	for (i=0; i<this.largura_tabuleiro; i++){
	let objetos = [];
	  for (j=0; j < this.controle.objetos_que_colidem.length; j++) {
		let objeto = this.controle.objetos_que_colidem[j];
		let img_no_div = objeto.lista_de_fantasias[objeto.fantasia - 1];
		if ( i >= parseInt(img_no_div.style.left.replace("px","")) && i <= (parseInt(img_no_div.style.left.replace("px","")) + img_no_div.width))
			{ objetos.push(j); }
	  }
	this.matriz_colisao_x.push(objetos);
	}
	
}

preenche_matriz_y (){ // preenche a partir de uma lista de objetos cuja colisao tem que ser monitorada. Mas pode ser preenchido de outra forma
// este metodo de preenchimento requer que toda a lista de objetos que colidem seja conhecida a priori

	let i,j;
	this.matriz_colisao_y.length = 0;
	for (i=0; i<this.altura_tabuleiro; i++){
	let objetos = [];
	  for (j=0; j < this.controle.objetos_que_colidem.length; j++) {
		let objeto = this.controle.objetos_que_colidem[j];
		let img_no_div = objeto.lista_de_fantasias[objeto.fantasia - 1];
		if ( i >= parseInt(img_no_div.style.top.replace("px","")) && i <= (parseInt(img_no_div.style.top.replace("px","")) + img_no_div.height))
			{ objetos.push(j); }
	  }
	this.matriz_colisao_y.push(objetos);
	}
	
}

acrescenta_objeto_x (left, right, id){
	console.log(left + " - " + right + " - " + id);
	let i;
	for (i = left; i<= right; i++) {
		this.matriz_colisao_x[i].push(id);
	}

}

acrescenta_objeto_y (top, bottom, id){
console.log(top + " % " + " % " + bottom );
	let i;
	for (i = top; i<= bottom; i++) {
		this.matriz_colisao_y[i].push(id);
		}
}

retorna_colisao(x,y){

//console.log("x");
//console.log(this.matriz_colisao_x[x]);
//console.log("y");
//console.log(this.matriz_colisao_y[y]);

if (x < 0) {x =1;}
if (x >= this.controle.tabuleiro.clientWidth) { x = this.controle.tabuleiro.clientWidth -1;}
if (y < 0) {y = 1;}
if (y >= this.controle.tabuleiro.clientHeight) { y = this.controle.tabuleiro.clientHeight -1;}

return intersect(this.matriz_colisao_x[x], this.matriz_colisao_y[y]);

}


} // fim class sistema_de_colisao

export class controle_geral {

constructor (div){
	this.posicao_inicial_percentual_x = 10;
	this.toggle_comandos_programa = "comandos"; // define se as setas selecionam comandos ou programas
	this.opacidade_selecionado =0.9;
	this.opacidade_nao_selecionado = 0.9;
	this.borda_selecionado ="5px solid yellow";
	this.borda_nao_selecionado = "1px solid black";
	this.posicao_inicial_percentual_y = 82;
	this.largura_inicial_percentual = 3;
	this.altura_inicial_percentual = 3;
	this.proporcao_inicial = 1.5;
	this.velocidade_limite = 0.003; // velocidade a partir da qual não vale mais a pena mandar pelo websocket
	this.periodo_envio_websocket = 5; // reduz a taxa de envio para o websocket	
	this.casas_decimais = 4; // casas decimais no websocket
	this.conta_animation_steps = 0;
	this.socket = null;
	this.forca_x = 100;
	this.limite_inatividade = 1800000; // 1 minuto de inatividade derruba o usuario
	this.forca_y = 100;
	this.auto_increment=0; // usado para gerar ids
	this.fator_thrust_height = 0.3;	
	this.fator_thrust_width  = 0.3;
	this.tabuleiro = div;
	this.selecionado = null; // objeto que estah sendo programado ou controlado
	this.pronto_para_animar=false; // espera ficar pronto para animar
	this.guarda_atrito       = 2; // coeficiente de atrito para todos os objetos deslizantes
	this.guarda_atrito_freio = 10;
	this.objetos_em_cena = []; // todos os objetos em cena que precisam ser animados
	this.objetos_fixos = []; // todos os objetos que nao precisam ser animados -> cenario
	this.objetos_remotos = []; // todos os moveis vinculados a usuarios que tem a posicao definida por clientes remotos
	this.objetos_que_colidem = [];
	this.delta_t_animacao=100; // tempo de repeticao do algoritmo de anomacao (setInterval)
	this.delta_t_simulacao= 0.01; // tempo de simulacao
	let that = this;
	this.palco = null;
	this.guarda_central = this.selecionado; // por enquanto null e soh pode ser definido pela propriedade
	this.espacamento_superior = 0;
	this.palco = new classe_palco(this.tabuleiro, null, this);
	this.palco.adiciona_event_listeners();
	this.sistema_de_colisao = new sistema_de_colisao (this.tabuleiro.offsetWidth, this.tabuleiro.offsetHeight, this);
	this.nome_imagem_thrust="fogo_victor.png";
	this.conta_frames = 0;
	this.intervalo_frames_troca_fantasia = 4;
	this.usuarios = null;
	this.url_retorna;
}

cria_moveis_dos_usuarios (){
let i=0;
let objeto_em_cena;
for (let key in this.usuarios.usuarios)
{
 if (Object.prototype.hasOwnProperty.call(this.usuarios.usuarios, key)) {
 if (key != "length") {
//              let objeto_em_cena = window.controle.objetos_em_cena[i];
                let userman = this.usuarios.usuarios[key];
//console.log("userman");
//console.log(userman);
//                if (userman.online == "in") 
//{
                let primeira_fantasia = userman.id_fantasia;
                if (userman.id_usuario == this.usuarios.usuario_local.id) 
                        { 
                                objeto_em_cena = new movel("movel_"+userman.id, userman.imagem, userman.nome_fantasia, this, "movel", "img","falta_algoritmo_para_sofre_colisao");
                                //objeto_em_cena.usuario=
                                this.selecionado = objeto_em_cena; 
                                this.central = objeto_em_cena;  
                        }
                        else
                        {
                                objeto_em_cena = new movel("remoto_"+userman.id, userman.imagem, userman.nome_fantasia, this, "remoto", "img","falta_algoritmo_para_sofre_colisao");
                        }
                objeto_em_cena.usuario = userman.nome_registrado;
                objeto_em_cena.id_fantasia = userman.id_fantasia;
                objeto_em_cena.id_usuario = userman.id_usuario;
                //objeto_em_cena.largura_percentual = this.largura_inicial_percentual;
                //objeto_em_cena.altura_percentual = this.altura_inicial_percentual;
		objeto_em_cena.proporcao = this.proporcao_inicial;
		objeto_em_cena.posicao_percentual_x = userman.x_inicial;
		objeto_em_cena.posicao_percentual_y = userman.y_inicial;

                for (let key2 in this.usuarios.lista_de_fantasias[userman.id_usuario]){
                         if (Object.prototype.hasOwnProperty.call(this.usuarios.lista_de_fantasias[userman.id_usuario], key2)) {
                         if (key2 != "length") {
                                let fantasy =   this.usuarios.lista_de_fantasias[userman.id_usuario][key2];
                                if (fantasy.id_fantasia != primeira_fantasia) {objeto_em_cena.acrescenta_fantasia(fantasy.imagem, fantasy.nome_fantasia);}
                         }
                }
                i++;
 }
//}
}

}
}
} // cria_moveis_dos_usuarios



set central(objeto){
	this.guarda_central = objeto;
	if (this.palco == null ) {alert("Erro: Por algum motivo o palco nao foi criado.");}
	else {this.palco.central = objeto;}
}

get central() {
	return this.guarda_central;
}

correcao_de_palco(){
 	this.palco.corrige_palco(parseInt(this.central.lista_de_fantasias[this.central.fantasia - 1].style.left.replace("px","")),parseInt(this.central.lista_de_fantasias[this.central.fantasia - 1].style.top.replace("px","")));
}

inicia_animacao(){
	let that=this;
	this.sistema_de_colisao.preenche_matriz_x();
	this.sistema_de_colisao.preenche_matriz_y();

	//this.animacao = setInterval(function () { that.animar();}, that.delta_t_animacao);
	this.animar(this);
}

animar(that) {
requestAnimationFrame(function () {that.animar(that);});
if (that.palco == null) { return;}
if ( that.pronto_para_animar == false) { return;} // ainda nao tem os imgs para animar
if (that.guarda_central == null) {that.guarda_central = that.selecionado;}
let i;

if ( that.central.guarda_vx !=0 || that.central.guarda_vy !=0 ) { // para otimizar performance
	that.central.inatividade=Date.now();
}

if (Date.now() - that.central.inatividade > that.limite_inatividade) {
	that.usuarios.logout();
	window.open(that.url_retorna,"_self");
		
}

	for (i=0; i < that.objetos_em_cena.length; i++){
		
		let objeto = that.objetos_em_cena[i];
			objeto.guarda_vx = objeto.guarda_vx + objeto.guarda_ax * that.delta_t_simulacao;
			objeto.guarda_ax = - objeto.guarda_vx * (objeto.atrito + (objeto.freio * objeto.guarda_atrito_freio));
			objeto.guarda_vy = objeto.guarda_vy + objeto.guarda_ay * that.delta_t_simulacao;
			objeto.guarda_ay = - objeto.guarda_vy * (objeto.atrito + (objeto.freio * objeto.guarda_atrito_freio));
			if (Math.abs(objeto.guarda_vx) < this.velocidade_limite) { objeto.guarda_vx = 0;} // mata um resquicio de velocidade o que vai melhorar a performance
			if (Math.abs(objeto.guarda_vy) < this.velocidade_limite) { objeto.guarda_vy = 0;}

			if ( objeto.guarda_vx !=0 || objeto.guarda_vy !=0 ) { // para otimizar performance
				if (that.conta_animation_steps >= that.periodo_envio_websocket){
				that.socket.msg_posicao(objeto.usuario, objeto.id_usuario, objeto.id_fantasia, objeto.posicao_percentual_x.toFixed(that.casas_decimais), objeto.posicao_percentual_y.toFixed(that.casas_decimais));
				that.conta_animation_steps = 0;
				}
				else
				{
				that.conta_animation_steps++;
				}
				objeto.velho_x = parseInt(objeto.lista_de_fantasias[objeto.fantasia -1].style.left.replace("px","")); // importante para a colisao: vai determinar a direcao do "ricochete"
				objeto.velho_y = parseInt(objeto.lista_de_fantasias[objeto.fantasia -1].style.top.replace("px",""));
	
				objeto.posicao_percentual_x = objeto.posicao_percentual_x + objeto.guarda_vx * that.delta_t_simulacao;
				objeto.posicao_percentual_y = objeto.posicao_percentual_y + objeto.guarda_vy * that.delta_t_simulacao;
				var valores_de_k = objeto.retorna_colisao_movel();
				objeto.guarda_vx = valores_de_k.kx * objeto.guarda_vx;
				objeto.guarda_vy = valores_de_k.ky * objeto.guarda_vy;

			}
			objeto.freio = 0;
	
	
	} // fim for
} // fim metodo animacao

set atrito_freio(valor) {
	this.guarda_atrito_freio=valor;
let i;

	for (i=0; i < this.objetos_em_cena.length; i++){
		
		let objeto = this.objetos_em_cena[i];
		objeto.atrito_freio = this.guarda_atrito_freio;

	}

}

get atrito_freio(){
	return this.guarda_atrito_freio;
}

set atrito_geral(valor) { // quando esta propriedade eh definida, sobescreve os atritos de todos os objetos em cena
	this.guarda_atrito=valor;
let i;

	for (i=0; i < this.objetos_em_cena.length; i++){
		
		let objeto = this.objetos_em_cena[i];
		objeto.atrito = this.guarda_atrito;

	}
} // fim class controle_geral

get atrito_geral(){
	return this.guarda_atrito;
}
}

export class classe_palco{

constructor (div, movel_central, controle) {
	
	this.tabuleiro = div;
	this.central = movel_central;
	this.borda_scroll_x = 25; // percentual da tela proibida para o movel ficar (e portanto eh preciso fazer scroll)
	this.borda_scroll_y = 15;
	this.tabuleiro.style.top = 0 + "px";
	this.tabuleiro.style.left = 0 + "px";
	this.controle = controle;
	this.cenario_json = null;
	
}



carrega_objetos_cenario(){ // carrega os objetos do cenario a partir do json que foi lido no servidor. Estes objetos nao serao animados (serao fixos)
var i;
for (i=0; i<this.cenario_json.pontos.length; i++){
	var ponto=this.cenario_json.pontos[i];
	var objeto_do_cenario = new movel("parede_bloco_"+i, "../fantasias/parede_pequena.jpeg", "parede_bloco_"+i, this.controle, "fixo", "img","sofre_colisao", this.chama_de_volta);
	//console.log(i+") auto: "+this.controle.auto_increment);
	let largura = Math.abs(ponto.right_percentual -  ponto.left_percentual  );
	let altura  = Math.abs(ponto.top_percentual   -  ponto.bottom_percentual);
	objeto_do_cenario.posicao_percentual_x = parseFloat(ponto.left_percentual) + parseFloat(largura) / 2;
	objeto_do_cenario.posicao_percentual_y = parseFloat(ponto.top_percentual) + parseFloat(altura) /2;
	objeto_do_cenario.largura_percentual = parseFloat(largura) ;
	objeto_do_cenario.altura_percentual =  parseFloat(altura);
	
}
}

carrega_json_cenario(){


var resposta="";
var url='../php/read_json.php?arquivo=mapa_gigante_percentual.json';

let that = this;
var oReq=new XMLHttpRequest();
           oReq.open("GET", url, false);
           oReq.onload = function (e) {
                     that.cenario_json=JSON.parse(oReq.responseText);
		     setTimeout(function () {that.carrega_objetos_cenario();}, 100);
                     }
           oReq.send();

}

adiciona_event_listeners(){
//document.body.tabuleiro.tabIndex=0;
//document.body.tabuleiro.focus();
//let that=this;
//document.body.addEventListener( "keydown", 
//function (e) { 
////console.log(e.key);
//if (e.key == "ArrowRight") { console.log(e.key); that.central.Fx =   that.controle.forca_x; that.controle.palco.tabuleiro.focus();}
//if (e.key == "ArrowLeft")  { console.log(e.key); that.central.Fx = - that.controle.forca_x; that.controle.palco.tabuleiro.focus();}
//if (e.key == "ArrowUp")    { console.log(e.key); that.central.Fy =   that.controle.forca_y; that.controle.palco.tabuleiro.focus();}
//if (e.key == "ArrowDown")  { console.log(e.key); that.central.Fy = - that.controle.forca_y; that.controle.palco.tabuleiro.focus();}
//if (e.key == " ") { that.central.freio = 1;}
//
//
//}, true)


}


corrige_palco(x_itz, y_itz) {

	if (this.central == null) { console.log("corrige_palco nao estah rodando porque o central nao foi definido"); return;}
	if (this.central.lista_de_fantasias.length < 1) {console.log("O central nao tem fantasias."); return;}
	var dx = 0;
	var dy = 0;
	
	var largura_tela = document.body.clientWidth;  
	var  altura_tela = document.body.clientHeight - this.controle.espacamento_superior; // para descontar o menu horizontal no topo da pagina 
	//alert("largura: "+largura_tela+"altura_tela: "+altura_tela);
	var mobile = this.central.lista_de_fantasias[this.central.fantasia - 1];
//	mobile.style.transition = "none";
// as posicoes  abaixo se referem aa posicao do movel
	var posicao_no_div_x_left =   parseInt(x_itz); 
	var posicao_no_div_x_right =  parseInt(x_itz) + mobile.width; 
	var posicao_no_div_y_top =    parseInt(y_itz); 
	var posicao_no_div_y_bottom = parseInt(y_itz) + mobile.height; 

	var posicao_na_tela_x_left  =  posicao_no_div_x_left +   parseInt( this.tabuleiro.style.left.replace("px","")); 
	var posicao_na_tela_x_right =  posicao_no_div_x_right +  parseInt( this.tabuleiro.style.left.replace("px","")); 
	var posicao_na_tela_y_top =    posicao_no_div_y_top +    parseInt( this.tabuleiro.style.top.replace("px","")); 
	var posicao_na_tela_y_bottom = posicao_no_div_y_bottom + parseInt( this.tabuleiro.style.top.replace("px","")); 
	var borda_proibida_x =  Math.round(largura_tela * this.borda_scroll_x/100);
	var borda_proibida_y =  Math.round( altura_tela * this.borda_scroll_y/100);

	if ( posicao_na_tela_x_left < borda_proibida_x ) {dx = ( borda_proibida_x - posicao_na_tela_x_left );}
	if ( posicao_na_tela_x_right > largura_tela - borda_proibida_x ) {dx = ( (largura_tela - borda_proibida_x) - posicao_na_tela_x_right );}

	if ( posicao_na_tela_y_top < borda_proibida_y + this.controle.espacamento_superior ) {dy = ( (borda_proibida_y + this.controle.espacamento_superior) - posicao_na_tela_y_top );}
	if ( posicao_na_tela_y_bottom > altura_tela - borda_proibida_y ) {dy = ( (altura_tela - borda_proibida_y) - posicao_na_tela_y_bottom );}

	if (dx !=0 ) {
		this.tabuleiro.style.left = parseInt(this.tabuleiro.style.left.replace("px","")) + dx + "px";
		}
		

	
	if (dy !=0  ) {
		this.tabuleiro.style.top = parseInt(this.tabuleiro.style.top.replace("px","")) + dy + "px";
		}
	let that=this;	
		window.requestAnimationFrame(
		function (){
			mobile.style.top  = y_itz + "px";
			mobile.style.left = x_itz + "px" ;

// o if abaixo foi a melhor configuracao que consegui para tentar animar as rodinhas do carrinho, usando puxando uma fantasia depois da outra. Mas estava ficava imprevisivel para velocidades muito altas - ficaremos sem a animacao das rodinhas
//		if (
//
//( Math.abs(parseInt(mobile.style.top.replace("px","")) -that.central.velho_y)> 1 ||   Math.abs(parseInt(mobile.style.left.replace("px","")) - that.central.velho_x)>1 ) &&
//( Math.abs(parseInt(mobile.style.top.replace("px","")) -that.central.velho_y)<3) &&  ( Math.abs(parseInt(mobile.style.left.replace("px","")) - that.central.velho_x)<3 )
// 
////(Math.abs(that.central.guarda_vx) >0.5 || Math.abs(that.central.guarda_vy) > 0.5) 
//// && ( (that.controle.conta_frames % that.controle.intervalo_frames_troca_fantasia == 0)) 
//	) {
//	console.log(" frames: " + that.controle.conta_frames);
//
//	that.central.velho_fantasia=that.central.fantasia;
//	that.central.fantasia++;
//
//	if (that.central.fantasia > that.central.lista_de_fantasias.length) {that.central.fantasia = 1;} // verificar isso aqui. nao testado
//	that.central.lista_de_fantasias[that.central.fantasia -1].style.top = mobile.style.top; 
//	that.central.lista_de_fantasias[that.central.fantasia -1].style.left = mobile.style.left; 
//	mobile.style.visibility = "hidden";
//	that.central.lista_de_fantasias[that.central.fantasia - 1].style.visibility = "visible";
//}

	that.controle.conta_frames++;
			that.central.img_imagem_thrust.style.top    = parseInt(y_itz) + parseInt(that.central.correcao_thrust_y) + "px";
			//console.log("thrust y: "+that.central.img_imagem_thrust.style.top); 
			that.central.img_imagem_thrust.style.left   = parseInt(x_itz + parseInt(that.central.correcao_thrust_x)) + "px"; 
			//console.log("thrust x: "+ that.central.img_imagem_thrust.style.top); 

		});
		
		



		//this.tabuleiro.style.top  = parseInt(this.tabuleiro.style.top.replace("px","") )  + dy + "px";
	
//mobile.style.visibility="visible";

}

}


export class movel {
   estado="indefinido";

constructor (id, arquivo, nome_fantasia, controle, tipo_objeto, tipo_tag, sofre_colisao, chama_de_volta){ // tipo tag determina se eh um IMG ou um DIV que guarda a fantasia
	this.inatividade=Date.now();
	this.chama_de_volta = chama_de_volta;
	this.tipo_tag = tipo_tag;
	this.controle = controle;
	this.automatiza=null;
	this.automatiza_giros=null;
	this.usuario = "";
	this.id_fantasia = -1;
	this.id_usuario = -1;
	this.razao_de_aspecto = 1;
	
	this.guarda_rotacao = 0;

	this.controle.auto_increment++;
	this.id = this.controle.auto_increment;

	this.delta_t=10; // ms

	this.guarda_atrito = controle.atrito_geral;
	this.guarda_atrito_freio = controle.guarda_atrito_freio;
        this.freio = 0;
	this.massa=0.5;

	this.guarda_vx=0;
	this.guarda_vy=0;
	this.guarda_ax=0;
	this.guarda_ay=0;
	this.guarda_Fx=0;
	this.guarda_Fy=0;
		
	this.max_tentativas_de_definir_tamanho = 30;
	this.tentativas_de_definir_tamanho = 0;	
	this.max_tentativas_de_definir_proporcao = 30;
	this.tentativas_de_definir_proporcao = 0;	
	this.max_tentativas_de_definir_posicao = 30;
	this.tentativas_de_definir_posicao = 0;	

	this.img_imagem_thrust = null;
	this.lista_de_detecao=[];
	this.lista_de_fantasias=[];
	this.velho_fantasia=0;
	this.fantasia=0; // zero indica que não tem fantasia

	this.conta_passos=0;

	this.topo      = 0; // top
	this.baixo     = 0; // bottom
	this.esquerda  = 0; // left
	this.direita   = 0; // right

	this.elemento_colisao_top_esq = -1;
	this.elemento_colisao_top_dir = -1;
	this.elemento_colisao_bax_esq = -1;
	this.elemento_colisao_bax_dir = -1;

	this.conta_giros=0;

	this.largura_container=document.getElementById("principal").clientWidth;
	this.altura_container=document.getElementById("principal").clientHeight;
	this.guarda_proporcao = 100;
	this.guarda_largura_percentual=100;
	this.guarda_altura_percentual=100;
	this.guarda_posicao_percentual_x = 50;
	this.guarda_posicao_percentual_y = 50;

	this.velho_x = 0; 
	this.velho_y = 0; 

	this.tipo_objeto = tipo_objeto;
	this.sofre_colisao = sofre_colisao;
	//console.log("colisaoi2: "+sofre_colisao);
	
	if (this.tipo_objeto == "remoto")   { this.controle.objetos_remotos.push(this);}
	if (this.tipo_objeto == "movel")   { this.controle.objetos_em_cena.push(this);}
	if (this.tipo_objeto == "fixo") { this.controle.objetos_fixos.push(this);}
	if (this.sofre_colisao == "sofre_colisao") { let temp = this.controle.objetos_que_colidem.push(this);
							this.id_colisao  = temp - 1;
							}
	else {this.id_colisao = -1000;}
	this.acrescenta_imagem_thrust(this.controle.nome_imagem_thrust, arquivo, nome_fantasia);

}

set atrito(valor) {
	this.guarda_atrito = valor;
}

get atrito() {
	return this.guarda_atrito;
}

set Fx(valor) {
	this.guarda_Fx = valor;
	this.impulso(this.guarda_Fx, 0);
	this.guarda_Fx = 0;
	if (valor != 0) {	
		if (valor > 0){
			this.img_imagem_thrust.style.transform="rotate(0deg)";
			this.correcao_thrust_x = - this.img_imagem_thrust.width;
			this.correcao_thrust_y = this.lista_de_fantasias[this.fantasia - 1].height /2;
			
		}
		if (valor < 0){
			this.img_imagem_thrust.style.transform="rotate(180deg)";
			this.correcao_thrust_x = this.lista_de_fantasias[this.fantasia - 1].width;
			this.correcao_thrust_y = this.lista_de_fantasias[this.fantasia - 1].height /2;
		}
	this.img_imagem_thrust.style.visibility = "visible";
	let that = this;
	setTimeout(
		function () {
			that.img_imagem_thrust.style.visibility = "hidden";		
		}, 500
	)
	}

}

set Fy(valor) {
	this.guarda_Fy = valor;
	this.impulso(0, this.guarda_Fy);
	this.guarda_Fy = 0;
	if (valor != 0) {	
		if (valor < 0){
			this.img_imagem_thrust.style.transform="rotate(90deg)";
			this.correcao_thrust_y = - this.img_imagem_thrust.height;
			this.correcao_thrust_x =  this.lista_de_fantasias[this.fantasia - 1].width /2;
		}
		if (valor > 0){
			this.img_imagem_thrust.style.transform="rotate(270deg)";
			this.correcao_thrust_y =   this.lista_de_fantasias[this.fantasia - 1].height;
			this.correcao_thrust_x =  this.lista_de_fantasias[this.fantasia - 1].width /2;
		}
	this.img_imagem_thrust.style.visibility = "visible";
	let that = this;
	setTimeout(
		function () {
			that.img_imagem_thrust.style.visibility = "hidden";		
		}, 500
	)
	}

}

get Fx(){
	return this.guarda_Fx;
}

get Fy(){
	return this.guarda_Fy;
}

impulso (fx,fy) {
	this.guarda_ax = fx / this.massa;	
	this.guarda_ay = fy / this.massa;	

}

atualiza_fantasia() {
if (this.lista_de_fantasias.length < 1) {return;}
	if (this.velho_fantasia != this.fantasia) {
		if ( this.velho_fantasia >0 ) { this.lista_de_fantasias[this.velho_fantasia - 1].style.visibility = "hidden";
		this.lista_de_fantasias[this.fantasia - 1].style.top = this.lista_de_fantasias[this.velho_fantasia - 1].style.top;
		this.lista_de_fantasias[this.fantasia - 1].style.left = this.lista_de_fantasias[this.velho_fantasia - 1].style.left;
		}
		this.lista_de_fantasias[this.fantasia - 1].style.visibility = "visible";
		
		this.velho_fantasia = this.fantasia;
	}

}

set fantasia_atual(valor){
	this.fantasia=valor;
	this.tamanho_percentual(this.guarda_largura_percentual, this.guarda_altura_percentual);
}

get fantasia_atual(){
	return this.fantasia;
}

get rotacao(){
	return this.guarda_rotacao;
}

set rotacao(graus){
	this.rotaciona(graus);
	this.guarda_rotacao = graus;
}

get estado_prop() {
	return this.estado;
}

set estado_prop(valor) {
	this.estado=valor;
}

get largura_percentual (){
	return this.guarda_largura_percentual;
}

get altura_percentual (){
	return this.guarda_altura_percentual;
}

get proporcao(){
	return this.guarda_proporcao;
}

set proporcao(value){
	this.tamanho_proporcional(value);
}

set largura_percentual (value){
	this.tamanho_percentual(value,this.guarda_altura_percentual);
}

set altura_percentual (value){
	this.tamanho_percentual(this.guarda_largura_percentual,value);
}

set posicao_percentual_x (value){
	this.posiciona_percentual(parseFloat(value),this.guarda_posicao_percentual_y);
}

set posicao_percentual_y (value){
	this.posiciona_percentual(this.guarda_posicao_percentual_x,parseFloat(value));
}

get posicao_percentual_x (){
	return this.guarda_posicao_percentual_x;
}

get posicao_percentual_y (){
	return this.guarda_posicao_percentual_y;
}

achou_imagem(){
	this.estado="sucesso";
}

check_entrou_pelo_sul(indice, x_in, y_in, x_out, y_out){ // x/y_in -> ponto que penetrou o obstaculo ; x/y_out -> ponto que nao penetrou o obstaculo
// indice indica o indice do obstaculo atingido no contexto da lista objetos_que_colidem
let objeto = this.controle.objetos_que_colidem[indice];
let p1_x = objeto.esquerda;
let p1_y = objeto.baixo;
let q1_x = objeto.direita;
let q1_y = objeto.baixo;
return interseccao_retas(p1_x, p1_y, q1_x, q1_y, x_in, y_in, x_out, y_out);
}

check_entrou_pelo_norte(indice, x_in, y_in, x_out, y_out){ // x/y_in -> ponto que penetrou o obstaculo ; x/y_out -> ponto que nao penetrou o obstacul
let objeto = this.controle.objetos_que_colidem[indice];
let p1_x = objeto.esquerda;
let p1_y = objeto.topo;
let q1_x = objeto.direita;
let q1_y = objeto.topo;
return interseccao_retas(p1_x, p1_y, q1_x, q1_y, x_in, y_in, x_out, y_out);
}

check_entrou_pelo_leste(indice, x_in, y_in, x_out, y_out){ // x/y_in -> ponto que penetrou o obstaculo ; x/y_out -> ponto que nao penetrou o obstacul
let objeto = this.controle.objetos_que_colidem[indice];
let p1_x = objeto.direita;
let p1_y = objeto.topo;
let q1_x = objeto.direita;
let q1_y = objeto.baixo;
return interseccao_retas(p1_x, p1_y, q1_x, q1_y, x_in, y_in, x_out, y_out);
}

check_entrou_pelo_oeste(indice, x_in, y_in, x_out, y_out){ // x/y_in -> ponto que penetrou o obstaculo ; x/y_out -> ponto que nao penetrou o obstacul
let objeto = this.controle.objetos_que_colidem[indice];
let p1_x = objeto.esquerda;
let p1_y = objeto.topo;
let q1_x = objeto.esquerda;
let q1_y = objeto.baixo;
return interseccao_retas(p1_x, p1_y, q1_x, q1_y, x_in, y_in, x_out, y_out);

}


retorna_colisao_movel() { // retorna qual velocidade deve ser invertida: x ou y?
let that = this;
this.elemento_colisao_top_esq = this.controle.sistema_de_colisao.retorna_colisao(this.esquerda, this.topo);
//console.log(this.elemento_colisao_top_esq);
let itz_top_esq = this.elemento_colisao_top_esq.filter( function(item) { return item !== that.id_colisao;});
//console.log(" -> "+this.elemento_colisao_top_esq.length);

this.elemento_colisao_top_dir = this.controle.sistema_de_colisao.retorna_colisao(this.direita, this.topo);
let itz_top_dir = this.elemento_colisao_top_dir.filter( function(item) { return item !== that.id_colisao;});

this.elemento_colisao_bax_esq = this.controle.sistema_de_colisao.retorna_colisao(this.esquerda, this.baixo);
let itz_bax_esq = this.elemento_colisao_bax_esq.filter( function(item) { return item !== that.id_colisao;});

this.elemento_colisao_bax_dir = this.controle.sistema_de_colisao.retorna_colisao(this.direita, this.baixo);
let itz_bax_dir = this.elemento_colisao_bax_dir.filter( function(item) { return item !== that.id_colisao;});

let x_out, x_in, y_out, y_in, indice;

if (this.elemento_colisao_top_esq.length >0) { // isto aqui indica a certeza de que este canto bateu
		let interseccao1 = intersect( itz_top_esq, itz_top_dir ); // verifica se os dois cantos bateram no mesmo obstaculo. Nesse caso eh facil saber a direcao do ricochete. Isto acelera o algoritmo
		if ( interseccao1.length > 0 ) { console.log("intersecao -> "+interseccao1+" id:"+this.id_colisao); return {kx:1, ky:-1}; }// 2 cantos no mesmo obstaculo
		let interseccao2 = intersect( itz_top_esq, itz_bax_esq );
		if ( interseccao2.length > 0 ) { return {kx:-1, ky:1}; }
		else { // aqui eh certo que o canto top_esq bateu bateu no obstaculo X e o itz_bax_esq nao bateu no obstaculo X (pode ter batido em outro)
			indice = this.elemento_colisao_top_esq[0]; // indice do canto que com certeza bateu, no contexto da lista objetos_que_colidem
			x_in = this.esquerda;
			y_in = this.topo;
			x_out = this.velho_x;
			y_out = this.velho_y;
			if (   this.check_entrou_pelo_sul(indice, x_in, y_in, x_out, y_out) ) { return {kx:  1,ky: -1}; };
			if ( this.check_entrou_pelo_leste(indice, x_in, y_in, x_out, y_out) ) { return {kx: -1,ky:  1}; } ;
		}
	}

if (this.elemento_colisao_bax_dir.length >0) {
		let interseccao3 = intersect( itz_top_dir, itz_bax_dir );
		if ( interseccao3.length > 0 ) { return {kx:-1, ky:1}; }
		let interseccao4 = intersect( itz_bax_dir, itz_bax_esq );
		if ( interseccao4.length > 0 ) { return {kx:1, ky:-1}; }
		else {
			indice = this.elemento_colisao_bax_dir[0];
			x_in = this.direita;
			y_in = this.baixo;
			x_out = this.velho_x + this.lista_de_fantasias[this.fantasia -1].width;
			y_out = this.velho_y + this.lista_de_fantasias[this.fantasia -1].height;
			if ( this.check_entrou_pelo_norte(indice, x_in, y_in, x_out, y_out) ) { return {kx:  1,ky: -1}; };
			if ( this.check_entrou_pelo_oeste(indice, x_in, y_in, x_out, y_out) ) { return {kx: -1,ky:  1}; } ;
		}
	}

if (this.elemento_colisao_top_dir.length >0) { // ainda existe a chace de a colisao ter sido com esse canto... faca a analise logica voce mesmo
			indice = this.elemento_colisao_top_dir[0];
			x_in = this.direita;
			y_in = this.topo;
			x_out = this.velho_x + this.lista_de_fantasias[this.fantasia -1].width;
			y_out = this.velho_y;
			if (   this.check_entrou_pelo_sul(indice, x_in, y_in, x_out, y_out) ) { return {kx:  1,ky: -1}; };
			if ( this.check_entrou_pelo_oeste(indice, x_in, y_in, x_out, y_out) ) { return {kx: -1,ky:  1}; } ;
}

if (this.elemento_colisao_bax_esq.length >0) { // ainda existe a chace de a colisao ter sido com esse canto... faca a analise logica voce mesmo
			indice = this.elemento_colisao_bax_esq[0];
			x_in = this.esquerda;
			y_in = this.baixo;
			x_out = this.velho_x;
			y_out = this.velho_y + this.lista_de_fantasias[this.fantasia -1].height;
			if ( this.check_entrou_pelo_norte(indice, x_in, y_in, x_out, y_out) ) { return {kx:  1,ky: -1}; };
			if ( this.check_entrou_pelo_leste(indice, x_in, y_in, x_out, y_out) ) { return {kx: -1,ky:  1}; } ;
}

return {kx: 1, ky: 1};

}

nao_achou_imagem(){
	this.estado="falhou";
	alert("Nao conseguiu carregar imagem.");
}

rotaciona (graus){
	this.lista_de_fantasias[this.fantasia - 1].style.transform="rotate(" + graus + "deg)";
	this.atualiza_fantasia();
}

posiciona_percentual(x,y){
//console.log("Tentativa: " + this.tentativas_de_definir_posicao);
	// talvez fosse legal pegar de novo o valor da largura do container caso o usuario mude o tamanho da janela depois que o jogo comecou
	if (this.largura_container >= this.altura_container) {
		var fator_x = 100;
		var fator_y = this.altura_container / this.largura_container *100;
	}

	if (this.largura_container < this.altura_container) {
		var fator_y = 100;
		var fator_x = this.largura_container / this.altura_container * 100;
	}

	this.guarda_posicao_percentual_x=x;
	this.guarda_posicao_percentual_y=y;

if (this.lista_de_fantasias.length > 0) {

	let largura_itz = this.lista_de_fantasias[this.fantasia - 1].width;
	let  altura_itz = this.lista_de_fantasias[this.fantasia - 1].height;

	let x_itz = Math.round(this.largura_container * x/fator_x - largura_itz/2);
	let y_itz = Math.round(((this.altura_container) - (this.altura_container) * y/ fator_y ) - altura_itz/2);
	
//	if (this.tipo_objeto == "movel") {this.lista_de_fantasias[this.fantasia - 1].style.transition = "all 0.05s linear";} // se o objeto eh fixo e demora para carregar, essa animacao dah problema... 
	this.tentativas_de_definir_posicao = 0;
	
	if (this == this.controle.central && this != null && this != undefined && this !="undefined" ) { // esse if eh para evitar que o movel fique chacoalhando quando bate no final da tela. Talvez com a requestAnimationFrame recem incluido, não precise mais disso (2021_10_14)
// XXX		this.lista_de_fantasias[this.fantasia - 1].style.transition = "all 0.05s linear";
		this.controle.palco.corrige_palco(x_itz, y_itz);

	}
	else
	{
		this.lista_de_fantasias[this.fantasia - 1].style.top  = y_itz + "px"; 
		this.lista_de_fantasias[this.fantasia - 1].style.left = x_itz + "px" ;

	}
	
	this.esquerda = x_itz;
	this.topo     = y_itz;
	this.direita  = x_itz + largura_itz;
	this.baixo    = y_itz + altura_itz;

	this.atualiza_fantasia();
} else {
	this.tentativas_de_definir_posicao++; // caso a lista de fantasias esteja vazia, pode ser por conta de demorar para carregar do servidor, entao tem que tentar + 1 vez
	if (this.tentativas_de_definir_posicao < this.max_tentativas_de_definir_posicao) { let that=this; setTimeout(function () {that.posiciona_percentual(x,y);}, 100)}
	else {alert("Nao foi possivel definir a posicao da fantasia. Provavelmente o tempo de carga da fantasia estah muito longo.");}
}

}

tamanho_proporcional(proporcao){
	this.guarda_proporcao = proporcao;

	if (this.fantasia > 0) {
	this.largura_container=document.getElementById("principal").clientWidth;
	this.altura_container=document.getElementById("principal").clientHeight;

	this.largura = this.lista_de_fantasias[this.fantasia - 1].width;                         
	this.altura  = this.lista_de_fantasias[this.fantasia - 1].height;
	this.razao_de_aspecto = this.largura / this.altura;

	this.tentativas_de_definir_proporcao = 0;
	this.lista_de_fantasias[this.fantasia - 1].height = Math.round(this.altura_container * proporcao/100 );
	this.lista_de_fantasias[this.fantasia - 1].width  = Math.round(this.altura_container * proporcao/100) * this.razao_de_aspecto;

	this.guarda_largura_percentual  = (this.lista_de_fantasias[this.fantasia - 1].width / this.largura_container)*100;                          
	this.guarda_altura_percentual   = (this.lista_de_fantasias[this.fantasia - 1].height / this.altura_container)*100;                        	

	this.img_imagem_thrust.height       = this.lista_de_fantasias[this.fantasia - 1].height * this.controle.fator_thrust_height;
	this.img_imagem_thrust.width        = this.lista_de_fantasias[this.fantasia - 1].width  * this.controle.fator_thrust_width ;
	this.posiciona_percentual(this.posicao_percentual_x, this.posicao_percentual_y);
	this.atualiza_fantasia();
}
else {
	this.tentativas_de_definir_proporcao++;
	if (this.tentativas_de_definir_proporcao < this.max_tentativas_de_definir_proporcao) { let that=this; setTimeout(function () {that.tamanho_proporcional(proporcao);}, 100)}
	else {alert("Nao foi possivel definir o tamanho da fantasia. Provavelmente o tempo de carga da fantasia estah muito longo.");}
}

}


tamanho_percentual(x,y){
//console.log("tentativa tamanho: "+ this.tentativas_de_definir_tamanho);
	this.guarda_largura_percentual=x;
	this.guarda_altura_percentual=y;
	//console.log(this.lista_de_fantasias[0]);
	//console.log(this.fantasia);
if (this.fantasia > 0) {
	this.largura_container=document.getElementById("principal").clientWidth;
	this.altura_container=document.getElementById("principal").clientHeight;

	this.tentativas_de_definir_tamanho = 0;
	this.lista_de_fantasias[this.fantasia - 1].height = Math.round(this.altura_container * y/100 );
	this.lista_de_fantasias[this.fantasia - 1].width  = Math.round(this.largura_container * x/100);
	this.img_imagem_thrust.height       = this.lista_de_fantasias[this.fantasia - 1].height * this.controle.fator_thrust_height;
	this.img_imagem_thrust.width        = this.lista_de_fantasias[this.fantasia - 1].width  * this.controle.fator_thrust_width ;
	this.posiciona_percentual(this.posicao_percentual_x, this.posicao_percentual_y);
	this.atualiza_fantasia();
}
else {
	this.tentativas_de_definir_tamanho++;
	if (this.tentativas_de_definir_tamanho < this.max_tentativas_de_definir_tamanho) { let that=this; setTimeout(function () {that.tamanho_percentual(x,y);}, 100)}
	else {alert("Nao foi possivel definir o tamanho da fantasia. Provavelmente o tempo de carga da fantasia estah muito longo.");}
}

}

gira(delta_graus, giros){
	if ( this.automatiza_giros != null ) { clearInterval(this.automatiza_giros); this.automatiza_giros=null;}
	this.conta_giros = 0;
	let that=this;
	
	this.automatiza_giros = setInterval(function ()
			{ 
				//console.log(that.rotacao);
				if ( that.conta_giros < parseFloat(giros) ) {
					that.rotacao = that.rotacao + parseFloat(delta_graus);
					that.conta_giros++;
				}
				else {
					clearInterval(that.automatiza_giros);
					that.automatiza_giros = null;
				}
			},this.delta_t);	
	
}

para_giro(){
 	if (this.automatiza_giros != null ) {clearInterval(this.automatiza_giros); this.automatiza_giros=null;}
}

verifica_se_bateu (){
	let i;
	for (i=0; i < this.lista_de_detecao.length; i++) {
		let objeto=this.lista_de_detecao[i];
		//console.log(objeto);
		let l1x = parseInt(objeto.lista_de_fantasias[objeto.fantasia -1].getBoundingClientRect().left);
		let l1y = parseInt(objeto.lista_de_fantasias[objeto.fantasia -1].getBoundingClientRect().top);
		let r1x = parseInt(objeto.lista_de_fantasias[objeto.fantasia -1].getBoundingClientRect().right);
		let r1y = parseInt(objeto.lista_de_fantasias[objeto.fantasia -1].getBoundingClientRect().bottom);
		
		let l2x = parseInt(this.lista_de_fantasias[this.fantasia - 1].getBoundingClientRect().left);
		let l2y = parseInt(this.lista_de_fantasias[this.fantasia - 1].getBoundingClientRect().top);
		let r2x = parseInt(this.lista_de_fantasias[this.fantasia - 1].getBoundingClientRect().right);
		let r2y = parseInt(this.lista_de_fantasias[this.fantasia - 1].getBoundingClientRect().bottom);
		//console.log( doOverlap( l1x, l1y,  r1x, r1y,  l2x, l2y,  r2x, r2y) );

		if ( doOverlap( l1x, l1y,  r1x, r1y,  l2x, l2y,  r2x, r2y) ) { console.log("bateu");}
		
	}


}

desliza(delta_x, delta_y, passos){
	this.conta_passos = 0;
	let that = this;
	this.automatiza = setInterval(function ()
			{ 
				if ( that.conta_passos < parseFloat(passos) ) {
					that.verifica_se_bateu();
					that.posicao_percentual_x = that.posicao_percentual_x + parseFloat(delta_x);
					that.posicao_percentual_y = that.posicao_percentual_y + parseFloat(delta_y);
					that.conta_passos++;
				}
				else {
					clearInterval(that.automatiza);
					that.automatiza = null;
				}
			},this.delta_t);	
		
}

para_desliza() {
	if (this.automatiza != null) {clearInterval(this.automatiza); this.automatiza=null;}	
}


proxima_fantasia(){
	this.velho_fantasia=this.fantasia;
	this.fantasia++;

	if (this.fantasia > this.lista_de_fantasias.length) {this.fantasia = 1;} // verificar isso aqui. nao testado
	this.lista_de_fantasias[this.fantasia -1].style.top = this.lista_de_fantasias[this.velho_fantasia -1].style.top;
	this.lista_de_fantasias[this.fantasia -1].style.left = this.lista_de_fantasias[this.velho_fantasia -1].style.left;
	this.lista_de_fantasias[this.fantasia - 1].style.visibility = "visible";
	this.lista_de_fantasias[this.velho_fantasia -1].style.visibility = "hidden";
	console.log(this.lista_de_fantasias[this.fantasia -1]);
}

acrescenta_imagem_thrust(arquivo, arquivo_fantasia, nome_fantasia){
	let thr = document.createElement("img");
	thr.style.pai = this;
	thr.style.visibility = "hidden";
	document.getElementById("principal").appendChild(thr);
	thr.id = this.id + "_thrust";
	thr.style.display = "block";
	thr.style.position = "absolute";
	let that = this;
	thr.onerror= function () {that.nao_achou_imagem();}        
//	thr.onload= function () {that.achou_imagem();}
	thr.src=arquivo;
	thr.alt = "erro: " + arquivo + " nao encontrado.";
	thr.addEventListener("load"	,
function (){
	that.achou_imagem();
	that.img_imagem_thrust = thr;	
	that.acrescenta_fantasia(arquivo_fantasia, nome_fantasia);
}
	,true)
}

acrescenta_fantasia(arquivo, nome){

	let fantasy=document.createElement("img");
	fantasy.style.pai = this;
	//fantasy.style.transition="all 0.05s linear";
	//fantasy.style.transitionTimingFunction="linear";	
	fantasy.style.visibility="hidden";
	document.getElementById("principal").appendChild(fantasy);
	fantasy.id=this.id + "_" + nome;
	fantasy.style.display="block";
	fantasy.style.position = "absolute";
	let that = this;
	fantasy.onerror=function (){that.nao_achou_imagem()}
	fantasy.onload=function (){that.achou_imagem();}

	fantasy.src=arquivo;

//fantasy.addEventListener("click", ()=> {
//	controle.selecionado = that;
//	controle.central = that;
//        }, true);


	fantasy.alt="erro: "+arquivo+" não encontrado";

    fantasy.addEventListener("load", function () {

	that.controle.pronto_para_animar = true; // isso aqui provavelmente estah errado porque refere-se apenas aa fantasia corrente do presente movel. Tem muitos moveis. (resposta: Eh que basta um estar pronto para animar, portanto nao precisa esperar todos)
	that.lista_de_fantasias.push(fantasy);
	that.velho_fantasia = that.fantasia;
	that.fantasia = that.lista_de_fantasias.length;



		that.controle.largura_inicial_percentual = that.razao_de_aspecto * that.controle.altura_inicial_percentual;
		that.guarda_largura_percentual = that.razao_de_aspecto * that.guarda_altura_percentual;
		if (that.tipo_objeto == "fixo") {		
		that.tamanho_percentual(that.guarda_largura_percentual, that.guarda_altura_percentual);
		}
		else {  that.tamanho_proporcional(that.guarda_proporcao);}
},false);

}


acrescenta_em_detecao(objeto) {

	this.lista_de_detecao.push(objeto);

}


}
