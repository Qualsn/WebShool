<?php
require_once '../conn/conn.php';
$link = $conn;
$sel="select * from m_time where status='1'";
$select=mysqli_query($link,$sel);
$result1=array();
while($re1=mysqli_fetch_array($select)){
	 $as=array(
	    "id"=> $re1['Id'],
	    "username" => $re1['username'],
	    "floor" => $re1['floor'],
	    "classroom" => $re1['classroom'],
	    "date" => $re1['date'],
	    "time" => $re1['time']   
	);
	array_push($result1, $as);
}
// echo count($result1);
// 
// var_dump($result1);

$ww=array("12-2","12-2","12-3");
$qq=array("11-2","11-2","12-3");
if (count($ww) != count(array_unique($qq))) {  
   echo '该数组有重复值'; 
}


//利用 explode 函数分割字符串到数组 
$source = "hello1,hello2,hello3,hello4,hello5";
$source1 = "hello1,hello2,hello3,hello4,hello8";//按逗号分离字符串 
$hello = explode(',',$source); 
$hello1 = explode(',',$source1); 
$pan_date=array_intersect_assoc($hello,$hello1);
var_dump($pan_date==array());

// for($i=0;$i<$result1.length;$i++){
// 	if()
// 	$result1[i]
// }
