import Image from "next/image";
import styles from "@/app/page.module.css";
import data from '@/app/src/data/custom/ingredients.json'
import { Ingredient } from "@/app/src/types/ingredient";

export default function customFoodBIndexPage() {
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
