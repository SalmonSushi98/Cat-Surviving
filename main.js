window.onload = function() {
  localStorage.setItem("noteInfo", "XX월 XX일<br>반지와 학생증을 잃어버렸다. 어디에서 떨어트린 것인지...<br>XX월 XX일<br>자취방 열쇠가 안보인다... 집에 어떻게 들어가지..<br>XX월 XX일<br>기침하면서 안경을 떨어트렸는데 어디로 간 건지 모르겠다..<br>XX월 XX일<br>큰일이다. 아주 중요한 물건을 잃어버렸다.. 중앙광장지하에서 잃어버린 거 같은데 어디있지..");
  
  const item1 = document.getElementsByClassName('th')[0];

  if (localStorage.getItem("note") == "get") {
    item1.style.backgroundImage = "url(images/note.png)";
  }
  
  const startBtn = document.querySelectorAll('.introMenu')[0];
  const helpBtn = document.querySelectorAll('.introMenu')[1];
  const introWindow = document.querySelector('#introWindow');
  const startWindow = document.querySelector('#startWindow');
  const gameWindow = document.querySelector('#gameWindow');
  const game = document.querySelector("#game");
  const location = document.querySelector("#location");
  const modal = document.querySelector('#modal');
  const closeBtn = document.querySelector('.close');
  const modalMes = document.querySelector('#modalMessage');
  const whiteModal = document.querySelector('#whiteModal');

  helpBtn.addEventListener('click', function(e) {
    modal.style.zIndex = '1';
    modalMes.innerHTML = "길고양이가 되어<br>도심 속에서<br>생존하는 게임입니다.";
  })

  closeBtn.addEventListener('click', function(e) {
    modal.style.zIndex = '-1';
  })

  function screenChange(modal, element1, element2) {
    modal.style.zIndex = '1';
    modal.style.opacity = '1';
    modal.style.transition = '1.5s';
    setTimeout(function(e) {
      modal.style.zIndex = '-1';
      modal.style.opacity = '0';
      element1.style.display = 'none';
      element2.style.display = 'block';
    }, 1500)
  }

  startBtn.addEventListener('click', function(e) {
    if (localStorage.getItem("name") !== null) {
      if (localStorage.getItem("note") !== "get") {
        gameMenu.style.zIndex = "-1";
      }
      screenChange(whiteModal, introWindow, gameWindow);
      document.getElementById("userName").innerText = localStorage.getItem("name");
    } else {
      screenChange(whiteModal, introWindow, startWindow);
    }
  })

  function myDia (element) {
    element.style.color = 'blue';
    element.style.fontWeight = 'bold';
  }

  function dia (element) {
    element.style.color = 'black';
    element.style.fontWeight = 'normal';
  }

  const startMain = document.querySelector('#startMain');
  const startDia = document.querySelector('#startDialogue');
  const storyOpt = document.querySelector('#storyOpt');
  const nextBtn = document.querySelector('#next');
  const gameMenu = document.querySelector('#gameMenu');

  nextBtn.addEventListener('click', function(e) {
  if (startDia.innerHTML == "............<br>.......") {
    startDia.innerHTML = ".......나..<br>....어..나..";
  } else if (startDia.innerHTML == ".......나..<br>....어..나..") {
    startMain.style.backgroundImage = 'url(images/cat001.png)';
    startDia.innerHTML = "일어나!!";
  } else if (startDia.innerHTML == "일어나!!") {
    myDia(startDia);
    startDia.innerHTML = "'뭐야.. 웬 고양이..?'";
  } else if (startDia.innerHTML == "'뭐야.. 웬 고양이..?'") {
    dia(startDia);
    startDia.innerHTML = "어이 네놈<br>처음 보는 얼굴인데<br>이름이 뭐냐?";
  } else if (startDia.innerHTML == "어이 네놈<br>처음 보는 얼굴인데<br>이름이 뭐냐?") {
    myDia(startDia);
    startDia.innerHTML = "'내 이름...?'";
    document.getElementById('name').style.display = 'block';
  } else if (startDia.innerHTML == "'내 이름...?'") {
    var name = document.getElementsByName('myName')[0].value;
    if (name == "") {
      alert('이름을 입력해주세요!');
    } else {
      dia(startDia);
      startDia.innerHTML = name + "..?<br>인간스러운 이름이군";
      document.getElementById('name').style.display = 'none';
      localStorage.setItem("name", name);
    }
  } else if (startDia.innerHTML == localStorage.getItem("name") + "..?<br>인간스러운 이름이군") {
    myDia(startDia);
    startDia.innerHTML = "'난 인간인데..'<br>'이상한 고양이...'";
  } else if (startDia.innerHTML == "'난 인간인데..'<br>'이상한 고양이...'") {
    startDia.innerHTML = "'잠깐.. 내가 어떻게<br>고양이가 하는 말을<br>알아듣는거지?'"
  } else if (startDia.innerHTML == "'잠깐.. 내가 어떻게<br>고양이가 하는 말을<br>알아듣는거지?'") {
    startDia.innerHTML = "이봐 넌 대체 뭐야?";
  } else if (startDia.innerHTML == "이봐 넌 대체 뭐야?") {
    dia(startDia);
    startDia.innerHTML = "나 말인가?<br>나는 검은 발톱이다.";
  } else if (startDia.innerHTML == "나 말인가?<br>나는 검은 발톱이다.") {
    myDia(startDia);
    startDia.innerHTML = ".......";
  } else if (startDia.innerHTML == ".......") {
    startDia.innerHTML = "아니 그...<br>검은 발톱씨?";
  } else if (startDia.innerHTML == "아니 그...<br>검은 발톱씨?") {
    startDia.innerHTML = "우리가 어떻게<br>대화할 수 있는지<br>모르겠지만";
  } else if (startDia.innerHTML == "우리가 어떻게<br>대화할 수 있는지<br>모르겠지만") {
    startDia.innerHTML = "여긴 도대체 어디야?";
  } else if (startDia.innerHTML == "여긴 도대체 어디야?") {
    dia(startDia);
    startDia.innerHTML = "이곳은 중앙광장이다.";
  } else if (startDia.innerHTML == "이곳은 중앙광장이다.") {
    myDia(startDia);
    startDia.innerHTML = "'중앙광장은 또<br>어디에 있는 곳이야..'";
  } else if (startDia.innerHTML == "'중앙광장은 또<br>어디에 있는 곳이야..'") {
    startDia.innerHTML = "'잠깐.. 설마 여기<br>고려대학교 중앙광장??'";
  } else if (startDia.innerHTML == "'잠깐.. 설마 여기<br>고려대학교 중앙광장??'") {
    dia(startDia);
    startDia.innerHTML = "이봐 조심해!<br>인간들이 다가온다.";
  } else if (startDia.innerHTML == "이봐 조심해!<br>인간들이 다가온다.") {
    startMain.style.backgroundImage = 'url(images/people001.png)';
    startDia.innerHTML = "어머, 못보던 고양이네?<br>너는 어디서 왔니?";
  } else if (startDia.innerHTML == "어머, 못보던 고양이네?<br>너는 어디서 왔니?") {
    myDia(startDia);
    startDia.innerHTML = "......?<br>아니 누구세요..?<br>사람한테 고양이라니..";
  } else if (startDia.innerHTML == "......?<br>아니 누구세요..?<br>사람한테 고양이라니..") {
    dia(startDia);
    startDia.innerHTML = "야 애 되게 귀엽다~<br>안 피하고 야옹거리네~";
  } else if (startDia.innerHTML == "야 애 되게 귀엽다~<br>안 피하고 야옹거리네~") {
    myDia(startDia);
    startDia.innerHTML = "...저기요<br>자꾸 그러니깐<br>좀 기분이...;;";
  } else if (startDia.innerHTML == "...저기요<br>자꾸 그러니깐<br>좀 기분이...;;") {
    startMain.style.backgroundImage = 'url(images/cat001.png)';
    dia(startDia);
    startDia.innerHTML = "어이 너<br>아까부터 무슨 소리냐?"; 
  } else if (startDia.innerHTML == "어이 너<br>아까부터 무슨 소리냐?") {
    startDia.innerHTML = "자기 스스로 인간이라니..<br>상태가 안좋아보이는군.";
  } else if (startDia.innerHTML == "자기 스스로 인간이라니..<br>상태가 안좋아보이는군.") {
    myDia(startDia);
    startDia.innerHTML = "무슨 소리야?<br>난 인간이라고!!";
  } else if (startDia.innerHTML == "무슨 소리야?<br>난 인간이라고!!") {
    dia(startDia);
    startDia.innerHTML = ".......<br>더위를 좀 먹었나보군.";
  } else if (startDia.innerHTML == ".......<br>더위를 좀 먹었나보군.") {
    startDia.innerHTML = "그늘 아래서 좀 쉬라구.";
  } else if (startDia.innerHTML == "그늘 아래서 좀 쉬라구.") {
    startMain.style.backgroundImage = '';
    myDia(startDia);
    startDia.innerHTML = "'...이상한 녀석이야.'";
  } else if (startDia.innerHTML == "'...이상한 녀석이야.'") {
    startDia.innerHTML = "'일단 자리를 좀<br>옮겨야 겠어.'";
  } else if (startDia.innerHTML == "'일단 자리를 좀<br>옮겨야 겠어.'") {
    startDia.innerHTML = "'어..어...? 뭐야?'";
  } else if (startDia.innerHTML == "'어..어...? 뭐야?'") {
    startMain.style.backgroundImage = 'url(images/cat002.png)';
    startDia.innerHTML = "'이게 내 모습이라고?!'";
  } else if (startDia.innerHTML == "'이게 내 모습이라고?!'") {
    startDia.innerHTML = "'내가...<br>내가 진짜<br>고양이가 됐잖아...??'";
  } else if (startDia.innerHTML = "'내가...<br>내가 진짜<br>고양이가 됐잖아...??'") {
    screenChange(whiteModal, startWindow, gameWindow);
    document.querySelector("#userName").innerText = localStorage.getItem("name");
    gameMenu.style.zIndex = "-1";
  }
  })

  const story = document.querySelector('#story');
  const storyDia = document.querySelector('#storyDialogue');
  const opt1 = document.querySelectorAll('.sOpt')[0];
  const opt2 = document.querySelectorAll('.sOpt')[1];
  const opt3 = document.querySelectorAll('.sOpt')[2];
  const storyBtn = document.querySelector('#storyNext');
  const optBox1 = document.querySelector('#optBox1');
  const optBox2 = document.querySelector('#optBox2');
  const place = document.querySelector('#place');
  const HP = document.querySelector('#HP');
  const condition = document.querySelector('#condition');

  function box1Close(element1, element2) {
    element1.style.display = 'none';
    element2.style.display = 'block';
  }

  function box2Close(element1, element2) {
    element1.style.display = 'flex';
    element2.style.display = 'none';
  }

  opt1.addEventListener('click', function(e) {
    switch (place.innerText) {
      case "중앙광장":
        if (storyDia.innerHTML == "무엇을 할까?") {
          myDia(storyDia);
          storyDia.innerHTML = "'가만히 있으면 아무 것도 알 수 없어..'";
          box1Close(optBox1, optBox2);
        }
        break;
      case "민주광장":
        if (storyDia.innerHTML == "무엇을 할까?") {
          if (localStorage.getItem("quest_findRing") !== "on") {
            myDia(storyDia);
            storyDia.innerHTML = "'좀 돌아다니면서<br>정보를 찾아야겠어.'";
            box1Close(optBox1, optBox2);
          } else {
            story.style.backgroundImage = "url(images/magpie.png)";
            storyDia.innerHTML = "아직 물건이 준비가<br>안 된거 같은디?";
            box1Close(optBox1, optBox2);
          }
        }
        break;
    }
  })

  opt2.addEventListener('click', function(e) {
    if (place.innerText == "중앙광장") {
      if (localStorage.getItem("note") !== "get") {
        if (storyDia.innerHTML == "무엇을 할까?") {
          myDia(storyDia);
          storyDia.innerHTML = "'일단 주변을 좀 탐색해보자.'";
          box1Close(optBox1, optBox2);
        }
      } else {
        myDia(storyDia);
        storyDia.innerHTML = "'여기서는 이제 더 알아낼 수 있는 게 없는 것 같다.'";
        box1Close(optBox1, optBox2);
      }
    }
  })

  storyBtn.addEventListener('click', function(e) {
    if (storyDia.innerHTML == "체력을 전부 소진하였습니다.") {
      storyDia.innerHTML = "중앙광장에서 다시 시작합니다.";
    } else if (storyDia.innerHTML == "중앙광장에서 다시 시작합니다.") {
      screenChange(whiteModal, introWindow, gameWindow);
      setTimeout(function(e) {
        HP.innerText = "100";
        place.innerText = "중앙광장";
        gameMenu.style.zIndex = "0";
        storyDia.innerHTML = "무엇을 할까?";
        box2Close(optBox1, optBox2);
        opt1.innerText = "▶ 가만히 있는다.";
        opt2.innerText = "▶ 돌아다닌다.";
      }, 1500)
    } else {
      switch (place.innerText) {
        case "중앙광장":
          if (storyDia.innerHTML == "'가만히 있으면 아무 것도 알 수 없어..'" || storyDia.innerHTML == "'여기서는 이제 더 알아낼 수 있는 게 없는 것 같다.'") {
            dia(storyDia);
            storyDia.innerHTML = "무엇을 할까?";
            box2Close(optBox1, optBox2);
          } else if (storyDia.innerHTML == "'일단 주변을 좀 탐색해보자.'") {
            storyDia.innerHTML = "'어? 노트가 하나 떨어져있네...<br>낯이 좀 익은데..'";
          } else if (storyDia.innerHTML == "'어? 노트가 하나 떨어져있네...<br>낯이 좀 익은데..'") {
            storyDia.innerHTML = "'잠깐, 이거 내 글씨체잖아?'";
          } else if (storyDia.innerHTML == "'잠깐, 이거 내 글씨체잖아?'") {
            storyDia.innerHTML = "'맞아, 기억난다. 이건 내 노트야.'";
          } else if (storyDia.innerHTML == "'맞아, 기억난다. 이건 내 노트야.'") {
            storyDia.innerHTML = "'뭐라고 적혀있는지 한번 읽어볼까..'";
          } else if (storyDia.innerHTML == "'뭐라고 적혀있는지 한번 읽어볼까..'") {
            storyDia.style.color = "green";
            storyDia.style.fontWeight = "normal";
            storyDia.innerHTML = "XX월 XX일<br>반지와 학생증을 잃어버렸다. 어디에서 떨어트린 것인지...";
          } else if (storyDia.innerHTML == "XX월 XX일<br>반지와 학생증을 잃어버렸다. 어디에서 떨어트린 것인지...") {
            storyDia.innerHTML = "XX월 XX일<br>자취방 열쇠가 안보인다... 집에 어떻게 들어가지..";
          } else if (storyDia.innerHTML == "XX월 XX일<br>자취방 열쇠가 안보인다... 집에 어떻게 들어가지..") {
            storyDia.innerHTML = "XX월 XX일<br>기침하면서 안경을 떨어트렸는데 어디로 간 건지 모르겠다..";
          } else if (storyDia.innerHTML == "XX월 XX일<br>기침하면서 안경을 떨어트렸는데 어디로 간 건지 모르겠다..") {
            storyDia.innerHTML = "XX월 XX일<br>큰일이다. 아주 중요한 물건을 잃어버렸다.. 중앙광장지하에서 잃어버린 거 같은데 어디있지..";
          } else if (storyDia.innerHTML == "XX월 XX일<br>큰일이다. 아주 중요한 물건을 잃어버렸다.. 중앙광장지하에서 잃어버린 거 같은데 어디있지..") {
            myDia(storyDia);
            storyDia.innerHTML = "'맞아 이 노트는 내가 잃어버린 물건을 적어두는 노트였어'";
          } else if (storyDia.innerHTML == "'맞아 이 노트는 내가 잃어버린 물건을 적어두는 노트였어'") {
            storyDia.innerHTML = "'일단 이 노트를 챙겨둬야겠다.'";
          } else if (storyDia.innerHTML == "'일단 이 노트를 챙겨둬야겠다.'") {
            localStorage.setItem("note", "get");
            item1.style.backgroundImage = "url(images/note.png)";
            dia(storyDia);
            storyDia.innerHTML = "무엇을 할까?";
            box2Close(optBox1, optBox2);
            gameMenu.style.zIndex = "0";
          }
          break;
        case "민주광장":
          if (storyDia.innerHTML == "'좀 돌아다니면서<br>정보를 찾아야겠어.'") {
            storyDia.innerHTML = "'그런데 누구한테<br>물으면 좋으려나...'";
          } else if (storyDia.innerHTML == "'그런데 누구한테<br>물으면 좋으려나...'") {
            storyDia.innerHTML = "'잠깐, 저 까치가<br>입에 물고있는 거<br>반지 같은데??'";
          } else if (storyDia.innerHTML == "'잠깐, 저 까치가<br>입에 물고있는 거<br>반지 같은데??'") {
            storyDia.innerHTML = "'가서 말을<br>걸어봐야겠다.'";
          } else if (storyDia.innerHTML == "'가서 말을<br>걸어봐야겠다.'") {
            storyDia.innerHTML = "저기...";
          } else if (storyDia.innerHTML == "저기...") {
            story.style.backgroundImage = "url(images/magpie.png)";
            dia(storyDia);
            storyDia.innerHTML = "응? 뉘쇼?";
          } else if (storyDia.innerHTML == "응? 뉘쇼?") {
            myDia(storyDia);
            storyDia.innerHTML = "저 혹시 그 반지..<br>어디서 나셨나요..?";
          } else if (storyDia.innerHTML == "저 혹시 그 반지..<br>어디서 나셨나요..?") {
            dia(storyDia);
            storyDia.innerHTML = "어디서 났긴?<br>길가다 주웠지.";
          } else if (storyDia.innerHTML == "어디서 났긴?<br>길가다 주웠지.") {
            myDia(storyDia);
            storyDia.innerHTML = "아 그러시군요...";
          } else if (storyDia.innerHTML == "아 그러시군요...") {
            storyDia.innerHTML = "그런데 그 반지가<br>제꺼 같아서요...하하";
          } else if (storyDia.innerHTML == "그런데 그 반지가<br>제꺼 같아서요...하하") {
            storyDia.innerHTML = "저한테 돌려주실 수<br>있으신가요??";
          } else if (storyDia.innerHTML == "저한테 돌려주실 수<br>있으신가요??") {
            dia(storyDia);
            storyDia.innerHTML = "시방 그게 뭔<br>날강도같은 소리여";
          } else if (storyDia.innerHTML == "시방 그게 뭔<br>날강도같은 소리여") {
            storyDia.innerHTML = "뭔 놈의 괭이가<br>반지를 껴?";
          } else if (storyDia.innerHTML == "뭔 놈의 괭이가<br>반지를 껴?") {
            storyDia.innerHTML = "헛소리 말고 썩 꺼지슈.";
          } else if (storyDia.innerHTML == "헛소리 말고 썩 꺼지슈.") {
            myDia(storyDia);
            storyDia.innerHTML = "음... 제가 그 반지가<br>꼭 필요한데..";
          } else if (storyDia.innerHTML == "음... 제가 그 반지가<br>꼭 필요한데..") {
            storyDia.innerHTML = "어떻게 좀 안될까요...";
          } else if (storyDia.innerHTML == "어떻게 좀 안될까요...") {
            dia(storyDia);
            storyDia.innerHTML = "고럼 반지 대신에<br>나가 좋아할 만한<br>물건으로다가<br>하나 가져와보든지.";
          } else if (storyDia.innerHTML == "고럼 반지 대신에<br>나가 좋아할 만한<br>물건으로다가<br>하나 가져와보든지.") {
            localStorage.setItem("quest_findRing", "on");
            let json = JSON.parse(localStorage.getItem("jsonSet2"));
            json.opt_1 = "▶ 까치에게 말을 건다.";
            localStorage.setItem("jsonSet2", JSON.stringify(json));
            storyDia.innerHTML = "무엇을 할까?";
            opt1.innerText = "▶ 까치에게 말을 건다.";
            box2Close(optBox1, optBox2);
            story.style.backgroundImage = "";
          } else if (storyDia.innerHTML == "아직 물건이 준비가<br>안 된거 같은디?") {
            storyDia.innerHTML = "무엇을 할까?";
            box2Close(optBox1, optBox2);
            story.style.backgroundImage = "";
          }
          break;
        case "정경대후문":
          break;
        case "다람쥐길":
          break;
        case "법과대후문":
          break;
        case "중앙광장지하":
          break;
      }
    }
  })

  const itemBox = document.querySelector('#itemBox');
  const itemInfo = document.querySelector('#itemInfo');
  const detailInfo = document.querySelector('#detailInfo');

  const moveBtn = document.getElementsByClassName('gameOpt')[0];
  const itemBtn = document.getElementsByClassName('gameOpt')[1];
  const restBtn = document.getElementsByClassName('gameOpt')[2];
  const homeBtn = document.getElementsByClassName('gameOpt')[3];

  moveBtn.addEventListener('click', function(e) {
    if(location.style.display == "none") {
      location.style.display = "flex";
      game.style.display = "none";
    } else if (location.style.display == "flex") {
      location.style.display = "none";
      game.style.display = "block";
    }
  })

  itemBtn.addEventListener('click', function(e) {
    if (game.style.display == "none") {
      location.style.display = "none";
      game.style.display = "block";
      story.style.display = "none";
      storyOpt.style.display = "none";
      itemBox.style.display = "block";
      itemInfo.style.display = "flex";
    } else {
      if (itemBox.style.display == "none") {
        story.style.display = "none";
        storyOpt.style.display = "none";
        itemBox.style.display = "block";
        itemInfo.style.display = "flex";
      } else if (itemBox.style.display == "block") {
        story.style.display = 'flex';
        storyOpt.style.display = "block";
        itemBox.style.display = "none";
        itemInfo.style.display = "none";
        detailInfo.innerHTML = "";
      }
    }
  })

  item1.addEventListener('click', function(e) {
    if(localStorage.getItem("note") == "get") {
      detailInfo.innerHTML = localStorage.getItem("noteInfo");
    }
  })

  restBtn.addEventListener('click', function(e) {
    if (condition.innerText == "정상") {
      if (HP.innerText == "100") {
        modal.style.zIndex = '1';
        modalMes.innerHTML = "이미 체력이 충분합니다.";
      }
    } else {
      modal.style.zIndex = '1';
      modalMes.innerHTML = "상태 이상일 때는<br>사용할 수 없습니다.";
    }
  })

  homeBtn.addEventListener('click', function(e) {
    screenChange(whiteModal, gameWindow, introWindow);
  })

  const mainPlaza = document.querySelectorAll('.loc')[0];
  const set1 = {location: "중앙광장", opt_1: "▶ 가만히 있는다.", opt_2: "▶ 돌아다닌다."};
  const democracyPlaza = document.querySelectorAll('.loc')[1];
  if (localStorage.getItem("jsonSet2") == null) {
    const set2 = {location: "민주광장", opt_1: "▶ 돌아다닌다.", opt_2: "▶ 쓰레기통을 뒤진다."};
    localStorage.setItem("jsonSet2", JSON.stringify(set2));
  }
  const politicalBackYard = document.querySelectorAll('.loc')[2];
  const squirrelRoad = document.querySelectorAll('.loc')[3];
  const lawBackYard = document.querySelectorAll('.loc')[4];
  const mainBasement = document.querySelectorAll('.loc')[5];

  mainPlaza.addEventListener('click', function(e) {
    if (place.innerText == "중앙광장") {
      modal.style.zIndex = '1';
      modalMes.innerHTML = "이미 중앙광장입니다.";
    } else {
      story.style.display = 'flex';
      storyOpt.style.display = "block";
      itemBox.style.display = "none";
      itemInfo.style.display = "none";
      detailInfo.innerHTML = "";
      if (parseInt(HP.innerText) < 15) {
        place.innerText = "중앙광장";
        location.style.display = "none";
        game.style.display = "block";
        gameOver(HP, gameMenu, dia, storyDia);
      } else {
        place.innerText = "중앙광장";
        localStorage.setItem("location", "중앙광장");
        HP.innerText = parseInt(HP.innerText) - 15;
        localStorage.setItem("HP", HP.innerText);
        location.style.display = "none";
        game.style.display = "block";
        dia(storyDia);
        storyDia.innerHTML = "무엇을 할까?";
        box2Close(optBox1, optBox2);
        opt1.innerText = "▶ 가만히 있는다.";
        opt2.innerText = "▶ 돌아다닌다.";
      }
    }
  })

  democracyPlaza.addEventListener('click', function(e) {
    if (place.innerText == "민주광장") {
      modal.style.zIndex = '1';
      modalMes.innerHTML = "이미 민주광장입니다.";
    } else {
      story.style.display = 'flex';
      storyOpt.style.display = "block";
      itemBox.style.display = "none";
      itemInfo.style.display = "none";
      detailInfo.innerHTML = "";
      if (parseInt(HP.innerText) < 15) {
        place.innerText = "민주광장";
        location.style.display = "none";
        game.style.display = "block";
        gameOver(HP, gameMenu, dia, storyDia);
      } else {
        place.innerText = "민주광장";
        localStorage.setItem("location", "민주광장");
        HP.innerText = parseInt(HP.innerText) - 15;
        localStorage.setItem("HP", HP.innerText);
        location.style.display = "none";
        game.style.display = "block";
        dia(storyDia);
        storyDia.innerHTML = "무엇을 할까?";
        box2Close(optBox1, optBox2);
        if (localStorage.getItem("jsonSet2") == null) {
          const set2 = {location: "민주광장", opt_1: "▶ 돌아다닌다.", opt_2: "▶ 쓰레기통을 뒤진다."};
          localStorage.setItem("jsonSet2", JSON.stringify(set2));
          opt1.innerText = set2.opt_1;
          opt2.innerText = set2.opt_2;
        } else {
          const json = JSON.parse(localStorage.getItem("jsonSet2"));
          opt1.innerText = json.opt_1;
          opt2.innerText = json.opt_2;
        }
      }
    }
  })

  if (localStorage.getItem("location") !== null) {
    place.innerText = localStorage.getItem("location");
    switch (localStorage.getItem("location")) {
      case "중앙광장":
        opt1.innerText = set1.opt_1;
        opt2.innerText = set1.opt_2;
        break;
      case "민주광장":
        if (localStorage.getItem("jsonSet2") !== null) {
          const json = JSON.parse(localStorage.getItem("jsonSet2"));
          opt1.innerText = json.opt_1;
          opt2.innerText = json.opt_2;
        } else {
          opt1.innerText = "▶ 돌아다닌다.";
          opt2.innerText = "▶ 쓰레기통을 뒤진다.";
        }
        break;
    }
  } else {
    place.innerText = set1.location;
    opt1.innerText = set1.opt_1;
    opt2.innerText = set1.opt_2;
  }

  if (localStorage.getItem("HP") !== null) {
    HP.innerText = localStorage.getItem("HP");
  } else {
    HP.innerText = 100;
  }
  
  function gameOver(HP, gameMenu, dia, storyDia) {
    HP.innerText = "0";
    gameMenu.style.zIndex = "-1";
    dia(storyDia);
    storyDia.innerHTML = "체력을 전부 소진하였습니다.";
    box1Close(optBox1, optBox2);
    localStorage.setItem("location", "중앙광장");
    localStorage.setItem("HP", "100");
    localStorage.removeItem("jsonSet2");
    localStorage.removeItem("quest_findRing");
  }
};