const TEMPLATE_ROWS = [
  "###############D####",
  "###########O-CRESOL#",
  "###############L####",
  "#######T#######O####",
  "#C6H4OHR#######C####",
  "####-##I#######A####",
  "####M##H#######L####",
  "####E#HYDROXYL#I####",
  "####T##D#######Z####",
  "MONOHYDROXYBENZENE##",
  "####Y##O#######D####",
  "ANKYL##X############",
  "####P##Y############",
  "####H##B############",
  "####E##E####P####R##",
  "##H#N##NHUOMHONG#E##",
  "##Y#O##Z####E####S##",
  "##D#L##E####NHUTUONG",
  "##R####N####O####L##",
  "#LONAHTE#P##L####C##",
  "##Q######R#######I##",
  "##U#####IOSODTEIHN##",
  "##I######T#####T#O##",
  "##N######E#####T#L##",
  "##O######I#####A####",
  "##N######N#####N####",
  "##E#################"
];

const ROWS = TEMPLATE_ROWS.length;
const COLS = TEMPLATE_ROWS[0].length;

function makeCells(row, col, text, dr, dc) {
  const cells = [];
  for (let i = 0; i < text.length; i += 1) {
    cells.push({ r: row + dr * i, c: col + dc * i, ch: text[i] });
  }
  return cells;
}

// Toa do: (r=0,c=0) o goc trai tren; r tang khi xuong, c tang khi sang phai.
const placedWords = [
  { id: "DELOCALIZED", key: "DELOCALIZED", cells: makeCells(0, 15, "DELOCALIZED", 1, 0) },
  { id: "C6H4OHR", key: "C6H4OHR", cells: makeCells(4, 1, "C6H4OHR", 0, 1) },
  { id: "TRIHYDROXYBENZENE", key: "TRIHYDROXYBENZENE", cells: makeCells(3, 7, "TRIHYDROXYBENZENE", 1, 0) },
  { id: "HYDROXYL", key: "HYDROXYL", cells: makeCells(7, 6, "HYDROXYL", 0, 1) },
  { id: "ETHANOL", key: "ETHANOL", cells: makeCells(19, 1, "LONAHTE", 0, 1) },
  { id: "NHUOMHONG", key: "NHUOMHONG", cells: makeCells(15, 7, "NHUOMHONG", 0, 1) },
  { id: "PHENOL", key: "PHENOL", cells: makeCells(14, 12, "PHENOL", 1, 0) },
  { id: "NHUTUONG", key: "NHUTUONG", cells: makeCells(17, 12, "NHUTUONG", 0, 1) },
  { id: "NHIETDOSOI", key: "NHIETDOSOI", cells: makeCells(21, 7, "IOSODTEIHN", 0, 1) },
  { id: "O-CRESOL", key: "O-CRESOL", cells: makeCells(1, 11, "O-CRESOL", 0, 1) },
  { id: "ANKYL", key: "ANKYL", cells: makeCells(11, 0, "ANKYL", 0, 1) },
  { id: "PROTEIN", key: "PROTEIN", cells: makeCells(19, 9, "PROTEIN", 1, 0) },
  { id: "MONOHYDROXYBENZENE", key: "MONOHYDROXYBENZENE", cells: makeCells(9, 0, "MONOHYDROXYBENZENE", 0, 1) },
  { id: "HYDROQUINONE", key: "HYDROQUINONE", cells: makeCells(15, 2, "HYDROQUINONE", 1, 0) },
  { id: "RESORCINOL", key: "RESORCINOL", cells: makeCells(14, 17, "RESORCINOL", 1, 0) },
  { id: "4-METHYLPHENOL", key: "4-METHYLPHENOL", cells: makeCells(4, 4, "4-METHYLPHENOL", 1, 0) },
  { id: "ITTAN", key: "ITTAN", cells: makeCells(21, 15, "ITTAN", 1, 0) }
];

