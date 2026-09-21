// Requires dialogue.js to be loaded first (see index.html) — all narrative
// text lives there as the global DIALOGUE object; this file is game logic only.
window.onload = function () {
  localStorage.setItem("noteInfo", DIALOGUE.noteInfo);

  // ---------- Element refs ----------
  const startBtn = document.querySelectorAll(".introMenu")[0];
  const helpBtn = document.querySelectorAll(".introMenu")[1];
  const introWindow = document.querySelector("#introWindow");
  const startWindow = document.querySelector("#startWindow");
  const gameWindow = document.querySelector("#gameWindow");
  const game = document.querySelector("#game");
  const locationPanel = document.querySelector("#location");
  const modal = document.querySelector("#modal");
  const closeBtn = document.querySelector(".close");
  const modalMes = document.querySelector("#modalMessage");
  const whiteModal = document.querySelector("#whiteModal");

  const startMain = document.querySelector("#startMain");
  const startDia = document.querySelector("#startDialogue");
  const storyOpt = document.querySelector("#storyOpt");
  const nextBtn = document.querySelector("#next");
  const gameMenu = document.querySelector("#gameMenu");
  const nameInput = document.querySelector("#name");

  const story = document.querySelector("#story");
  const storyDia = document.querySelector("#storyDialogue");
  const opt1 = document.querySelectorAll(".sOpt")[0];
  const opt2 = document.querySelectorAll(".sOpt")[1];
  const opt3 = document.querySelectorAll(".sOpt")[2];
  const storyBtn = document.querySelector("#storyNext");
  const optBox1 = document.querySelector("#optBox1");
  const optBox2 = document.querySelector("#optBox2");
  const place = document.querySelector("#place");
  const HP = document.querySelector("#HP");
  const condition = document.querySelector("#condition");

  const itemBox = document.querySelector("#itemBox");
  const itemInfo = document.querySelector("#itemInfo");
  const detailInfo = document.querySelector("#detailInfo");

  const moveBtn = document.getElementsByClassName("gameOpt")[0];
  const itemBtn = document.getElementsByClassName("gameOpt")[1];
  const restBtn = document.getElementsByClassName("gameOpt")[2];
  const homeBtn = document.getElementsByClassName("gameOpt")[3];

  const mainPlaza = document.querySelectorAll(".loc")[0];
  const democracyPlaza = document.querySelectorAll(".loc")[1];

  // ---------- Small helpers ----------
  function myDia(el) {
    el.style.color = "blue";
    el.style.fontWeight = "bold";
  }
  function dia(el) {
    el.style.color = "black";
    el.style.fontWeight = "normal";
  }
  function showModal(html) {
    modal.style.zIndex = "1";
    modalMes.innerHTML = html;
  }
  function box1Close(a, b) {
    a.style.display = "none";
    b.style.display = "block";
  }
  function box2Close(a, b) {
    a.style.display = "flex";
    b.style.display = "none";
  }
  function screenChange(modalEl, from, to) {
    modalEl.style.zIndex = "1";
    modalEl.style.opacity = "1";
    modalEl.style.transition = "1.5s";
    setTimeout(function () {
      modalEl.style.zIndex = "-1";
      modalEl.style.opacity = "0";
      from.style.display = "none";
      to.style.display = "block";
    }, 1500);
  }
  function getJsonSet2() {
    let json = JSON.parse(localStorage.getItem("jsonSet2") || "null");
    if (!json) {
      json = { opt_1: DIALOGUE.locations.민주광장.opt_1, opt_2: DIALOGUE.locations.민주광장.opt_2 };
      localStorage.setItem("jsonSet2", JSON.stringify(json));
    }
    return json;
  }

  // ================= Inventory (도구함) =================
  const ITEM_DEFS = DIALOGUE.items;
  const TRASH_ORDER = ["meat", "bead", "movieTicket"];

  function getInventory() {
    return JSON.parse(localStorage.getItem("inventory") || "[]");
  }
  function setInventory(items) {
    localStorage.setItem("inventory", JSON.stringify(items));
  }
  function addItem(id) {
    const inv = getInventory();
    if (!inv.includes(id)) inv.push(id);
    setInventory(inv);
    renderInventory();
  }
  function removeItem(id) {
    setInventory(getInventory().filter((item) => item !== id));
    renderInventory();
  }
  function renderInventory() {
    const inv = getInventory();
    const cells = itemBox.querySelectorAll(".th");
    cells.forEach((cell, idx) => {
      const id = inv[idx];
      if (id) {
        cell.style.backgroundImage = `url(${ITEM_DEFS[id].image})`;
        cell.dataset.itemId = id;
      } else {
        cell.style.backgroundImage = "";
        delete cell.dataset.itemId;
      }
    });
  }
  itemBox.addEventListener("click", function (e) {
    const cell = e.target.closest(".th");
    if (!cell || !cell.dataset.itemId) return;
    const info = ITEM_DEFS[cell.dataset.itemId].info;
    detailInfo.innerHTML = typeof info === "function" ? info() : info;
  });

  // Migrate an already-obtained note (from before the inventory system existed)
  // into the inventory array, then draw whatever is currently stored.
  if (localStorage.getItem("note") === "get" && !getInventory().includes("note")) {
    setInventory([...getInventory(), "note"]);
  }
  renderInventory();

  // ================= Dynamic option lists (item pickers, trades) =================
  // Temporarily repurposes the opt1/opt2/opt3 buttons to present up to three
  // custom choices (used for trash picking and offering items to the magpie).
  let dynamicOptions = null;
  opt3.style.display = "none";

  function showDynamicOptions(items) {
    dynamicOptions = items;
    [opt1, opt2, opt3].forEach((el, i) => {
      if (items[i]) {
        el.innerText = items[i].label;
        el.style.display = "";
      } else {
        el.innerText = "";
        el.style.display = "none";
      }
    });
    box2Close(optBox1, optBox2);
  }
  function clearDynamicOptions() {
    dynamicOptions = null;
    opt1.style.display = "";
    opt2.style.display = "";
    opt3.style.display = "none";
  }
  function handleOptSelect(index) {
    if (!dynamicOptions) return false;
    const item = dynamicOptions[index];
    if (item) item.onSelect();
    return true;
  }
  opt3.addEventListener("click", function () {
    handleOptSelect(2);
  });

  helpBtn.addEventListener("click", function () {
    showModal(DIALOGUE.ui.helpText);
  });
  closeBtn.addEventListener("click", function () {
    modal.style.zIndex = "-1";
  });

  // ================= Intro dialogue (data-driven) =================
  const introSteps = DIALOGUE.intro;
  let introIndex = 0;

  function applyIntroStep(step) {
    if (step.style === "my") myDia(startDia);
    else if (step.style === "other") dia(startDia);
    startDia.innerHTML = typeof step.text === "function" ? step.text(localStorage.getItem("name")) : step.text;
    if (step.bg !== undefined) startMain.style.backgroundImage = step.bg ? `url(${step.bg})` : "";
    if (step.showInput) nameInput.style.display = "block";
    if (step.hideInput) nameInput.style.display = "none";
  }

  startBtn.addEventListener("click", function () {
    if (localStorage.getItem("name") !== null) {
      if (localStorage.getItem("note") !== "get") {
        gameMenu.style.zIndex = "-1";
      }
      screenChange(whiteModal, introWindow, gameWindow);
      document.getElementById("userName").innerText = localStorage.getItem("name");
    } else {
      screenChange(whiteModal, introWindow, startWindow);
    }
  });

  nextBtn.addEventListener("click", function () {
    const current = introSteps[introIndex];
    if (current.final) {
      screenChange(whiteModal, startWindow, gameWindow);
      document.querySelector("#userName").innerText = localStorage.getItem("name");
      gameMenu.style.zIndex = "-1";
      return;
    }

    const next = introSteps[introIndex + 1];
    if (next.requiresName) {
      const name = nameInput.value.trim();
      if (!name) {
        alert(DIALOGUE.ui.nameRequired);
        return;
      }
      localStorage.setItem("name", name);
    }

    introIndex++;
    applyIntroStep(next);
  });

  // ================= In-game story dialogue chains =================
  // A "chain" is an array of steps. The last step has `final: true` and a
  // `complete()` callback that runs any side effects and returns to the menu.
  // The displayed steps themselves come from DIALOGUE.chains.*; only the
  // final step (the logic) is defined here.
  let currentChain = null;
  let chainIndex = 0;
  // Reset whenever the player (re)arrives at 민주광장 — see movePlayer/democracyPlaza below.
  let magpieAskedThisVisit = false;
  let trashDugThisVisit = false;

  function applyChainStep(step) {
    if (step.style === "my") myDia(storyDia);
    else if (step.style === "other") dia(storyDia);
    if (step.color) {
      storyDia.style.color = step.color;
      storyDia.style.fontWeight = "normal";
    }
    storyDia.innerHTML = step.text;
    if (step.bg !== undefined) story.style.backgroundImage = step.bg ? `url(${step.bg})` : "";
  }
  function setChain(chain) {
    currentChain = chain;
    chainIndex = 0;
    applyChainStep(chain[0]);
  }
  function advanceChain() {
    if (!currentChain) return;
    const next = currentChain[chainIndex + 1];
    if (next.final) {
      next.complete();
      currentChain = null;
      return;
    }
    chainIndex++;
    applyChainStep(next);
  }
  function backToMenu() {
    dia(storyDia);
    storyDia.innerHTML = DIALOGUE.ui.menuPrompt;
    box2Close(optBox1, optBox2);
  }

  // --- 중앙광장 chains ---
  const chainCentralIdle = [...DIALOGUE.chains.centralIdle, { final: true, complete: backToMenu }];
  const chainCentralExplore = [
    ...DIALOGUE.chains.centralExplore,
    {
      final: true,
      complete: () => {
        localStorage.setItem("note", "get");
        addItem("note");
        backToMenu();
        gameMenu.style.zIndex = "0";
      },
    },
  ];
  const chainCentralExploreDone = [...DIALOGUE.chains.centralExploreDone, { final: true, complete: backToMenu }];

  // --- 민주광장 chains ---
  const chainDemocracyWander = [
    ...DIALOGUE.chains.democracyWander,
    {
      final: true,
      complete: () => {
        localStorage.setItem("quest_findRing", "on");
        const json = getJsonSet2();
        json.opt_1 = DIALOGUE.locations.민주광장.opt_1_asking;
        localStorage.setItem("jsonSet2", JSON.stringify(json));
        storyDia.innerHTML = DIALOGUE.ui.menuPrompt;
        opt1.innerText = DIALOGUE.locations.민주광장.opt_1_asking;
        box2Close(optBox1, optBox2);
        story.style.backgroundImage = "";
      },
    },
  ];
  const chainDemocracyWaiting = [
    ...DIALOGUE.chains.democracyWaiting,
    {
      final: true,
      complete: () => {
        storyDia.innerHTML = DIALOGUE.ui.menuPrompt;
        box2Close(optBox1, optBox2);
        story.style.backgroundImage = "";
      },
    },
  ];

  // --- 민주광장 쓰레기통 뒤지기 ---
  function getTrashTaken() {
    return JSON.parse(localStorage.getItem("trashTaken") || "[]");
  }
  function setTrashTaken(items) {
    localStorage.setItem("trashTaken", JSON.stringify(items));
  }
  function getTrashRemaining() {
    const taken = getTrashTaken();
    return TRASH_ORDER.filter((id) => !taken.includes(id));
  }
  function pickTrashItem(id) {
    clearDynamicOptions();
    setTrashTaken([...getTrashTaken(), id]);
    addItem(id);
    backToMenu();
    renderDemocracyOptions();
  }
  function digTrashDirect(remaining) {
    dia(storyDia);
    storyDia.innerHTML = DIALOGUE.ui.trashPickPrompt;
    showDynamicOptions(remaining.map((id) => ({ label: ITEM_DEFS[id].label, onSelect: () => pickTrashItem(id) })));
  }
  const chainTrashFlavorOnly = [...DIALOGUE.chains.trashFlavorOnly, { final: true, complete: backToMenu }];
  const chainTrashEmpty = [...DIALOGUE.chains.trashEmpty, { final: true, complete: backToMenu }];
  function buildTrashDigChainWithFlavor(remaining) {
    return [...DIALOGUE.chains.trashFlavorOnly, { final: true, complete: () => digTrashDirect(remaining) }];
  }

  // --- 민주광장 까치에게 물건 주기 ---
  function offerItemToMagpie(id) {
    clearDynamicOptions();
    box1Close(optBox1, optBox2);
    if (id === "bead") {
      setChain(chainOfferBead);
    } else if (DIALOGUE.offerRejected[id]) {
      setChain(chainOfferRejected(DIALOGUE.offerRejected[id]));
    }
  }
  function chainOfferRejected(message) {
    return [
      { style: "other", text: message },
      {
        final: true,
        complete: () => {
          backToMenu();
          story.style.backgroundImage = "";
          renderDemocracyOptions();
        },
      },
    ];
  }
  const chainOfferBead = [
    ...DIALOGUE.chains.offerBead,
    {
      final: true,
      complete: () => {
        removeItem("bead");
        addItem("ring");
        localStorage.setItem("quest_findRing", "done");
        backToMenu();
        story.style.backgroundImage = "";
        renderDemocracyOptions();
      },
    },
  ];
  function showMagpieOffer(heldItems) {
    story.style.backgroundImage = "url(images/magpie.png)";
    dia(storyDia);
    storyDia.innerHTML = DIALOGUE.ui.magpieOfferPrompt;
    showDynamicOptions(heldItems.map((id) => ({ label: ITEM_DEFS[id].label, onSelect: () => offerItemToMagpie(id) })));
  }

  // Sets opt1/opt2's labels (or hides opt1 entirely once the quest is done) for 민주광장.
  function renderDemocracyOptions() {
    if (localStorage.getItem("quest_findRing") === "done") {
      opt1.style.display = "none";
      opt2.innerText = DIALOGUE.locations.민주광장.opt_2;
    } else {
      opt1.style.display = "";
      const json = getJsonSet2();
      opt1.innerText = json.opt_1;
      opt2.innerText = json.opt_2;
    }
  }

  opt1.addEventListener("click", function () {
    if (handleOptSelect(0)) return;
    if (storyDia.innerHTML !== DIALOGUE.ui.menuPrompt) return;
    switch (place.innerText) {
      case "중앙광장":
        setChain(chainCentralIdle);
        box1Close(optBox1, optBox2);
        break;
      case "민주광장": {
        magpieAskedThisVisit = true;
        const quest = localStorage.getItem("quest_findRing");
        if (quest === "on") {
          const held = getInventory().filter((id) => TRASH_ORDER.includes(id));
          if (held.length > 0) {
            showMagpieOffer(held);
          } else {
            setChain(chainDemocracyWaiting);
            box1Close(optBox1, optBox2);
          }
        } else if (quest !== "done") {
          setChain(chainDemocracyWander);
          box1Close(optBox1, optBox2);
        }
        break;
      }
    }
  });

  opt2.addEventListener("click", function () {
    if (handleOptSelect(1)) return;
    if (storyDia.innerHTML !== DIALOGUE.ui.menuPrompt) return;
    switch (place.innerText) {
      case "중앙광장":
        if (localStorage.getItem("note") !== "get") {
          setChain(chainCentralExplore);
        } else {
          setChain(chainCentralExploreDone);
        }
        box1Close(optBox1, optBox2);
        break;
      case "민주광장": {
        const remaining = getTrashRemaining();
        if (remaining.length === 0) {
          setChain(chainTrashEmpty);
          box1Close(optBox1, optBox2);
        } else if (!magpieAskedThisVisit) {
          setChain(chainTrashFlavorOnly);
          box1Close(optBox1, optBox2);
        } else if (!trashDugThisVisit) {
          trashDugThisVisit = true;
          setChain(buildTrashDigChainWithFlavor(remaining));
          box1Close(optBox1, optBox2);
        } else {
          digTrashDirect(remaining);
        }
        break;
      }
    }
  });

  storyBtn.addEventListener("click", function () {
    if (storyDia.innerHTML === DIALOGUE.ui.restDone) {
      backToMenu();
      return;
    }
    if (storyDia.innerHTML === DIALOGUE.ui.fainted) {
      storyDia.innerHTML = DIALOGUE.ui.respawnPrompt;
      return;
    }
    if (storyDia.innerHTML === DIALOGUE.ui.respawnPrompt) {
      screenChange(whiteModal, introWindow, gameWindow);
      setTimeout(function () {
        HP.innerText = "100";
        place.innerText = "중앙광장";
        gameMenu.style.zIndex = "0";
        storyDia.innerHTML = DIALOGUE.ui.menuPrompt;
        box2Close(optBox1, optBox2);
        opt1.innerText = DIALOGUE.locations.중앙광장.opt_1;
        opt2.innerText = DIALOGUE.locations.중앙광장.opt_2;
      }, 1500);
      return;
    }
    advanceChain();
  });

  // ================= Item box / menu toggling =================
  function showStory() {
    story.style.display = "flex";
    storyOpt.style.display = "block";
    itemBox.style.display = "none";
    itemInfo.style.display = "none";
    detailInfo.innerHTML = "";
  }
  function showItemBox() {
    locationPanel.style.display = "none";
    game.style.display = "block";
    story.style.display = "none";
    storyOpt.style.display = "none";
    itemBox.style.display = "block";
    itemInfo.style.display = "flex";
  }

  moveBtn.addEventListener("click", function () {
    if (restInterval) return;
    const showingLocation = locationPanel.style.display === "flex";
    locationPanel.style.display = showingLocation ? "none" : "flex";
    game.style.display = showingLocation ? "block" : "none";
  });

  itemBtn.addEventListener("click", function () {
    if (restInterval) return;
    if (game.style.display !== "none" && itemBox.style.display === "block") {
      showStory();
    } else {
      showItemBox();
    }
  });

  // ================= Resting (휴식하기) =================
  // Rest is time-based (an end timestamp in localStorage), not a plain
  // in-memory countdown, so it survives going back to the main screen or
  // even a full page reload.
  let restInterval = null;
  const REST_DURATION_MS = 60 * 1000;

  function cancelResting() {
    if (restInterval) {
      clearInterval(restInterval);
      restInterval = null;
    }
  }
  function formatTime(totalSeconds) {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }
  function getRestEndTime() {
    const v = localStorage.getItem("restEndTime");
    return v ? parseInt(v, 10) : null;
  }
  function finishResting() {
    cancelResting();
    localStorage.removeItem("restEndTime");
    HP.innerText = "100";
    localStorage.setItem("HP", "100");
    storyDia.innerHTML = DIALOGUE.ui.restDone;
    optBox1.style.display = "none";
    optBox2.style.display = "block";
  }
  function tickResting() {
    const end = getRestEndTime();
    const remaining = end ? Math.ceil((end - Date.now()) / 1000) : 0;
    if (remaining > 0) {
      storyDia.innerHTML = `${DIALOGUE.ui.restingLabel}<br>${formatTime(remaining)}`;
    } else {
      finishResting();
    }
  }
  // Puts the screen into "resting" mode and (re)starts the ticking interval,
  // based on whatever end time is currently stored. Used both to start a
  // fresh rest and to resume one after a reload/navigation.
  function enterResting() {
    currentChain = null;
    clearDynamicOptions();
    dia(storyDia);
    optBox1.style.display = "none";
    optBox2.style.display = "none";
    cancelResting();
    tickResting();
    if (getRestEndTime()) {
      restInterval = setInterval(tickResting, 1000);
    }
  }
  function startResting() {
    localStorage.setItem("restEndTime", String(Date.now() + REST_DURATION_MS));
    enterResting();
  }

  restBtn.addEventListener("click", function () {
    if (restInterval) return;
    if (condition.innerText !== "정상") {
      showModal(DIALOGUE.ui.restBadCondition);
    } else if (HP.innerText === "100") {
      showModal(DIALOGUE.ui.restFull);
    } else {
      startResting();
    }
  });

  homeBtn.addEventListener("click", function () {
    screenChange(whiteModal, gameWindow, introWindow);
  });

  // ================= Movement between locations =================
  function gameOver() {
    cancelResting();
    localStorage.removeItem("restEndTime");
    clearDynamicOptions();
    magpieAskedThisVisit = false;
    trashDugThisVisit = false;
    HP.innerText = "0";
    gameMenu.style.zIndex = "-1";
    dia(storyDia);
    storyDia.innerHTML = DIALOGUE.ui.fainted;
    box1Close(optBox1, optBox2);
    localStorage.setItem("location", "중앙광장");
    localStorage.setItem("HP", "100");
    localStorage.removeItem("jsonSet2");
    localStorage.removeItem("quest_findRing");
    currentChain = null;
  }

  function movePlayer(newPlace, onArrive) {
    if (place.innerText === newPlace) {
      showModal(DIALOGUE.ui.alreadyAt(newPlace));
      return;
    }
    cancelResting();
    clearDynamicOptions();
    showStory();

    const hp = parseInt(HP.innerText, 10);
    place.innerText = newPlace;
    if (hp < 15) {
      locationPanel.style.display = "none";
      game.style.display = "block";
      gameOver();
      return;
    }

    localStorage.setItem("location", newPlace);
    HP.innerText = hp - 15;
    localStorage.setItem("HP", HP.innerText);
    locationPanel.style.display = "none";
    game.style.display = "block";
    dia(storyDia);
    storyDia.innerHTML = DIALOGUE.ui.menuPrompt;
    box2Close(optBox1, optBox2);
    onArrive();
  }

  mainPlaza.addEventListener("click", function () {
    movePlayer("중앙광장", () => {
      opt1.innerText = DIALOGUE.locations.중앙광장.opt_1;
      opt2.innerText = DIALOGUE.locations.중앙광장.opt_2;
    });
  });

  democracyPlaza.addEventListener("click", function () {
    movePlayer("민주광장", () => {
      magpieAskedThisVisit = false;
      trashDugThisVisit = false;
      renderDemocracyOptions();
    });
  });

  // ================= Initial state restore =================
  const savedLocation = localStorage.getItem("location");

  if (savedLocation === "민주광장") {
    place.innerText = savedLocation;
    magpieAskedThisVisit = false;
    trashDugThisVisit = false;
    renderDemocracyOptions();
  } else {
    place.innerText = savedLocation || "중앙광장";
    opt1.innerText = DIALOGUE.locations.중앙광장.opt_1;
    opt2.innerText = DIALOGUE.locations.중앙광장.opt_2;
  }

  HP.innerText = localStorage.getItem("HP") || "100";

  // If a rest was in progress before this page load (or the player went
  // home and came back), pick it back up — finishing it immediately if the
  // full minute already elapsed while they were away.
  if (getRestEndTime()) {
    enterResting();
  }
};