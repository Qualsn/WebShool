//获取user_id
// let self = plus.webview.currentWebview('placeTypeMap');
// let params = self.items;
// document.getElementById('text-name').innerHTML=params;


// 前后台交互数据
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
//获取用户id


function myContent() {
	mui.plusReady(function() {
		//获取user_id
		let self = plus.webview.currentWebview('placeTypeMap');
		let params = self.items;
		// console.log(params);
		createXMLHttpRequest();
		var user_id = params;
		var username="Qualsn";
		console.log(user_id);
		var formData = new FormData();
		formData.append('user_id', user_id);
		formData.append('username', username);
		$.ajax({
			url: 'http://172.27.35.2/File/applyRoom/controller/addMyApply.php', //后台地址
			async: true, //异步
			type: 'post', //post方式
			data: formData, //FormData数据
			dataType: 'json',

			processData: false, //不处理数据流 !important
			contentType: false, //不设置http头 !important
			success: function(data,status) { //上传成功回调
			console.log(status);
				console.log(data); //获取文件链接
				// console.log(data['data'][1]['floor']);
				var content = data['data'];
				for (var i = 0; i < content.length; i++) {
					// console.log(content[i]['floor'])
					var div = $(
						"<ul id='OA_task_1' class='mui-table-view ul-content' id='ul-content" + i +
						"'><li class='mui-table-view-cell'><div class='mui-slider-right mui-disabled'><a class='mui-btn mui-btn-red' onclick='delete_t(" +
						content[i]['id'] +
						")'>删除</a></div><div class='mui-slider-handle '><tr><th>申请场地：</th><td><lable id='address-t'></lable></td><p style='display: none;' class='id' id='id" +
						content[i]['id'] +
						"'></p><td><label id='status-t' style='float: right;'></label></td></tr><li class='mui-table-view-cell mui-collapse'><a class='mui-navigate-right'>详细信息</a><div class='mui-collapse-content'><table class='content-table'><tr><th style='text-align: center;'>申&nbsp;请&nbsp;人:</th><td style='text-align: center;' id='name-t'></td></tr><tr><th style='text-align: right;'>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期:</th><td style='text-align: center;' id='date-t'></td></tr><tr><th style='text-align: right;'>具体时间:</th><td style='text-align: center;' id='time-t'></td></tr><tr><th style='text-align: right;'>理&nbsp;&nbsp;&nbsp;&nbsp;由：</th><td style='text-align: center;' id='reasom-t'><textarea rows='' cols='' class='tarea' readonly></textarea></td></tr></table></div></li></div></li></ul>"
					);
					$("#div-content").prepend(div);
					div.find(".id").append(content[i]['id']);
					div.find("#time-t").append(content[i]['time']);
					div.find("#name-t").append(content[i]['username']);
					div.find("#reason-t").append(content[i]['reason']);
					div.find("#date-t").append(content[i]['date']);
					div.find('#address-t').append(content[i]['floor'] + content[i]['classroom']);
					if (content[i]['status'] == 0) {
						div.find('#status-t').append('预约中');
						div.find('#status-t').css('color', '#007AFF');
					}
					if (content[i]['status'] == 1) {
						div.find('#status-t').append('已成功');
						div.find('#status-t').css('color', 'red');
					}
					if (content[i]['status'] == 4) {
						div.find('#status-t').append('已拒绝');
						div.find('#status-t').css('color', '#D3D3D3');
					}
				}


			}

		})
	})




}



// 			$(function() {
// 				function getQueryString() {
// 					var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
// 					for (var i = 0; i < result.length; i++) {
// 						result[i] = result[i].substring(1);
// 					}
// 					return result;
// 				}
// 				var as=getQueryString();
// 				
// 				console.log(as)
// 			})
//删除触发
var btnArray = ['确认', '取消'];

function delete_t(i) {

	if (confirm('是否删除')) {
		createXMLHttpRequest();
		var id = i;
		var a = i;
		var text = document.getElementById('id' + i);
		console.log(text)
		var idata = new FormData();
		idata.append('id', id);
		$.ajax({
			url: 'http://172.27.35.2/File/applyRoom/controller/deleteContent.php', //后台地址
			async: true, //异步
			type: 'post', //post方式
			data: idata, //FormData数据
			dataType: 'text',

			processData: false, //不处理数据流 !important
			contentType: false, //不设置http头 !important
			success: function(data) { //上传成功回调
				console.log(data); //获取文件链接
				if (data == 1) {
					text.parentNode.parentNode.parentNode.remove();
				} else {
					alert("删除失败！")
				}
			}
		})
	} else {
		// setTimeout(function() {
		// 	$.swipeoutClose(li);
		// }, 0);
	}
}


// mui.init();
// (function($) {
// 	//$.swipeoutOpen(el,direction)//打开指定列的滑动菜单，el:指定列的dom对象，direction：取值left|right，指定打开的是左侧或右侧滑动菜单
// 	//$.swipeoutClose(el);//关闭指定列的滑动菜单，el:指定列的dom对象
// 	//				setTimeout(function() {
// 	//					$.swipeoutOpen(document.getElementById("OA_task_1").querySelector('li:last-child'), 'left');
// 	//					setTimeout(function() {
// 	//						$.swipeoutClose(document.getElementById("OA_task_1").querySelector('li:last-child'));
// 	//					}, 1000);
// 	//				}, 1000);
// 	//第一个demo，拖拽后显示操作图标，点击操作图标删除元素；
// 	var btnArray = ['确认', '取消'];
// 	$('#OA_task_1').on('tap', '.mui-btn', function(event) {
// 		var elem = this;
// 		var li = elem.parentNode.parentNode;
// 		console.log(li);
// 		mui.confirm('确认删除该条记录？', 'Hello MUI', btnArray, function(e) {
// 			if (e.index == 0) {
// 				li.parentNode.removeChild(li);
// 				
// 			} else {
// 				setTimeout(function() {
// 					$.swipeoutClose(li);
// 				}, 0);
// 			}
// 		});
// 	});
// 
// 
// })(mui);