// Cac cum chu bi khoa (tu hien san), click vao o khoa de mo theo diem doi dang luot.
// - yellow: can >= 30 diem
// - red: can >= 50 diem
const lockRules = [
  { id: "LOCK_O-CR", color: "yellow", minScore: 20, cells: makeCells(1, 11, "O-CR", 0, 1) },
  { id: "LOCK_SOL", color: "yellow", minScore: 20, cells: makeCells(1, 16, "SOL", 0, 1) },
  { id: "LOCK_ANKY", color: "yellow", minScore: 20, cells: makeCells(11, 0, "ANKY", 0, 1) },
  { id: "LOCK_TEIN", color: "yellow", minScore: 20, cells: makeCells(22, 9, "TEIN", 1, 0) },
  { id: "LOCK_PR", color: "yellow", minScore: 20, cells: makeCells(19, 9, "PR", 1, 0) },
  { id: "LOCK_MONO", color: "red", minScore: 30, cells: makeCells(9, 0, "MONO", 0, 1) },
  { id: "LOCK_YD", color: "red", minScore: 30, cells: makeCells(9, 5, "YD", 0, 1) },
  { id: "LOCK_OXYBENZ", color: "red", minScore: 30, cells: makeCells(9, 8, "OXYBENZ", 0, 1) },
  { id: "LOCK_NE", color: "red", minScore: 30, cells: makeCells(9, 16, "NE", 0, 1) },
  { id: "LOCK_HYDR", color: "yellow", minScore: 20, cells: makeCells(15, 2, "HYDR", 1, 0) },
  { id: "LOCK_QUINONE", color: "yellow", minScore: 20, cells: makeCells(20, 2, "QUINONE", 1, 0) },
  { id: "LOCK_RES", color: "red", minScore: 30, cells: makeCells(14, 17, "RES", 1, 0) },
  { id: "LOCK_LCINOL", color: "red", minScore: 30, cells: makeCells(18, 17, "LCINOL", 1, 0) },
  { id: "LOCK_-MET", color: "red", minScore: 30, cells: makeCells(5, 4, "-MET", 1, 0) },
  { id: "LOCK_Y", color: "red", minScore: 30, cells: makeCells(10, 4, "Y", 1, 0) },
  { id: "LOCK_PHENOL", color: "red", minScore: 30, cells: makeCells(12, 4, "PHENOL", 1, 0) },
  { id: "LOCK_TTAN", color: "yellow", minScore: 20, cells: makeCells(22, 15, "TTAN", 1, 0) }
];

const questions = [
  {
    key: "HYDROXYL",
    clue: "Điền vào chỗ trống: “Phenol là hợp chất hữu cơ trong đó nhóm _________ liên kết trực tiếp với nguyên tử carbon của vòng benzene.”"
  },
  {
    key: "TRIHYDROXYBENZENE",
    clue: "Phenol có 3 gốc OH- gắn quanh vòng benzen có tên gọi là gì?"
  },
  {
    key: "C6H4OHR",
    clue: "Nêu công thức tổng quát của phenol đơn chức mạch hở gắn vào vòng benzen. (Với R là gốc Ankyl)"
  },
  {
    key: "ETHANOL",
    clue: "Điền vào chỗ trống: “Khi da bị bỏng bởi tiếp xúc với Phenol, nên dùng bông thấm _________ để hòa tan Phenol ra khỏi da trước khi rửa lại bằng nước.”"
  },
  {
    key: "NHUOMHONG",
    clue: "Do tính oxi hoá chậm, khi để Phenol ngoài không khí lâu có thể gây hiện tượng gì?"
  },
  {
    key: "PHENOL",
    clue: "Sắp xếp các chữ cái để tạo thành từ có liên quan đến bài học: P / H / E / L / O / N"
  },
  {
    key: "NHUTUONG",
    clue: "Có một chỗ bị khuất trên bảng trên. Hãy điền vào chỗ trống 1 cụm từ thích hợp để giúp bạn học sinh hoàn thành bảng trên."
  },
  {
    key: "NHIETDOSOI",
    clue: "Điền vào chỗ trống: “____________ của Phenol cao do có liên kết hydrogen giữa các phân tử.”"
  },
  {
    key: "DELOCALIZED",
    clue: "Điền vào chỗ trống: “Khi nói về Phenol, một phần mật độ electron được ________(phân bố) vào vòng benzen, từ đó làm tăng mật độ electron ở các vị trí ortho và para.”"
  },
  {
    key: "O-CRESOL",
    clue: "Nhìn video để trả lời từ khóa",
    videoUrl:"o-cresol.mp4"
  },
  {
    key: "PROTEIN",
    clue: "Nhìn video để trả lời từ khóa"
  },
  {
    key: "MONOHYDROXYBENZENE",
    clue: "Nhìn video để trả lời từ khóa",
    videoUrl:"monohydroxybenzene.mp4"
  },
  {
    key: "HYDROQUINONE",
    clue: "Nhìn hình ảnh để trả lời từ khóa",
    imageUrl:"hydroquinone.jpg"
  },
  {
    key: "RESORCINOL",
    clue: "Nhìn hình ảnh để trả lời từ khóa",
    imageUrl:"resorcinol.jpg"
  },
  {
    key: "4-METHYLPHENOL",
    clue: "Nhìn video để trả lời từ khóa"
  },
  {
    key: "ITTAN",
    clue: "Nhìn video để trả lời từ khóa"
  },
  {
    key: "ANKYL",
    clue: "Chơi Roblox để trả lời từ khóa"
  }
];

