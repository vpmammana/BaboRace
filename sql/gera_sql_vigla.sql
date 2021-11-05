DROP DATABASE IF EXISTS baboracex;

CREATE DATABASE baboracex CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci;
USE baboracex;

create table fantasias(id_chave_fantasia int not null auto_increment, nome_fantasia varchar(100), photo_filename_fantasia varchar(200), time_stamp timestamp, primary key (id_chave_fantasia), unique(nome_fantasia)) comment="Um movel pode ter varias fantasias. Uma fantasia pode ser usada por muito moveis.";

create table tipos_operacoes_on_line(id_chave_tipo_operacao_on_line int not null auto_increment, nome_on_line varchar(20), primary key(id_chave_tipo_operacao_on_line)) comment = "Guarda tipo de operacao.";

create table moveis(id_chave_movel int not null auto_increment, nome_movel varchar(100), x_inicial int, y_inicial int, time_stamp timestamp, primary key (id_chave_movel), unique(nome_movel)) comment="Apenas um movel por registrado";

create table registrados(id_chave_registrado int not null auto_increment, nome_registrado varchar(100), apelido varchar(100), id_on_line int, id_movel int comment "Como eh unique, apenas um movel por registrado", time_stamp timestamp, primary key(id_chave_registrado), unique(nome_registrado), unique(id_movel)) comment="Escolhido como registrado para linkar na base de dados do sistema de identificacao de QR code";

create table moveis_fantasias(id_chave_movel_fantasia int not null auto_increment, nome_movel_fantasia varchar(100), id_fantasia int, id_movel int, ordem int, time_stamp timestamp, primary key (id_chave_movel_fantasia), unique(ordem, id_movel));

create table operacoes_on_line (id_chave_operacao_on_line int not null auto_increment, nome_time_stamp timestamp, id_registrado int, id_operacao int, primary key(id_chave_operacao_on_line)) comment = "guarda a hora de conexao de cada usuario";

ALTER TABLE registrados ADD CONSTRAINT FK_movel_registrado FOREIGN KEY (id_movel) REFERENCES moveis(id_chave_movel);
ALTER TABLE moveis_fantasias ADD CONSTRAINT FK_movel_fantasia FOREIGN KEY (id_fantasia) REFERENCES fantasias(id_chave_fantasia);
ALTER TABLE moveis_fantasias ADD CONSTRAINT FK_fantasia_movel FOREIGN KEY (id_movel) REFERENCES moveis(id_chave_movel);
ALTER TABLE operacoes_on_line ADD CONSTRAINT FK_registrado_operacao FOREIGN KEY (id_registrado) REFERENCES registrados(id_chave_registrado);
ALTER TABLE registrados ADD CONSTRAINT FK_registrado_on_line FOREIGN KEY (id_on_line) REFERENCES tipos_operacoes_on_line(id_chave_tipo_operacao_on_line);
ALTER TABLE operacoes_on_line ADD CONSTRAINT FK_operacao_on_line FOREIGN KEY (id_operacao) REFERENCES tipos_operacoes_on_line(id_chave_tipo_operacao_on_line);

insert into moveis(x_inicial, y_inicial, nome_movel) values (-5, 90, "carrinho_amarelo");
insert into moveis(x_inicial, y_inicial, nome_movel) values (-5, 85, "carrinho_vermelho");
insert into moveis(x_inicial, y_inicial, nome_movel) values (-5, 80, "carro_babolina");
insert into moveis(x_inicial, y_inicial, nome_movel) values (-5, 75, "FuscaValdo");
insert into moveis(x_inicial, y_inicial, nome_movel) values (-5, 70, "MamonaMovel");
insert into moveis(x_inicial, y_inicial, nome_movel) values (-5, 65, "Carcovado");

insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("carrinho_amarelo_1", "../php/imagens/carrinho_amarelo1.png");
insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("carrinho_amarelo_2", "../php/imagens/carrinho_amarelo2.png");
insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("carrinho_amarelo_3", "../php/imagens/carrinho_amarelo3.png");
insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("carrinho_amarelo_4", "../php/imagens/carrinho_amarelo4.png");
insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("carrinho_vermelho_1", "../php/imagens/carrinho_vermelho1.png");
insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("carro_babolina_1", "../php/imagens/Carro_Victoria10.png");

insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("fusca", "../php/imagens/fusca.png");
insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("brasilia", "../php/imagens/brasilia.png");
insert into fantasias (nome_fantasia, photo_filename_fantasia) values ("esportivo", "../php/imagens/esportivo.png");


insert into tipos_operacoes_on_line(nome_on_line) values ("in");
insert into tipos_operacoes_on_line(nome_on_line) values ("out");


insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "carrinho_amarelo"),(select id_chave_fantasia from fantasias where nome_fantasia="carrinho_amarelo_1"),1);
insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "carrinho_amarelo"),(select id_chave_fantasia from fantasias where nome_fantasia="carrinho_amarelo_2"),2);
insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "carrinho_amarelo"),(select id_chave_fantasia from fantasias where nome_fantasia="carrinho_amarelo_3"),3);
insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "carrinho_amarelo"),(select id_chave_fantasia from fantasias where nome_fantasia="carrinho_amarelo_4"),4);

insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "carro_babolina"),(select id_chave_fantasia from fantasias where nome_fantasia="carro_babolina_1"),4);
insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "MamonaMovel"),(select id_chave_fantasia from fantasias where nome_fantasia="brasilia"),4);
insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "FuscaValdo"),(select id_chave_fantasia from fantasias where nome_fantasia="fusca"),4);

insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "carcovado"),(select id_chave_fantasia from fantasias where nome_fantasia="esportivo"),4);



insert into moveis_fantasias (id_movel, id_fantasia, ordem) values ((select id_chave_movel from moveis where nome_movel = "carrinho_vermelho"),(select id_chave_fantasia from fantasias where nome_fantasia="carrinho_vermelho_1"),1);


insert into registrados (nome_registrado, apelido, id_movel, id_on_line) values ("Victor Pellegrini Mammana", "victor", (select id_chave_movel from moveis where nome_movel="carrinho_vermelho"), (select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line="out"));
insert into registrados (nome_registrado, apelido, id_movel, id_on_line) values ("Victoria Mammana", "victoria", (select id_chave_movel from moveis where nome_movel="carrinho_amarelo"), (select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line="out"));
insert into registrados (nome_registrado, apelido, id_movel, id_on_line) values ("Babolina", "babolina", (select id_chave_movel from moveis where nome_movel="carro_babolina"), (select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line="out"));
insert into registrados (nome_registrado, apelido, id_movel, id_on_line) values ("Babolina2", "babolina2", (select id_chave_movel from moveis where nome_movel="FuscaValdo"), (select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line="out"));

insert into registrados (nome_registrado, apelido, id_movel, id_on_line) values ("Babolina3", "babolina3", (select id_chave_movel from moveis where nome_movel="MamonaMovel"), (select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line="out"));

insert into registrados (nome_registrado, apelido, id_movel, id_on_line) values ("Babolina4", "babolina4", (select id_chave_movel from moveis where nome_movel="carcovado"), (select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line="out"));



