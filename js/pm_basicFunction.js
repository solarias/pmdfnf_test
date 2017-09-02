//=================================================================================================================
//※ 기초 함수들
//=================================================================================================================
	//=================================================================================================================
	//※ 1. '보조 - 패시브' 함수
	//=================================================================================================================
	//IE8에 배열 indexOf 적용
	if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			 ? Math.ceil(from)
			 : Math.floor(from);
		if (from < 0)
		  from += len;

		for (; from < len; from++)
		{
		  if (from in this &&
			  this[from] === elt)
			return from;
		}
		return -1;
	  };
	};
	//=================================================================================================================
	//※ 2. '보조 - 액티브' 함수
	//=================================================================================================================
	//1. DOM 관련
		//DOM 접근용 함수
			//하나의 개체 접근
			function $(parameter) {
				return document.querySelector(parameter);
			}
			//다수 개체 접근(반환 형식 : 배열)
			function $$(parameter) {
				return document.querySelectorAll(parameter);
			}
		
		//특정 class 확인&추가&제거
		function hasClass(ele,cls) {
		  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		}

		function addClass(ele,cls) {
		  if (!hasClass(ele,cls)) ele.className += " "+cls;
		}

		function removeClass(ele,cls) {
		  if (hasClass(ele,cls)) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			ele.className=ele.className.replace(reg,' ');
		  }
		}
	
	
	//2. 수치, 랜덤 관련
			//천단위 콤마 표시 (출처 : http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
			function thousand(num) {
				return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			};
			
			//숫자 여부 판단 (출처 : http://mwultong.blogspot.com/2007/01/isnum-isnumeric-isnumber-javascript.html)
			function isNumber(s) {
			  s += ''; // 문자열로 변환
			  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
			  if (s == '' || isNaN(s)) return false;
			  return true;
			};
			
			//가중치 적용 랜덤
			function rand(target) {//target : 숫자가 들어있는 배열
				var number = 0;
				for (i=0;i<target.length;i++) {
					number += target[i];
				}
				var tmp = Math.random() * number;
				
				number = 0;
				for (i=0;i<target.length;i++) {
					number += target[i];
					if (tmp < number) {
						return i;
					}
				}
			};
	
	
	//3. 컨텐츠 관련
		//음악 재생여부 판단
		function isPlaying(player) {
			return !player.paused && !player.ended && 0 < player.currentTime;
		}
	//=================================================================================================================
	//※ 3. '실행'에 필요한 함수
	//=================================================================================================================
	// 이미지 선로딩 (원본 출처 : http://stackoverflow.com/questions/8264528/image-preloader-javascript-that-supports-eventNames/8265310#8265310)
	function loadImages(arr,callBack){ 
		var imagesArray = [];
		var img;
		var remaining = arr.length;
		for (var i = 0; i < arr.length; i++) {
			img = new Image();
			img.onload = function() {
				//외부 처리 
				$("#loading_state_bar").style.width = Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%";
				$("#loading_state_num").innerHTML = Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%";
				//내부 처리
				--remaining;
				if (remaining <= 0) {
					callBack();
				};
			};
			img.onerror = function() {
				//외부 처리 
				$("#loading_state_bar").style.width = Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%";
				$("#loading_state_num").innerHTML = Math.round((((arr.length - remaining + 1)/arr.length)*100),0).toString()+"%";
				--remaining;
				if (remaining <= 0) {
					callBack();
				};
			};
			img.src = arr[i];
			document.getElementById("imagePreloader").innerHTML += "<img src='" + arr[i] + "' />";
			imagesArray.push(img);
		};
	};