const NHUTUONG_EXTRA_HTML = `
  <table class="q7-table">
    <thead>
      <tr>
        <th>Đặc điểm</th>
        <th>Trạng thái/ Giá trị</th>
        <th>Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Trạng thái</td>
        <td>Chất rắn, hình kim</td>
        <td>Có mùi đặc trưng</td>
      </tr>
      <tr>
        <td>Nhiệt độ nóng chảy</td>
        <td>43°C</td>
        <td>Khá thấp, dễ nóng chảy</td>
      </tr>
      <tr>
        <td>Độ tan trong nước (25°C)</td>
        <td>Ít tan</td>
        <td>Tạo _________ trắng đục</td>
      </tr>
      <tr>
        <td>Độ tan trong nước (> 66°C)</td>
        <td>Tan hoàn toàn</td>
        <td>Phá vỡ liên kết hydrogen liên phân tử</td>
      </tr>
    </tbody>
  </table>
`;

const yellowCells = new Set(["1,18", "9,11", "11,2", "14,4", "15,17", "22,2", "22,9", "24,15"]);

const grid = TEMPLATE_ROWS.map((row) => row.split(""));

function keyFor(r, c) {
  return `${r},${c}`;
}

const board = document.getElementById("board");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const statusEl = document.getElementById("status");
const turnStatusEl = document.getElementById("turnStatus");

const selectedQuestionEl = document.getElementById("selectedQuestion");
const submitAnswerBtn = document.getElementById("submitAnswerBtn");
const reopenQuestionBtn = document.getElementById("reopenQuestionBtn");
const switchTurnBtn = document.getElementById("switchTurnBtn");

const qModal = document.getElementById("q7Modal");
const qStartTimerBtn = document.getElementById("q7StartTimerBtn");
const qCloseBtn = document.getElementById("q7CloseBtn");
const qTimer = document.getElementById("q7Timer");
const qPromptTitle = document.getElementById("qPromptTitle");
const qPromptText = document.getElementById("qPromptText");
const qPromptExtra = document.getElementById("qPromptExtra");
const gameTimerEl = document.getElementById("gameTimer");
const gameResultEl = document.getElementById("gameResult");

const redScoreEl = document.getElementById("redScore");
const blueScoreEl = document.getElementById("blueScore");
const redMoneyEl = document.getElementById("redMoney");
const blueMoneyEl = document.getElementById("blueMoney");
const currentTeamEl = document.getElementById("currentTeam");
const teamRedCard = document.getElementById("teamRedCard");
const teamBlueCard = document.getElementById("teamBlueCard");
const scoreToolButtons = document.querySelectorAll("[data-score-action]");

board.style.gridTemplateColumns = `repeat(${COLS}, var(--cell))`;

let activeDirection = "across";
let activeTeam = "RED";
let selectedQuestionIndex = -1;
let lastOpenedQuestionKey = null;

