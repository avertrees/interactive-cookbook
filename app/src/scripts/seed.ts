import { common_name_ingredients } from "../data/seeds";

function seedJSON() {
  common_name_ingredients.forEach((ingredient)=>{
    console.log("ingredient is: ", ingredient)
  })
}

seedJSON()