<?php
$command=escapeshellcmd(" python Mic_mute.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../projector.html");
die();
?>