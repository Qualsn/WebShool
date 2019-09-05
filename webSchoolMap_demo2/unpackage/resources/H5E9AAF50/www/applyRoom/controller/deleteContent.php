<?php
require_once '../conn/conn.php';
$link = $conn;
$id=$_POST['id'];
// $delet_c="delete from m_time where id='{$id}";
$status=1;
$update_t="update m_time set delete_status='".$status."' where id='{$id}'";
$result=mysqli_query($link,$update_t);
if($result){
	echo '1';
}else{
	echo 0;
}