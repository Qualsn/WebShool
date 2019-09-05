<?php
require_once '../conn/conn.php';
$link = $conn;
$creat_date=date("y-m-d");
$time=time();
$classroom = $_POST['classroom'];
$floor=$_POST['floor'];
$date1=$_POST['adddate'];
$time1=$_POST['addtime'];
$reason=$_POST['reason'];
$username=$_POST['username'];
$status='0';
// echo $time;

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
// var_dump($result1);
// var_dump($result1[3]['date']==$date1);
$break1 = '1';
$count = count($result1);
foreach($result1 as $key=>$value){
	if($break1=='1'){
		foreach($value as $keys=>$values){
			
			$udate=explode(",",$result1[$key]['date']);
			$hdate=explode(",",$date1);
			$pan_date=array_intersect_assoc($udate,$hdate);
			// var_dump($pan_date!==array());
			
				$text1 = ($pan_date!==array())&&($result1[$key]['date']==$date1)&&($result1[$key]['time']==$time1)&&($result1[$key]['floor']==$floor)&&($result1[$key]['classroom']==$classroom);
				// var_dump(!$text1);
				// $text2=($result1[$key]['date']==$date1)&&($result1[$key]['time']==$time1)&&($result1[$key]['floor']==$floor)&&($result1[$key]['classroom']==$classroom)&&($result1[$key]['username']==$username);
				// var_dump()
				// if($text2){
				// 	echo '重复';
				// 	$break1='0';
				// 	break;
				// }else{
				if(!$text1){
					global $count;
					if($key == $count-1){
						$inquer="insert into m_time(username,floor,classroom,date,time,reason,status,creat_time,creat_date)values('{$username}','{$floor}','{$classroom}','{$date1}','{$time1}','{$reason}','{$status}','{$time}','{$creat_date}')";
						$result=mysqli_query($link,$inquer);
						if($result){
						    echo '1';
							$break1='0';
							break;
						}else{
						    echo '0';
							$break1='0';
							break;
						}
						echo '1';
						break;
					}
					
					continue;
				}else{
					

					echo '4';
					$break1='0';
					break;
			}
			// }
		}
	}else{
		break;
	}
	
}

// for($i=0;$i<count($result1);$i++){
// 	global $result1;
// $text1 = ($result1[i]['date']==$date1)&&($result1[i]['time']==$time1)&&($result1[i]['floor']==$floor)&&($result1[i]['classroom']==$classroom);
// 
// var_dump($result1[i]);
// 
// 	if($text1){
// 		// echo '该时间地点已被其他用户申请成功了！';
// 		echo '4';
// 			break;
// 		
// 	}else{
// 		
// 		if($i==count($result1)-1){
// // 			$inquer="insert into m_time(u_name,floor,classroom,date,time,reason,status)values('','{$floor}','{$classroom}','{$date1}','{$time1}','{$reason}','{$status}')";
// // 			$result=mysqli_query($link,$inquer);
// // 			if($result){
// // 				echo '1';
// // 			}else{
// // 				echo '0';
// // 			}
// 			
// 		}else{
// 			continue;
// 		}
// 		
// 	}
// 	
// }




?>