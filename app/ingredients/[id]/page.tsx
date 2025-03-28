import React from "react";
import FoodDBItemPage from "@/app/src/components/FoodDBItem";
import { getFoodDBIngredient } from "@/app/src/utils/foodb";

const FoodDBIngredientPage = async ({params}) => {
  const item = await getFoodDBIngredient(params.id)
  console.log("item is: ", item)
  return (
    <FoodDBItemPage item={item} />
  )
}

export default FoodDBIngredientPage