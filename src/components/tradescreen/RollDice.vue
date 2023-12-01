<script setup lang="ts">
import { ref } from "vue";
import userStore from "@/store/userStore";

const rollValue = ref<number>(0);

const emit = defineEmits(['next']);

const changeRollToBargain = (rollValue: number) => {
  emit('next', rollValue);
};

type Dice = {
  first: number;
  second: number;
};

const myDice = ref<Dice>({
  first: 0,
  second: 0,
});

const totalDice = ref<number>(0);
const previousTotalDice = ref<number>(0);

const rollDice = async () => {
  await new Promise<void>((resolve) => {
    previousTotalDice.value = totalDice.value;

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        myDice.value.first = Math.floor(Math.random() * 10) + 1;
        myDice.value.second = Math.floor(Math.random() * 10) + 1;
        totalDice.value = myDice.value.first + myDice.value.second;

        if (i == 9) {
          resolve();
        }
      }, i * 100);
    }
  });
};

const doubleRewards = async () => {
  await rollDice();

  if (previousTotalDice.value > totalDice.value) {
    userStore.decreaseMoney((previousTotalDice.value - totalDice.value) * 10);
  } else if (previousTotalDice.value == totalDice.value) {
    userStore.increaseMoney(previousTotalDice.value * totalDice.value * 10);
  } else
    userStore.increaseMoney((totalDice.value - previousTotalDice.value) * 5);
};
</script>

<template>
  <div class="text-center">
    <h1 class="mb-12 text-2xl font-bold">Roll a Dice</h1>
  </div>

  <div class="flex justify-center items-center space-x-12">
    <div class="bg-gray-500 w-24 aspect-square flex items-center justify-center font-semibold text-3xl rounded-xl">
      {{ myDice.first }}
    </div>
    <div class="bg-gray-500 w-24 aspect-square flex items-center justify-center font-semibold text-3xl rounded-xl">
      {{ myDice.second }}
    </div>
  </div>

  <div v-if="previousTotalDice != 0" class="flex justify-center items-center mt-16">
    Previous Roll Value: {{ previousTotalDice }}
  </div>
  <div class="flex justify-center items-center mt-4">
    Roll Value: {{ totalDice }}
  </div>

  <div class="mt-12 flex justify-center items-center space-x-6">
    <button v-if="totalDice == 0" @click="rollDice"
      class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300">
      Roll
    </button>

    <template v-else>

      <button @click="doubleRewards"
        class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300">
        Gamble Roll
      </button>

      <button @click="changeRollToBargain(rollValue)"
        class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300">
        Next
      </button>
    </template>
  </div>
</template>