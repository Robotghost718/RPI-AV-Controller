<?php
$command=escapeshellcmd(" python Volume_75.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>