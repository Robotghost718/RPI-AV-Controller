<?php
$command=escapeshellcmd(" python Mic_45.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>