// 前后台交互
var xmlHttp;

function createXMLHttpRequest() {
	if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			xmlHttp = false;
		}
	} else {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			xmlHttp = false;
		}
	}
	if (!xmlHttp)
		alert("错误");
	else
		return xmlHttp;
}

function show(){
	createXMLHttpRequest();
	var status1='show' ;
	var formData = new FormData();
	formData.append('status1', status1);
	$.ajax({
		url: 'controller/addCatelist.php', //后台地址
		async: true, //异步
		type: 'post', //post方式
		data: formData, //FormData数据
		dataType: 'json',
	
		processData: false, //不处理数据流 !important
		contentType: false, //不设置http头 !important
		success: function(data) { //上传成功回调
			console.log(data); //获取文件链接
			var content = data['data'];
			console.log(content);
			for (var i = 0; i < content.length; i++) {
				var div =$("<tbody><tr><td><lable class='id' id='id"+ i +"'></td><td id='username'></td><td id='content'></td><td id='date-t'></td><td id='reason'>2</td><td><a href='#' class='btn btn-azure btn-xs' onclick='pass("+ content[i]['id'] +","+i+")'>通过</a><a href='#' class='btn btn-danger btn-xs' onclick='reject("+ content[i]['id'] +","+i+")'>拒绝</a><label id='check"+i+"' style='float: right;'></label></td><td><label id='de-status"+i+"'></label></td></tr></tbody>");
				$("#show-content").prepend(div);
				div.find(".id").append(content[i]['id']);
				div.find("#username").append(content[i]['username']);
				div.find("#content").append(content[i]['floor']+content[i]['classroom']);
				div.find("#date-t").append(content[i]['date']+content[i]['time']);
				div.find("#reason").append(content[i]['reason']);
				if(content[i]['delete_status']=='1'){
					div.find("#de-status"+i+"").append('已删除');
				}
				if(content[i]['status']=='0'){
					div.find("#check"+i+"").append('审核中');
					div.find("#check"+i+"").css('color','#007AFF');
				}
				if(content[i]['status']=='1'){
					div.find("#check"+i+"").append('已通过');
					div.find("#check"+i+"").css('color','red');
				}
				if(content[i]['status']=='4'){
					div.find("#check"+i+"").append('已拒绝');
					div.find("#check"+i+"").css('color','#D3D3D3');
				}
				
				}
			
	
	
		}
	
	})
}
//分页操作
/*
function goPage(pno,psize){
  var itable = document.getElementById("show-content");
  var num = itable.rows.length;//表格所有行数(所有记录数)
  console.log(num);
  var totalPage = 0;//总页数
  var pageSize = psize;//每页显示行数
  //总共分几页
  if(num/pageSize > parseInt(num/pageSize)){
      totalPage=parseInt(num/pageSize)+1;
    }else{
      totalPage=parseInt(num/pageSize);
    }
  var currentPage = pno;//当前页数
  var startRow = (currentPage - 1) * pageSize+1;//开始显示的行 31
    var endRow = currentPage * pageSize;//结束显示的行  40
    endRow = (endRow > num)? num : endRow;  //40
    console.log(endRow);
    //遍历显示数据实现分页
  for(var i=1;i<(num+1);i++){
    var irow = itable.rows[i-1];
    if(i>=startRow && i<=endRow){
      irow.style.display = "block";
    }else{
      irow.style.display = "none";
    }
  }
  var tempStr = "共"+num+"条记录 分"+totalPage+"页 当前第"+currentPage+"页";
  if(currentPage>1){
    tempStr += "<a href=\"#\" onClick=\"goPage("+(1)+","+psize+")\">首页</a>";
    tempStr += "<a href=\"#\" onClick=\"goPage("+(currentPage-1)+","+psize+")\"><上一页</a>"
  }else{
    tempStr += "首页";
    tempStr += "<上一页";
  }
  if(currentPage<totalPage){
    tempStr += "<a href=\"#\" onClick=\"goPage("+(currentPage+1)+","+psize+")\">下一页></a>";
    tempStr += "<a href=\"#\" onClick=\"goPage("+(totalPage)+","+psize+")\">尾页</a>";
  }else{
    tempStr += "下一页>";
    tempStr += "尾页";
  }
  document.getElementById("barcon").innerHTML = tempStr;
}
*/

//通过审核
function pass(id,i){
	createXMLHttpRequest();
	if(confirm('确定通过审核？')){
		console.log(id);
		var formData = new FormData();
		var status='pass';
		formData.append('id', id);
		formData.append('status', status);
		
		$.ajax({
			url: 'controller/addCatelist.php', //后台地址
			async: true, //异步
			type: 'post', //post方式
			data: formData, //FormData数据
			dataType: 'text',
		
			processData: false, //不处理数据流 !important
			contentType: false, //不设置http头 !important
			success: function(data) { //上传成功回调
				console.log(data); //获取文件链接
				console.log(i);
				if(data=='通过'){
					document.getElementById("check"+i+"").innerHTML='已通过';
					// $("#check"+i+"").innerHTML='已通过';
					$("#check"+i+"").css('color','red');
					// div.find("#check"+i+"").css('color','red');
					alert('审核通过！');
					}else{
						alert('操作失败！');
					}
				
		
			}
		
		})
		}
}
//拒绝审核
function reject(id,i){
	createXMLHttpRequest();
	if(confirm('你确定拒绝？')){
		var formData = new FormData();
		var status='reject';
		formData.append('id', id);
		formData.append('status', status);
		
		$.ajax({
			url: 'controller/addCatelist.php', //后台地址
			async: true, //异步
			type: 'post', //post方式
			data: formData, //FormData数据
			dataType: 'text',
		
			processData: false, //不处理数据流 !important
			contentType: false, //不设置http头 !important
			success: function(data) { //上传成功回调
				console.log(data); //获取文件链接
				if(data=='已拒绝'){
					document.getElementById("check"+i+"").innerHTML='已拒绝';
					$("#check"+i+"").css('color','#D3D3D3');
					alert('已拒绝！');
					}else{
						alert('操作失败！');
					}
				
		
			}
		
		})
		}
}