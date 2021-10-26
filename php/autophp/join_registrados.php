

<?php

echo "
<html>
<head>
<title>Inserção de dados (mar2020): registrados</title>
<meta http-equiv='Cache-Control' content='no-cache, no-store, must-revalidate'/>
<meta http-equiv='Pragma' content='no-cache'/>
<meta http-equiv='Expires' content='0'/>

<meta charset='UTF-8'>

<style>

div.cabecalio {
	background-color: lightgreen;
	border: 1px solid black;
}

table,td,th {
	background-color: green;
        border: 1px solid black;
        border-collapse: collapse;
}
</style>

</head>
<body id='conteudo'>
<div class='cabecalio'>
<h1>Duas Visualizações Left Join: registrados</h1>
</div>

<table>

<tr>
<th>Ordem Direta</th><th>Ordem Inversa</th>
</tr>
<tr>
<td>
<table>
<tr>
<th>id_chave_tipo_operacao_on_line</th><th>id_chave_movel</th>
</tr>
";


include "atomo.php";
$database="baboracex";

$conn= new mysqli("localhost", $username, $pass, $database);

$sql1="select COLUMN_NAME as nome0 from INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA='baboracex' and TABLE_NAME='tipos_operacoes_on_line' and COLUMN_NAME like 'nome_%';";

$result=$conn->query("$sql1");
if ($result->num_rows>0) {
  while($row=$result->fetch_assoc())
    {
       $nome0=$row["nome0"];
    }
}  else {echo "nao achou o campo comecando com nome_1";}

$sql2="select COLUMN_NAME as nome1 from INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA='baboracex' and TABLE_NAME='moveis' and COLUMN_NAME like 'nome_%';";

$result=$conn->query("$sql2");
if ($result->num_rows>0) {
  while($row=$result->fetch_assoc())
    {
       $nome1=$row["nome1"];
    }
}
$sql="select ".$nome0." as n0, ".$nome1." as n1 from  tipos_operacoes_on_line as a, registrados as b left join moveis as c on b.id_movel=c.id_chave_movel where b.id_on_line=a.id_chave_tipo_operacao_on_line  order by ".$nome0.";";

$result=$conn->query("$sql");
$velho="";
if ($result->num_rows>0) {
  while($row=$result->fetch_assoc())
    {
       $campo_1=$row["n0"];
       $campo_2=$row["n1"];
	if (($velho!=$campo_1) && ($velho!="")) {echo "</td></tr>";}
       if ($velho!=$campo_1) { $velho=$campo_1;
                                echo "<tr>
	<td class='fks_field' data-default='' data-fks-table='tipos_operacoes_on_line' data-fks-field='id_chave_tipo_operacao_on_line' data-fkid='".$campo_1."'>".$campo_1."</td>
	<td class='fks_field' data-default='' data-fks-table='moveis' data-fks-field='id_chave_movel' data-fkid='".$campo_2."'>".$campo_2."<br>";


                             }
        else {

            echo $campo_2."<br>";
	

         }

    }

	echo "</td></tr>";

} else {echo "Erro: ".$conn->error;}


echo "
</table>
</td>
<td>
<table>
<tr>
<th>id_chave_movel</th><th>id_chave_tipo_operacao_on_line</th>
</tr>";



$sql="select ".$nome1." as n0, ".$nome0." as n1 from  moveis as a, registrados as b left join tipos_operacoes_on_line as c on b.id_on_line=c.id_chave_tipo_operacao_on_line where b.id_movel=a.id_chave_movel  order by ".$nome1.";";

$result=$conn->query("$sql");
$velho="";
if ($result->num_rows>0) {
  while($row=$result->fetch_assoc())
    {
       $campo_1=$row["n0"];
       $campo_2=$row["n1"];
	if (($velho!=$campo_1) && ($velho!="")) {echo "</td></tr>";}
       if ($velho!=$campo_1) { $velho=$campo_1;
                                echo "<tr>
	<td class='fks_field' data-default='' data-fks-table='tipos_operacoes_on_line' data-fks-field='id_chave_tipo_operacao_on_line' data-fkid='".$campo_1."'>".$campo_1."</td>
	<td class='fks_field' data-default='' data-fks-table='moveis' data-fks-field='id_chave_movel' data-fkid='".$campo_2."'>".$campo_2."<br>";


                             }
        else {

            echo $campo_2."<br>";
	

         }

    }

	echo "</td></tr>";

} else {echo "Erro: ".$conn->error;}

echo "
</table>

</td>
</tr>
</table>
</body>
</html>


";



?>

