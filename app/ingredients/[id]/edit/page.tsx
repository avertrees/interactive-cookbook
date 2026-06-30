import React from "react";
import IngredientEditPage from "@/app/src/components/IngredientEditPage";
import { getIngredients, getIngredientById } from "@/app/src/utils/utils";
import { Ingredient } from "@/app/src/types/ingredient";
import { Metadata } from 'next';

const CustomIngredientPage = async ({ params }) => {
  const { id } = await params
  console.log("id is: ", id)
  const ingredient = await getIngredientById(id) 

  console.log("ingredient is: ", ingredient)
  
  if (!ingredient) {
    // Handle missing data (optional)
    return <div>Ingredient not found</div>;
  }

  return (
    <IngredientEditPage ingredient={ingredient} id={id} />
  )
}

export default CustomIngredientPage