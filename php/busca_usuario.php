<?php

if(isset($_GET["usuario"])){
  $usuario = $_GET["usuario"];
} else {$usuario="victor";}

$username="victor";
$pass="aerofolio";
$database="baboracex";

$conn= new mysqli("localhost", $username, $pass, $database);


$sql="select id_chave_registrado as id, nome_registrado, nome_fantasia, nome_movel, nome_on_line as on_line from registrados as r, moveis as m, fantasias as f, moveis_fantasias as mf, tipos_operacoes_on_line  where id_on_line=id_chave_tipo_operacao_on_line and r.id_movel = id_chave_movel and mf.id_movel = id_chave_movel and mf.id_fantasia = id_chave_fantasia and apelido like '".$usuario."' order by id_chave_fantasia limit 1;";


$result=$conn->query("$sql");


if ($result->num_rows == 1) {
  while($row=$result->fetch_assoc())
    {
      $on_line=$row["on_line"];
      $id=$row["id"];
      $nome=$row["nome_registrado"];
      $fantasia=$row["nome_fantasia"];
      $movel=$row["nome_movel"];
    }
   $arr = array('id' => $id, 'nome' => $nome, 'movel' => $movel,'fantasia' => $fantasia, 'on_line' => $on_line );
echo json_encode($arr);
} else {echo 'Deu Problema: Numero de linhas deveria ser 1 e é '.$result->num_rows.' além disso retornou: '.$conn->error;}
?>
