<script setup lang="ts">
import { reactive, ref } from "vue";
import userStore from "@/store/userStore";

const currentAntiqueRealPrice = 1000;

const offerOptions = reactive({
  sellerOfferValue: 0,
  sellerFirstOffer: 0,
  playerOfferValue: 1200,
  ownerRagePercent: 0,
  ownerRageMessage: "Hello there!",

  newSellerOffer(amount: number) {
    if (this.sellerFirstOffer == 0) {
      this.sellerFirstOffer = this.sellerOfferValue;
      this.sellerOfferValue = amount;
    } else { this.sellerOfferValue = amount; }
  },

  increasePlayerOffer(amount: number) {
    this.playerOfferValue += amount;
  },

  decreasePlayerOffer(amount: number) {
    this.playerOfferValue -= amount;
  },

  increaseOwnerRagePercent(amount: number) {
    if (this.ownerRagePercent + amount < 100) {
      this.ownerRagePercent += amount;
    } else { this.ownerRagePercent = 100 }
  },

  decreaseOwnerRagePercent(amount: number) {
    if (this.ownerRagePercent - amount > 0) {
      this.ownerRagePercent -= amount;
    } else { this.ownerRagePercent = 0 }
  }
})

function updateRageMessage() {
  const ragePercent = offerOptions.ownerRagePercent;

  if (ragePercent === 0) {
    offerOptions.ownerRageMessage = "Let's deal!";
  } else if (ragePercent <= 10) {
    offerOptions.ownerRageMessage = "My last offer works too.";
  } else if (ragePercent <= 20) {
    offerOptions.ownerRageMessage = "Cool, here's the new price.";
  } else if (ragePercent <= 30) {
    offerOptions.ownerRageMessage = "Take another look.";
  } else if (ragePercent <= 40) {
    offerOptions.ownerRageMessage = "I can tweak it a bit.";
  } else if (ragePercent <= 50) {
    offerOptions.ownerRageMessage = "I won't budge.";
  } else if (ragePercent <= 60) {
    offerOptions.ownerRageMessage = "Let's not waste time.";
  } else if (ragePercent <= 70) {
    offerOptions.ownerRageMessage = "You're testing my patience.";
  } else if (ragePercent <= 80) {
    offerOptions.ownerRageMessage = "This is your last chance.";
  } else if (ragePercent <= 100) {
    offerOptions.ownerRageMessage = "Take it or leave it!";
  } else {
    offerOptions.ownerRageMessage = "Unknown rage percentage.";
  }
}

const calculateSellerOffer = () => {

  const {
    playerOfferValue,
    ownerRagePercent,
    sellerOfferValue,
  } = offerOptions

  const increaseOwnerRagePercent = offerOptions.increaseOwnerRagePercent.bind(offerOptions)
  const newSellerOffer = offerOptions.newSellerOffer.bind(offerOptions)


  if (playerOfferValue > sellerOfferValue) {
    // Increase the seller's offer to match the player's offer
    offerOptions.sellerOfferValue = playerOfferValue;
  } else if (playerOfferValue < sellerOfferValue) {
    // Calculate the difference in percentage between player and seller offers
    const percentageDifference = ((sellerOfferValue / playerOfferValue) - 1) * 100;

    if (ownerRagePercent !== 100 && playerOfferValue >= currentAntiqueRealPrice) {
      // Increase owner's rage percent and set the new seller's offer
      increaseOwnerRagePercent(ownerRagePercent + percentageDifference);
    }

    if (ownerRagePercent >= 100) {
      // Set the new seller's offer
      newSellerOffer((sellerOfferValue * 0.2) + sellerOfferValue);
    } else {
      newSellerOffer(playerOfferValue);
    }
    debugger
    if (ownerRagePercent !== 100 && playerOfferValue < currentAntiqueRealPrice) {
      // Increase owner's rage percent
      increaseOwnerRagePercent(ownerRagePercent + (percentageDifference * (percentageDifference / 10)));


      if (offerOptions.ownerRagePercent == 100) {
        // Set the new seller's offer
        newSellerOffer((sellerOfferValue * 0.2) + sellerOfferValue);
      } else {
        newSellerOffer(playerOfferValue);
      }
    }
  }
  updateRageMessage();
}


const timeTravel = () => {

  offerOptions.sellerOfferValue = offerOptions.sellerFirstOffer;
  offerOptions.sellerFirstOffer = 0;
  offerOptions.playerOfferValue = offerOptions.sellerOfferValue;
  offerOptions.ownerRagePercent = 0;
  offerOptions.ownerRageMessage = "Hello there!"

  userStore.decreaseMoney(40);
}

</script>

<template>
  <div class="text-center">
    <h1 class="mb-10 text-2xl font-bold">Here is my offer:</h1>
    <h1 class="font-bold text-4xl text-yellow-100"> ${{ offerOptions.sellerOfferValue }} </h1>
  </div>

  <div class="h-6 w-3/4 rounded-2xl border-2 mx-auto mt-8">
    <div class="bg-rose-500 h-full rounded-2xl" :style="`width:${offerOptions.ownerRagePercent}%`"></div>
  </div>

  <div class="flex items-center justify-center mt-4 font-semibold text-lg"> {{ offerOptions.ownerRageMessage }} </div>

  <div class="flex items-center justify-center mt-12 space">
    <input type="number" v-model="offerOptions.playerOfferValue"
      class="flex items-center justify-center w-1/3 h-10 bg-white text-center text-black font-semibold opacity-80 text-2xl rounded-l-2xl p-2">

    <button @click="calculateSellerOffer"
      class="w-1/4 h-10 bg-indigo-500 rounded-r-2xl uppercase font-bold hover:bg-indigo-600 duration-300">
      Offer
    </button>
  </div>

  <div class="flex items-center justify-center mt-14 space-x-10">
    <button @click="" class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300">
      Sell Antique
    </button>

    <button v-if="offerOptions.ownerRagePercent == 100" @click="timeTravel()"
      class="px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300">
      Time Travel ($40)
    </button>
  </div>
</template>