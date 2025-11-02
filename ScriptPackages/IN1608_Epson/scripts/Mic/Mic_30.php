<?php
$command=escapeshellcmd(" python Mic_30.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>