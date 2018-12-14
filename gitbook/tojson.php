<?php

function tojson($gitbook){

$fh = fopen('./'.$gitbook.'/SUMMARY.md','r+');

$array = [];

while(!feof($fh)){
  $line = fgets($fh);

  $key = explode('&key=',$line)[1] ?? null;
  $key = rtrim($key,")\n");

  $name = explode('[',$line)[1] ?? null;
  $name = explode('](',$name)[0];

  if($key){
    $array[] = [$key=>$name];
  }
}

file_put_contents('./'.$gitbook.'/SUMMARY.json',json_encode($array,JSON_UNESCAPED_UNICODE));
}

$gitbooks = ['laravel','kubernetes'];

foreach ($gitbooks as $gitbook) {
 tojson($gitbook);
}
