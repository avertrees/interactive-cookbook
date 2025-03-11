// import {getDataFromFoodDB, getDataFromEdamam, getDataFromOpenDataWeb, getDataFromUSDA} from "../../src/utils/api";
const fs = require('fs');

export const common_name_ingredients = [
  "Nutritional yeast",
  "Chicken",
  "Scallions",
  "Sweet potatoes",
  "Zucchini",
  "Eggplant",
  "Soy sauce",
  "Honey",
  "Ambrosia honey",
  "Maple syrup",
  "Monk fruit ",
  "Soy protein powder",
  "Rice protein powder",
  "Dutch cocoa powder",
  "Chocolate",
  "Coconut oil",
  "Miso",
  "Ginger",
  "Turmeric",
  "Cilantro",
  "parsley ",
  "Mint",
  "Chili powder",
  "Serranos",
  "Avocado oil",
  "Avocado",
  "Butter",
  "Olive oil",
  "Coconut sugar",
  "Sesame seeds",
  "Sesame oil",
  "Sesame paste",
  "Black sesame seeds",
  "Black sesame paste",
  "Brown basmati rice",
  "Rolled Oats",
  "Almond butter",
  "Almonds",
  "Almond flour",
  "Bananas",
  "Chia seeds",
  "Flax seeds",
  "Raspberries",
  "Mango",
  "Sushi rice",
  "Coconut milk",
  "Coconut cream",
  "Coconut Mct oil",
  "Masa",
  "Sweet rice/mochi flour",
  "Brown rice flours",
  "Coffee",
  "Mushrooms",
  "Wine",
  "Tempeh",
  "Tomatoes",
  "Potatoes",
  "Poblanos",
  "Cheese",
  "Carrots",
  "Tomatillos",
  "Vanilla",
  "Chicken of the woods mushrooms",
  "Gluten Free flour mix",
  "Eggs",
  "Egg whites",
  "Dried fruit",
  "Hibiscus flowers",
  "Asparagus",
  "Soy milk",
  "Cojita cheese",
  "Clarified butter",
  "Brown butter",
  "Salt",
  "Pepper",
  "Paprika",
  "Furikake",
  "Japanese bbq sauce",
  "Brown sugar",
  "Flour",
  "Pie crust",
  "Curry powder",
  "Garam masala",
  "Lemons",
  "limes",
  "onions",
  "garlic",
  "Vinegar",
  "Yogurt",
  "Sausage",
  "fish",
  "bacon",
  "whole milk",
  "heavy cream",
  "sugar",
]

export const experimental_ingredients = [
  "Corn husk ash",
  "Burnt corn husk powder",
  "Adaptogenic mixes",
  "Prickly pear",
  "Acorn flour",
  "hoja santa",
  "epazote",
  "nopales"
]

const edamamHash = {}

function seedJSON() {
  common_name_ingredients.forEach((ingredient)=>{
    // console.log("ingredient is: ", ingredient)
    edamamHash[ingredient] =  `https://api.edamam.com/api/food-database/v2/parser?ingr=${ingredient}`
  })

  console.log("edamamHash is: ", edamamHash)
  
}

function writeFile(data){
  fs.writeFile('./app/src/data/ingredients.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File successfully written as ingredients.json');
  });
}
seedJSON()

// example url for itis 
// scientific name: https://www.itis.gov/ITISWebService/jsonservice/searchByScientificName?srchKey=Tardigrada
// common name: https://www.itis.gov/ITISWebService/jsonservice/searchByCommonName?srchKey=corn