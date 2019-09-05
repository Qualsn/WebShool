	//选择时间事件
			var sel_time = $('#sel-time');
			sel_time.click(function() {
				$('.time-box').css({
					display: 'block'
				});
			});
			$('.time-box>#cancel-time').click(function() {
				$('.time-box').css({
					display: 'none'
				});
			});
			$('.time-box>#confirm-time').click(function() {
				$('.time-box').css({
					display: 'none'
				});
				var re_time = document.getElementsByName("check");
				var chack_time = new Array();
				for (var k in re_time) {
					if (re_time[k].checked == true) {
						chack_time.push(re_time[k].value);
					}
				}
				document.getElementById('sel-time').value = '时间段:' + chack_time;
				// console.log('时间段:' + chack_time);
				var time1 = document.getElementById('time1');
				time1.innerHTML = chack_time;
			});


			mui.init({
				swipeBack: true, //启用右滑关闭功能

				// preloadPages: [{
				// 	url: 'MyApplyDetail.html',
				// 	id: 'MyApplyDetail.html',
				// 	// 				    styles:{},//窗口参数
				// 	// 				    extras:{},//自定义扩展参数
				// 	// subpages:[{},{}]//预加载页面的子页面
				// }],
				// preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制

			});

			//日期


			(function($) {
				$.init();
				var result = $('#result')[0];
				var btns = $('.btn');
				btns.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var _self = this;
						if (_self.picker) {
							_self.picker.show(function(rs) {
								btn.innerHTML = '预约日期: ' + rs.text;
								// _self.picker.dispose();
								_self.picker = null;

								var date1 = document.getElementById('date1');
								date1.innerHTML = rs.text;
							});
						} else {
							var currentyear = new Date().getFullYear();
							var currentmonth = new Date().getMonth();
							var currentday = new Date().getDate();

							// 									var optionsJson = this.getAttribute('data-options') || '{}';
							// 									var options = JSON.parse(optionsJson);
							// 									var id = this.getAttribute('id');
							/*
							 * 首次显示时实例化组件
							 * 示例为了简洁，将 options 放在了按钮的 dom 上
							 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
							 */
							// _self.picker = new $.DtPicker(options);
							_self.picker = new mui.DtPicker({
								type: "date", //时间样式为月日式
								// 										beginMonth:currentmonth,
								// 										endMonth:currentmonth,
								// 										beginDay:currentday,
								// 										endDay:currentday+7
								beginDate: new Date(2019, currentmonth, currentday + 1), //设置开始日期
								endDate: new Date(2019, currentmonth, currentday + 7), //设置结束日期
							})
							_self.picker.show(function(rs) {
								/*
								 * rs.value 拼合后的 value
								 * rs.text 拼合后的 text
								 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
								 * rs.m 月，用法同年
								 * rs.d 日，用法同年
								 * rs.h 时，用法同年
								 * rs.i 分（minutes 的第二个字母），用法同年
								 */
								console.log(rs.text);
								btn.innerHTML = '预约日期: ' + rs.text;

								// var date1 = document.getElementById('date1');
								// date1.innerHTML = rs.text;								
								/* 
								 * 返回 false 可以阻止选择框的关闭
								 * return false;
								 */
								/*
								 * 释放组件资源，释放后将将不能再操作组件
								 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
								 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
								 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
								 */
								_self.picker.dispose();
								_self.picker = null;
							});
						}

					}, false);
				});




				/**
				 * 获取对象属性的值
				 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
				 * @param {Object} obj 对象
				 * @param {String} param 属性名
				 */
				var _getParam = function(obj, param) {
					return obj[param] || '';
				};
				//普通示例
				var userPicker = new $.PopPicker();
				userPicker.setData([{
					value: 'ywj',
					text: '教学楼1号'
				}, {
					value: 'aaa',
					text: '教学楼2号'
				}, {
					value: 'lj',
					text: '教学楼3号'
				}, {
					value: 'ymt',
					text: '教学楼4号'
				}, {
					value: 'shq',
					text: '教学楼5号'
				}, {
					value: 'zhbh',
					text: '教学楼6号'
				}, {
					value: 'zhy',
					text: '教学楼7号'
				}, {
					value: 'gyf',
					text: '教学楼8号'
				}, {
					value: 'zhz',
					text: '教学楼9号'
				}, {
					value: 'gezh',
					text: '教学楼10号'
				}, {
					value: 'gezh',
					text: '教学楼11号'
				}, {
					value: 'gezh',
					text: '教学楼12号'
				}]);
				var showUserPickerButton = document.getElementById('teachbuilding');
				// var userResult = doc.getElementById('userResult');
				showUserPickerButton.addEventListener('tap', function(event) {
					userPicker.show(function(items) {
						var data = items[0].text;
						showUserPickerButton.innerHTML = data;

						var lou = document.getElementById('lou');
						lou.innerHTML = data;
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);


				var roompicker = new $.PopPicker();
				roompicker.setData([{
					value: 'ywj',
					text: '105'
				}, {
					value: 'aaa',
					text: '106'
				}, {
					value: 'lj',
					text: '205'
				}, {
					value: 'ymt',
					text: '206'
				}]);
				var showRoomPickerButton = document.getElementById('replyroom');
				// var userResult = doc.getElementById('userResult');
				showRoomPickerButton.addEventListener('tap', function(event) {
					roompicker.show(function(items) {
						var data = items[0].text;
						showRoomPickerButton.innerHTML = data;

						var shi = document.getElementById('shi');
						shi.innerHTML = data;
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);

			})(mui);

			//我的预约
			function oppoint() {
				var name = 'qualsn';
				window.location.href = "MyApplyDetail.html?username=" + name;
			}
			// 			var detailPage = null;
			// 			var applybutton = document.getElementById('myapply');
			// 			applybutton.addEventListener('tap', function() {
			// 				// var mid = document.getElementById('teachbuilding').innerHTML; //获取用户id;
			// 				var mid = "www";
			// 				if (!detailPage) {
			// 					mui.plusReady(function() {
			// 						console.log("当前页面URL：" + plus.webview.currentWebview().getURL());
			// 						detailPage = plus.webview.getWebviewById('MyApplyDetail.html');
			// 					});
			// // 
			// // 				}
			// 				//触发详情页面的newsId事件
			// 				// mui.fire(detailPage, 'newsId', {
			// 				// 	id: mid
			// 				// });
			// 
			// 
			// 				mui.openWindow({
			// 					url:'MyApplyDetail.html',
			// 					id: 'MyApplyDetail.html',
			// 					// 					styles: {
			// 					// 						top: newpage - top - position, //新页面顶部位置
			// 					// 						bottom: newage - bottom - position, //新页面底部位置
			// 					// 						width: newpage - width, //新页面宽度，默认为100%
			// 					// 						height: newpage - height, //新页面高度，默认为100%
			// 					// 					},
			// 										extras: {
			// 											//自定义扩展参数，可以用来处理页面间传值
			// 											id:mid
			// 										},
			// 					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			// 					show: {
			// 						autoShow: true, //页面loaded事件发生后自动显示，默认为true
			// 						// 						aniShow: animationType, //页面显示动画，默认为”slide-in-right“；
			// 						// 						duration: animationTime //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			// 					},
			// 					waiting: {
			// 						autoShow: true, //自动显示等待框，默认为true
			// 						title: '正在加载...', //等待对话框上显示的提示内容
			// 						// 						options: {
			// 						// // 							width: waiting - dialog - widht, //等待框背景区域宽度，默认根据内容自动计算合适宽度
			// 						// // 							height: waiting - dialog - height, //等待框背景区域高度，默认根据内容自动计算合适高度
			// 						// 							
			// 						// 						}
			// 					}
			// 				})
			// 
			// 			}, false);
			// 
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

			function sendmessage() {
				createXMLHttpRequest();
				var floor = document.getElementById('lou').innerHTML;
				var classroom = document.getElementById('shi').innerHTML;
				var adddate = document.getElementById('date1').innerHTML;
				var addtime = document.getElementById('time1').innerHTML;
				var reason = document.getElementById('texta').value;
				var name = document.getElementById('name').value;
				// var name = 'Qualsn';
				var formData = new FormData();
				formData.append('floor', floor);
				formData.append('classroom', classroom);
				formData.append('adddate', adddate);
				formData.append('addtime', addtime);
				formData.append('reason', reason);
				formData.append('username', name);
				// formData.append('username', name);




				$.ajax({
					url: 'controller/addMessage.php', //后台地址
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