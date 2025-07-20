import React from "react";
import IngredientPage from "@/app/src/components/IngredientPage"

import { getIngredientClusterById } from "@/app/src/utils/utils";



const CustomIngredientClusterPage = async ({ params }) => {
  const { slug } = await params
  console.log("cluster id is: ", slug)
  const ingredient = await getIngredientClusterById(slug.toString()) 

  console.log("ingredient cluster is: ", ingredient)
  
  if (!ingredient) {
    // Handle missing data (optional)
    return <div>Ingredient not found</div>;
  }

  return (
    <IngredientPage ingredient={ingredient} id={slug.toString()}/>
  )
}

export default CustomIngredientClusterPage