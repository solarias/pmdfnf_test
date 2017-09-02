//=================================================================================================================
//※ 이벤트 실행 함수
//=================================================================================================================
function runEvent(eventArr, order, order2, lastType, lastPosition) {
	//※ order : eventArr에서 실행중인 이벤트 순서
	//※ order2 : 실행중인 이벤트 내에서 진행 정도
	//※ lastType : 마지막 대화가 이루어진 대화 종류 (talk, plain)
	//※ lastPosition : 마지막 대화가 이루어진 대화 위치 (1, 2)
	
	//0. 순서 - 입력되지 않으면 ? 초기값 입력
	if (!order) {
		order = 0;
	}
	if (!order2) {
		order2 = 0;
	}
	if (!lastType) {
		lastType = "talk";
	}
	if (!lastPosition) {
		lastPosition = "1";
	}
	
	//1. 이벤트 실행 대상 참조 (몇번째 이벤트를 실행하는가)
	var target = eventArr[order];
	
	//2. IF 실행 직후 ? 대화 프레임 활성화 (공통)
	if (order == 0) {
		$("#frame_event").style.display = "block";
	}
	
	//3. 이벤트 타입에 따라 세팅 및 실행
	//※ target[1] : 이벤트 타입
	switch (target[1]) {
//=================================================================================================================
//※ 이벤트 타입 - 표현형
//=================================================================================================================

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-1. 닫기
		case "clear"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 닫기 대상
			
			//A. 첫 실행 - 세팅
			if (order2 == 0) {
				switch (target[2]) {
					//A-1. 대화 닫기
					case "talk":
						for (var i=1;i<=2;i++) {
							$("#event_talk_" + i.toString()).style.display = "none";
						}
						
						break;
					//A-2. 글 닫기
					case "plain":
						for (var i=1;i<=2;i++) {
							$("#event_plain_" + i.toString()).style.display = "none";
						}
						
						break;
					//A-3. 컷신 닫기
					case "scene":
						$("#event_scene").style.display = "none";
						
						break;
					//A-4. 아이템 닫기
					case "item":
						$("#event_item").style.display = "none";
						
						break;
					//A-5. 모두 닫기
					case "all":
						for (var i=1;i<=2;i++) {
							$("#event_talk_" + i.toString()).style.display = "none";
							$("#event_plain_" + i.toString()).style.display = "none";
						}
						$("#event_scene").style.display = "none";
						$("#event_item").style.display = "none";
						
						break;
				}
			}
			
			//B. 세팅 이후
				//※ 별도 진행 없음
				runEvent(eventArr,order + 1, 0, lastType, lastPosition);
				
			break;
			
//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-2. 대화
		case "talk":
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 대화 인물
			//※ target[3] : 대화창 위치
			//※ target[4] : 대화 내용
			
			//A. 첫 실행 - 세팅
			if (order2 == 0) {
				
				//A-1. 해당 위치 기존 흔적 제거
					//a-1. 대화(talk) 닫기
					$("#event_talk_" + target[3]).style.display = "none";
					//a-2. 글(plain) 닫기
					$("#event_plain_" + target[3]).style.display = "none";
				
				//A-2. 새로운 창 세팅
					//c-1. 초상화 변경
					$("#event_talk_img_" + target[3]).src = "./images/portrait/" + indexPortrait(target[2],'image') + ".png";
					//c-2. 이름 변경
					$("#event_talk_name_" + target[3]).innerHTML = indexPortrait(target[2],'name');
					//c-3. 내용 지우기
					$("#event_talk_text_" + target[3]).innerHTML = "";
					//c-4. 대화창 활성화
					$("#event_talk_" + target[3]).style.display = "block";
				
				//A-3. 마지막 대화장소 등록
					lastType = "talk";
					lastPosition = target[3];
			}
			
			//B. 세팅 이후 : 실행
				//B-1. order2 길이만큼 대사 출력
					//B-1-1. IF 종료되지 않은 태그("<", ">")가 있으면 ? 패스
					if ((target[4].substring(0,order2 + 1).match(/</g) || []).length != (target[4].substring(0,order2 + 1).match(/>/g) || []).length){
						runEvent(eventArr, order, order2 + 1, lastType, lastPosition);
						
						return;
					//B-1-2. ELSE ? 출력
					} else {
						$("#event_talk_text_" + target[3]).innerHTML = target[4].substring(0,order2 + 1);
					}
				//B-2. 화면 클릭 처리
					//B-2-1. 대화 아직 종료 안됨
					if (order2 < target[4].length) {
						var auto = setTimeout(function() {
							$("#event_cover").onclick = null;
							runEvent(eventArr, order, order2 + 1, lastType, lastPosition);
						},50);
						$("#event_cover").onclick = function() {
							clearTimeout(auto);
							runEvent(eventArr, order, target[4].length, lastType, lastPosition);
						}
					//B-2-2. 대화 종료됨
					} else {
						//a. 화살표 표시
						$("#event_talk_arrow_" + target[3]).style.display = "block";
						//b. IF 다음 이벤트 종류가 "skip" ? 다음 이벤트 진행 (클릭 X)
						if (eventArr[order + 1][1] == "skip") {
								//b-1. 화면 클릭 비활성화
								$("#event_cover").onclick = null;
								//b-2. 화살표 제거
								$("#event_talk_arrow_" + target[3]).style.display = "none";
								//b-3. 이벤트 이동
								runEvent(eventArr,order + 1, 0, lastType, lastPosition);
						//c. ELSE : 화면 클릭 시 다음 이벤트 진행
						} else {
							$("#event_cover").onclick = function() {
								//c-1. 화면 클릭 비활성화
								$("#event_cover").onclick = null;
								//c-2. 화살표 제거
								$("#event_talk_arrow_" + target[3]).style.display = "none";
								//c-3. 이벤트 이동
								runEvent(eventArr,order + 1, 0, lastType, lastPosition);
							}
						}
					}
			
			break;

//==============================================================================================================================
//==============================================================================================================================

		//★ 3-3. 글
		case "plain":
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 이름 (쓸모 X, 작성하지 않음)
			//※ target[3] : 창 위치
			//※ target[4] : 글 내용
			
			//A. 첫 실행 - 세팅
			if (order2 == 0) {
				
				//A-1. 해당 위치 기존 흔적 제거
					//A-1-1. 대화(talk) 닫기
					$("#event_talk_" + target[3]).style.display = "none";
					//A-1-2. 글(plain) 닫기
					$("#event_plain_" + target[3]).style.display = "none";
				
				//A-2. 새로운 창 세팅
					//A-2-1. 내용 지우기
					$("#event_plain_text_" + target[3]).innerHTML = "";
					//A-2-1. 대화창 활성화
					$("#event_plain_" + target[3]).style.display = "block";
				
				//A-3. 마지막 대화장소 등록
					lastType = "plain";
					lastPosition = target[3];
			}
			
			//B. 세팅 이후 : 실행
				//B-1. order2 길이만큼 대사 출력
					//B-1-1. IF 종료되지 않은 태그가 있으면 ? 패스
					if ((target[4].substring(0,order2 + 1).match(/</g) || []).length != (target[4].substring(0,order2 + 1).match(/>/g) || []).length){
						runEvent(eventArr, order, order2 + 1, lastType, lastPosition);
						
						return;
					//B-1-2. ELSE ? 출력
					} else {
						$("#event_plain_text_" + target[3]).innerHTML = target[4].substring(0,order2 + 1);
					}
				//B-2. 화면 클릭 처리
					//B-2-1. 대화 아직 종료 안됨
					if (order2 < target[4].length) {
						var auto = setTimeout(function() {
							$("#event_cover").onclick = null;
							runEvent(eventArr, order, order2 + 1, lastType, lastPosition);
						},50);
						$("#event_cover").onclick = function() {
							clearTimeout(auto);
							runEvent(eventArr, order, target[4].length, lastType, lastPosition);
						}
					//B-2-2. 대화 종료됨
					} else {
						//a. 화살표 표시
						$("#event_plain_arrow_" + target[3]).style.display = "block";
						//b. IF 다음 이벤트 종류가 "skip" ? 다음 이벤트 진행 (클릭 X)
						if (eventArr[order + 1][1] == "skip") {
								//b-1. 화면 클릭 비활성화
								$("#event_cover").onclick = null;
								//b-2. 화살표 제거
								$("#event_plain_arrow_" + target[3]).style.display = "none";
								//b-3. 이벤트 이동
								runEvent(eventArr,order + 1, 0, lastType, lastPosition);
						//c. ELSE : 화면 클릭 시 다음 이벤트 진행
						} else {
							$("#event_cover").onclick = function() {
								//c-1. 화면 클릭 비활성화
								$("#event_cover").onclick = null;
								//c-2. 화살표 제거
								$("#event_plain_arrow_" + target[3]).style.display = "none";
								//c-3. 이벤트 이동
								runEvent(eventArr,order + 1, 0, lastType, lastPosition);
							}
						}
					}
			
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-4. 컷신
		case "scene":
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 이미지
			
			//A. 첫 실행 - 세팅
			if (order2 == 0) {
				$("#event_scene").style.display = "block";
				$("#event_scene_img").src = "./images/scene/" + target[2] + ".png";
			}
			
			//B. 세팅 이후 : 실행
				//※ 별도 진행 없음
				runEvent(eventArr,order + 1, 0, lastType, lastPosition);
			
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-5. 아이템
		case "item":
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 아이템 이름
			//※ target[3] : 수량
			//※ target[4] : 아이템 용도/출처
			
			//A. 첫 실행 - 세팅
			if (order2 == 0) {
				//A-1. 아이템 출력정보 정리
				$("#event_item_img").src = "./images/item/" + indexItem(target[2],"image") + ".png";
				//A-2. 아이템 수량 파악 (have라고 적었으면, 현재 수량 출력)
				if (target[3] == "show") {
					target[3] = indexItem(target[2],"quantity");
				}
				var showQuantity = target[3];
				//A-3. 아이템 명칭 + 수량 출력 준비
				switch (target[2]) {
					case "골드":
						$("#event_item_name").innerHTML = thousand(parseInt(showQuantity)) + " " + indexItem(target[2],"name");
						
						break;
					default://골드를 제외한 나머지 아이템
						$("#event_item_name").innerHTML = indexItem(target[2],"name") + " x" + thousand(parseInt(showQuantity))
						
						break;
				}
				//A-4. 아이템 용도/출처 출력 준비
				$("#event_item_use").innerHTML = target[4];
				//A-5. 아이템 출력
				$("#event_item").style.display = "block";
			}
			
			//B. 세팅 이후 : 실행
				//※ 별도 진행 없음
				runEvent(eventArr,order + 1, 0, lastType, lastPosition);
		
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-6. 아이템 수량 변경
		case "setItem"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 아이템 이름
			//※ target[3] : 아이템 값
			
			//A. 첫 실행 - 세팅
				//※ 세팅할 게 없음
				
			//B. 세팅 이후 : 실행
				//B-1. 아이템 수량 변경 (기존 함수 활용)
				setItem(target[2],target[3]);
				//B-2. 다음 이벤트로 이동
				runEvent(eventArr,order + 1, 0, lastType, lastPosition);
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-7. 특정 변수 값 변경
		case "variable"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 변수 이름
			//※ target[3] : 변경 값
			
			//A. 첫 실행 - 세팅
				//※ 세팅할 게 없음
				
			//B. 세팅 이후 : 실행
				//B-1. 변수 명 추적
					//B-1-1. 오브젝트 프로퍼티 포함 시(".") : 쪼개서 탐색 (5단 프로퍼티까지 지원)
					if (target[2].indexOf(".") != -1) {
						var tempArr = target[2].split(".");
						switch (tempArr.length) {
							case 2://프로퍼티 1단
								var variable = window[tempArr[0]][tempArr[1]];
								
								break;
							case 3://프로퍼티 2단
								var variable = window[tempArr[0]][tempArr[1]][tempArr[2]];
								
								break;
							case 4://프로퍼티 3단
								var variable = window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]];
								
								break;
							case 5://프로퍼티 4단
								var variable = window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]][tempArr[4]];
								
								break;
							case 6://프로퍼티 5단
								var variable = window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]][tempArr[4]][tempArr[5]];
								
								break;
						}
					//B-1-2. 기타
					} else {
						var variable = window[target[2]];
					}
				//B-2. 해당 변수 값 변경
				switch (target[3].substring(0,1)) {
					case ("+"):
						variable += parseInt(target[3].substring(1));
						
						break;
					case ("-"):
						variable -= parseInt(target[3].substring(1));
						
						break;
					case ("="):
						if (isNumber(target[3].substring(1))) {
							variable = parseInt(target[3].substring(1));
						} else {
							variable = target[3].substring(1).toString();
						}
						
						break;
				}
				//B-3 변경된 수치 적용
					if (target[2].indexOf(".") != -1) {
						var tempArr = target[2].split(".");
						switch (tempArr.length) {
							case 2://프로퍼티 1단
								window[tempArr[0]][tempArr[1]] = variable;
								
								break;
							case 3://프로퍼티 2단
								window[tempArr[0]][tempArr[1]][tempArr[2]] = variable;
								
								break;
							case 4://프로퍼티 3단
								window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]] = variable;
								
								break;
							case 5://프로퍼티 4단
								window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]][tempArr[4]] = variable;
								
								break;
							case 6://프로퍼티 5단
								window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]][tempArr[4]][tempArr[5]] = variable;
								
								break;
						}
					//B-3-1. 기타
					} else {
						window[target[2]] = variable;
					}
				//B-4. 다음 이벤트로 이동
				runEvent(eventArr,order + 1, 0, lastType, lastPosition);
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-8. 음악 설정 (audio 태그 지원 시 한정)
		case "audio"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : BGM 이름 / 명령어(앞에 '$'를 붙임)
			
			//A. 첫 실행 - 세팅
			if (order2 == 0) {
				switch (target[2]) {
					//A-1-1. "stop" : 음악 중지
					case "stop":
						if (noAudio != 1) {
							audio.pause();
						}
						
						break;
					//A-1-2. 그 외 : 해당 음악 출력
					default:
						if (noAudio != 1) {
							
							//A-1. 기존 음악 중지 (재생중이면)
							if (isPlaying(audio)) {
								audio.pause();
							}
							
							//A-2. 새로운 음악 적용, 실행
							audio = track[target[2]];
							audio.currentTime = 0;
							audio.loop = true;
							audio.play();
						}
						
						break;
				}
			}
			
			//B. 세팅 이후 : 실행
				//※ 별도 진행 없음
				runEvent(eventArr,order + 1, 0, lastType, lastPosition);
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-9. 선택지
		case "choose"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[짝수] : 선택문구
			//※ target[홀수(3~)] : 클릭 시 실행 이벤트 위치
			
			//A. 첫 실행 - 세팅 (+ 이동)
			for (var i=0;i<target.length;i++) {
				(function (i) {
					//A-1. IF 2 이상 짝수번째 인수 : 항목 만들기
					if (i%2 == 0 && i >= 2) {
						var span = document.createElement("span");
						span.id = "event_choose_" + i.toString();
						span.innerHTML = target[i];
						//A-2. 항목 클릭 시
						span.onclick = function() {
							//A-2-1. 선택지 비우기 & 닫기
							$("#event_choose").innerHTML = "";
							$("#event_choose").style.display = "none";
							//A-2-2. 숫자 : 상대적 이동
							if (isNumber(target[i+1])) {
								runEvent(eventArr,order + parseInt(target[i+1]), 0, lastType, lastPosition);
										
								return;
							//A-2-2. 문자 : 절대적 이동
							} else {
								for (var j=0;j<eventArr.length;j++) {
									if (eventArr[j][0] == target[i+1]) {
										runEvent(eventArr, j, 0, lastType, lastPosition);
										
										return;
									}
								}
							}
						}
						$("#event_choose").appendChild(span);
						//A-3. br 태그 붙이기
						var br = document.createElement("br");
						$("#event_choose").appendChild(br);
					}
				}(i));
			}
				
				//A-3. 선택지 활성화
				$("#event_choose").style.display = "block";
			
			//B. 세팅 이후 : 실행
				//※ 이미 이동해서 할 게 없음
				
			break;











