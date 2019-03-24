<?php

declare(strict_types=1);

function tojson($gitbook): void
{
    $fh = fopen('./'.$gitbook.'/SUMMARY.md', 'r+');

    $array = [];

    while (!feof($fh)) {
        $line = fgets($fh);

        try {
            $key = explode('&key=', $line)[1] ?? null;
        } catch (Throwable $e) {
            continue;
        }

        if (!$key) {
            continue;
        }

        $key = rtrim($key, ")\n");

        $name = explode('[', $line)[1] ?? null;
        $name = explode('](', $name)[0];

        $array[] = [$key => $name];
    }

    file_put_contents('./'.$gitbook.'/SUMMARY.json', json_encode($array, JSON_UNESCAPED_UNICODE));
}

$gitbooks = [
  'composer-docs.zh-cn',
  'composer-docs.us-en',
  'kubernetes',
  'laravel-docs.zh-cn',
  'laravel-docs.us-en',
  'nginx-docs.zh-cn',
  'phpunit-docs.us-en',
  'phpunit-docs.zh-cn',
  'typescript-docs.us-en',
  'typescript-docs.zh-cn',
 ];

foreach ($gitbooks as $gitbook) {
    tojson($gitbook);
}
