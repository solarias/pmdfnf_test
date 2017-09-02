//=================================================================================================================
//※ 로딩 & 실행
//=================================================================================================================
window.onload = function() {
	//"게임 실행" 버튼 클릭
	$("#loading_start").onclick = function() {
		//실행 버튼 비활성화
		$("#loading_start").value = "로딩 중";
		$("#loading_start").disabled = "disabled";
		
		//로딩바 생성 실시
		standBy();
	};
	
	//함수 - 게임 시작 버튼 클릭 -> 로딩 바 생성
	function standBy() {
		if ($("#loading_state").offsetTop + 3 < 270) {
			$("#loading_state").style.top = ($("#loading_state").offsetTop + 3).toString() + "px";
			setTimeout(function() {
				standBy();
			},1000/FPS);
		} else {
			$("#loading_state").style.top = "270px";
			//로딩 바 생성 완료 -> 로딩 실시
				//사운드 로딩
				try {
					//사운드 준비
					track = {
						start:new Audio ('http://cfile238.uf.daum.net/attach/26566245560A9BDD2F0327'),
						
						spring:new Audio ('http://cfile220.uf.daum.net/attach/2355FE42560A9BED120FCC'),
						summer:new Audio ('http://cfile233.uf.daum.net/attach/2460FD42560A9BF905576E'),
						guest:new Audio ('http://cfile223.uf.daum.net/attach/27086740560A9C4E07AFC0'),
						
						castle:new Audio ('http://cfile239.uf.daum.net/attach/230E3A3D560A9C5F1A8E9B'),
						town:new Audio ('http://cfile210.uf.daum.net/attach/2362B03F560A9C6E30C703'),
						
						work:new Audio ('http://cfile223.uf.daum.net/attach/267FFD45560A9CA40B4400'),
						education:new Audio ('http://cfile208.uf.daum.net/attach/266D9F49560A9CB9108C81'),
						vacation:new Audio ('http://cfile214.uf.daum.net/attach/2265C838560A9CCB014466'),
						
						operation:new Audio ('http://cfile232.uf.daum.net/attach/253B1749560A9CE23FB844'),
						enemy:new Audio ('http://cfile237.uf.daum.net/attach/210FDE33560A9D1B29F4B2'),
						battle:new Audio ('http://cfile237.uf.daum.net/attach/2225E234560A9D27327B4B'),
						tension:new Audio ('http://cfile230.uf.daum.net/attach/213F6D34560A9D37190A26')
					}
				} catch(e) {
					//사운드 실행 불가 -> 별도로 기억
					noAudio = 1;
				}
				//이미지 로딩 - 준비
					//1. 배경화면
					imageList.push("./images/background/title.jpg");
					imageList.push("./images/background/event.jpg");
					imageList.push("./images/background/room.jpg");
					//2. 프레임
						//2-1. 공통
							//2-2-1. borderY
							imageList.push("./images/frame/borderW_top_left.png");
							imageList.push("./images/frame/borderW_top_right.png");
							imageList.push("./images/frame/borderW_bottom_right.png");
							imageList.push("./images/frame/borderW_bottom_left.png");
							imageList.push("./images/frame/borderW_top.png");
							imageList.push("./images/frame/borderW_right.png");
							imageList.push("./images/frame/borderW_bottom.png");
							imageList.push("./images/frame/borderW_left.png");
							//2-2-2. borderW
							imageList.push("./images/frame/borderY_top_left.png");
							imageList.push("./images/frame/borderY_top_right.png");
							imageList.push("./images/frame/borderY_bottom_right.png");
							imageList.push("./images/frame/borderY_bottom_left.png");
							imageList.push("./images/frame/borderY_top.png");
							imageList.push("./images/frame/borderY_right.png");
							imageList.push("./images/frame/borderY_bottom.png");
							imageList.push("./images/frame/borderY_left.png");
						//2-2. 캐릭터 선택
						imageList.push("./images/frame/select_cha_frame_top.png");
						imageList.push("./images/frame/select_cha_frame_bottom.png");
						//2-3. 이벤트
						imageList.push("./images/frame/event_talk_port.png");
						imageList.push("./images/frame/event_arrow.gif");
					//3. 캐릭터
					for (var i=0;i<myChaList.length;i++) {
						imageList.push("./images/character/cha_" + i.toString() + ".png")
						imageList.push("./images/character/select_cha_" + i.toString() + "_off.png")
						imageList.push("./images/character/select_cha_" + i.toString() + "_on.png")
						imageList.push("./images/character/select_cha_" + i.toString() + "_click.png")
					}
					//4. 포트레이트
					for (var i=0;i<portraitList.length;i++) {
						if (portraitList[i][2] != "") {
							imageList.push("./images/portrait/" + portraitList[i][2] + ".png")
						}
					}
					//5. 아이템
					for (var i=0;i<itemList.length;i++) {
						if (itemList[i][2] != "") {
							imageList.push("./images/item/" + itemList[i][2] + ".png")
						}
					}
					//6. 컷신
					imageList.push("./images/scene/castle.png");
					imageList.push("./images/scene/town.png");
					imageList.push("./images/scene/natram.png");
					imageList.push("./images/scene/hell.png");
					//7. 기타
				//이미지 로딩 - 실시(로딩 후 실행 개시)
				loadImages(imageList,function() {
					main();
				})
		}
	}
}





