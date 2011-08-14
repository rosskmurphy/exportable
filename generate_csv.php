<?php
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=exportable_data.csv");

echo $_POST['csv_text'];