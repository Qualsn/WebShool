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

function sendMessage() {
	createXMLHttpRequest();
	var name = document.getElementById('username').value;
	var floor = document.getElementById('floor').value;
	var classroom = document.getElementById('classroom').value;
	var date = document.getElementById('date').value;
	var time = document.getElementById('time').value;
	var reason = document.getElementById('reason').value;
	var formData = new FormData();
	formData.append('username', name);
	formData.append('floor', floor);
	formData.append('classroom', classroom);
	formData.append('date', date);
	formData.append('time', time);
	formData.append('reason', reason);

	$.ajax({
		url: 'controller/addCateadd.php', //后台地址
		async: true, //异步
		type: 'post', //post方式
		data: formData, //FormData数据
		dataType: 'text',

		processData: false, //不处理数据流 !important
		contentType: false, //不设置http头 !important
		success: function(data) { //上传成功回调
			console.log(data); //获取文件链接
			if(data=='1'){
				alert("申请成功！");
				window.location.href = 'catelist.html';
			}else{
				alert('申请失败!请重试~');
			}


		}

	})

}