//=================================================================================================================
//※ 실행 함수
//=================================================================================================================
function main() {
	//===========================================
	//※ 메인 화면 띄우기
	//===========================================
	//로딩화면 닫기
	$("#frame_loading").style.display = "none";
	//메인 화면 띄우기
	$("#frame_title").style.display = "inline-block";
	
	
	//===========================================
	//※ 조작
	//===========================================
	//첫 화면
		//브금 실행
		if (noAudio != 1) {
			audio = track["start"];
			audio.currentTime = 0;
			audio.loop = true;
			audio.play();
		}
		//버튼 조작
		$('#title_menu_new').onclick = function() {
			if ($('#title_menu_new').className.indexOf('no') == -1) {
				$('#frame_title').style.display = "none";
				$('#frame_select').style.display = "inline-block";
			}
		};
	
	//캐릭터 선택
		for (var i=0;i<6;i++) {
			(function(i) {
				$('#select_cha_' + i.toString()).onclick = function() {
					//'선택하세요' 문구 제거
					$("#select_cha_frame_text").style.display = "none";
					
					//'선택' 클래스 초기화
					for (var j=0;j<6;j++) {
						$('#select_cha_' + j.toString()).className = "select_cha";
					}
					//'선택' 클래스 지정
					$('#select_cha_' + i.toString()).className = "select_cha selected";
					
					//선택한 직업명 기억
					myCha.job = i;
					portraitList[0][2] = "cha_" + i.toString();
					//직업명 표시
					$("#select_board_cha").innerHTML = "딸의 직업 : " + myChaList[i];
					//이미지 변경 & 표시
					$("#select_cha_img").src = "./images/character/cha_" + i.toString() + ".png";
					$("#select_cha_img").style.visibility = "visible";
					
					//시작 버튼 활성화
					$('#select_start').disabled = "";
				};
			}(i));
		}
		
		$('#select_back').onclick = function() {
			if ($('#select_back').className.indexOf('no') == -1) {
				$('#frame_select').style.display = "none-block";
				$('#frame_title').style.display = "inline-block";
			}
		};
		
		$('#select_start').onclick = function() {
			//1. 딸래미 이름 체크
			if ($("#cha_name_input").value == "") {
				alert("※ 경고 : 딸의 이름을 지어주세요.")
				return;
			}
			//2. IF 딸래미 이름 OK -> 딸 이름 설정 후 실행
				//딸 이름 설정
				var tempName = $("#cha_name_input").value;
				myCha.name = tempName;
				portraitList[0][1] = tempName;
				
				//테스트 - 대화하기
				runEvent([
					["","audio","spring"],
					["","talk","딸","1","이봐, 니콜라스!"],
					["","talk","니콜라스","2","부르셨습니까, 아가씨?"],
					["","talk","딸","1","오늘 날 찾아온 손님 없었어?"],
					["","talk","니콜라스","2","단 한 명도 없었습니다."],
					["","talk","딸","1","이상하다, 분명히 오늘 아침에 온다고 그랬는데..."],
					["","plain","","2","똑똑똑..."],
					["","talk","딸","1","오, 이제야 온 건가? 니콜라스, 누군지 확인해봐."],
					["","talk","니콜라스","2","항아리를 뒤집어쓴 수상한 사람이로군요. 당장 내쫒아야..."],
					["","talk","니콜라스","2","항아리? 그럼 전국 항아리 협회에서 온 자란 말입니까? 아가씨, 설마 주인 어르신 몰래..."],
					["","talk","딸","1","시끄러워. 내가 알아서 할 거야. 얼른 모시기나 해."],
					["","talk","니콜라스","2","...... 알겠습니다."],
					["","talk","니콜라스","2","그럼 들어오시죠, 손님."],
					["","clear","talk"],
					["","audio","guest"],
					["","talk","단진","1","안녕하십니까? 전국 항아리 협회에서 온 단진이라고 합니다."],
					["","talk","단진","1","거기 어여뿐 숙녀분께서 이번에 새로 가입하셨죠?"],
					["","talk","딸","2","맞아요. 집에 연락처가 있길래 전화해봤죠."],
					["","talk","니콜라스","1","이런 수상한 단체의 연락처가 주인님 집에 있었다니..."],
					["","talk","단진","2","저희 전국 항아리 협회에선 도박 컨텐츠를 이용하는 모험가들를 지원하지요. 아가씨께서는 어떤 컨텐츠를 주로 이용하시나요?"],
					["","talk","딸","1","지옥파티요. 3년째 돌고 있어요."],
					["","talk","단진","2","흐음. 그 정도 경력이면 초보자는 아니시군요."],
					["","talk","니콜라스","1","그것때문에 여태 아가씨께서 쓰신 골드를 생각하면... 크흑..."],
					["","talk","단진","2","저희 협회는 온빨로 고통스러워하시는 분을 지원해드리는데, 그러려면 간단한 테스트를 통과해야 합니다."],
					["","talk","단진","2","아, 형식적인 절차 같은거니 너무 긴장하지 마세요."],
					["","talk","딸","1","좋아요. 얼른 해보세요."],
					["","talk","단진","2","좋습니다. 그럼 시작하지요."],
					["","clear","talk"],
					["","talk","단진","1","제 손에 들린 건 오늘자 잡지입니다. 여기에 오늘의 운세가 이렇게 적혀있지요."],
					["","plain","","2","오늘의 운세는 대대흉(大大凶). 매우 좋지 않은 일이 생길 것이니 몸을 사리는 것이 좋다."],
					["","talk","단진","1","숙녀분께서 이 글귀를 봤다고 칩시다. 이 운세를 매우 신용하신다면, 오늘은 지옥파티를 쉬실 겁니까?"],
					["","talk","딸","2","아니요. 그렇게 보기 힘든 대대흉으로 액땜을 했으니, 오늘은 분명 대박이 나겠다며 집을 나설 거에요."],
					["","talk","딸","2","아무리 힘든 일이 있어도 긍정적으로 생각하고 오늘도 노오력을 하는 것, 그것이 헬 러너의 기본 자세가 아닐까요?"],
					["","clear","talk"],
					["","talk","단진","1","후, 훌륭합니다! 이렇게 멋진 분을 몰라뵜다니, 이거 큰 실례를 저질렀군요."],
					["","talk","단진","1","좋습니다. 전국 항아리 협회에선 숙녀분을 즉시 지원해드리도록 하겠습니다. 잠시 후에 계좌를 확인해보세요."],
						["","skip"],
						["","item","골드","20000000","지원"],
						["","delay","30"],
						["","setItem","골드","=5000000"],
						["","setItem","골드","+20000000"],
						["","hold"],
					["","talk","딸","2","아싸! 안그래도 골드 다 떨어졌었는데 잘 됐네!"],
					["","clear","item"],
					["","talk","딸","2","좋아, 이 기세로 지금 바로 헬 러닝을 하러 가보실까?"],
					["","talk","니콜라스","1","아가씨, 혼자 길거리로 가지 마셔요!"],
					["","talk","단진","2","아, 얼마나 기뻤으면 손님을 집에 남기고 달려나가다니. 뼈속까지 헬 러너로군."],
					["","audio","tension"],
					["","plain","","1","이거이거, 이젠 우리집 딸래미에게까지 마수를 뻗치려고 하는군."],
					["","talk","단진","2","오, 자넨가? 오래간만일세. 그러고보니 그 숙녀분이 자네 따님이셨단 말이지."],
					["","talk","단진","2","자네나 딸이나 도박 컨텐츠라면 사족을 못 쓰는군. 역시 피는 못 속이는구만."],
					["","plain","","1","그런 소리 말게. 내가 예전에 자네의 말에 넘어가 젊은 시절을 항아리 배팅으로 낭비한 건 잊지 않고 있으니."],
					["","talk","단진","2","그런 소리 마시게. 그러다 막판에 대박이 나고 이렇게 잘 살고 있지 않나? 정말 부럽단 말이야."],
					["","talk","단진","2","걱정말게. 그 숙녀분은 천상의 운을 타고났을 터이니, 분명 대박이 날 걸세."],
					["","plain","","1","......"],
					["","plain","","1","그러길 바래야겠지."],
					["","clear","all"],
					["","audio","town"],
					["","scene","town"],
					["","plain","","1","거리로 나왔다."],
					["","talk","딸","1","뭐야, 니콜라스. 넌 왜 따라오는거야?"],
					["","talk","니콜라스","2","아가씨를 지키는 게 저의 임무니까요."],
					["","talk","딸","1","너도 알잖아. 차원 너머의 헬 몬스터들를 잡아온지 이제 3년이 다 되어간다고. 내 몸 정도는 스스로 지킬 줄 알아."],
					["","talk","니콜라스","2","주인 어르신께서 말씀하신 거라 저도 어쩔 수 없습니다. 얌전히 저의 엄호를 받으시지요."],
					["","talk","니콜라스","2","그나저니 이제 어쩌실 겁니까?"],
					["","talk","딸","1","보자, 현재 수중에 있는 자금이..."],
						["","skip"],
						["","item","골드","show","현재 자금 : "],
						["","delay","30"],
						["","hold"],
					["","talk","딸","1","음, 이 정도면 헬 도는데 하루 피로도 다 쓸 수 있겠다."],
					["","talk","니콜라스","2","그럼 바로 이동하도록 하지요."],
					["","clear","item"],
					["choose","clear","talk"],
					["","talk","니콜라스","1","목적지를 정해주세요."],
						["","skip"],
					["","if","trigger","=0","choose1","=1","choose2"],
					["choose1","choose","집","home","네이트람","natram","길거리","street","잡화점","shop","지옥파티","hell"],
					["choose2","choose","집","home","네이트람","natram","길거리","street","지옥파티","hell"],
						//집
						["home","talk","딸","1","일단 집으로 가자. 갑자기 아빠가 보고싶어졌어."],
						["","talk","니콜라스","2","영문은 알 수 없지만, 그러도록 하겠습니다."],
						["","clear","all"],
						["","audio","spring"],
						["","plain","","1","집에 돌아왔다."],
						["","plain","","1","그래, 잘 다녀왔..."],
						["","talk","딸","2","아빠, 용돈좀!"],
						["","plain","","1","다 큰 녀석이 용돈은 무슨 용돈이냐? 돈이 필요하면 알아서 해결해라."],
						["","talk","딸","2","쳇, 이번엔 통할 줄 알았는데..."],
						["","talk","니콜라스","1","죄송합니다, 주인님. 아가씨가 제멋대로..."],
						["","plain","","2","아니다, 다 내가 자식교육을 못시켜서 그렇지. 적당히 쉬었다 나가보거라."],
						["","clear","all"],
						["","audio","town"],
						["","scene","town"],
						["","plain","","1","거리로 돌아왔다."],
						["","moveEvent","choose"],
						//네이트람
						["natram","talk","딸","1","네이트람에 가보자. 돈을 좀 벌어와야겠어."],
						["","talk","니콜라스","2","오, 이제 제대로 일을 해보실 생각이 드신 건가요? 참 감격스러운 순간이군요."],
						["natram","talk","딸","1","노가다는 예전부터 해온 거거든. 아무튼 얼른 가자."],
						["","clear","all"],
						["","scene","natram"],
						["","audio","work"],
						["","plain","","1","네이트람에 도착했다."],
						["","talk","백명","1","어서오시오, 우리의 자랑스러운 용사여. 오늘도 네이트람의 야망을 꺾으러..."],
						["","talk","백명","1","아, 그냥 석상만 부수고 돌아가시는 노가다꾼이시구려. 오늘은 무슨 용건이오?"],
						["","talk","딸","2","안녕하세요? 네이트람 석상 부수러 왔는데, 오늘 석상 상태 괜찮나요?"],
						["","talk","백명","1","하하하! 잘 물어보셨소이다! 오늘은 아주 기쁜 날이지요."],
						["","talk","백명","1","네이트람이 이제 기운을 다 했는지 드래곤스톤이 더이상 재생을 하지 않게 되었소."],
						["","talk","백명","1","덕분에 이제 네이트람 토벌 진입로가 막힐 걱정을 하지 않게 되었소. 정말 기쁘지 않소이까?"],
						["","talk","딸","2","아, 아하하. 그렇군요. 정말로 기쁜 일이군요."],
						["","talk","백명","1","뭐, 드래곤 스톤이 언제 재생될 지는 모를 일이오. 때가 되면 다시 연락 드리리라."],
						["","talk","니콜라스","2","아쉽지만 돌아가야겠군요. 모처럼 열심히 일하실 수 있었는데..."],
						["","talk","딸","1","너마저 날 섭섭하게 하면 어떡하니?"],
						["","clear","all"],
						["","audio","town"],
						["","scene","town"],
						["","plain","","1","거리로 돌아왔다."],
						["","moveEvent","choose"],
						//길거리
						["street","talk","딸","1","바람 좀 쐴결 좀 걷자."],
						["","talk","니콜라스","2","그러시지요."],
						["","clear","talk"],
						["","plain","","1","니콜라스와 잠시 길을 걸었다."],
						["","talk","니콜라스","1","아가씨와 함께 길을 걸으니 감회가 새롭군요."],
						["","talk","니콜라스","1","아가씨가 어린 시절에 이 길거리를 뛰어다니시던 땐 참으로 귀여우셨는데..."],
						["","talk","니콜라스","1","아, 지금도 충분히 아름다우시니 신경쓰지 마십시오."],
						["","talk","딸","2","걱정마. 귓등으로 듣고 있었으니까."],
						["","talk","니콜라스","1","네? 아무리 그래도 그렇게나 관심을 주지 않으시다니..."],
						["","talk","딸","2","야, 울지마. 알았어. 내가 미안했어."],
						["","clear","talk"],
						["","plain","","1","그렇게 길을 걷다 다시 원위치로 돌아왔다."],
						["","moveEvent","choose"],
						//잡화점
						["shop","talk","딸","1","헬 러닝을 가려면 초대장을 사야겠지. 잡화점에 가자."],
						["","talk","니콜라스","2","초대장이요? 도전장이 아니고요?"],
						["","talk","딸","1","내가 초대장이라고 하면 초대장인 줄 알아."],
						["","talk","니콜라스","2","뭐, 알겠습니다."],
						["","clear","talk"],
						["","plain","","1","잡화점에 들어갔다."],
						["","talk","칸나","1","어서오세요, 손님?"],
						["","talk","딸","2","안녕하세요, 오늘은..."],
						["","talk","칸나","1","네, 잠시만 기다리세요."],
						["","clear","talk"],
						["","talk","칸나","1","여기 있습니다. 돈은 계산대에 놓고 가세요."],
							["","skip"],
							["","item","초대장","1","구매"],
							["","delay","30"],
							["","variable","trigger","=1"],
							["","hold"],
						["","talk","니콜라스","2","이거, 완전히 자동으로 이루어지는군요."],
						["","clear","item"],
						["","talk","칸나","1","후훗, 3년 단골에겐 이 정도 서비스는 기본이죠."],
						["","talk","딸","2","오, 내가 VIP라는건가?"],
						["","talk","니콜라스","1","그렇게 자랑스러워할 일은 아닌 듯 합니다만..."],
						["","talk","딸","2","뭐, 어때? 이제 초대장도 샀으니 돌아가자."],
						["","talk","칸나","1","또 오세요~"],
						["","clear","talk"],
						["","plain","","1","잡화점을 나왔다."],
						["","moveEvent","choose"],
					//지옥파티
					["hell","talk","딸","1","그럼 지옥파티를 향해서 출발!"],
					["","talk","니콜라스","2","출발~"],
					["","clear","all"],
					["","scene","hell"],
					["","audio","operation"],
					["","plain","","1","지옥파티에 도착했다."],
					["","talk","그란디스","1","어서오시오, 모험가님. 오늘도 헬 몬스터의 위험으로부터 세상을 구하러 오셨나요?"],
					["","talk","딸","2","그런 가식스러운 소개말은 빼자구요. 하루이틀 보던 사이도 아니고..."],
					["","talk","그란디스","1","그럼 입장에 필요한 초대장을 주시길..."],
					["","if","trigger","=0","no","=1","yes"],
						//초대장 안샀음
						["no","talk","딸","2","초대장 사기 귀찮아서 그냥 왔는데, 골드로 입장하면 안될까요?"],
						["","talk","그란디스","1","초대장은 헬 몬스터들을 끌어들이기 위한 필수 아이템입니다. 없으시다면 입장하실 수 없겠군요."],
						["","talk","딸","2","알았어요. 가서 사오면 될 거 아니에요."],
						["","talk","그란디스","1","기다리고 있겠습니다, 모험가님."],
						["","clear","talk"],
						["","talk","니콜라스","1","꽤나 불친절한 분이군요."],
						["","talk","딸","2","그래도 어쩔 수 없지. 이게 독점 시장의 문제라니까. 소문으론 저 사람이 초대장을 되팔아서 떼돈을 번다지 뭐야."],
						["","talk","니콜라스","1","안타까운 현실이로군요."],
						["","talk","딸","2","뭐, 됐다. 가서 사오지, 뭐."],
						["","clear","all"],
						["","audio","town"],
						["","scene","town"],
						["","plain","","1","거리로 돌아왔다."],
						["","moveEvent","choose"],
					//초대장 샀음
					["yes","talk","딸","2","여기 있어요."],
							["","skip"],
							["","item","초대장","1","제출"],
							["","delay","30"],
							["","hold"],
					["","talk","그란디스","1","그럼 헬 몬스터를 부를 동안 잠시 기다리시길..."],
					["","talk","그란디스","1","(좋았어! 오늘은 여태 모아둔 초대장을 되팔아서 회식이나 해야겠군.)"],
					["","talk","니콜라스","2","(왠지는 모르겠지만 저 사람 마음속이 훤히 보이는 기분이야.)"],
					["","clear","item"],
					["","clear","talk"],
						["","plain","","1","그들은 지옥파티에 입장하여 헬 몬스터를 잡기 시작했다."],
						["","audio","enemy"],
						["","talk","레니","1","멈춰라! 이세계의 모험가여! 내가 너희들을 처단하겠다!"],
						["","talk","딸","2","뭐야? 레니잖아? 너 분명히 예전에 죽었었는데..."],
						["","talk","딸","2","아, 너는 다른 차원에서 넘어온 레니겠구나. 여기는 지옥파티니..."],
						["","talk","레니","1","무슨 소리를 하는 지는 모르겠지만, 너는 오늘 내 먹잇감이다!"],
						["","talk","딸","2","하나도 안 무서워. 내 3년 지옥파티 경력을 무시하지 말라고."],
						["","clear","talk"],
						["","audio","battle"],
						["","talk","레니","1","덤벼라! 모험가여!"],
						["","talk","딸","2","가라, 니콜라스! 올가미!"],
						["","talk","니콜라스","1","블랙 스파이더!"],
						["","talk","레니","2","으악! 움... 움직일 수... 없어..."],
						["","talk","딸","1","니콜라스! 한 방에 날려보내!"],
						["","talk","니콜라스","2","흡기 암경파! 분기 암경파!"],
						["","talk","레니","1","으아악!"],
						["","clear","talk"],
						["","audio","operation"],
						["","talk","레니","1","크흑, 내가... 졌다..."],
						["","talk","딸","2","뭐야, 이번에도 꽝인가? 자, 다음!"],
						["","talk","니콜라스","1","아가씨, 지금 제가 집사라서 도와드리긴 하지만, 한번 쯤은 혼자 해보시는게..."],
						["","talk","딸","2","너, 말 안듣는다고 아빠한테 이른다."],
						["","talk","니콜라스","1","다음으로 넘어가시죠."],
					["","clear","talk"],
					["","plain","","1","그 뒤, 피로도를 올인해서 지옥파티를 끝내고 돌아왔다."],
					["","talk","딸","1","아~ 오늘도 고된 하루였어. 그럼 전리품들을 살펴볼까?"],
					["","talk","니콜라스","2","인벤토리를 확인해보겠습니다."],
					["","talk","니콜라스","2","마봉템 말고 보이는 게 없습니다. 무득이로군요."],
					["","talk","딸","1","시무룩..."],
					["","talk","딸","1","괘, 괜찮아. 내일은 분명히 에픽빔을 볼 수 있을거야. 그래! 분명히!"],
					["","talk","니콜라스","2","(이것이 헬 러너의 반복된 하루일과로군.)"],
					["","talk","니콜라스","2","그럼 이제 집에 가시죠."],
					["","talk","딸","1","그래, 오늘은 피곤해서 일찍 자야겠다."],
					
					["","clear","all"],
					["","audio","spring"],
					["","plain","","1","집에 돌아왔다."],
					["","talk","딸","1","다녀왔습니다."],
					["","plain","","2","어서오렴. 오늘은 수확이 좀 있었니?"],
					["","talk","딸","1","아니요. 예전처럼 무득이에요. 하지만 내일은 꼭 에픽템을 따고 말 거에요!"],
					["","talk","딸","1","꼭 에픽 풀셋을 맞추면 레이드 쩔을 돌아서 떼돈을 벌고 말 거라구요!"],
					["","plain","","2","그래, 그때가 되면 효도좀 하거라."],
					["","talk","니콜라스","1","저기, 그 전에 헬 러닝을 끊으면 알아서 돈이 쌓일텐데..."],
					["","plain","","2","애 기는 죽이지 말거라, 니콜라스. 지금은 한창 뛰어놀 때이니."],
					["","clear","talk"],
					["","plain","","1","끝"],
						["","skip"]
				]);
				/*
				runEvent([
					["","audio","room"],
					["","if","myCha.job","=0","a","=5","b","else","c"],
						["a","talk","딸","1","나는 귀검사다. 이제 막 일어났지."],
						["","moveEvent","fortune"],
						["b","talk","딸","1","나는 크리에이터다. 이제 막 일어났지."],
						["","moveEvent","fortune"],
						["c","talk","딸","1","나는 귀검사도, 크리에이터도 아니다. 이제 막 일어났지."],
						["","moveEvent","fortune"],
					["fortune","random","0.5","d","0.5","e"],
						["d","talk","딸","1","동전을 돌려보니 앞면이다. 오늘은 운이 좋겠군."],
						["","moveEvent","choose0"],
						["e","talk","딸","1","동전을 돌려보니 뒷면이다. 오늘은 운이 나쁘겠군."],
						["","moveEvent","choose0"],
					["choose0","talk","딸","1","일어난 김에 니콜라스한테 인사할까?"],
							["","skip"],
					["","choose","인사한다","choose1","무시한다","choose2","재촉한다","choose3"],
					["choose1","talk","딸","1","좋은 아침이야, 니콜라스."],
					["choose2","talk","니콜라스","2","좋은 아침입니다, 아가씨. 밤에 별일은..."],
					["choose3","talk","딸","1","그건 됐고, 어제 약속했었지? 빨리 가자."],
					["","talk","니콜라스","2","저, 아가씨. 아직은 많이 이른 듯 합니다만. 아직 아침식사도 하지 않으셨잖습니까."],
					["","talk","딸","1","안돼. 조금만 늦어도 아침 할인행사에 늦어버릴 거라고."],
					["","talk","딸","1","자, 빨리빨리."],
					["","talk","니콜라스","2","알겠습니다. 그럼 잠시..."],
					["","plain","","1","<span class='font_20'>잠깐!</span>"],
					["","talk","딸","2","아이 참, 아침부터 누가 날 막는거야?"],
					["","talk","니콜라스","2","주인 어르신입니다. 아무리 자다 막 일어나셔서 맹맹한 목소리라지만 좀 알아들으시지요."],
					["","talk","딸","2","아빠? 아빠는 분명 동창회 가서 자고 온다고..."],
					["","plain","","1","새벽녘에 돌아왔지. 아직도 머리가 띵하구나."],
					
					["","clear","all"],
					
					["","plain","","1","그나저나 또 아침부터 어딜 나갈 셈이냐?"],
					["","plain","","1","아침은 거르지 말라고 아빠가 몇번을 해야 알아듣겠니?"],
					["","talk","니콜라스","2","걱정하지 마십시오. 아침식사는 제가 책임지고 아가씨가 거르지 않도록 하겠습니다."],
					["","plain","","1","니콜라스가 그러겠다면..."],
					["","plain","","1","늦지 않게 들어와야 한다."],
					["","talk","딸","2","네에~"],
					["","talk","딸","2","아빠, 용돈!"],
					["","plain","","1","옛다."],
							["","skip"],
					["","item","골드","1000000","용돈"],
							["","delay","30"],
							["","hold"],
					["","talk","딸","2","우와~ 역시 아빠가 최고야! 감사합니다!"],
					
					["","clear","all"],
					
					["","scene","town"],
					["","audio","town"],
					["loop","talk","딸","1","하여튼 우리 아빠는 잔소리가 많아서 탈이라니까."],
					["","talk","니콜라스","2","쉿, 주인님께서 들으실지도 모릅니다."],
					["","talk","딸","1","들리면 들으라지, 뭐."],
					["","moveEvent","loop"]
				]);
				*/
		};
	
}