import Image from "next/image";
import styles from "./page.module.css";
import { getIngredients, getUniqueFoodGroups, getUniqueFoodSubGroups, getUniqueFoodsByFoodGroup, getUniqueFoodsByFoodSubGroup } from "./src/utils/utils";

export default async function Home() {
  const ingredients = await getIngredients()

  const foodGroups = getUniqueFoodGroups(ingredients).sort()
  const foodSubGroups = getUniqueFoodSubGroups(ingredients).sort()
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Food Groups</h2>
        <ul>
          {foodGroups?.map((group, index)=>{
            const href = `/ingredients?food_group=${group}&sort=true`
            return (
                <li key={index}>
                  <a href={href}>{group as any}</a>
                </li>
          )
          })}
        </ul>

        <h2>Food SubGroups</h2>
        <ul>
          {foodSubGroups?.map((group, index)=>{
            const href = `/ingredients?food_subgroup=${group}&sort=true`

            return (
                <li key={index}>
                  <a href={href}>{group as any}</a>
                </li>
            )
          })}
        </ul>
        <a href="/ingredients?sort=true" className="button">Go to Ingredients List</a>
        <a href="/ingredient-clusters?sort=true" className="button">View Ingredient Clusters</a>
      </main>
    </div>
  );
}
