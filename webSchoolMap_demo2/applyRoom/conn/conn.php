<?php
$dbname="map_up";
$conn = mysqli_connect("localhost", "root", "root");
if(mysqli_select_db($conn, $dbname)){
  // echo "成功";
}else{
    echo '失败';
}
?>