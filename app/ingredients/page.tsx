"force-dynamic";

import Image from "next/image";
import styles from "@/app/page.module.css";
import { getIngredients, getUniqueFoodsByFoodGroup, getUniqueFoodsByFoodSubGroup } from "@/app/src/utils/utils";
import search from "../src/utils/search";

export default function customFoodBIndexPage({searchParams}) {
  const foodGroupFilter = searchParams['food_group'];
  const foodSubGroupFilter = searchParams['food_subgroup'];

  let data = getIngredients()
  if (foodGroupFilter){
    data = getUniqueFoodsByFoodGroup(data, foodGroupFilter)
  } 

  if (foodSubGroupFilter) {
    data = getUniqueFoodsByFoodSubGroup(data, foodSubGroupFilter)
  } 

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
