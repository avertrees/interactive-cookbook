"force-dynamic";

import styles from "@/app/page.module.css";
import { getIngredients } from "@/app/src/utils/utils";

export default function IngredientsPage() {
  const data = getIngredients();

  return (
    <div className={styles.browse}>
      <header className={styles.browseHeader}>
        <a href="/" className={styles.backLink}>
          ← Back to docs
        </a>
        <h1>Ingredients</h1>
        <p>
          <span className={styles.count}>{data.length}</span> merged ingredients reconciling Flavor
          Bible names with FooDB records. Data:{" "}
          <a href="/api/ingredients">/api/ingredients</a>
        </p>
      </header>

      <ol className={styles.browseList}>
        {data.map((ingredient, index) => {
          const pairings = ingredient.flavor_bible_pairings_ids?.length ?? 0;
          const group = ingredient.food_group;
          return (
            <li key={ingredient.id ?? index}>
              <a href={`/ingredients/${ingredient.id}`} className={styles.secondary}>
                {ingredient.name}
              </a>
              {group ? ` · ${group}` : ""}
              {pairings ? ` · ${pairings} pairings` : ""}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