//=================================================================================================================
//※ 이벤트 타입 - 기능형
//=================================================================================================================

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-10. 이벤트 이동
		case "moveEvent"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 숫자 - 상대적 위치 / 문자 - 절대적 위치
			
			//A. 첫 실행 - 세팅
				//※ 세팅할 게 없음
			
			//B. 세팅 이후 : 실행
				//B-1. 숫자 : 상대적 이동
				if (isNumber(target[2])) {
					runEvent(eventArr,order + parseInt(target[2]), 0, lastType, lastPosition);
											
					return;
				//B-2. 문자 : 절대적 이동
				} else {
					for (var i=0;i<eventArr.length;i++) {
						if (eventArr[i][0] == target[2]) {
							runEvent(eventArr, i, 0, lastType, lastPosition);
							
							return;
						}
					}
				}
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-11. 클릭 안함
		case "skip"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//★ talk, plain 이벤트에서 마지막 클릭을 하지 않게 하기 위한 장치
			
			//A. 첫 실행 - 세팅
				//※ 세팅할 게 없음
				
			//B. 세팅 이후 : 실행
				//B-1. 다음 이벤트로 이동
				runEvent(eventArr, order + 1, 0, lastType, lastPosition);
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-12. 화면 강제 클릭 대기
		case "hold"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ lastType : 마지막 대화가 이루어진 대화 종류 (talk, plain)
			//※ lastPosition : 마지막 대화가 이루어진 대화 위치 (1, 2)
			//★ talk, plain 이외 이벤트에서 마지막 클릭을 강제로 하기 위한 장치
			
			//A. 첫 실행 - 세팅
				//※ 세팅할 게 없음
				
			//B. 세팅 이후 : 실행
				//a. 화살표 표시
				$("#event_" + lastType + "_arrow_" + lastPosition).style.display = "block";
				//b. IF 다음 이벤트 종류가 "skip" ? 다음 이벤트 진행 (클릭 X)
				if (eventArr[order + 1][1] == "skip") {
						//b-1. 화면 클릭 비활성화
						$("#event_cover").onclick = null;
						//b-2. 화살표 제거
						$("#event_" + lastType + "_arrow_" + lastPosition).style.display = "none";
						//b-3. 이벤트 이동
						runEvent(eventArr,order + 1, 0, lastType, lastPosition);
				//c. ELSE : 화면 클릭 시 다음 이벤트 진행
				} else {
					$("#event_cover").onclick = function() {
						//c-1. 화면 클릭 비활성화
						$("#event_cover").onclick = null;
						//c-2. 화살표 제거
						$("#event_" + lastType + "_arrow_" + lastPosition).style.display = "none";
						//c-3. 이벤트 이동
						runEvent(eventArr,order + 1, 0, lastType, lastPosition);
					}
				}
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-13. 다음 이벤트 실행 대기
		case "delay"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 대기시간(FPS 기준)
			
			//A. 첫 실행 - 세팅
				//※ 세팅할 게 없음
				
			//B. 세팅 이후 : 실행
				//B-1. 해당 FPPS만큼 대기한 후 이동
				setTimeout(function() {
					runEvent(eventArr,order + 1, 0, lastType, lastPosition);
				}, (1000/FPS) * target[2]);
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-14. 이벤트 실행 조건문
		case "if"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2] : 조건 비교용 변수 (window[변수명])
			//※ target[3 이상 홀수] : 조건문 (나머지 -> else)
			//※ target[3 이상 짝수] : 이동 이벤트
			
			//A. 첫 실행 - 세팅
				//A-1. 이동용 함수 설정
				function moveEvent(goal) {
					//a. 숫자 : 상대적 이동
					if (isNumber(goal)) {
						runEvent(eventArr,order + parseInt(goal), 0, lastType, lastPosition);
												
						return;
					//b. 문자 : 절대적 이동
					} else {
						for (var i=0;i<eventArr.length;i++) {
							if (eventArr[i][0] == goal) {
								runEvent(eventArr, i, 0, lastType, lastPosition);
								
								return;
							}
						}
					}
				}
			
			//B. 세팅 이후 : 실행
			for (var i=0;i<target.length;i++) {
				//B-1. 조건 비교용 변수 참조(target[2])
				if (i == 2) {
					//B-1-1. 오브젝트 프로퍼티 포함 시(".") : 쪼개서 탐색 (5단 프로퍼티까지 지원)
					if (target[i].indexOf(".") != -1) {
						var tempArr = target[i].split(".");
						switch (tempArr.length) {
							case 2://프로퍼티 1단
								var compare = window[tempArr[0]][tempArr[1]];
								
								break;
							case 3://프로퍼티 2단
								var compare = window[tempArr[0]][tempArr[1]][tempArr[2]];
								
								break;
							case 4://프로퍼티 3단
								var compare = window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]];
								
								break;
							case 5://프로퍼티 4단
								var compare = window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]][tempArr[4]];
								
								break;
							case 6://프로퍼티 5단
								var compare = window[tempArr[0]][tempArr[1]][tempArr[2]][tempArr[3]][tempArr[4]][tempArr[5]];
								
								break;
						}
					//B-1-2. 기타
					} else {
						var compare = window[target[i]];
					}
					//B-2. compare가 숫자 : 문자로 변경
					if (isNumber(compare)) {
						compare = compare.toString();
					}
				//B-2. 3이상 홀수 - 조건문
				} else if (i%2 == 1 && i >= 3) {
					//a. "else" -> 바로 뒤 인수에 따라 이벤트 이동
					if (target[i] == "else") {
						moveEvent(target[i+1]);
						
						return;
					//b. 나머지 : 앞에 붙은 기호에 따라 compare와 비교 실시
					} else {
						switch (target[i].substring(0,1)) {
							//b-1. "=" : compare가 대상과 같으면
							case "=":
								if (compare == target[i].substring(1)) {
									moveEvent(target[i+1]);
									
									return;
								}
								
								break;
							//b-2. "<" : compare가 대상보다 작으면
							case "<":
								if (compare < target[i].substring(1)) {
									moveEvent(target[i+1]);
									
									return;
								}
								
								break;
							//b-3. ">" : compare가 대상보다 크면
							case ">":
								if (compare > target[i].substring(1)) {
									moveEvent(target[i+1]);
									
									return;
								}
								
								break;
						}
					}
				}
			}
				
			break;

