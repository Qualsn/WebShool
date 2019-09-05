<?php
require_once '../conn/conn.php';
$link = $conn;
$select ="select * from m_time";
$result=mysqli_query($link,$select);
$data =array();
$zero=strtotime(date("y-m-d"));
// echo $zero;
while ($re1=mysqli_fetch_array($result)){
	if(strtotime($re1['date'])>$zero&&$re1['status']=='1'){
	$asa=array(
	'id'=>$re1['Id'],
	'username'=>$re1['username'],
	'floor'=>$re1['floor'],
	'classroom'=>$re1['classroom'],
	'date'=>$re1['date'],
	'time'=>$re1['time'],
	'reason'=>$re1['reason'],
	'status'=>$re1['status'],
	'creat_date'=>$re1['creat_date']
	);
	array_push($data,$asa);
	}
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