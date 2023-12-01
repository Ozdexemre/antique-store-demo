import type Antique from "@/domain/Antique";
import { reactive } from "vue";

// TODO save user data in local storage

const userStore = reactive({
  money: 10000,
  inventory: [] as Antique[],

  setMoney(money: number) {
    this.money = money;
  },

  increaseMoney(amount: number) {
    this.money += amount;
    this.money = parseFloat(this.money.toFixed(2));
  },

  decreaseMoney(amount: number) {
    this.money -= amount;
    this.money = parseFloat(this.money.toFixed(2));
  },

  setInventory(inventory: Antique[]) {
    this.inventory = inventory;
  },
  
  addItemToInventory(item: Antique) {
    this.inventory.push(item)
  },
});

export default userStore;
