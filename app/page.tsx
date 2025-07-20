import Image from "next/image";
import styles from "./page.module.css";
import { getIngredients, getUniqueFoodGroups, getUniqueFoodSubGroups, getUniqueFoodsByFoodGroup, getUniqueFoodsByFoodSubGroup } from "./src/utils/utils";

export default async function Home() {
  const ingredients = await getIngredients()
  const foodGroups = getUniqueFoodGroups(ingredients)
  const foodSubGroups = getUniqueFoodSubGroups(ingredients)
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {foodGroups?.map((group, index)=>{
          const href = `/ingredients?food_group=${group}`
          return (
            <li key={index}>
              <a href={href}>{group as any}</a>
            </li>
        )
        })}
        {foodSubGroups?.map((group, index)=>{
          const href = `/ingredients?food_subgroup=${group}`
          return (
            <li key={index}>
              <a href={href}>{group as any}</a>
            </li>
          )
        })}
        <a href="/ingredients" className="button">Go to Ingredients List</a>
        <a href="/ingredient-clusters" className="button">View Ingredient Clusters</a>
      </main>
    </div>
  );
}