const score = { RED: {points:0, money:0}, BLUE: {points:0, money:0} };
const solvedBy = {};
const revealedQuestionKeys = new Set();

const questionWordSet = new Set(questions.map((q) => q.key));
const hiddenCellSet = new Set();
const keyToPlacedWord = new Map();
const cellToQuestionKey = new Map();
const lockByCell = new Map();
const lockById = new Map();
const unlockedLockIds = new Set();
const lockedCells = new Set();
const intersectionCells = new Set();

let questionTimerId = null;
let questionRemain = 10;
let boardLockedByTimer = false;
const GAME_DURATION_SEC = 20*60;
let gameRemainSec = GAME_DURATION_SEC;
let gameTimerId = null;
let gameEnded = false;

for (const w of placedWords) {
  if (!w.key) continue;
  keyToPlacedWord.set(w.key, w);
  if (!questionWordSet.has(w.key)) continue;

  for (const cell of w.cells) {
    const k = keyFor(cell.r, cell.c);
    hiddenCellSet.add(k);
    if (!cellToQuestionKey.has(k)) {
      cellToQuestionKey.set(k, w.key);
    }
  }
}

for (const lock of lockRules) {
  lockById.set(lock.id, lock);
  for (const cell of lock.cells) {
    lockByCell.set(keyFor(cell.r, cell.c), lock.id);
  }
}

// Cells used by 2+ placed words are intersections: never render a lock there.
{
  const useCount = new Map();
  for (const w of placedWords) {
    for (const cell of w.cells) {
      const k = keyFor(cell.r, cell.c);
      useCount.set(k, (useCount.get(k) || 0) + 1);
    }
  }
  for (const [k, count] of useCount.entries()) {
    if (count > 1) intersectionCells.add(k);
  }
}

function moveFocus(cell, step = 1) {
  const r = Number(cell.dataset.row);
  const c = Number(cell.dataset.col);
  const nr = r + (activeDirection === "down" ? step : 0);
  const nc = c + (activeDirection === "across" ? step : 0);
  const next = board.querySelector(`[data-row="${nr}"][data-col="${nc}"]`);
  if (next && !next.classList.contains("block") && !next.readOnly) {
    next.focus();
  }
}

function getWordCells(w) {
  const cells = [];
  for (const cDef of w.cells) {
    const r = cDef.r;
    const c = cDef.c;
    const cell = board.querySelector(`[data-row="${r}"][data-col="${c}"]`);
    if (cell) cells.push(cell);
  }
  return cells;
}

function clearQuestionHighlight() {
  board.querySelectorAll(".cell.question-highlight").forEach((el) => {
    el.classList.remove("question-highlight");
  });
}

function highlightQuestionWord(key) {
  clearQuestionHighlight();
  const w = keyToPlacedWord.get(key);
  if (!w) return;
  getWordCells(w).forEach((cell) => {
    cell.classList.add("question-highlight");
  });
}
// 1. Lấy phần tử nút bấm
const forceEndBtn = document.getElementById("forceEndBtn");

// 2. Thêm sự kiện click
forceEndBtn.addEventListener("click", () => {
  if (gameEnded) return;
  
  if (confirm(`Bạn có chắc chắn muốn kết thúc trò chơi và cho đội ${activeTeam} thắng cuộc không?`)) {
    forceEndGame(activeTeam);
  }
});

