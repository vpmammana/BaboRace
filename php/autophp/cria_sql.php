<?php

setlocale(LC_ALL, 'pt_BR');
$dir=getcwd();
$fs_sql=fopen('/opt/bitnami/apache2/htdocs/BaboRace/php/sql/base_def.sql','w');

if(isset($_GET['sql'])){
  $sql = $_GET['sql'];
}


fwrite($fs_sql,$sql);
fclose($fs_sql);
?>
