// BaboRace - Desenvolvido por Victor Mammana - 2021_10_16

function limpa_todos_blink(config){
let i;

let lista = document.getElementsByClassName(config.classe_div);
for (i=0; i < lista.length; i++) {
	lista[i].style.pai.fim_blink();
	
} 

}

//

export class configuracoes {
constructor(elemento_pai){
	this.fator_reducao = 0.83;
	this.delta_t_blink = 300;
	this.font_nome = 20;
	this.font_ponto_insercao = 13;
	this.color_nome = "black";
	this.background_nome = "";
	this.altura = 150;
	this.largura= 150;
	this.altura_insercao = 20;
	this.largura_insercao = this.largura;
	this.conta_id = 0;
	this.elemento_pai = elemento_pai;
	this.esquerda = 10;
	this.topo = 30;
	this.backgroundcolor_Fx = "red";
	this.backgroundcolor_Fy = "red";
	this.backgroundcolor_delay = "white";
	this.backgroundcolor_repeticao = "yellow";
	this.backgroundcolor_principal = "blue";
	this.backgroundcolor_desvio = "green";
	this.backgroundcolor_va_para = "lightgreen";
	this.backgroundcolor_insercao = "green";
	this.backgroundcolor_blink = "gray";
	this.borderradius = "25px";
	this.topo_nome =    parseInt(this.borderradius)/3;
	this.esquerda_nome= parseInt(this.borderradius)/3;
	this.borda = "5px solid black";
	this.padding_inferior = 20;
	this.borderradius_insercao = "5px";
	this.borda_insercao = "2px solid black";
	this.background = document.body;
	this.tab = 20;
	this.classe_div = "instrucao_div";
	this.executavel=[]
	this.delta_t_execucao = 300; // ms para cara instrucao delta_t
	this.pc = 0;
	this.reset = false;
	this.em_execucao = false;
	this.movel = null;
}
}

class ponto_insercao {
constructor (esquerda, topo, largura, altura, elemento_pai, configuracoes){
	
	this.configuracoes = configuracoes;
	this.blinking =null;
	this.tipo = "insercao";
	this.conta_id = this.configuracoes.conta_id;
	this.configuracoes.conta_id++;
	this.elemento_pai = elemento_pai;
	this.guarda_altura =  altura;
	this.guarda_largura = largura;
	this.topo = topo;
	this.esquerda = esquerda;
	this.face = this.retorna_face();
}

mostra(baixo){
	this.elemento_pai.face.appendChild(this.face);
	this.face.style.top = baixo + "px";
	return parseInt(this.face.style.height.replace("px",""));
}

retorna_face(){

	let div = document.createElement("div"); 
	div.className = this.configuracoes.classe_div;
	div.style.pai = this;
	div.style.visibility = "visible";
	div.style.opacity = 1.0; // nao adianta definir aqui caso a opacidade do pai esteja definida. Ela vai se sobre a do filho.
	div.style.whiteSpace = 'nowrap';
	div.style.overflow = "hidden";
	//this.elemento_pai.appendChild(div);
	div.id = "insercao_" + this.conta_id;
	div.style.display="block";
	div.style.position="absolute";
	div.style.backgroundColor = this.configuracoes.backgroundcolor_insercao;
	div.style.backgroundColor = this.configuracoes.backgroundcolor;
	div.style.borderRadius = this.configuracoes.borderradius_insercao;
	div.style.border = this.configuracoes.borda_insercao;
	div.style.top = this.topo + "px";
	div.innerHTML = "&#x25BC Insira, edite ou apague bloco abaixo &#x25BC";
	div.style.fontSize = this.configuracoes.font_ponto_insercao + "px";
	div.style.left = this.esquerda + "px" ;
	div.style.width  = this.guarda_largura + "px";
	div.style.height = this.guarda_altura + "px";
	return div;
}

inicia_blink_insercao(){
	let that = this;
	this.blink = setInterval ( function () 
		{ 
			if (that.face.style.backgroundColor== that.configuracoes.backgroundcolor_insercao) {
				that.face.style.backgroundColor = that.configuracoes.backgroundcolor_blink;
			}
			else {
				that.face.style.backgroundColor = that.configuracoes.backgroundcolor_insercao;
			}
			//console.log(that.configuracoes.delta_t_blink);
		}  , that.configuracoes.delta_t_blink);
} // fim inicia_blink()

fim_blink(){
	clearInterval(this.blink);
	this.face.style.backgroundColor = this.configuracoes.backgroundcolor_insercao;
} // fim fim_blink()



}


