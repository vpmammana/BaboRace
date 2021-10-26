<?php

if(isset($_GET["id_usuario"])){
  $id_usuario = $_GET["id_usuario"];
} else {$id_usuario=1;}


include "atomo.php";
$database="baboracex";

$conn= new mysqli("localhost", $username, $pass, $database);
$arr=array();

$sql="select id_chave_registrado, nome_registrado, id_chave_movel, nome_movel, nome_on_line, id_chave_fantasia, nome_fantasia, photo_filename_fantasia, ordem from fantasias as f, moveis as m, registrados as r, moveis_fantasias as mf, tipos_operacoes_on_line where id_chave_movel = r.id_movel and mf.id_movel = id_chave_movel and mf.id_fantasia = id_chave_fantasia and id_on_line=id_chave_tipo_operacao_on_line and id_chave_registrado and id_chave_registrado = ".$id_usuario." order by nome_registrado, ordem";


$result=$conn->query("$sql");


if ($result->num_rows >0) {
  while($row=$result->fetch_assoc())
    {
      $id_usuario = $row["id_chave_registrado"];
      $nome_registrado = $row["nome_registrado"];
      $id_movel = $row["id_chave_movel"];
      $nome_movel = $row["nome_movel"];
      $online = $row["nome_on_line"];
      $id_fantasia = $row["id_chave_fantasia"];
      $nome_fantasia = $row["nome_fantasia"];
      $imagem = $row["photo_filename_fantasia"];
      $ordem = $row["ordem"];
      
   array_push($arr,array('id_usuario' => $id_usuario, 'nome_registrado' => $nome_registrado, 'id_movel'=> $id_movel , 'nome_movel' => $nome_movel, 'online' => $online, 'id_fantasia' => $id_fantasia,  'nome_fantasia' => $nome_fantasia, 'imagem'=> $imagem, 'ordem' => $ordem));
    }

$final = array('lista' => $arr);

echo json_encode($arr);
} else {echo 'Deu Problema: Numero de linhas deveria ser 1 e é '.$result->num_rows.' além disso retornou: '.$conn->error;}
?>
