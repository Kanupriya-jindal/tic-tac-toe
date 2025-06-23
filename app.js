let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// 🆕 Score elements
let scoreXEl = document.querySelector("#score-x");
let scoreOEl = document.querySelector("#score-o");

let turnO = true; // true = O's turn, false = X's turn
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x-mark", "o-mark"); 
  });
};

const showWinner = (winner) => {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  isGameOver = true;

  if (winner === "X") {
    scoreX++;
    scoreXEl.textContent = `Player X: ${scoreX}`;
  } else if (winner === "O") {
    scoreO++;
    scoreOEl.textContent = `Player O: ${scoreO}`;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return;
    }
  }

  let isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw && !isGameOver) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    isGameOver = true;
  }
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!isGameOver && box.innerText === "") {
      const mark = turnO ? "O" : "X";
      box.innerText = mark;
      box.classList.add(mark === "O" ? "o-mark" : "x-mark");
      turnO = !turnO;
      checkWinner();
    }
  });
});

const resetGame = () => {
  turnO = true;
  isGameOver = false;
  enableBoxes();
  msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
