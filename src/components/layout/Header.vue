<script setup lang="ts">
import { PAGES } from "@/Enums";
import userStore from "@/store/userStore";
import { ref, watch } from "vue";

const money = ref(userStore.money);

watch(() => userStore.money, (newMoney) => {
  money.value = newMoney;
});
</script>

<template>
  <div class="bg-transparent pt-6 flex justify-between px-24">
    <div class="space-x-12">
      <router-link class="text-xl" :to="{ name: PAGES.HOME }">Home</router-link>
      <router-link class="text-xl" :to="{ name: PAGES.SHOP }">Shop</router-link>
    </div>

    <div class="space-x-4">
      <button class="border p-2 rounded">Inventory</button>
      <!-- <span class="text-2xl">${{ money }}</span> -->
      <span class="text-2xl">${{ money }}</span>
    </div>
  </div>
</template>
