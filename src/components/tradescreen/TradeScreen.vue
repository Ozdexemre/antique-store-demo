
<template>
  <Dialog> 
    <component :is="components[activeComponent]" @next="(handleResult as any)"> </component>
  </Dialog>
</template>


<script setup lang="ts">
import { ref } from "vue";
import Dialog from "@/components/base/Dialog.vue"
import tictactoe from "@/components/tradescreen/TicTacToe.vue";
import rolldice from "@/components/tradescreen/RollDice.vue";
import bargain from "./Bargain.vue";

const toeResult = ref<string>();
const rollResult = ref(0);
const discountPer = ref(0);

const activeComponent = ref(0)
const components = [
  tictactoe,
  rolldice,
  bargain
]

function handleResult(data: string | number) {
  switch(activeComponent.value) {
    case 0: 
      handleToeResult(data as string)
      break;
    case 1:
      handleRollResult(data as number)
      break;
    case 2: 
      calculateDiscount()
      break;
  }

  activeComponent.value += 1;
}


function handleToeResult(winner: string) {
  toeResult.value = winner;
}

function handleRollResult(rollValue: number) {
  rollResult.value = rollValue;
}

function calculateDiscount() {
  if(toeResult.value == 'You Win!') {
    discountPer.value = discountPer.value + 10 + rollResult.value;
  } else {
    discountPer.value = discountPer.value - 10 + rollResult.value;
  }
}

</script>