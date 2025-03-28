import foodData from '@/app/src/data/foodb_2020_04_07_json/Food.json'
import search from '@/app/src/utils/search'

export const getFoodDBIngredient = async (id) => {
  return foodData.data.find((obj)=>obj.public_id === id)
}