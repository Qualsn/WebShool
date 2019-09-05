<?php
require_once '../../conn/conn.php';
$link = $conn;
$status = $_POST['status1'];
if($status=='show'){
	$select_s="select * from m_time";
	$result_s=mysqli_query($link,$select_s);
	$result1=array();
	while($re1=mysqli_fetch_array($result_s)){
		 $as=array(
		    "id"=> $re1['Id'],
		    "username" => $re1['username'],
		    "floor" => $re1['floor'],
		    "classroom" => $re1['classroom'],
		    "date" => $re1['date'],
		    "time" => $re1['time'],
			"status"=>$re1['status'],
			'reason'=>$re1['reason'],
			"creat_time"=>$re1['creat_time'],
			"delete_status"=>$re1['delete_status']
		);
		array_push($result1, $as);
	}
	$response = array(
	    'code'  => 200,
	    'message' => 'success for request',
	    'data'  => $result1
	);
	$back=json_encode($response,JSON_UNESCAPED_UNICODE);
	if($result_s){
		echo $back;
	}else{
		echo '0';
	}
}
if($_POST['status']=='pass'){
	$id_u=$_POST['id'];
	$num=1;
	$update_p = "update m_time set status='{$num}' where id='{$id_u}'";
	$result_u=mysqli_query($link,$update_p);
	if($result_u){
		// echo $id;
		echo '通过';
	}else{
		echo '未通过';
	}
}
if($_POST['status']=='reject'){
	$id_j=$_POST['id'];
	$num=4;
	$update_j = "update m_time set status='{$num}' where id='{$id_j}'";
	$result_j=mysqli_query($link,$update_j);
	if($result_j){
		echo '已拒绝';
	}else{
		echo '未拒绝';
	}
}
