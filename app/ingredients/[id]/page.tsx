import React from "react";
import IngredientPage from "@/app/src/components/IngredientPage";
import { getIngredients, getIngredientById } from "@/app/src/utils/utils";
import { Ingredient } from "@/app/src/types/ingredient";
import { Metadata } from 'next';
// import typeof { PageProps }  from 'next'; // <-- new import
// import { PageProps } from "@/.next/types/app/page";
// type IngredientProps = PageProps<{ id: string }>

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
    <IngredientPage ingredient={ingredient} />
  )
}

export default CustomIngredientPage