import React from "react";
import IngredientPage from "@/app/src/components/IngredientPage"

import { getIngredientClusterById } from "@/app/src/utils/utils";
// import { Ingredient } from "@/app/src/types/ingredient";
import { Metadata } from 'next';

type IngredientProps = {
  params: {
    slug: string;
  };
};


const CustomIngredientClusterPage = async ({ params }: IngredientProps) => {
  const { slug } = await params
  console.log("cluster id is: ", slug)
  const ingredient = await getIngredientClusterById(slug) 

  console.log("ingredient cluster is: ", ingredient)
  
  if (!ingredient) {
    // Handle missing data (optional)
    return <div>Ingredient not found</div>;
  }

  return (
    <IngredientPage ingredient={ingredient} />
  )
}

export default CustomIngredientClusterPage