import ingredients from '@/app/src/data/custom/ingredients.json'
import { Ingredient } from '../types/ingredient'

export const getIngredient = async (id) => {
  return ingredients.find((obj)=>obj.id === id) as Ingredient
}