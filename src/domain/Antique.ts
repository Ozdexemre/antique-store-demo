export default class Antique {
  name: string;
  realPrice: number;
  shelfPrice: number;
  age: number;
  condition: {
    name: string;
    score: number;
    chance: number;
  };
  craftsmanshipScore: number;

  constructor() {
    this.name = createAntiqueName();
    this.condition = getRandomAntiqueCondition();
    this.age = Math.floor(Math.random() * 2000);
    this.craftsmanshipScore = parseFloat((Math.random() * 5).toFixed(1));
    this.realPrice = this.calculateAntiqueRealPrice();
    this.shelfPrice = this.calculateAntiqueShelfPrice();
  }

  calculateAntiqueRealPrice() {

    const weights = {
      score: 0.5,
      craftsmanshipScore: 0.15,
      age: 0.35,
    };

    const normalizedConditionScore =
      normalizeScore(this.condition.score, 0, 100) * weights.score;

    const normalizedSCraftsmanshipScore =
      normalizeScore(this.craftsmanshipScore, 0, 5) *
      weights.craftsmanshipScore;

    const normalizedAge = normalizeScore(this.age, 0, 2000) * weights.age;

    // const price = () * 100;

    const normalizedScore = normalizedConditionScore + normalizedSCraftsmanshipScore + normalizedAge

    const lastPrice = Math.pow(normalizedScore, 5) * 10000;

    return lastPrice;
  }

  calculateAntiqueShelfPrice() {
    let realPrice = this.calculateAntiqueRealPrice();

    const priceRange = realPrice * 0.1;
    const rnd = Math.random() * (2 * priceRange) - priceRange;

    const shelfPrice = realPrice + rnd;
    return shelfPrice;
  }
}

function normalizeScore(
  score: number,
  minScore: number,
  maxScore: number
): number {
  if (maxScore === minScore) {
    // Avoid division by zero
    return 1;
  } else {
    return (score - minScore) / (maxScore - minScore);
  }
}

function createAntiqueName() {
  const adjective = [
    "Vintage",
    "Sharp Edged",
    "Heavy",
    "Small",
    "Cursed",
    "Scarry Looking",
    "Overused",
    "Stinking",
    "Worn Out",
    "Weird Looking",
    "Suspicious Looking",
    "Unreasonably Large",
    "Hollow",
    "Colorful",
    "Shiny",
    "Sticky",
    "Creaking",
    "Greasy",
    "Smooth Looking",
    "Barbed Wire Wrapped",
    "Noisy",
    "Haunted",
  ];
  const firstName = [
    "Marble",
    "Bloody",
    "Crystal Jeweled",
    "Brass Embroidered",
    "Leather",
    "Chinese",
    "Handmade",
    "Gothic",
    "Victorian",
    "Bone Decorated",
    "Ancient",
    "Scaled",
    "(Witchcraft)",
    "Poisonous Labeled",
    "Glass",
  ];
  const lastName = [
    "Figurine",
    "Mustache",
    "Bible",
    "Fake Nose",
    "Bear Head",
    "Doll",
    "Ring",
    "Cheese",
    "Painting",
    "Armor",
    "Eyeball",
    "Hat",
    "Stuffed Animal",
    "Wax Monkey Head",
    "Knife",
    "Amulet",
    "Pair of Socks",
    "Skeleton Key",
    "Rope",
    "French Horn",
    "XXL Khaki Shorts",
    "Pickle Jar",
    "Fake Looking Curtain",
    "Steering Wheel",
    "Fake Nails",
    "Gnome",
    "Severed Finger",
  ];

  const antiqueName =
    adjective[Math.floor(Math.random() * adjective.length)] +
    " " +
    firstName[Math.floor(Math.random() * firstName.length)] +
    " " +
    lastName[Math.floor(Math.random() * lastName.length)];
  return antiqueName;
}

function getRandomAntiqueCondition() {
  const conditions = [
    {
      name: "Masterpiece",
      score: 100,
      chance: 0.02,
    },

    {
      name: "Outstanding",
      score: 85,
      chance: 0.04,
    },

    {
      name: "Excellent",
      score: 70,
      chance: 0.08,
    },

    {
      name: "Fine",
      score: 60,
      chance: 0.16,
    },

    {
      name: "Average",
      score: 50,
      chance: 0.25,
    },

    {
      name: "Below Avarage",
      score: 40,
      chance: 0.15,
    },
    {
      name: "Poor",
      score: 30,
      chance: 0.12,
    },
    {
      name: "Mediocre",
      score: 15,
      chance: 0.09,
    },
    {
      name: "Worn",
      score: 10,
      chance: 0.06,
    },
    {
      name: "Trash",
      score: 2,
      chance: 0.03,
    },
  ];

  const rnd = Math.random();

  let counter = 0;
  for (const condition of conditions) {
    counter += condition.chance;
    if (rnd <= counter) {
      return condition;
    }
  }

  throw new Error("Condition not found");
}
