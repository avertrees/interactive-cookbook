import ingredients from  '@/data/drafts/custom/ingredients_sample.json'
import { Ingredient } from '../types/ingredient'

export const getIngredient = async (id) => {
  return ingredients.find((obj)=>obj.id === id) as Ingredient
}