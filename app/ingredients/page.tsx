"force-dynamic";

import Image from "next/image";
import styles from "@/app/page.module.css";
import { getIngredients } from "@/app/src/utils/utils";


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