export class bloco {

constructor (configuracoes, bloco_superior, condicional, esquerda, topo, tipo, altura, largura, elemento_pai){
	this.configuracoes = configuracoes;
	this.id = "bloco_" + this.configuracoes.conta_id;
	this.funcao_parametro = {n_instrucao: -1, funcao: "dummy", parametro: "dummy_"+this.configuracoes.conta_id, id: null };

	if (tipo == "delay" || tipo == "delay_exemplo") 
		{
			this.nome = "Espera <input id='espera_"+this.configuracoes.conta_id+"' class='entrada' type='text' value='10' size='2'/> ciclos";
			this.background_tipo = this.configuracoes.backgroundcolor_delay;
			this.elemento_parametro =  document.getElementById("espera_"+this.configuracoes.conta_id);
			this.funcao_parametro = {n_instrucao: +this.configuracoes.conta_id, funcao: "espera", parametro: "espera_"+this.configuracoes.conta_id, id: null };
			this.opacidade = 1.0; 
		}
	if (tipo == "va_para_x" || tipo == "va_para_x_exemplo") 
		{
			this.nome = "Va para X=<input id='va_para_x_"+this.configuracoes.conta_id+"' class='entrada' type='text' value='10' size='2'/>";
			this.background_tipo = this.configuracoes.backgroundcolor_va_para; 
			this.elemento_parametro =  document.getElementById("va_para_x_"+this.configuracoes.conta_id); 
			this.funcao_parametro = {n_instrucao: +this.configuracoes.conta_id, funcao: "va_para_x", parametro: "va_para_x_"+this.configuracoes.conta_id, id: null  }; 
			this.opacidade = 1.0; 
		}
	if (tipo == "va_para_y" || tipo == "va_para_y_exemplo") 
		{
			this.nome = "Va para Y=<input id='va_para_y_"+this.configuracoes.conta_id+"' class='entrada' type='text' value='10' size='2'/>";
			this.background_tipo = this.configuracoes.backgroundcolor_va_para; 
			this.elemento_parametro =  document.getElementById("va_para_y_"+this.configuracoes.conta_id); 
			this.funcao_parametro = {n_instrucao: +this.configuracoes.conta_id, funcao: "va_para_y", parametro: "va_para_y_"+this.configuracoes.conta_id, id: null  }; 
			this.opacidade = 1.0; 
		}

	if (tipo == "Fy" || tipo == "Fy_exemplo") 
		{
			this.nome = "Fy <input id='Fy_"+this.configuracoes.conta_id+"' class='entrada' type='text' value='10' size='2'/> newtons";
			this.background_tipo = this.configuracoes.backgroundcolor_Fy; 
			this.elemento_parametro =  document.getElementById("Fy_"+this.configuracoes.conta_id); 
			this.funcao_parametro = {n_instrucao: +this.configuracoes.conta_id, funcao: "Fy", parametro: "Fy_"+this.configuracoes.conta_id, id: null  }; 
			this.opacidade = 1.0; 
		}
	if (tipo == "Fx" || tipo == "Fx_exemplo") 
		{
			this.nome = "Fx <input id='Fx_"+this.configuracoes.conta_id+"' class='entrada' type='text' value='10' size='2'/> newtons";
			this.background_tipo = this.configuracoes.backgroundcolor_Fx; 
			this.elemento_parametro =  document.getElementById("Fx_"+this.configuracoes.conta_id); 
			this.funcao_parametro = {n_instrucao: +this.configuracoes.conta_id, funcao: "Fx", parametro: "Fx_"+this.configuracoes.conta_id, id: null  }; 
			this.opacidade = 1.0; 
		}
	
	if (tipo == "principal" || tipo == "principal_exemplo") 
		{
			this.nome = "principal";
			this.background_tipo = this.configuracoes.backgroundcolor_principal; 
			this.elemento_parametro =  document.getElementById("principal_"+this.configuracoes.conta_id); 
			this.funcao_parametro = {n_instrucao: +this.configuracoes.conta_id, funcao: "principal", parametro: "principal_"+this.configuracoes.conta_id, id: null  }; 
			this.opacidade = 1.0; 
		}
	if (tipo == "repeticao" || tipo == "repeticao_exemplo") 
		{
			this.nome = "repete <input id='repeticao_"+this.configuracoes.conta_id+"' class='entrada' type='text' value='10' size='2'/> vezes";
			this.background_tipo = this.configuracoes.backgroundcolor_repeticao;
			this.elemento_parametro =  document.getElementById("repeticao_"+this.configuracoes.conta_id); 
			this.funcao_parametro = {n_instrucao: +this.configuracoes.conta_id, funcao: "repete", parametro: "repeticao_"+this.configuracoes.conta_id, id: null  }; 
			this.opacidade = 1.0; 
		}
		
	if (tipo == "desvio"   || tipo == "desvio_exemplo" ) 
		{
			this.nome = "se";
			this.background_tipo = this.configuracoes.backgroundcolor_desvio;
			this.opacidade = 0.8; 
		}
	this.blinking =null;
	this.tipo = tipo;
	this.pc = 0 // program count
	this.indice_ponto_de_insercao = -1;
	this.indice_ponto_de_blinking = -1;
	this.conta_id = this.configuracoes.conta_id;
	this.configuracoes.conta_id++;
	this.elemento_pai = elemento_pai;
	this.instrucoes = [];
	this.condicional = [];
	this.condicional.push(condicional);
	this.guarda_altura =  altura;
	this.guarda_largura = largura;
	this.topo = topo;
	this.esquerda = esquerda;
	this.face = this.retorna_face();
	this.funcao_parametro.id = this.face;
}

mostra(baixo){
	if (["delay_exemplo","va_para_x_exemplo","va_para_y_exemplo","Fy_exemplo","Fx_exemplo","repeticao_exemplo","desvio_exemplo"].includes(this.tipo)) {
	this.elemento_pai.appendChild(this.face);
} else {
	if (this.tipo == "principal") {
	this.elemento_pai.appendChild(this.face);
	}
	else {
	this.face.style.top = baixo + "px";
	this.elemento_pai.face.appendChild(this.face);
	}
	return this.lista_instrucoes();
}
}

ativa_ponto_de_insercao(posicao){
	let insertion_largura = (this.guarda_largura * this.configuracoes.fator_reducao) - this.configuracoes.tab;
	let insertion_altura  = this.configuracoes.altura_insercao;

	let insertion = new ponto_insercao(this.configuracoes.tab, parseInt(this.face.style.titulo.style.height.replace("px","")) + this.topo, insertion_largura, insertion_altura, this, this.configuracoes);
	this.instrucoes.splice(posicao,0,insertion); // sempre comeca com um ponto de insercao
	this.indice_ponto_de_insercao = posicao;
	return insertion;
}


insere_instrucao(objeto){
//console.log(this.instrucoes);
//	if (this.indice_ponto_de_insercao <= 0) { this.instrucoes.unshift(objeto); return;}
//	if (this.indice_ponto_de_insercao >= this.instrucoes.length -1) {
//		let espera = this.instrucoes.pop();
//		this.instrucoes.push(objeto);
//		this.instrucoes.push(espera);
////console.log(this.instrucoes);
//		return;
//	}
	this.instrucoes.splice(this.indice_ponto_de_insercao + 1, 0, objeto);
	swap(this.instrucoes, this.indice_ponto_de_insercao, this.indice_ponto_de_insercao + 1);
	limpa_todos_blink(this.configuracoes);
	this.indice_ponto_de_insercao++;
	this.indice_ponto_de_blinking = this.indice_ponto_de_insercao + 1;
	if(this.indice_ponto_de_blinking <= this.instrucoes.length - 1 && ["repeticao", "desvio", "principal"].includes(this.instrucoes[this.indice_ponto_de_blinking].tipo)) {this.instrucoes[this.indice_ponto_de_blinking].inicia_blink();}
//	this.indice_ponto_de_insercao++;
}

monta_executavel(objetonics){

let i;
let j;
let repeticoes = 1;
if (objetonics.tipo == "principal"){ objetonics.configuracoes.executavel.length =0;}

if (objetonics.tipo == "repeticao") { repeticoes = parseInt(document.getElementById(objetonics.funcao_parametro.parametro).value);}
if (objetonics.tipo == "delay") { repeticoes = parseInt(document.getElementById(objetonics.funcao_parametro.parametro).value);}
console.log(" Tipo: " + objetonics.tipo + " repeticoes: "+ repeticoes);

for  (j=0; j < repeticoes; j++){
if (objetonics.instrucoes.length == 0) {
objetonics.configuracoes.executavel.push({n_instrucao: "nope", funcao: "nope", parametro: "nope", id: objetonics.face }); // no operation
}
else {
	for (i=0; i < objetonics.instrucoes.length; i++) {
		let instrucao = objetonics.instrucoes[i];
		if (["Fx", "Fy", "va_para_x", "va_para_y", "delay"].includes(instrucao.tipo)){
		objetonics.configuracoes.executavel.push(instrucao.funcao_parametro);
		}
		if([ "repeticao", "principal", "delay"].includes(instrucao.tipo)) {
		
			instrucao.monta_executavel(instrucao);
		}
	}
}
}
console.log(objetonics.configuracoes.executavel);

if (objetonics.tipo == "principal" && objetonics.configuracoes.executavel.length >0){

this.configuracoes.pc=0;
let that=this;
let executa = setInterval (
function () {
that.configuracoes.em_execucao = true;
if (that.configuracoes.reset) { that.configuracoes.reset = false;   clearInterval(executa); that.configuracoes.em_execucao = false; return;}
	let instrucao = that.configuracoes.executavel[that.configuracoes.pc];
	let carro =  that.configuracoes.movel;
	if (instrucao.funcao == "Fx") { carro.Fx =  parseFloat(document.getElementById(instrucao.parametro).value);}
	if (instrucao.funcao == "Fy") { carro.Fy =  parseFloat(document.getElementById(instrucao.parametro).value);}
	if (instrucao.funcao == "va_para_x") { carro.guarda_vx=0; carro.guarda_vy=0; carro.posicao_percentual_x =   parseInt(document.getElementById(instrucao.parametro).value);}
	if (instrucao.funcao == "va_para_y") { carro.guarda_vx=0; carro.guarda_vy=0;carro.posicao_percentual_y =  parseInt(document.getElementById(instrucao.parametro).value);}
   	console.log("PC "+that.configuracoes.pc);	
	let itz = instrucao.id.style.border; 
	instrucao.id.style.border = "5px solid red";
	setTimeout(function (){ instrucao.id.style.border = itz}, 250);
	that.configuracoes.pc++;
	if (that.configuracoes.pc >= that.configuracoes.executavel.length) { clearInterval(executa); that.configuracoes.em_execucao = false; return;}
}
, this.configuracoes.delta_t_execucao )


}
}


lista_instrucoes(){
let i;
let desconto = parseInt(this.face.style.titulo.style.top.replace("px","")) + parseInt(this.face.style.titulo.style.height.replace("px","")) + this.configuracoes.padding_inferior;
let baixo = desconto ;
//console.log(baixo);
for (i=0; i< this.instrucoes.length; i++){
	let instrucao=this.instrucoes[i];
	// console.log(instrucao);
	instrucao.guarda_altura = instrucao.mostra(baixo);
	baixo = baixo + desconto  + instrucao.guarda_altura;
	//console.log(instrucao.guarda_altura);
}
this.face.style.height = baixo + "px";
return baixo;
}

retorna_face(){
	let div = document.createElement("div"); 
	div.className = this.configuracoes.classe_div;
	div.style.pai = this;
	div.style.visibility = "visible";
	//this.elemento_pai.appendChild(div);
	div.id = "bloco_" + this.conta_id;
	div.style.opacity=this.opacidade; // nao adianta mudar esta opacidade se o div_pai estiver com este parametro definido, porque herda do pai
	div.style.whiteSpace = 'nowrap'
	div.style.overflow = "hidden";
	div.style.display="block";
	div.style.position="absolute";
	div.style.backgroundColor = this.background_tipo;
	div.style.borderRadius = this.configuracoes.borderradius;
	div.style.border = this.configuracoes.borda;
	div.style.top = this.topo + "px";
	div.style.left = this.esquerda + "px";
	if (this.tipo == "principal") {
		div.style.width =  Math.round(parseInt(this.elemento_pai.style.width.replace("px","")) * this.configuracoes.fator_reducao ) +"px"  ;
		div.style.height = Math.round(parseInt(this.elemento_pai.style.height.replace("px","")) * this.configuracoes.fator_reducao) +"px" ;
		//alert(this.elemento_pai.style.width);
	}
	if (["delay","va_para_x","va_para_y","Fy","Fx","repeticao","desvio"].includes(this.tipo)) {
	div.style.width =  parseInt(this.elemento_pai.face.style.width.replace("px","")) *this.configuracoes.fator_reducao +"px"  ;
	div.style.height = parseInt(this.elemento_pai.face.style.height.replace("px","")) *this.configuracoes.fator_reducao +"px" ;
	}

	if (["delay_exemplo","va_para_x_exemplo","va_para_y_exemplo","Fy_exemplo","Fx_exemplo","repeticao_exemplo","desvio_exemplo"].includes(this.tipo)) {
		div.style.width = this.configuracoes.largura + "px"; 
		div.style.height = this.configuracoes.altura + "px";
	}
	this.guarda_largura = parseInt(div.style.width.replace("px",""));
	this.guarda_altura  = parseInt(div.style.height.replace("px",""));

	let div_nome = document.createElement("div");
	div_nome.style.pai = div;
	div_nome.style.visibility = "visible";
	div.appendChild(div_nome);
	div_nome.style.fontSize = this.configuracoes.font_nome + "px";
	div_nome.style.color = this.configuracoes.color_nome;
	div_nome.style.backgroundColor = this.configuracoes.background_nome;
	div_nome.innerHTML = this.nome;	
	div_nome.style.position = "absolute";
	div_nome.style.top = this.configuracoes.topo_nome + "px";
	div_nome.style.left = this.configuracoes.esquerda_nome + "px";
	div_nome.style.height = this.configuracoes.font_nome + "px";
	div.style.titulo = div_nome;

	return div;
}

inicia_blink(){
	let that = this;
	this.blink = setInterval ( function () 
		{ 
			if (that.face.style.backgroundColor== that.background_tipo) {
				that.face.style.backgroundColor = that.configuracoes.backgroundcolor_blink;
			}
			else {
				that.face.style.backgroundColor = that.background_tipo;
			}
			//console.log(that.configuracoes.delta_t_blink);
		}  , that.configuracoes.delta_t_blink);
} // fim inicia_blink()

fim_blink(){
	clearInterval(this.blink);
	this.face.style.backgroundColor = this.background_tipo;
} // fim fim_blink()

} // fim class bloco

//programa.style.width = "400px";
//programa.style.height = "600px";


