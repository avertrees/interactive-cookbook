// import ingredients from  '@/data/drafts/custom/ingredients_sample.json'
import { Ingredient } from '../types/ingredient'
import fs from 'fs';
import path from 'path'

export const getIngredients = () =>{
  const filePath = path.join(process.cwd(), 'data', 'ingredients', 'merged', `ingredients_1.json`);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export const getIngredientById = async (id: string | number) => {
  const ingredients = getIngredients();
  return ingredients.find((obj) => String(obj.id) === String(id));
};