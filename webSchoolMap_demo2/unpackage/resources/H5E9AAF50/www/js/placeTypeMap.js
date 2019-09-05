//let latLng = 


mui.init({
	swipeBack: true //启用右滑关闭功能
});

mui.plusReady(function() {

	let self = plus.webview.currentWebview('placeTypeMap');
	let params = self.items;
	console.log(params.longitude);
	
	
	var center = new qq.maps.LatLng(params.longitude, params.lalitude);
	let start = new qq.maps.LatLng(23.639767280414812, 113.67167472839355);
	let end = new qq.maps.LatLng(23.62529889677107, 113.69249754333496);
	
	let map = new qq.maps.Map(document.getElementById("map-container"), {
		//加载地图经纬度信息
		center: center,
		zoom: 16, //设置缩放级别
		minZoom: 16,
		draggable: true, //设置是否可以拖拽
		boundary: new qq.maps.LatLngBounds(start, end)
	})

	var marker = new qq.maps.Marker({
		position: center,
		map: map
	})

	marker.name = params.name;

	var latlngBounds = new qq.maps.LatLngBounds();
	//latlngBounds.extend(poi.latLng);
	let add = `
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="./imgs/b.jpg">
						<div class="mui-media-body">
							${marker.name}
						</div>
					</a>
				</li>
			</ul>
		`
	var info = new qq.maps.InfoWindow({
		map: map
	});

	info.open();
	info.setContent(add);
	info.setPosition(center);

})
