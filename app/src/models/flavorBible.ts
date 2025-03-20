import data from '@/app/src/data/flavorBible/data-formatted-json.json'
import {cleanUpResults, filterCleanedUpArray} from '@/app/src/utils/flavorbible'
import FlavorBibleType from '../types/FlavorBible'

// expected to take in one object from '@/app/src/data/flavorBible/data-formatted-json.json'
export class FlavorBibleIngredient {
  name: string;
  pairings: string[];
  isInFlavorBible?: boolean;
  // These only work if argument passed to model is a string
  isFlavorBibleIngredient?: boolean; //FlavorBibleObjects.find(string)
  isFlavorBiblePairing?: boolean; // searchResults. pairings.include?(string)
  isCompoundIngredient?: boolean;  // 
  pairsWithIngredients?: string[]; //FlavorBibleObjects.find(ingredient where ingredient.pairings === name)

  // alternativeNames: [{label: “”, value: “”},]
  // ### alt name options
  // const hasCommaInName: string.includes?(‘,’)
  // type: hasCommaInName.split(‘,’)[1]
  // isCompoundIngredient = string.includes(‘-and or and spaces”

  constructor(data: FlavorBibleType){
    this.name = data.ingredient;
    this.pairings = data.pairings;
  }
}

/*
  search "oil"
  {
    "ingredients": [
      "eggs, hard-boiled",
      "oil, almond",
      "oil, avocado",
      "oil, canola",
      "oil, grapeseed",
      "oil, hazelnut",
      "oil, macadamia nut",
      "oil, peanut",
      "oil, pecan",
      "oil, pistachio",
      "oil, porcini",
      "oil, pumpkin seed",
      "oil, sesame",
      "oil, truffle",
      "oil, walnut",
      "olive oil",
      "truffles, white (and white truffle oil)"
    ]
  },
  {
    "pairings": [
      "basil, oil",
      "chili oil",
      "egg, hard-boiled",
      "eggs (including hard-boiled) and egg dishes",
      "eggs, hard-boiled",
      "hazelnut oil",
      "hazelnuts and hazelnut oil",
      "mustard oil",
      "mustard, oil",
      "oil",
      "oil, almond",
      "oil, canola",
      "oil, corn",
      "oil, grapeseed",
      "oil, hazelnut",
      "oil, macadamia",
      "oil, mild",
      "oil, mustard",
      "oil, nut",
      "oil, olive",
      "oil, peanut",
      "oil, peanut (for cooking)",
      "oil, peanut (for frying)",
      "oil, pecan",
      "oil, porcini",
      "oil, pumpkin seed",
      "oil, safflower",
      "oil, sesame",
      "oil, sesame (for drizzling)",
      "oil, sunflower seed",
      "oil, truffle",
      "oil, vegetable",
      "oil, vegetable (for cooking)",
      "oil, walnut",
      "oil,walnut",
      "oils",
      "oils, almond",
      "oils, canola",
      "oils, corn",
      "oils, grapeseed",
      "oils, hazelnut",
      "oils, mustard",
      "oils, nut",
      "oils, peanut",
      "oils, safflower",
      "oils, sesame",
      "oils, sunflower",
      "oils, truffle",
      "oils, walnut",
      "olive oil",
      "olive oil (extra virgin)",
      "olive oil‚Äìbased dishes",
      "peanut oil",
      "pumpkin and pumpkin oil",
      "pumpkin, oil",
      "sesame and sesame oil",
      "sesame oil",
      "sesame oil, seeds",
      "sesame, oil",
      "truffle oil",
      "truffles and truffle oil",
      "truffles, black, and truffle oil",
      "truffles, oil",
      "walnut oil",
      "walnuts and walnut oil",
      "walnuts, oil",
      "white truffle oil"
    ]
  }
    
  search "corn"
    {
    "ingredients": [
      "corn",
      "cornish game hens",
      "pepper, green (as peppercorns)",
      "squash, acorn"
    ]
  },
  {
    "pairings": [
      "cabbage, with corned beef brisket",
      "corn",
      "corn and cornmeal",
      "corn and masa",
      "corn bread",
      "corn syrup",
      "corn syrup, dark",
      "corn syrup, light",
      "corned beef",
      "corned beef and cabbage",
      "cornichons",
      "cornmeal",
      "cornmeal (for breading)",
      "cornmeal (for crust)",
      "oil, corn",
      "oils, corn",
      "peppercorns",
      "peppercorns, black",
      "peppercorns, green",
      "peppercorns, white",
      "popcorn",
      "squash, acorn",
      "tortillas, corn"
    ]
  }

  "corn",
  "cornish game hens",
  "pepper, green (as peppercorns)" ->  "green pepper (as peppercorns)",
  "squash, acorn" -> "acorn squash"
  "corn syrup, dark", -> "dark corn syrup"
  "corn syrup, light" -> "light corn syrup"

  "cabbage, with corned beef brisket",
  "corn",
  "corn and cornmeal",
  "corn and masa",
  "corn bread",
  "corn syrup",
  "corned beef",
  "corned beef and cabbage",
  "cornichons",
  "cornmeal",
  "cornmeal (for breading)",
  "cornmeal (for crust)",
  "oil, corn",
  "oils, corn",
  "peppercorns",
  "peppercorns, black",
  "peppercorns, green",
  "peppercorns, white",
  "popcorn",
  "squash, acorn",
  "tortillas, corn"
*/ 