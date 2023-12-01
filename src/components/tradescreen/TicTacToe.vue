<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const emit = defineEmits(['next']);

const changeToeToRoll = (winner: string) => {
  emit('next', winner);
};

const player = ref("X");
const computer = ref("O");
const board = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

const CalculateWinner = (board: any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

const CalculateTie = (board: any) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }
  return true;
};

const winner = computed(function () {
  let winnerPlayer: String;
  winnerPlayer = CalculateWinner(board.value.flat());
  const isTie = CalculateTie(board.value);

  if (winnerPlayer == "X") {
    return "You Win!";
  }
  if (winnerPlayer == "O") {
    return "You Lost!";
  }
  if (isTie) {
    return "Tie!";
  }
});

const calculateEmptyCells = () => {
  const emptyCells: Cell[] = [];

  for (let i = 0; i < board.value.length; i++) {
    for (let j = 0; j < board.value[i].length; j++) {
      if (board.value[i][j] === "") {
        emptyCells.push({ x: i, y: j });
      }
    }
  }

  return emptyCells;
};

type Cell = {
  x: number;
  y: number;
};

let computerTurn = false;

const computerMove = () => {
  const emptyCells = calculateEmptyCells();

  if (emptyCells.length > 0) {
    const rnd = Math.floor(Math.random() * emptyCells.length);
    const rndCell = emptyCells[rnd];
    board.value[rndCell.x][rndCell.y] = computer.value;
  }

  computerTurn = false;
};

const MakeMove = (x: Cell["x"], y: Cell["y"]) => {
  if (computerTurn || winner.value) return;

  const emptyCells = calculateEmptyCells();

  if (
    !emptyCells.find(
      (emptyCell: Cell) => emptyCell.x === x && emptyCell.y === y
    )
  )
    return;

  board.value[x][y] = player.value;

  if (winner.value) return;

  computerTurn = true;
  setTimeout(computerMove, 10);
};

const ResetGame = () => {
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player.value = "X";
};
</script>

<template>
  <main class="text-center">
    <h1 class="mb-8 text-2xl font-bold">Wanna discount?</h1>

    <div class="flex flex-col items-center mb-8">
      <div v-for="(row, x) in board" :key="x" class="flex">
        <div v-for="(cell, y) in row" :key="y" @click="MakeMove(x, y)" :class="`border border-white w-24 h-24 hover:bg-gray-700 flex items-center justify-center material-icons-outlined text-4xl cursor-pointer ${cell === 'X' ? 'text-pink-500' : 'text-blue-400'
          }`">
          {{ cell === "X" ? "X" : cell === "O" ? "O" : "" }}
        </div>
      </div>
    </div>

    <div class="text-center">
      <h2 v-if="winner" class="text-2xl font-bold mb-8">{{ winner }}</h2>
      <button v-if="winner == 'Tie!'" @click="ResetGame"
        class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300">
        Again
      </button>

      <button v-if="winner == 'You Lost!' || winner == 'You Win!'" @click="changeToeToRoll(winner)"
        class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300">
        Next
      </button>
    </div>
  </main>
</template>
