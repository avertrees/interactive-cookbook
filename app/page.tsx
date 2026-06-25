import styles from "./page.module.css";

type Endpoint = {
  method: string;
  path: string;
  example: string;
  description: string;
  params?: { name: string; description: string }[];
};

type EndpointGroup = {
  title: string;
  description: string;
  endpoints: Endpoint[];
};

const groups: EndpointGroup[] = [
  {
    title: "Unified search",
    description:
      "One query across every source at once — internal datasets and live external APIs — returned as per-source result arrays.",
    endpoints: [
      {
        method: "GET",
        path: "/api/master-search",
        example: "/api/master-search?query=corn",
        description:
          "Searches USDA, Edamam, Flavor Bible, and FooDB in one call. Returns per-source arrays plus a counts summary.",
        params: [{ name: "query", description: "Required. Search term applied to all four sources." }],
      },
    ],
  },
  {
    title: "Ingredients (merged)",
    description:
      "The project's own reconciled ingredient data, merging Flavor Bible names with FooDB records.",
    endpoints: [
      {
        method: "GET",
        path: "/api/ingredients",
        example: "/api/ingredients?sort=name&query=corn",
        description: "The merged master ingredient list.",
        params: [
          { name: "query", description: "Filter by id, name, variants, pairing ids, or status." },
          { name: "sort", description: "Any value sorts results alphabetically by name." },
        ],
      },
      {
        method: "GET",
        path: "/api/ingredient-clusters",
        example: "/api/ingredient-clusters?sort=name&query=corn",
        description: "Ingredients grouped into clusters of name variants.",
        params: [
          { name: "query", description: "Filter by id, name, variants, pairing ids, or status." },
          { name: "sort", description: "Any value sorts results alphabetically by name." },
        ],
      },
      {
        method: "GET",
        path: "/api/search",
        example: "/api/search?query=corn",
        description:
          "Cross-source search: returns the overlap (shared), plus raw FooDB and Flavor Bible matches.",
        params: [{ name: "query", description: "Search term matched across both data sources." }],
      },
    ],
  },
  {
    title: "Flavor Bible",
    description: "Ingredient-to-pairing data derived from The Flavor Bible.",
    endpoints: [
      {
        method: "GET",
        path: "/api/flavorbible/index",
        example: "/api/flavorbible/index?query=corn",
        description:
          "The full cleaned index — unique ingredient/pairing list plus grouped and structured views. Optional query filters every view.",
        params: [{ name: "query", description: "Optional substring filter across all views." }],
      },
      {
        method: "GET",
        path: "/api/flavorbible/ingredients",
        example: "/api/flavorbible/ingredients?query=corn",
        description: "Relevance-ranked search over Flavor Bible ingredients.",
        params: [{ name: "query", description: "Search term (returns full data set if omitted)." }],
      },
      {
        method: "GET",
        path: "/api/flavorbible/pairings",
        example: "/api/flavorbible/pairings?query=corn",
        description: "Search Flavor Bible entries by their pairings.",
        params: [{ name: "query", description: "Pairing search term." }],
      },
    ],
  },
  {
    title: "FooDB",
    description: "Food, flavor-compound, and content data from the FooDB 2020 dump.",
    endpoints: [
      {
        method: "GET",
        path: "/api/foodb/food",
        example: "/api/foodb/food?query=corn",
        description: "Search the FooDB Food table by name, food group, or subgroup.",
        params: [{ name: "query", description: "Search term (returns full table if omitted)." }],
      },
      {
        method: "GET",
        path: "/api/foodb/flavor",
        example: "/api/foodb/flavor?query=corn",
        description: "Search FooDB flavor compounds.",
        params: [{ name: "query", description: "Search term (returns full table if omitted)." }],
      },
      {
        method: "GET",
        path: "/api/foodb/content",
        example: "/api/foodb/content?query=anti",
        description:
          "FooDB health-effect content (a local stand-in for the full Content table, which is too large to bundle).",
        params: [{ name: "query", description: "Optional search over name, description, and ChEBI name." }],
      },
    ],
  },
  {
    title: "External APIs (live)",
    description: "Live proxy calls to third-party food databases. Require API keys in .env.local.",
    endpoints: [
      {
        method: "GET",
        path: "/api/usda",
        example: "/api/usda?ingredient=corn",
        description: "USDA FoodData Central food search.",
        params: [{ name: "ingredient", description: "Ingredient name to search." }],
      },
      {
        method: "GET",
        path: "/api/edamam",
        example: "/api/edamam?ingredient=corn",
        description: "Edamam Food Database parser.",
        params: [{ name: "ingredient", description: "Ingredient name to look up." }],
      },
    ],
  },
];

export default function Home() {
  return (
    <div className={styles.docs}>
      <header className={styles.docsHeader}>
        <h1>Interactive Cookbook</h1>
        <p>
          An exploratory API over flavor-pairing and ingredient data drawn from The Flavor Bible,
          FooDB, USDA, and Edamam. Browse the data below or call the endpoints directly.
        </p>
        <nav className={styles.navLinks}>
          <a href="/ingredients" className={styles.navLink}>
            Browse Ingredients →
          </a>
          <a href="/ingredient-clusters" className={styles.navLink}>
            Browse Ingredient Clusters →
          </a>
        </nav>
      </header>

      <main className={styles.docsMain}>
        <h2>API Reference</h2>
        {groups.map((group) => (
          <section key={group.title} className={styles.endpointGroup}>
            <h3>{group.title}</h3>
            <p className={styles.groupDescription}>{group.description}</p>
            {group.endpoints.map((endpoint) => (
              <div key={endpoint.path} className={styles.endpoint}>
                <div className={styles.endpointHeader}>
                  <span className={styles.method}>{endpoint.method}</span>
                  <a href={endpoint.example} className={styles.path}>
                    {endpoint.path}
                  </a>
                </div>
                <p className={styles.endpointDescription}>{endpoint.description}</p>
                {endpoint.params && (
                  <ul className={styles.params}>
                    {endpoint.params.map((param) => (
                      <li key={param.name}>
                        <code>{param.name}</code> — {param.description}
                      </li>
                    ))}
                  </ul>
                )}
                <a href={endpoint.example} className={styles.example}>
                  {endpoint.example}
                </a>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
