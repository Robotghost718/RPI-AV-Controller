<?php
$command=escapeshellcmd(" python Mic_20.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>