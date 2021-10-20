<?php
if(isset($_GET["id_usuario"])){
  $id_usuario = $_GET["id_usuario"];
} else { echo "falhou_falta_id_usuario"; return;}

if(isset($_GET["operacao"])){
  $operacao = $_GET["operacao"];
} else { echo "falhou_faltou_operacao"; return;}


$username="victor";
$pass="aerofolio";
$database="baboracex";

$conn= new mysqli("localhost", $username, $pass, $database);



$sql="update registrados set id_on_line = (select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line ='".$operacao."') where id_chave_registrado = ".$id_usuario;

echo $sql;

if ($conn->query($sql)===true){ 
	//echo   $conn->insert_id;
	echo "sucesso";
} else 
{echo "<br> Deu problema com o sql: ".$sql." erro:".$conn->error; echo "update_falhou"; return;}

$sql="insert into operacoes_on_line (id_registrado, id_operacao) values ('".$id_usuario."',(select id_chave_tipo_operacao_on_line from tipos_operacoes_on_line where nome_on_line = '".$operacao."'));"; 

if ($conn->query($sql)===true)
	{// echo   $conn->insert_id; 
	//	echo "sucesso"; return;
	} else 
	{
		echo "<br> Deu problema com o sql: ".$sql." erro:".$conn->error; 
//		echo "insert_falhou"; return;
	}

?>

