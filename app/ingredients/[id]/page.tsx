import React from "react";
import IngredientPage from "@/app/src/components/IngredientPage";
import { getIngredients, getIngredientById } from "@/app/src/utils/utils";
import { Ingredient } from "@/app/src/types/ingredient";
import { Metadata } from 'next';

type IngredientProps = {
  params: {
    id: string;
  };
};


const CustomIngredientPage = async ({ params }: IngredientProps) => {
  const { id } = await params
  console.log("id is: ", id)
  const ingredient = await getIngredientById(id) 

  console.log("ingredient is: ", ingredient)
  
  if (!ingredient) {
    // Handle missing data (optional)
    return <div>Ingredient not found</div>;
  }

  return (
    <IngredientPage ingredient={ingredient} />
  )
}

export default CustomIngredientPage