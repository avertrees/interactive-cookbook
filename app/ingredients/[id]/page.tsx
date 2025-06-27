import React from "react";
import IngredientPage from "@/app/src/components/IngredientPage";
import { getIngredient } from "@/app/src/utils/utils";
import { Ingredient } from "@/app/src/types/ingredient";
import { Metadata } from 'next';


const CustomIngredientPage = async ({params}) => {
  // const resolvedParams = await params; // await params
  const ingredient = await getIngredient(params.id) 
  return (
    <IngredientPage ingredient={ingredient} />
  )
}

export default CustomIngredientPage