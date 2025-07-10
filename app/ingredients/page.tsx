import Image from "next/image";
import styles from "@/app/page.module.css";
// import data from '@/data/drafts/custom/ingredients_sample.json'
// import { Ingredient } from "@/app/src/types/ingredient";

import fs from 'fs';
import path from 'path'

function getIngredients(){
  const filePath = path.join(process.cwd(), 'data', 'ingredients', 'merged', `ingredients_1.json`);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export default function customFoodBIndexPage() {
  const data = getIngredients()

  return (
    <ol>
      {data.map((ingredient, index)=>{
        return (
          <li key={index}>
            <a
              href={`/ingredients/${ingredient.id}`}
              className={styles.secondary}
            >
              {ingredient.name}
            </a>
          </li>
        )
      })}
    </ol>
  );
}