// 3. Hàm xử lý kết thúc game cưỡng bức
function forceEndGame(winnerTeam) {
  gameEnded = true;
  
  // Dừng mọi đồng hồ
  if (gameTimerId) clearInterval(gameTimerId);
  closeQuestionModal();
  setBoardLocked(true);
  
  // Vô hiệu hóa các nút
  submitAnswerBtn.disabled = true;
  switchTurnBtn.disabled = true;
  checkBtn.disabled = true;
  forceEndBtn.disabled = true;

  // Hiển thị kết quả
  showWinnerModal(winnerTeam);
  const resultText = `Kết thúc! Đội ${winnerTeam} đã giành chiến thắng!`;
  gameResultEl.textContent = resultText;
  turnStatusEl.textContent = resultText;
}
function switchTeam() {
  activeTeam = activeTeam === "RED" ? "BLUE" : "RED";
  updateScoreUI();
}
function showWinnerModal(winnerTeam) {
  // Thay đổi tiêu đề và nội dung modal
  // 1. ẨN VIDEO TRƯỚC TIÊN
  const videoEl = document.getElementById("qPromptVideo");
  const videoSrcEl = document.getElementById("qPromptVideoSrc");
  if (videoEl) {
    try { videoEl.pause(); } catch {}
    videoEl.hidden = true;
  }
  if (videoSrcEl) {
    videoSrcEl.src = "";
  }
  if (videoEl) {
    try { videoEl.load(); } catch {}
  }

 
  qPromptTitle.textContent = "TRÒ CHƠI KẾT THÚC";
  qPromptText.innerHTML = `
    <div style="text-align: center; font-size: 24px; font-weight: bold;">
      Chúc mừng <span style="color: ${winnerTeam === 'RED' ? 'red' : 'blue'}">${winnerTeam}</span> đã giành chiến thắng!
    </div>
    <div style="margin-top: 20px;">
      <p>Tổng điểm đội ĐỎ: ${score.RED.points}$</p>
      <p>Tổng điểm đội XANH: ${score.BLUE.points}$</p>
    </div>
  `;
  
  // Ẩn các nút không cần thiết trong modal
  qPromptExtra.innerHTML = "";
  qStartTimerBtn.classList.add("hidden");
  qTimer.classList.add("hidden");
  
  // Hiển thị modal
  qModal.classList.remove("hidden");
}

function updateScoreUI() {
  redScoreEl.textContent = String(score.RED.points);
  blueScoreEl.textContent = String(score.BLUE.points);
  redMoneyEl.textContent = String(score.RED.money);
  blueMoneyEl.textContent = String(score.BLUE.money);
  currentTeamEl.textContent = activeTeam;
  teamRedCard.classList.toggle("active", activeTeam === "RED");
  teamBlueCard.classList.toggle("active", activeTeam === "BLUE");
}

function applyScoreTool(action, value) {
  if (gameEnded) return;
  if (action === "add") {
    score[activeTeam].money += value;
  } else if (action === "mul") {
    score[activeTeam].money *= value;
  } else if(action==="sub"){
    score[activeTeam].points -= value;
  }

  updateScoreUI();
  turnStatusEl.textContent = `Da cap nhat tien doi ${activeTeam}: ${score[activeTeam].money}.`;
}

function stopQuestionTimer() {
  if (questionTimerId) {
    clearInterval(questionTimerId);
    questionTimerId = null;
  }
}

function setQuestionTimerView() {
  qTimer.textContent = `${questionRemain}s`;
}

function setBoardLocked(locked) {
  boardLockedByTimer = locked;
  board.querySelectorAll("input.cell").forEach((cell) => {
    if (!cell.readOnly) {
      cell.disabled = locked;
    }
  });
}

function startQuestionTimer() {
  stopQuestionTimer();
  setBoardLocked(true);
  questionRemain = 0;
  setQuestionTimerView();
  questionTimerId = setInterval(() => {
    questionRemain -= 0;
    setQuestionTimerView();
    if (questionRemain <= -1) {
      stopQuestionTimer();
      turnStatusEl.textContent = "Hết 10 giây. Tự động đóng câu hỏi.";
      closeQuestionModal();
    }
  }, 1000);
}

function closeQuestionModal() {
  qModal.classList.add("hidden");
  stopQuestionTimer();
  setBoardLocked(false);
  questionRemain = 10;
  setQuestionTimerView();

  // Stop/hide media when closing.
  const videoEl = document.getElementById("qPromptVideo");
  const videoSrcEl = document.getElementById("qPromptVideoSrc");
  const imgEl = document.getElementById("qPromptImage");
  if (videoEl) {
    try { videoEl.pause(); } catch {}
    videoEl.hidden = true;
  }
  if (videoSrcEl) {
    videoSrcEl.src = "";
  }
  if (videoEl) {
    try { videoEl.load(); } catch {}
  }
  if (imgEl) {
    imgEl.hidden = true;
    imgEl.removeAttribute("src");
  }
}

