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


			// 下面是确定预约信息框
			document.getElementById("mes-btn").addEventListener('tap', function() {
				if(document.getElementById('name').value==""){
					mui.alert('姓名不能为空','申请课室提示','确定',function (e) {
					   e.index
					},'div');
				}else if(document.getElementById('phone').value==""){
					mui.alert('电话不能为空','申请课室提示','确定',function (e) {
					   e.index
					},'div')
				}else if(!(/^1[34578]\d{9}$/.test(document.getElementById('phone').value))){
					mui.alert('电话格式错误','申请课室提示','确定',function (e) {
					   e.index
					},'div')
				}else if(document.getElementById('lou').innerHTML=="空"){
					mui.alert('教学楼不能为空','申请课室提示','确定',function (e) {
					   e.index
					},'div')
				}
				else if(document.getElementById('shi').innerHTML=="空"){
					mui.alert('课室不能为空','申请课室提示','确定',function (e) {
					   e.index
					},'div')
				}
				else if(document.getElementById('date1').innerHTML=="空"){
					mui.alert('日期不能为空','申请课室提示','确定',function (e) {
					   e.index
					},'div')
				}else if(document.getElementById('time1').innerHTML=="空"){
					mui.alert('时间段不能为空','申请课室提示','确定',function (e) {
					   e.index
					},'div')
				}else{
				var btnArray = ['确认', '取消'];
				mui.confirm(' ', '确认预约吗？', btnArray, function(e) {
					if (e.index == 0) {
						//ajax网络请求 预约
						sendmessage();
						
						mui('#mes-btn').button('loading');
						setTimeout(function() {
							mui('#mes-btn').button('reset');
						}.bind('#mes-btn'), 2000);

					} else {
						// mui.toast('取消');
					}
				})
				}
			});

			function sendmessage() {
				createXMLHttpRequest();
				console.log(12);
				var floor = document.getElementById('lou').innerHTML;
				var classroom = document.getElementById('shi').innerHTML;
				var adddate = document.getElementById('date1').innerHTML;
				var addtime = document.getElementById('time1').innerHTML;
				var reason = document.getElementById('texta').value;
				var name = document.getElementById('name').value;
				var phone = document.getElementById('phone').value;
				//用户唯一ID
				var user_id = localStorage.getItem('message');

				var formData = new FormData();
				formData.append('floor', floor);
				formData.append('classroom', classroom);
				formData.append('adddate', adddate);
				formData.append('addtime', addtime);
				formData.append('reason', reason);
				formData.append('phone', phone);
				formData.append('username', name);
				formData.append('user_id', user_id);

				
					
					$.ajax({
						url: 'http://172.27.35.2/File/applyRoom/controller/addMessage.php', //后台地址
						async: true, //异步
						type: 'post', //post方式
						data: formData, //FormData数据
						dataType: 'text',

						processData: false, //不处理数据流 !important
						contentType: false, //不设置http头 !important
						success: function(data) { //上传成功回调
							console.log("文档当前位置是：" + data); //获取文件链接
							if (data == '1') {
								alert('已经开始申请，请耐心等待！');
							}
							if (data == '4') {
								alert("该时间地点已被其他用户申请成功了！");
							}
							if (data == '0') {
								alert('申请失败！');
							}
						}

					})
				
			}
			//输入状态事件
// 			window.onload = function(){
// 				addBlur($('name'));
// 				addBlur($('phone'));
// 			};
// 			function $(obj){
// 				return document.getElementById(obj);
// 			}
// 			function addBlur(obj){
// 				obj.onblur = function(){
// 					isEmpty(this);
// 				};
// 			}
// 			function isEmpty(obj){
// 				if(obj.value ===''){
// 					$('tips').style.display = 'block';
// 					$('tips').innerHTML="注意不能输入为空！";
// 				}else{
// 					$('tips').style.display = 'none';
// 				}
// 			}