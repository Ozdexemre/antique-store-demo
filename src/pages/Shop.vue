<script setup lang="ts">
import userStore from "@/store/userStore";
import Antique from "../domain/Antique";
import tradescreen from "@/components/tradescreen/TradeScreen.vue"
import { ref, computed } from "vue";

const antiqueList = ref([] as Antique[]);
const purchaseList = ref([] as Antique[]);
const sellStatus = ref<boolean>(false);
const sellHistory = ref([] as Antique[]);

defineProps<{
  sellHistory?: Antique[]
}>()

const ANTIQUE_CONDITIONS_COLOURS = {
  Masterpiece: "text-rose-500",
  Outstanding: "text-yellow-300",
  Excellent: "text-indigo-500",
  Fine: "text-blue-500",
  Average: "text-teal-500",
  "Below Avarage": "text-emerald-600",
  Poor: "text-lime-600",
  Mediocre: "text-orange-800",
  Worn: "text-yellow-800",
  Trash: "text-orange-800",
};

function createAntique() {
  if (antiqueList.value.length == 0) {
    for (let i = 0; i < 20; i++) {
      const antique = new Antique();
      antiqueList.value.push(antique);
    }
  }
  console.log("Naber?", antiqueList.value);
}

const inventory = computed(() => {
  return userStore.inventory;
});

function purchaseAntique(index: number) {
  userStore.decreaseMoney(antiqueList.value[index].shelfPrice);

  userStore.addItemToInventory(antiqueList.value[index]);

  purchaseList.value.push(antiqueList.value[index]);
  antiqueList.value.splice(index, 1);
}


function sellAntique(index: number) {
  
  sellStatus.value = true;
  sellHistory.value.push(antiqueList.value[index]);

  

}



</script>

<template>
  
  <div class="bg-gray-700 text-white text-center min-h-screen">
    
    <header class="container mx-auto my-9">
      <h1 class="text-4xl font-bold">Antique Shop</h1>
    </header>

    <main class="container mx-auto p-4">
      <div class="items-center" @keyup.enter="createAntique">
        <button
          class="bg-rose-500 rounded-lg p-1 px-3 hover:bg-rose-700 transition-all mx-auto"
          @click="createAntique"
        >
          Renew Stock
        </button>
      </div>

      <tradescreen v-if="sellStatus == true"></tradescreen>

      <div class="flex gap-x-12">
        <div
          class="border-2 p-4 border-gray-50 rounded-lg mt-8 space-y-3 text-xs"
        >
          <h2 class="text-2xl">Stock</h2>
          <div
            class="group flex gap-x-2"
            v-for="(antique, index) in antiqueList"
            :key="index"
          >
            <span
              class="font-medium"
              :class="[
            `${ANTIQUE_CONDITIONS_COLOURS[antique.condition.name as keyof typeof ANTIQUE_CONDITIONS_COLOURS]
            }`
          ]
            "
            >
              {{ antique.condition.name }}
            </span>
            -
            <span class="font-medium text-pink-300">
              {{ antique.name }}
            </span>
            -
            <span class="font-medium text-stone-300">
              Age: {{ antique.age }}
            </span>
            -
            <span class="font-medium text-purple-300">
              Crft. Score: {{ antique.craftsmanshipScore }}
            </span>

            <span class="font-medium">
              Price: {{ antique.shelfPrice.toFixed(2) }}
            </span>

            <button
              class="border-2 border-white rounded-md px-2 opacity-0 group-hover:opacity-100 transition-all ml-auto"
              @click="purchaseAntique(index)"
              
            >
              Buy
            </button>
            
          </div>
        </div>

        <div
          class="border-2 p-4 border-gray-50 rounded-lg mt-8 space-y-3 text-xs min-w-[600px]"
        >
          <h2 class="text-2xl">Inventory</h2>
          <div
            class="group flex gap-x-2 justify-between"
            v-for="(antique, index) in inventory"
            :key="index"
          >
            <div>
              <span
                class="font-medium"
                :class="[
            `${ANTIQUE_CONDITIONS_COLOURS[antique.condition.name as keyof typeof ANTIQUE_CONDITIONS_COLOURS]
            }`
          ]
            "
              >
                {{ antique.condition.name }}
              </span>
              -
              <span class="font-medium text-pink-300">
                {{ antique.name }}
              </span>
              -
              <span class="font-medium text-stone-300">
                Age: {{ antique.age }}
              </span>
              -
              <span class="font-medium text-purple-300">
                Crft. Score: {{ antique.craftsmanshipScore }}
              </span>

              <span class="font-medium">
                Buy Price: {{ antique.shelfPrice.toFixed(2) }}
              </span>
            </div>

            <button
              class="rounded-md ml-4 px-2 opacity-0 group-hover:opacity-100 transition-all bg-red-400"
              @click="sellAntique(index)"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
  <router-view />
</template>
