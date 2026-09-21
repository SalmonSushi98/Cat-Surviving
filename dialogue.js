// ============================================================================
// dialogue.js — all narrative text and item/option labels live here.
// main.js references DIALOGUE.* for anything the player reads; it never
// hard-codes story text itself. Game logic (state changes, what happens when
// a chain finishes) stays in main.js, since that needs the DOM/localStorage.
//
// Load this file BEFORE main.js (see index.html).
// ============================================================================
const DIALOGUE = {
  // ---------------- UI strings reused as both display text and state checks ----------------
  ui: {
    menuPrompt: "무엇을 할까?",
    nameRequired: "이름을 입력해주세요!",
    helpText: "길고양이가 되어<br>도심 속에서<br>생존하는 게임입니다.",
    fainted: "체력을 전부 소진하였습니다.",
    respawnPrompt: "중앙광장에서 다시 시작합니다.",
    restingLabel: "휴식을 취하는 중입니다.",
    restDone: "휴식이 완료되었습니다.",
    restFull: "이미 체력이 충분합니다.",
    restBadCondition: "상태 이상일 때는<br>사용할 수 없습니다.",
    alreadyAt: (placeName) => `이미 ${placeName}입니다.`,
    trashPickPrompt: "어떤 물건을 가져갈까?",
    magpieOfferPrompt: "그려 나헌티 뭘 줄꺼지?",
  },

  // ---------------- Default location option labels ----------------
  locations: {
    중앙광장: { opt_1: "▶ 가만히 있는다.", opt_2: "▶ 돌아다닌다." },
    민주광장: { opt_1: "▶ 돌아다닌다.", opt_2: "▶ 쓰레기통을 뒤진다.", opt_1_asking: "▶ 까치에게 말을 건다." },
  },

  // ---------------- Items (도구함) ----------------
  items: {
    note: { image: "images/note.png", info: () => localStorage.getItem("noteInfo") },
    meat: { image: "images/meat.png", info: "썩은 고기입니다.", label: "▶ 썩은 고기" },
    bead: { image: "images/bead.png", info: "반짝거리는 구슬입니다.", label: "▶ 반짝거리는 구슬" },
    movieTicket: { image: "images/movieTicket.png", info: "영화 티켓입니다.", label: "▶ 영화 티켓" },
    ring: { image: "images/ring.png", info: "반지입니다." },
  },

  noteInfo:
    "XX월 XX일<br>반지와 학생증을 잃어버렸다. 어디에서 떨어트린 것인지...<br>" +
    "XX월 XX일<br>자취방 열쇠가 안보인다... 집에 어떻게 들어가지..<br>" +
    "XX월 XX일<br>기침하면서 안경을 떨어트렸는데 어디로 간 건지 모르겠다..<br>" +
    "XX월 XX일<br>큰일이다. 아주 중요한 물건을 잃어버렸다.. 중앙광장지하에서 잃어버린 거 같은데 어디있지..",

  // ---------------- Intro dialogue ----------------
  // intro[0] is the text already shown in the HTML on page load.
  intro: [
    { text: "............<br>......." },
    { text: "......나..<br>....어..나.." },
    { text: "일어나!!", bg: "images/cat001.png" },
    { text: "'뭐야.. 웬 고양이..?'", style: "my" },
    { text: "어이 네놈<br>처음 보는 얼굴인데<br>이름이 뭐냐?", style: "other" },
    { text: "'내 이름...?'", style: "my", showInput: true },
    { text: (name) => name + "..?<br>인간스러운 이름이군", style: "other", requiresName: true, hideInput: true },
    { text: "'난 인간인데..'<br>'이상한 고양이...'", style: "my" },
    { text: "'잠깐.. 내가 어떻게<br>고양이가 하는 말을<br>알아듣는거지?'" },
    { text: "이봐 넌 대체 뭐야?" },
    { text: "나 말인가?<br>나는 검은 발톱이다.", style: "other" },
    { text: ".......", style: "my" },
    { text: "아니 그...<br>검은 발톱씨?" },
    { text: "우리가 어떻게<br>대화할 수 있는지<br>모르겠지만" },
    { text: "여긴 도대체 어디야?" },
    { text: "이곳은 중앙광장이다.", style: "other" },
    { text: "'중앙광장은 또<br>어디에 있는 곳이야..'", style: "my" },
    { text: "'잠깐.. 설마 여기<br>고려대학교 중앙광장??'" },
    { text: "이봐 조심해!<br>인간들이 다가온다.", style: "other" },
    { text: "어머, 못보던 고양이네?<br>너는 어디서 왔니?", bg: "images/people001.png" },
    { text: "......?<br>아니 누구세요..?<br>사람한테 고양이라니..", style: "my" },
    { text: "야 애 되게 귀엽다~<br>안 피하고 야옹거리네~", style: "other" },
    { text: "...저기요<br>자꾸 그러니깐<br>좀 기분이...;;", style: "my" },
    { text: "어이 너<br>아까부터 무슨 소리냐?", style: "other", bg: "images/cat001.png" },
    { text: "자기 스스로 인간이라니..<br>상태가 안좋아보이는군." },
    { text: "무슨 소리야?<br>난 인간이라고!!", style: "my" },
    { text: ".......<br>더위를 좀 먹었나보군.", style: "other" },
    { text: "그늘 아래서 좀 쉬라구." },
    { text: "'...이상한 녀석이야.'", style: "my", bg: "" },
    { text: "'일단 자리를 좀<br>옮겨야 겠어.'" },
    { text: "'어..어...? 뭐야?'" },
    { text: "'이게 내 모습이라고?!'", bg: "images/cat002.png" },
    { text: "'내가...<br>내가 진짜<br>고양이가 됐잖아...??'", final: true },
  ],

  // ---------------- In-game story chains ----------------
  // Each array holds only the *displayed* steps (text/style/bg/color) — no
  // `final`/`complete` entries. main.js appends its own final step (with the
  // side effects for that chain) onto the end of these arrays.
  chains: {
    centralIdle: [{ style: "my", text: "'가만히 있으면 아무 것도 알 수 없어..'" }],
    centralExplore: [
      { style: "my", text: "'일단 주변을 좀 탐색해보자.'" },
      { text: "'어? 노트가 하나 떨어져있네...<br>낯이 좀 익은데..'" },
      { text: "'잠깐, 이거 내 글씨체잖아?'" },
      { text: "'맞아, 기억난다. 이건 내 노트야.'" },
      { text: "'뭐라고 적혀있는지 한번 읽어볼까..'" },
      { color: "green", text: "XX월 XX일<br>반지와 학생증을 잃어버렸다. 어디에서 떨어트린 것인지..." },
      { text: "XX월 XX일<br>자취방 열쇠가 안보인다... 집에 어떻게 들어가지.." },
      { text: "XX월 XX일<br>기침하면서 안경을 떨어트렸는데 어디로 간 건지 모르겠다.." },
      { text: "XX월 XX일<br>큰일이다. 아주 중요한 물건을 잃어버렸다.. 중앙광장지하에서 잃어버린 거 같은데 어디있지.." },
      { style: "my", text: "'맞아 이 노트는 내가 잃어버린 물건을 적어두는 노트였어'" },
      { text: "'일단 이 노트를 챙겨둬야겠다.'" },
    ],
    centralExploreDone: [{ style: "my", text: "'여기서는 이제 더 알아낼 수 있는 게 없는 것 같다.'" }],

    democracyWander: [
      { style: "my", text: "'좀 돌아다니면서<br>정보를 찾아야겠어.'" },
      { text: "'그런데 누구한테<br>물으면 좋으려나...'" },
      { text: "'잠깐, 저 까치가<br>입에 물고있는 거<br>반지 같은데??'" },
      { text: "'가서 말을<br>걸어봐야겠다.'" },
      { text: "저기..." },
      { bg: "images/magpie.png", style: "other", text: "응? 뉘쇼?" },
      { style: "my", text: "저 혹시 그 반지..<br>어디서 나셨나요..?" },
      { style: "other", text: "어디서 났긴?<br>길가다 주웠지." },
      { style: "my", text: "아 그러시군요..." },
      { text: "그런데 그 반지가<br>제꺼 같아서요...하하" },
      { text: "저한테 돌려주실 수<br>있으신가요??" },
      { style: "other", text: "시방 그게 뭔<br>날강도같은 소리여" },
      { text: "뭔 놈의 괭이가<br>반지를 껴?" },
      { text: "헛소리 말고 썩 꺼지슈." },
      { style: "my", text: "음... 제가 그 반지가<br>꼭 필요한데.." },
      { text: "어떻게 좀 안될까요..." },
      { style: "other", text: "고럼 반지 대신에<br>나가 좋아할 만한<br>물건으로다가<br>하나 가져와보든지." },
    ],
    democracyWaiting: [{ bg: "images/magpie.png", text: "아직 물건이 준비가<br>안 된거 같은디?" }],

    trashFlavorOnly: [{ style: "my", text: "'쓰레기통에 잡동사니가<br>잔뜩 들어있다.'" }],
    trashEmpty: [{ style: "my", text: "더 이상 챙길 만한 물건은<br>없는 것 같다." }],

    offerBead: [
      { style: "other", text: "호오.. 고거는 좀<br>탐나는구먼." },
      { text: "원래 내꺼는 안 내주는디<br>이번 한번만 선심 쓰볼까?" },
      { text: "여기 반지 가져가슈.<br>난 바빠서 이만 가봐야겠구만." },
    ],
  },

  // Magpie's rejection lines for items it doesn't want.
  offerRejected: {
    meat: "냄새나는 고기는<br>절루 갖다 치우셔!!",
    movieTicket: "고런 종이 쪼가리로<br>뭘 하라는 거여?",
  },
};
