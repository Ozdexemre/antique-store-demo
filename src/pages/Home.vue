<script setup lang="ts">
</script>

<template>
  <div class="bg-gray-700 text-white text-center min-h-screen space-y-20 mt-20">
    <div>
      <h1 class="text-4xl font-bold my-8">Antique Trade Game</h1>
    </div>

    <div class="items-center">
      <router-link to="/shop" class="bg-green-600 rounded-md font-bold mx-6 p-2"
        >Buy Antiques</router-link
      >
      <router-link to="/store" class="bg-blue-600 rounded-md font-bold mx-6 p-2"
        >Create Antiques (Test)</router-link
      >
      <router-link to="/sellpopup" class="bg-green-600 rounded-md font-bold mx-6 p-2"
        >Sell Pop-up</router-link
      >
    </div>
  </div>
</template>