function openQuestionModalForKey(key) {
  if (gameEnded) return;
  const idx = questions.findIndex((q) => q.key === key);
  if (idx < 0) return;
  const q = questions[idx];
  lastOpenedQuestionKey = key;
  revealedQuestionKeys.add(key);

  selectedQuestionIndex = idx;
  selectedQuestionEl.textContent = `Đang chọn Câu ${idx + 1}. Điền đáp án trên bảng rồi bấm Trả lời câu đang chọn.`;

  qPromptTitle.textContent = `Câu ${idx + 1}`;
  qPromptText.textContent = q.clue;
  qPromptExtra.innerHTML = q.key === "NHUTUONG" ? NHUTUONG_EXTRA_HTML : "";

  // Media rules:
  // - Only show video when q.videoUrl exists
  // - Otherwise show image if q.imageUrl exists
  // - Otherwise show only the question text/table
  const videoEl = document.getElementById("qPromptVideo");
  const videoSrcEl = document.getElementById("qPromptVideoSrc");
  const imgEl = document.getElementById("qPromptImage");

  if (videoEl) {
    try { videoEl.pause(); } catch {}
    videoEl.hidden = true;
  }
  if (videoSrcEl) videoSrcEl.src = "";
  if (imgEl) {
    imgEl.hidden = true;
    imgEl.removeAttribute("src");
  }

  if (q.videoUrl && videoEl && videoSrcEl) {
    videoSrcEl.src = q.videoUrl;
    try { videoEl.load(); } catch {}
    videoEl.hidden = false;
  } else if (q.imageUrl && imgEl) {
    imgEl.src = q.imageUrl;
    imgEl.hidden = false;
  }

  highlightQuestionWord(q.key);
  qModal.classList.remove("hidden");
  startQuestionTimer();
}

function tryUnlock(lockId) {
  if (gameEnded) return;
  if (unlockedLockIds.has(lockId)) return;
  const lock = lockById.get(lockId);
  if (!lock) return;

  const teamScore = score[activeTeam].money;
  if (teamScore < lock.minScore) {
    turnStatusEl.textContent = `Doi ${activeTeam} can it nhat ${lock.minScore} diem de mo o khoa ${lock.color}.`;
    return;
  }
  score[activeTeam].money -= lock.minScore;
  unlockedLockIds.add(lockId);
  renderBoard();
  highlightQuestionWord(questions[selectedQuestionIndex]?.key || "");
  
  turnStatusEl.textContent = `Doi ${activeTeam} da mo thanh cong mot cum o khoa ${lock.color}.`;
  updateScoreUI();
}

