let start = new qq.maps.LatLng(23.639767280414812, 113.67167472839355);
let end = new qq.maps.LatLng(23.62529889677107, 113.69249754333496);
let labelStyle = {
	color: "#EEAD0E",
	fontSize: "16px",
	fontWeight: "bold",
	border: "0",
	backgroundColor: "transparent",
	padding: "0",
	margin: "0"
}
let size = new qq.maps.Size(10, 10),
	origin = new qq.maps.Point(0, 0),
	anchor = new qq.maps.Point(10, 12), //位置
	scaleSize = new qq.maps.Size(15, 12),
	icon = new qq.maps.MarkerImage(
		"../imgs/landmark.png",
		size,
		origin,
		anchor,
		scaleSize
	),
	icon2 = new qq.maps.MarkerImage(
		"../imgs/location.png",
		size = new qq.maps.Size(50, 68),
		origin,
		anchor = new qq.maps.Point(0, 0),
		scaleSize = new qq.maps.Size(30, 30),
		1000
	);
let map = new qq.maps.Map(document.getElementById("map-container"), {
	//加载地图经纬度信息
	zoom: 16, //设置缩放级别
	minZoom: 15,
	draggable: true,
	boundary: new qq.maps.LatLngBounds(start, end),
	center: new qq.maps.LatLng(23.632641408097825, 113.67952823638916),
	//启用平移控件
	panControl: true,
	//设置平移控件的位置
	panControlOptions: {
		//设置平移控件的位置为相对右方中间位置对齐.
		position: qq.maps.ControlPosition.RIGHT_CENTER

	},
	mapStyleId: "style1",
});
var searchService, placeTypeInfo, searchInfo, markers = [],
	labels = [],
	specialMakers = [],
	specialInfos = [],
	pecialInfo;
mui.plusReady(function() {

	//pexit();

	let self = plus.webview.currentWebview('placeTypeMap');
	let params = self.items;

	if (params) {
		document.getElementById('map-header-search').classList.add('mui-hidden');
		document.getElementById('detailMap').classList.remove('mui-hidden');
		onloadPlaceTypeDetailMap(params)
	}

	addControl();

	// 	plus.geolocation.getCurrentPosition(function(p) {
	// 		//获取地图显示控件
	// 
	// 		var center = new qq.maps.LatLng(p.coords.latitude, p.coords.longitude);
	// 
	// 		qq.maps.convertor.translate(center, 2, function(res) {
	// 			console.log(res[0])
	// 			console.log("1111")
	// 			let marker = new qq.maps.Marker({
	// 				position: res[0],
	// 				map: map,
	// 				animation: qq.maps.MarkerAnimation.BOUNCE,
	// 			})
	// 
	// 			let label = new qq.maps.Label({
	// 				position: res[0],
	// 				map: map,
	// 				content: "我的位置",
	// 				style: labelStyle,
	// 				offset: new qq.maps.Size(10, -25),
	// 			});
	// 
	// 		})
	// 		//marker.setIcon(icon2)
	// 		//marker.setShadow(icon2)
	// 
	// 	})
	plus.geolocation.getCurrentPosition(function(p) {
		//获取地图显示控件

		var center = new qq.maps.LatLng(p.coords.latitude, p.coords.longitude);

		let marker = new qq.maps.Marker({
			position: center,
			map: map,
			animation: qq.maps.MarkerAnimation.BOUNCE,
		})

		let label = new qq.maps.Label({
			position: center,
			map: map,
			content: "我的位置",
			style: labelStyle,
			offset: new qq.maps.Size(10, -25),
		});

	})


	initMapLabel(tableData16, 10);

	qq.maps.event.addDomListener(map, "zoom_changed", function() {
		console.log("zoom");
		let currenZoom = map.getZoom();
		console.log(currenZoom)
		if (currenZoom == 15) {
			console.log("15")
			//initMapLabel(tableData2, false)
			clearOverlays(markers)
			closeLabel(labels)
		} else if (currenZoom == 16) {
			closeLabel(labels)
			clearOverlays(markers)
			initMapLabel(tableData16, 10);
		} else if (currenZoom == 17) {
			closeLabel(labels)
			clearOverlays(markers)
			initMapLabel(tableData, 14);
		}

	})
	

});

function showSearchMap(params) {
	//specialInfo.close();
	//var latlngBounds = new qq.maps.LatLngBounds();
	console.log(params.title)

	let searchCenter = new qq.maps.LatLng(params.longitude, params.lalitude);
	//latlngBounds.extend(searchCenter);


	let adds =
		`
			<div style="min-width: 500px;" >
				<img class="mui-pull-right" src="../imgs/b.jpg" width="50" height="50" />
				<div  style="font-size: 16px;">
					<span style="color:#3385ff;">${params.title}</span>
					<p style="font-size: 15px;margin: 8px 5px 0 0;">
						<span class="mui-icon mui-icon-phone" style="width: 15px;height:15px;"></span>
						<a href="tel: ${params.phone}" style="color: #333;">${params.phone}</a>
					</p>
				</div>
			</div>
			`


	searchInfo = new qq.maps.InfoWindow({
		map: map,
		position: searchCenter
	});

	searchInfo.open();
	searchInfo.setContent(adds);
	searchInfo.setPosition(searchCenter);

	//map.fitBounds(latlngBounds);

}


