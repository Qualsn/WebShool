var getmymessage = function (){
				if(localStorage.getItem('img')!=null){
					document.getElementById('head-img1').src = localStorage.getItem('img');
				}
				else{
					document.getElementById('head-img1').src='../imgs/weixin.png';
				}
				
				if(localStorage.getItem('nicheng')!=null){
					document.getElementById('account').innerHTML = localStorage.getItem('nicheng');
				}
				else{
					document.getElementById('account').innerHTML='';
				}
				
				
				if(localStorage.getItem('province')!=null){
					document.getElementById('province').innerHTML = localStorage.getItem('province');
				}
				else{
					document.getElementById('province').innerHTML='';
				}
				
				
				if(localStorage.getItem('city')!=null){
					document.getElementById('city').innerHTML = localStorage.getItem('city');
				}
				else{
					document.getElementById('city').innerHTML='';
				}
				}