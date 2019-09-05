<?php
require_once '../conn/conn.php';
$link = $conn;
$username = $_POST['username'];
// $username =Qualsn;
$selectA ="select * from m_time where username = '{$username}' and delete_status='0'";
$result=mysqli_query($link,$selectA);
$data =array();
while ($re1=mysqli_fetch_array($result)){
	$asa=array(
	'id'=>$re1['Id'],
	'username'=>$re1['username'],
	'floor'=>$re1['floor'],
	'classroom'=>$re1['classroom'],
	'date'=>$re1['date'],
	'time'=>$re1['time'],
	'reason'=>$re1['reason'],
	'status'=>$re1['status']
	);
	array_push($data,$asa);
}
$response = array(
    'code'  => 200,
    'message' => 'success for request',
    'data'  => $data
);
// print_r($data);
$back=json_encode($response,JSON_UNESCAPED_UNICODE);
if($result){
	echo $back;
}else{
	echo '0';
}