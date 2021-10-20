<?php

if(isset($_GET["usuario"])){
  $usuario = $_GET["usuario"];
} else {$usuario="victor";}

$username="victor";
$pass="aerofolio";
$database="baboracex";

$conn= new mysqli("localhost", $username, $pass, $database);
$arr=array();

$sql="select  row_number() over (order by id_chave_registrado) as ordem, id_chave_registrado as id, nome_on_line as on_line, nome_registrado, nome_movel from registrados as r, moveis as m,  tipos_operacoes_on_line where r.id_movel = id_chave_movel and id_on_line = id_chave_tipo_operacao_on_line;";


$result=$conn->query("$sql");


if ($result->num_rows >0) {
  while($row=$result->fetch_assoc())
    {
      $ordem=$row["ordem"];
      $id=$row["id"];
      $nome=$row["nome_registrado"];
      $movel=$row["nome_movel"];
      $on_line=$row["on_line"];
   array_push($arr,array('ordem' => $ordem, 'id'=> $id , 'nome' => $nome, 'movel' => $movel, 'on_line' => $on_line));
    }

$final = array('lista' => $arr);

echo json_encode($arr);
} else {echo 'Deu Problema: Numero de linhas deveria ser 1 e é '.$result->num_rows.' além disso retornou: '.$conn->error;}
?>