//==============================================================================================================================
//==============================================================================================================================
		
		//★ 3-15. 무작위 이벤트 이동
		case "random"://
			//※ target[0] : 이벤트 ID (특별히 사용하지 않으면 공란)
			//※ target[2 이상 짝수] : random 비교치
			//※ target[2 이상 홀수] : "누적 비교치"보다 작으면 실시
			
			//A. 첫 실행 - 세팅
				//A-1. 랜덤 수치 하나 설정
				var randNum = Math.random();
				
				//A-2. 가중치 확률 비교용 배열 생성
				var tempArr_num = [];//확률
				var tempArr_name = [];//해당 확률 결과값
				
				//A-3. 이동용 함수 설정
				function moveEvent(goal) {
					//a. 숫자 : 상대적 이동
					if (isNumber(goal)) {
						runEvent(eventArr,order + parseInt(goal), 0, lastType, lastPosition);
												
						return;
					//b. 문자 : 절대적 이동
					} else {
						for (var i=0;i<eventArr.length;i++) {
							if (eventArr[i][0] == goal) {
								runEvent(eventArr, i, 0, lastType, lastPosition);
								
								return;
							}
						}
					}
				}
				
			//B. 세팅 이후 : 실행
				//B-1. 랜덤값과 비교용 값 정리
				for (var i=0;i<target.length;i++) {
					//B-1-1. 2 이상 짝수 : "해당 인수 & 다음 인수"를 가중치 확률 비교용 배열에 입력
					if (i%2 == 0 && i >= 2) {
						tempArr_num.push(parseFloat(target[i]));
						tempArr_name.push(target[i+1])
					}
				}
				//B-2. 랜덤 기반 행동 결정
				var decision = tempArr_name[rand(tempArr_num)];
				//B-3. 이동 실시
				moveEvent(decision);
				
			break;
	}
	
}