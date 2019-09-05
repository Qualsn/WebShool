<?php
require_once '../../conn/conn.php';
$link = $conn;
$username=$_POST['username'];
$floor=$_POST['floor'];
$classroom=$_POST['classroom'];
$date=$_POST['date'];
$time=$_POST['time'];
$reason=$_POST['reason'];
$creat_time=time();
$status=1;


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
				
				if(!$text1){
					global $count;
					if($key == $count-1){
						$inquer="insert into m_time(username,floor,classroom,date,time,reason,status,creat_time)values('{$username}','{$floor}','{$classroom}','{$date}','{$time}','{$reason}','{$status}','{$creat_time}')";
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
		}
	}else{
		break;
	}
	
}