function formatTime(totalSec) {
  const mm = Math.floor(totalSec / 60);
  const ss = totalSec % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function endGameByTime() {
  gameEnded = true;
  if (gameTimerId) {
    clearInterval(gameTimerId);
    gameTimerId = null;
  }

  closeQuestionModal();
  setBoardLocked(true);
  submitAnswerBtn.disabled = true;
  switchTurnBtn.disabled = true;
  checkBtn.disabled = true;

  let resultText = "Kết quả: Hòa";
  if (score.RED.points > score.BLUE.points) {
    const winner = "RED";
    showWinnerModal(winner);
    resultText = "Kết quả: RED thắng";
  } else if (score.BLUE.points > score.RED.points) {
    const winner = "BLUE";
    showWinnerModal(winner);
    resultText = "Kết quả: BLUE thắng";
  }


  gameResultEl.textContent = resultText;
  turnStatusEl.textContent = `${resultText} (RED ${score.RED.points} - BLUE ${score.BLUE.points}).`;
}

function startGameTimer() {
  gameRemainSec = GAME_DURATION_SEC;
  gameTimerEl.textContent = formatTime(gameRemainSec);
  gameResultEl.textContent = "";

  if (gameTimerId) {
    clearInterval(gameTimerId);
  }

  gameTimerId = setInterval(() => {
    gameRemainSec -= 1;
    gameTimerEl.textContent = formatTime(Math.max(0, gameRemainSec));
    if (gameRemainSec <= 0) {
      endGameByTime();
    }
  }, 1000);
}

function renderBoard() {
  // 1. Lưu dữ liệu ô cũ vào một Object tạm
  const inputs = board.querySelectorAll("input.cell");
  const oldValues = {};
  inputs.forEach(inp => {
    oldValues[`${inp.dataset.row}-${inp.dataset.col}`] = inp.value;
  });

  board.innerHTML = "";
  const fragment = document.createDocumentFragment();

  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const solution = grid[r][c];

      if (solution === "#") {
        const block = document.createElement("div");
        block.className = "cell block";
        fragment.appendChild(block);
        continue;
      }

      const input = document.createElement("input");
      input.className = "cell";
      input.maxLength = 1;
      input.dataset.row = String(r);
      input.dataset.col = String(c);
      input.dataset.solution = solution;
      input.setAttribute("aria-label", `Cell ${r + 1}-${c + 1}`);
      const key = `${r}-${c}`;
      // Never persist the lock icon across renders. Otherwise after unlocking,
      // the cell may incorrectly stay as "🔒" because we restore oldValues first.
      const prevVal = oldValues[key];
      if (prevVal && prevVal !== "🔒") {
        input.value = prevVal;
      }
      
      // Kiểm tra khóa
      if(lockedCells.has(`${r}-${c}`)) {
          input.readOnly = true;
      }
    

      if (yellowCells.has(keyFor(r, c))) {
        input.classList.add("yellow");
      }

      const cellKey = keyFor(r, c);
      const lockId = lockByCell.get(cellKey);
      if (
        lockId &&
        !unlockedLockIds.has(lockId) &&
        !lockedCells.has(`${r}-${c}`) &&
        !intersectionCells.has(cellKey)
      ) {
        const lock = lockById.get(lockId);
        input.value = "🔒";
        input.readOnly = true;
        input.classList.add("lock-cell");
        input.classList.add(lock.color === "red" ? "lock-red" : "lock-yellow");
      } else
      if (!hiddenCellSet.has(cellKey)) {
        input.value = "";
        input.readOnly = false;
        input.classList.remove("lock-cell", "lock-red", "lock-yellow");

        input.classList.add("fixed");
        input.value = "";
      }

      input.addEventListener("click", () => {
        
        if (document.activeElement === input) {
          activeDirection = activeDirection === "across" ? "down" : "across";
        }

        const qKey = cellToQuestionKey.get(cellKey);
        const clickedLockId = lockByCell.get(cellKey);
        if (
          clickedLockId &&
          !unlockedLockIds.has(clickedLockId) &&
          !intersectionCells.has(cellKey)
        ) {
          tryUnlock(clickedLockId);
          return;
        }
        if (
          qKey &&
          !boardLockedByTimer &&
          !revealedQuestionKeys.has(qKey) &&
          !solvedBy[qKey]
        ) {
          openQuestionModalForKey(qKey);
        }
      });

      input.addEventListener("input", () => {
        input.value = input.value
          .replace(/[^a-z0-9-]/gi, "")
          .toUpperCase()
          .slice(-1);
        input.classList.remove("bad", "good");
        if (input.value) moveFocus(input, 1);
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          activeDirection = "across";
          moveFocus(input, 1);
          e.preventDefault();
        }
        if (e.key === "ArrowLeft") {
          activeDirection = "across";
          moveFocus(input, -1);
          e.preventDefault();
        }
        if (e.key === "ArrowDown") {
          activeDirection = "down";
          moveFocus(input, 1);
          e.preventDefault();
        }
        if (e.key === "ArrowUp") {
          activeDirection = "down";
          moveFocus(input, -1);
          e.preventDefault();
        }
      });

      fragment.appendChild(input);
    }
  }

  board.appendChild(fragment);
}

function clearMarks() {
  board.querySelectorAll(".cell.bad, .cell.good").forEach((el) => {
    el.classList.remove("bad", "good");
  });
}

