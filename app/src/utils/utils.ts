// import ingredients from  '@/data/drafts/custom/ingredients_sample.json'
import { Ingredient } from '../types/ingredient'
import fs from 'fs';
import path from 'path'

export const getIngredients = () =>{
  const filePath = path.join(process.cwd(), 'data', 'ingredients', 'merged', `ingredients.json`);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export const getIngredientById = async (id: string | number) => {
  const ingredients = getIngredients();
  return ingredients.find((obj) => String(obj.id) === String(id));
};


export const getCleanedIngredients = () =>{
  const filePath = path.join(process.cwd(), 'data', 'ingredients', 'merged', `cleaned_deduped_food.json`);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export const getCleanedIngredientById = async (id: string | number) => {
  const ingredients = getCleanedIngredients();
  return ingredients.find((obj) => String(obj.id) === String(id));
};

export const getIngredientClusters = () =>{
  const filePath = path.join(process.cwd(), 'data', 'ingredients', `ingredients.json`);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export const getIngredientClusterById = async (id: string | number) => {
  const ingredients = getIngredientClusters();
  return ingredients.find((obj) => String(obj.id) === String(id));
};

export const getCustomIngredients= () =>{
  const filePath = path.join(process.cwd(), 'data', 'drafts', `custom`, `ingredients_sample.json`);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// get unique list of food_groups ie. foodb_food['food_group'].unique()

// get unique list of food_subgroups ie. foodb_food['food_subgroup'].unique()

// get list of foods by food_group

// get list of foods by food_subgroup