<?php
$command=escapeshellcmd("python3 input_1.py");
$output=shell_exec($command);
//echo $output;
header("Location: ../../projector.html");
die();
?>