checkBtn.addEventListener("click", () => {
  let wrong = 0;
  let empty = 0;
  clearMarks();

  board.querySelectorAll("input.cell").forEach((cell) => {
    if (cell.readOnly) return;
    const val = cell.value.toUpperCase();
    const sol = cell.dataset.solution;
    if (!val) {
      empty += 1;
      return;
    }
    if (val !== sol) {
      wrong += 1;
      cell.classList.add("bad");
    } else {
      cell.classList.add("good");
      cell.readOnly = true;
      //cell.dataset.locked="true";
      lockedCells.add(`${cell.dataset.row}-${cell.dataset.col}`);
    }
  });

  statusEl.textContent = wrong === 0 && empty === 0
    ? "Chinh xac! Ban da hoan thanh o chu."
    : `Sai: ${wrong} | Trong: ${empty}`;
});

resetBtn.addEventListener("click", () => {
  board.querySelectorAll("input.cell").forEach((cell) => {
    if (!cell.readOnly) cell.value = "";
    cell.classList.remove("bad", "good");
  });
  clearQuestionHighlight();
  unlockedLockIds.clear();
  revealedQuestionKeys.clear();
  lastOpenedQuestionKey = null;
  selectedQuestionIndex = -1;
  selectedQuestionEl.textContent = "Chưa chọn câu nào. Bấm vào ô chữ để mở câu hỏi theo lượt đội đang chơi.";
  statusEl.textContent = "Da reset grid. Nhap lai dap an.";
});

submitAnswerBtn.addEventListener("click", () => {
  if (gameEnded) {
    turnStatusEl.textContent = "Da het thoi gian, khong the tra loi them.";
    return;
  }
  if (selectedQuestionIndex < 0) {
    turnStatusEl.textContent = "Hay bam vao o chu tu khoa de mo cau hoi truoc.";
    return;
  }

  const q = questions[selectedQuestionIndex];
  if (solvedBy[q.key]) {
    turnStatusEl.textContent = `Cau nay da duoc doi ${solvedBy[q.key]} ghi diem.`;
    return;
  }

  const w = keyToPlacedWord.get(q.key);
  if (!w) {
    turnStatusEl.textContent = "Khong tim thay tu khoa tren luoi hien tai.";
    return;
  }

  const cells = getWordCells(w);
  let isCorrect = true;

  cells.forEach((cell, idx) => {
    const typed = (cell.value || "").toUpperCase();
    const expected = w.cells[idx].ch.toUpperCase();
    if (typed !== expected) {
      isCorrect = false;
      if (!cell.readOnly) cell.classList.add("bad");
    } else {
      cell.classList.remove("bad");
      cell.classList.add("good");
      cell.readOnly = true;
    }
  });

  if (isCorrect) {
    solvedBy[q.key] = activeTeam;
    score[activeTeam].points += 10;
    turnStatusEl.textContent = `Dung! Doi ${activeTeam} +10 diem cho Cau ${selectedQuestionIndex + 1}.`;
    updateScoreUI();
    closeQuestionModal();
    return;
  }

  const oldTeam = activeTeam;
  switchTeam();
  turnStatusEl.textContent = `Sai! Đội ${oldTeam} mất lượt. Chuyển quyền trả lời cho đội ${activeTeam}.`;
});

switchTurnBtn.addEventListener("click", () => {
  if (gameEnded) return;
  switchTeam();
  turnStatusEl.textContent = `Đã chuyển lượt, hiện tại là đội ${activeTeam}.`;
});

scoreToolButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.scoreAction;
    const value = Number(btn.dataset.scoreValue || 0);
    if (!action || !value) return;
    applyScoreTool(action, value);
  });
});

reopenQuestionBtn.addEventListener("click", () => {
  if (!lastOpenedQuestionKey) {
    turnStatusEl.textContent = "Chua co cau hoi nao duoc mo truoc do.";
    return;
  }
  openQuestionModalForKey(lastOpenedQuestionKey);
});

qStartTimerBtn.addEventListener("click", startQuestionTimer);
qCloseBtn.addEventListener("click", closeQuestionModal);
qModal.addEventListener("click", (e) => {
  if (e.target === qModal) {
    closeQuestionModal();
  }
});

renderBoard();
updateScoreUI();
setQuestionTimerView();
startGameTimer();