function onloadPlaceTypeDetailMap(params) {


	let placeTypeCenter = new qq.maps.LatLng(params.longitude, params.lalitude);



	//console.log("onloadPlaceTypeDetailMap")



	let name = params.name ? params.name : params.title


	let adds =
		`
			<div style="min-width: 170px;" id="call">
				<img class="mui-pull-right" src="../imgs/b.jpg" width="50" height="50" />
				<div  style="font-size: 16px;">
					<span style="color:#3385ff;">${name}</span>
					<p style="font-size: 15px;margin: 8px 5px 0 0;">
						<span class="mui-icon mui-icon-phone" style="width: 15px;height:15px;"></span>
						<a href="tel: ${params.phone}" style="color: #333;">${params.phone}</a>
					</p>
				</div>
			</div>
		`
	placeTypeInfo = new qq.maps.InfoWindow({
		map: map,
		position: placeTypeCenter,
	});

	placeTypeInfo.open();
	placeTypeInfo.setContent(adds);
	placeTypeInfo.setPosition(placeTypeCenter);

}



//产生随机数
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

//拨打电话
function call(number) {
	if (plus.os.name == "Android") {
		var Intent = plus.android.importClass("android.content.Intent");
		var Uri = plus.android.importClass("android.net.Uri");
		var main = plus.android.runtimeMainActivity();
		var uri = Uri.parse("tel:" + number);
		var call = new Intent("android.intent.action.CALL", uri);
		main.startActivity(call);
	} else { //plus.device.dial(number, false);

		var UIAPP = plus.ios.importClass("UIApplication");
		var NSURL = plus.ios.importClass("NSURL");


		var app = UIAPP.sharedApplication();


		app.openURL(NSURL.URLWithString("tel://" + number));
	}
}

function showMapMarker() {

	let n1 = random(1, 50);
	let n2 = random(1, 50);

	let clinicCenter = new qq.maps.LatLng(23.63596, 113.67947);
	let expressCenter = new qq.maps.LatLng(23.63145208673919, 113.6797642707824);
	let centerData = [clinicCenter, expressCenter];

	for (let i = 0; i < centerData.length; i++) {
		let center = centerData[i];
		let marker = new qq.maps.Marker({
			map: map,
			position: center
		});

		let info = new qq.maps.InfoWindow({
			map: map,
			position: center
		});

		info.open();
		if (i == 0) {
			info.setContent(`医务室预约人数: ${n1}`);
		} else if (i == 1) {
			info.setContent(`一分钟取件数: ${n2}`);
		}

		info.setPosition(center);
		specialInfos.push(info)
		specialMakers.push(marker)

	}
}

//初始化所有点
function initMapLabel(datas, size) {

	let pois = datas.data;
	for (let i = 0; i < pois.length; i++) {
		for (let j = 0; j < pois[i].detail.length; j++) {
			let poi = pois[i].detail[j];
			//扩展边界范围，用来包含搜索到的Poi点
			//latlngBounds.extend(poi.lalitude);
			let center2 = new qq.maps.LatLng(poi.longitude, poi.lalitude);
			//map.center = center2;
			let marker2 = new qq.maps.Marker({
				map: map,
				position: center2
			});
			let label2 = new qq.maps.Label({
				map: map,
				position: center2,
				content: poi.name,
				style: {
					color: "#8B5A00",
					fontSize: size + "px",
					fontWeight: "bold",
					border: "0",
					backgroundColor: "transparent",
					padding: "0",
					margin: "0",
					opacity: "0.5"
				},
				offset: new qq.maps.Size(2, -15),
			})

			//label2.setVisible(isShow);

			marker2.setIcon(icon)

			marker2.name = poi.name;

			markers.push(marker2);
			labels.push(label2)
		}
	}

}

//自定义控件
function CustomZoomControl(controlDiv, map) {
	controlDiv.style.padding = "5px 10px";
	controlDiv.style.marginTop = "50px";
	controlDiv.style.marginLeft = "10px";
	controlDiv.style.backgroundColor = "#FFFFFF";
	controlDiv.innerHTML = "显示";
	controlDiv.index = 1; //设置在当前布局中的位置


	controlDiv.addEventListener('click', function() {
		if (controlDiv.innerHTML == "显示") {
			showMapMarker();
			controlDiv.innerHTML = "隐藏";
		} else {
			//清楚marker
			clearOverlays(specialMakers)
			//关闭info
			closeInfo(specialInfos)
			controlDiv.innerHTML = "显示";
		}

	})
}

function addControl() {
	let customShowMapDiv = document.createElement("div");
	let customZoomControl = new CustomZoomControl(customShowMapDiv, map);
	map.controls[qq.maps.ControlPosition.TOP_LEFT].push(customShowMapDiv);
}

//关闭info
function closeInfo(infos) {
	let info;
	while (info = infos.pop()) {
		info.close();
	}
}

function closeLabel(labels) {
	let lalel;
	while (lalel = labels.pop()) {
		lalel.setVisible(false)
	}
}
