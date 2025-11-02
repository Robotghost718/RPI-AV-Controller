<?php
$command=escapeshellcmd(" python power_on.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>