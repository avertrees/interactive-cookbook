"force-dynamic";

import styles from "@/app/page.module.css";
import { getIngredientClusters } from "@/app/src/utils/utils";

export default function IngredientClustersPage() {
  const data = getIngredientClusters();

  return (
    <div className={styles.browse}>
      <header className={styles.browseHeader}>
        <a href="/" className={styles.backLink}>
          ← Back to docs
        </a>
        <h1>Ingredient Clusters</h1>
        <p>
          <span className={styles.count}>{data.length}</span> clusters grouping Flavor Bible name
          variants under a single ingredient. Data:{" "}
          <a href="/api/ingredient-clusters">/api/ingredient-clusters</a>
        </p>
      </header>

      <ol className={styles.browseList}>
        {data.map((cluster, index) => {
          const variants = cluster.flavor_bible_name_variants?.length ?? 0;
          const pairings = cluster.flavor_bible_pairings_ids?.length ?? 0;
          return (
            <li key={cluster.id ?? index}>
              <a href={`/ingredient-clusters/${cluster.id}`} className={styles.secondary}>
                {cluster.name}
              </a>
              {variants ? ` · ${variants} variants` : ""}
              {pairings ? ` · ${pairings} pairings` : ""}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
