<?php
require_once '../../conn/conn.php';
$link = $conn;
$name = $_POST['name'];
$password=$_POST['password'];
$select = "select * from admin";
$result=mysqli_query($link,$select);
while($rel=mysqli_fetch_array($result)){
	// echo $rel['ad_password'];
	if($name==$rel['ad_name']&&$password==$rel['ad_password']){
		echo '登录';
	}
}