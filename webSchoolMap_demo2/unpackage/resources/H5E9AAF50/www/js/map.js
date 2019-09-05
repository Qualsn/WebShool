let start = new qq.maps.LatLng(23.639767280414812, 113.67167472839355);
let end = new qq.maps.LatLng(23.62529889677107, 113.69249754333496);

let map = new qq.maps.Map(document.getElementById("map-container"), {
	//加载地图经纬度信息
	zoom: 16, //设置缩放级别
	minZoom: 15,
	draggable: true, //设置是否可以拖拽
	boundary: new qq.maps.LatLngBounds(start, end),
	center: new qq.maps.LatLng(23.632641408097825, 113.67952823638916)
});
var searchService, markers = [];
mui.plusReady(function() {

	//pexit();

	let self = plus.webview.currentWebview('placeTypeMap');
	let params = self.items;

	//console.log(params.longitude)

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
			style: {
				color: "#EEAD0E",
				fontSize: "16px",
				fontWeight: "bold",
				border: "0",
				backgroundColor: "transparent",
				padding: "0",
				margin: "0"
			},
			offset: new qq.maps.Size(10, -25),
		});

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

		//marker.setIcon(icon2)
		//marker.setShadow(icon2)

		//var latlngBounds = new qq.maps.LatLngBounds();

		let pois = tableData.data;

		for(let i = 0; i < pois.length; i++) {
			for(let j = 0; j < pois[i].detail.length; j++) {
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
						fontSize: "10px",
						fontWeight: "bold",
						border: "0",
						backgroundColor: "transparent",
						padding: "0",
						margin: "0"
					},
					offset: new qq.maps.Size(2, -15),
				})

				marker2.setIcon(icon)

				//marker.setIcon(icon)
				marker2.name = poi.name;

				markers.push(marker2);
			}
		}

		

		if(params) {
			onloadPlaceTypeDetailMap(params)
		}

	})

});

function onloadPlaceTypeDetailMap(params) {

	//clearOverlays(markers);

	console.log("onloadPlaceTypeDetailMap")
	var placeTypeCenter = new qq.maps.LatLng(params.longitude, params.lalitude);

	//map.center = placeTypeCenter;

	//console.log(map.center.lat)
	let name = params.name ? params.name : params.title

	let placeTypeAdd = `
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../imgs/b.jpg">
						<div class="mui-media-body">
							${name}
						</div>
					</a>
				</li>
			</ul>
		`
	var placeTypeInfo = new qq.maps.InfoWindow({
		map: map,
		position: placeTypeCenter,
	});

	placeTypeInfo.open();
	placeTypeInfo.setContent(placeTypeAdd);
	placeTypeInfo.setPosition(placeTypeCenter);
}

function showSearchMap(params) {

	//var latlngBounds = new qq.maps.LatLngBounds();
	console.log(params.title)

	let searchCenter = new qq.maps.LatLng(params.lalitude, params.longitude);
	//latlngBounds.extend(searchCenter);

	let placeTypeAdd = `
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../imgs/b.jpg">
						<div class="mui-media-body">
							${params.title}
						</div>
					</a>
				</li>
			</ul>
		`
	let info = new qq.maps.InfoWindow({
		map: map,
		position: searchCenter
	});

	info.open();
	info.setContent(placeTypeAdd);
	info.setPosition(searchCenter);

	//map.fitBounds(latlngBounds);

}

function pexit() {
	mui.oldBack = mui.back;
	var backButtonPress = 0;
	mui.back = function(event) {
		backButtonPress++;
		if(backButtonPress > 1) {
			plus.runtime.quit();
		} else {
			plus.nativeUI.toast('再按一次退出应用');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
		return false;
	};
}