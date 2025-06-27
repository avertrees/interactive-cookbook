import ingredients from '@/app/src/data/custom/ingredients.json'

export const getIngredient = async (id) => {
  return ingredients.find((obj)=>obj.id === id)
}