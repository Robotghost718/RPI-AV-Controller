<?php
$command=escapeshellcmd(" python input_8.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>