<?php
$command=escapeshellcmd(" python Volume_60.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>