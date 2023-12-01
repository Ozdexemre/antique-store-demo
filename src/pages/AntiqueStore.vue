<script setup lang="ts">
import Antique from "../domain/Antique";
import { ref, computed } from "vue";

const antiqueCount = ref(14);
const antiqueList = ref([] as Antique[]);

const sortedAntiques = computed(() =>
  antiqueList.value.sort((a, b) => b.realPrice - a.realPrice)
);

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
  antiqueList.value = [];
  for (let i = 0; i < antiqueCount.value; i++) {
    const antique = new Antique();

    antiqueList.value.push(antique);
  }
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function currencyFormatter(price: number) {
  return numberFormatter.format(price);
}
</script>

<template>
  <div class=" text-center min-h-screen flex flex-col">
    <header class="container mx-auto my-9">
      <h1 class="text-4xl font-bold">Create Antiques</h1>
    </header>

    <main class="container mx-auto p-4 flex-1">
      <div class="items-center" @keyup.enter="createAntique">
        <input
          class="rounded-s-lg text-black py-1 px-4 focus:outline-none"
          type="number"
          placeholder="How many antiques?"
          v-model="antiqueCount"
        />

        <button
          class="bg-rose-500 border-lime-500 rounded-r-lg p-1 hover:bg-rose-700 transition-all"
          @click="createAntique"
        >
          Create
        </button>
      </div>

      <div
        v-if="antiqueList.length"
        class="border-2 p-4 border-gray-50 rounded-lg mt-8 space-y-3 text-xs"
      >
        <div
          class="flex place-items-center place-content-center gap-x-2"
          v-for="antique of sortedAntiques"
        >
          <span
            class="font-medium"
            :class="[
            `${ANTIQUE_CONDITIONS_COLOURS[antique.condition.name as keyof typeof ANTIQUE_CONDITIONS_COLOURS]
            }`,
            {
              // 'text-4xl': antique.condition.name === 'Trash'
            }
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
          -
          <span class="font-bold">
            {{ currencyFormatter(antique.realPrice) }}
          </span>
        </div>
      </div>
    </main>
  </div>
  <router-view />
</template>
