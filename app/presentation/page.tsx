"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./presentation.module.css";

function TryIt({ href, label }: { href: string; label: string }) {
  return (
    <a className={styles.tryIt} href={href} target="_blank" rel="noopener noreferrer">
      {label} ↗
    </a>
  );
}

const slides: { kicker?: string; titleSlide?: boolean; node: React.ReactNode }[] = [
  {
    titleSlide: true,
    node: (
      <div className={styles.titleSlide}>
        <p className={styles.kicker}>Interactive Cookbook</p>
        <h1 className={styles.title}>The Trials and Tribulations of NLP</h1>
        <p className={styles.subtitle}>
          Why &ldquo;just match the names&rdquo; is never just matching the names
        </p>
        <p className={styles.author}>Alessandra Vertrees</p>
      </div>
    ),
  },
  {
    kicker: "Where we're headed",
    node: (
      <>
        <h2 className={styles.title}>The Arc</h2>
        <div className={styles.body}>
          <ul>
            <li>The goal: one search across three food databases</li>
            <li>The one assumption that quietly breaks everything</li>
            <li>Three attempts to fix it — each one trades an old problem for a new one</li>
            <li>What we actually shipped (and what it still gets wrong)</li>
            <li>The real fix — and why it isn&rsquo;t &ldquo;more NLP&rdquo;</li>
          </ul>
          <p className={styles.tryItNote}>
            Green links throughout are live — click any of them to hit the real API.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "The goal",
    node: (
      <>
        <h2 className={styles.title}>What We&rsquo;re Trying to Do</h2>
        <div className={styles.body}>
          <ul>
            <li>Merge three ingredient databases into one unified, searchable ingredient graph</li>
            <li>
              <strong>Flavor Bible</strong> — ~600 ingredients with flavor pairings (&ldquo;apple goes
              with cinnamon&rdquo;)
            </li>
            <li>
              <strong>FooDB</strong> — ~1,000 entries with scientific names, food groups, flavor
              compounds
            </li>
            <li>
              <strong>Edamam</strong> — live nutrition and ingredient API
            </li>
            <li>
              <strong>End state:</strong> search &ldquo;apple&rdquo; → get pairings, nutrition, and
              flavor compounds in one place
            </li>
          </ul>
          <div className={styles.tryItRow}>
            <TryIt href="/api/master-search?query=apple" label="/api/master-search?query=apple" />
          </div>
          <p className={styles.tryItNote}>
            One query, four sources — this is the end state we&rsquo;re reaching for.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "The assumption",
    node: (
      <>
        <h2 className={styles.title}>The Assumption</h2>
        <div className={styles.body}>
          <p className={styles.lead}>&ldquo;The same ingredient has the same name.&rdquo;</p>
          <p>
            <strong>Reality check:</strong>
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Database</th>
                <th>Entry</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flavor Bible</td>
                <td>
                  <code>achiote seeds</code>
                </td>
              </tr>
              <tr>
                <td>FooDB</td>
                <td>
                  <code>Annatto</code>
                </td>
              </tr>
            </tbody>
          </table>
          <p>These are the same spice. The databases do not know that.</p>
        </div>
      </>
    ),
  },
  {
    kicker: "Entity resolution",
    node: (
      <>
        <h2 className={styles.title}>One Plant, Many Ingredients</h2>
        <div className={styles.body}>
          <p>Corn is a single organism. These are all real ingredients that I would expect to see in food databases:</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Entry</th>
                <th>What it is</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["corn", "the kernel / the plant"],
                ["hominy", "nixtamalized corn"],
                ["masa", "milled nixtamalized corn"],
                ["corn silk", "the silk of the cob — used in teas"],
                ["corn husk", "the outer casing — used in tamales"],
                ["corn husk ash", "burnt husks — a culinary ash / natural food coloring"],
                ["corn flour", "milled dried corn"],
                ["huitlacoche", "corn smut — a fungus that grows on corn"],
              ].map(([entry, what]) => (
                <tr key={entry}>
                  <td>
                    <code>{entry}</code>
                  </td>
                  <td>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            NLP has no idea they
            share a plant.
          </p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/flavorbible/ingredients?query=corn" label="search 'corn' →" />
            <TryIt href="/api/ingredient-clusters?query=corn" label="the cluster we built →" />
          </div>
        </div>
      </>
    ),
  },
  {
    kicker: "Why it's hard",
    node: (
      <>
        <h2 className={styles.title}>Why Ingredient Names Are Hard</h2>
        <div className={styles.body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Capitalization", "beef vs Beef vs BEEF"],
                ["Modifier creep", "apple vs apple, granny smith vs apple (raw) vs apple juice"],
                ["Composite entries", "mirepoix carrots celery onions — one ingredient or three?"],
                ["Synonyms", "achiote seeds vs Annatto — same spice, different name entirely"],
                ["Variety collapse", "bread, french + bread, bagels + breads → bread"],
                ["Parsing ambiguity", "ginger, fresh — is 'fresh' a variety or a state?"],
              ].map(([p, ex]) => (
                <tr key={p}>
                  <td>
                    <strong>{p}</strong>
                  </td>
                  <td>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    kicker: "Attempt 1",
    node: (
      <>
        <h2 className={styles.title}>Just Clean the Strings</h2>
        <div className={styles.body}>
          <pre className={styles.code}>{`def normalize(name):
    return re.sub(r'[^a-zA-Z\\s]', '', name.lower()).strip()`}</pre>
          <div className={styles.columns}>
            <div className={styles.card}>
              <p className={`${styles.cardTitle} ${styles.good}`}>What it fixes</p>
              <ul>
                <li>capitalization</li>
                <li>punctuation</li>
              </ul>
            </div>
            <div className={styles.card}>
              <p className={`${styles.cardTitle} ${styles.bad}`}>What it breaks</p>
              <ul>
                <li>
                  <code className={styles.inlineCode}>achiote seeds</code> ≠{" "}
                  <code className={styles.inlineCode}>annatto</code> (still no match)
                </li>
                <li>
                  <code className={styles.inlineCode}>apple, granny smith</code> → now what?
                </li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: 20 }}>
            <strong>Verdict:</strong> Necessary but nowhere near sufficient.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "Attempt 2",
    node: (
      <>
        <h2 className={styles.title}>Fuzzy String Matching</h2>
        <div className={styles.body}>
          <p>
            Used <code className={styles.inlineCode}>difflib.get_close_matches()</code> with{" "}
            <code className={styles.inlineCode}>cutoff=0.85</code>.
          </p>
          <p className={styles.tryItNote}>
            Plain English: score how many letters you&rsquo;d add, drop, or change to turn one word
            into the other. Closer spelling = higher score. It never looks at <em>meaning</em>.
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Comparison</th>
                <th>Similarity</th>
                <th>Correct?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>annatto</code> vs <code>achiote seeds</code>
                </td>
                <td>0.38 — no match</td>
                <td className={styles.bad}>✗ They&rsquo;re the same thing</td>
              </tr>
              <tr>
                <td>
                  <code>apple</code> vs <code>apple cider vinegar</code>
                </td>
                <td>0.67 — match</td>
                <td className={styles.bad}>✗ They are NOT the same thing</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Takeaway:</strong> Edit distance measures characters, not meaning.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "Plain English detour",
    node: (
      <>
        <h2 className={styles.title}>First — What&rsquo;s an Embedding?</h2>
        <div className={styles.body}>
          <ul>
            <li>
              An <strong>embedding</strong> turns a piece of text into a list of numbers that
              captures its <em>meaning</em> — like GPS coordinates for words.
            </li>
            <li>Similar meanings land near each other; unrelated things land far apart.</li>
            <li>
              <strong>Clustering</strong> then just groups the points that sit close together.
            </li>
            <li>
              The <code className={styles.inlineCode}>distance threshold</code> is the knob: how
              close is &ldquo;close enough&rdquo; to call two things the same. Lower = stricter.
            </li>
          </ul>
          <p className={styles.lead}>
            The catch: the model learned &ldquo;meaning&rdquo; from the open internet, not from a
            chef. It knows <code className={styles.inlineCode}>angelica</code> and{" "}
            <code className={styles.inlineCode}>jasmine</code> both <em>sound</em> floral — it has no
            idea you&rsquo;d never cook with them the same way.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "Attempt 3",
    node: (
      <>
        <h2 className={styles.title}>Semantic Embeddings</h2>
        <div className={styles.body}>
          <p>
            <code className={styles.inlineCode}>SentenceTransformer(&quot;all-MiniLM-L6-v2&quot;)</code> +
            Agglomerative Clustering (distance threshold = 1.2)
          </p>
          <div className={styles.columns}>
            <div className={styles.card}>
              <p className={`${styles.cardTitle} ${styles.good}`}>What it fixes</p>
              <ul>
                <li>
                  Groups <code className={styles.inlineCode}>bread</code>,{" "}
                  <code className={styles.inlineCode}>breads</code>,{" "}
                  <code className={styles.inlineCode}>bread, french</code> into one cluster
                </li>
                <li>Semantic similarity, not just character overlap</li>
              </ul>
            </div>
            <div className={styles.card}>
              <p className={`${styles.cardTitle} ${styles.bad}`}>What it breaks</p>
              <ul>
                <li>
                  <code className={styles.inlineCode}>annatto</code> and{" "}
                  <code className={styles.inlineCode}>achiote</code> still far apart — no food ontology
                </li>
                <li>Threshold tuning is brutal: too tight → 400 clusters; too loose → chicken + beef merge</li>
                <li>No ground truth to evaluate against</li>
              </ul>
            </div>
          </div>
          <div className={styles.tryItRow}>
            <TryIt href="/ingredient-clusters" label="browse the clusters this produced →" />
          </div>
        </div>
      </>
    ),
  },
  {
    kicker: "Anatomy of a bad cluster",
    node: (
      <>
        <h2 className={styles.title}>How a Cluster Becomes a Bug</h2>
        <div className={styles.body}>
          <pre className={styles.code}>{`embeddings = model.encode(index_data)            # MiniLM, 384-dim
AgglomerativeClustering(distance_threshold=1.2)  # "too loose"

# canonical name = most frequent token across the cluster...
Counter(tokens).most_common(1)[0][0]             # ...ties break on order`}</pre>
          <p>Run it over the name index and one cluster comes out as:</p>
          <pre className={styles.code}>{`["angelica", "biryani", "harissa", "jasmine"]  →  name: "Angelica"`}</pre>
          <ul>
            <li>
              Only <code className={styles.inlineCode}>angelica</code> is a real ingredient — the
              other three are <em>pairing</em> terms that got flattened into the name index
            </li>
            <li>MiniLM read all four as &ldquo;aromatic / fragrant&rdquo; and merged them at threshold 1.2</li>
            <li>
              Every token appears once, so <code className={styles.inlineCode}>most_common</code>{" "}
              tie-breaks on insertion order — <code className={styles.inlineCode}>angelica</code> won
              just for being first
            </li>
          </ul>
          <p>
            The other three are now permanent <code className={styles.inlineCode}>name_variants</code>{" "}
            of Angelica. No human approved this; the threshold did.
          </p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/ingredients?query=angelica" label="see it live in the data →" />
          </div>
        </div>
      </>
    ),
  },
  {
    kicker: "Live demo",
    node: (
      <>
        <h2 className={styles.title}>The &ldquo;Pepper&rdquo; Problem</h2>
        <div className={styles.body}>
          <p>
            Search <code className={styles.inlineCode}>pepper</code> and see what comes back —
            these are not the same ingredient. Some are the same plant at different stages. Some are
            completely different species. The database doesn&rsquo;t know the difference, and neither
            does the NLP.
          </p>
          <div className={styles.tryItRow}>
            <TryIt
              href="/api/flavorbible/ingredients?query=pepper"
              label="/api/flavorbible/ingredients?query=pepper"
            />
          </div>
          <p className={styles.tryItNote}>
            Expect ~20 hits: pepper black, pepper white, pepper pink, bell peppers, chile peppers,
            peppers piquillo… One keyword, 20 different things — and{" "}
            <strong>black pepper and bell pepper aren&rsquo;t even related plants.</strong> The word
            is the same; the ingredient isn&rsquo;t.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "Production reality",
    node: (
      <>
        <h2 className={styles.title}>What Actually Ships</h2>
        <div className={styles.body}>
          <p>
            <code className={styles.inlineCode}>search.ts</code> uses three-tier keyword relevance
            scoring:
          </p>
          <pre className={styles.code}>{`Score 3 — keyword at start of field:   "apple" → "apple pie"
Score 2 — keyword as whole word:        "apple" → "green apple"
Score 1 — keyword as substring:         "apple" → "pineapple"`}</pre>
          <p>
            <strong className={styles.good}>Result:</strong> Fast, deterministic, zero dependencies.
          </p>
          <p>
            <strong className={styles.bad}>Problem:</strong> Search{" "}
            <code className={styles.inlineCode}>annatto</code> → zero results, even though the
            ingredient exists as <code className={styles.inlineCode}>achiote</code>.
          </p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/flavorbible/ingredients?query=annatto" label="search 'annatto' (empty) →" />
            <TryIt href="/api/flavorbible/ingredients?query=achiote" label="search 'achiote' (hits) →" />
          </div>
          <p className={styles.tryItNote}>The semantic gap lives on in production.</p>
        </div>
      </>
    ),
  },
  {
    kicker: "The join",
    node: (
      <>
        <h2 className={styles.title}>Merging on Name = Merging on Trust</h2>
        <div className={styles.body}>
          <pre className={styles.code}>{`// join.ts
mergeFooDBAndFlavorBible(foodDBResults, flavorBibleResults)
// joins on: entry.name.toLowerCase() === other.name.toLowerCase()`}</pre>
          <p>
            If names don&rsquo;t match exactly (post-lowercase), the entry is{" "}
            <strong>dropped</strong> from the merged result.
          </p>
          <p>
            <strong>Consequence:</strong> &ldquo;shared&rdquo; results only show ingredients that
            appear in <em>both</em> databases with the <em>same name</em>. Anything with a synonym is
            invisible.
          </p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/search?query=corn" label="/api/search?query=corn — see 'shared' →" />
          </div>
        </div>
      </>
    ),
  },
  {
    kicker: "The fallback",
    node: (
      <>
        <h2 className={styles.title}>The Manual Curation Trap</h2>
        <div className={styles.body}>
          <pre className={styles.code}>{`{
  "name": "Angelica",
  "flavor_bible_name_variants": ["angelica", "biryani"],
  ...
}`}</pre>
          <p>When NLP fails, the fallback is manual variant annotation.</p>
          <ul>
            <li>~600 Flavor Bible ingredients × 2–3 variant forms = thousands of manual mappings</li>
            <li>
              <code className={styles.inlineCode}>biryani ≠ angelica</code> — a data error only a
              human can catch, one at a time
            </li>
          </ul>
          <p>
            <strong>This does not scale.</strong>
          </p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/ingredients?query=angelica" label="see the variant annotation →" />
          </div>
        </div>
      </>
    ),
  },
  {
    kicker: "The real problem",
    node: (
      <>
        <h2 className={styles.title}>A Knowledge Problem, Not a String Problem</h2>
        <div className={styles.body}>
          <ul>
            <li>
              NLP can cluster <em>similar strings</em> — it cannot know{" "}
              <code className={styles.inlineCode}>annatto</code> and{" "}
              <code className={styles.inlineCode}>achiote</code> are the same
            </li>
            <li>
              That knowledge lives in food ontologies: <strong>FoodON</strong>, <strong>FDC</strong>,{" "}
              <strong>USDA SR</strong>
            </li>
            <li>String matching + embeddings gets you ~70% of the way there</li>
            <li>The last 30% requires a controlled vocabulary or human review</li>
            <li>Every database has its own taxonomy, and no one agrees</li>
          </ul>
          <p className={styles.lead}>
            For engineers: we&rsquo;ve been joining on a display-name string. The fix is a stable
            foreign key that every database agrees on — we just don&rsquo;t have one yet.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "The tradeoff",
    node: (
      <>
        <h2 className={styles.title}>The FoodON Tradeoff</h2>
        <div className={styles.body}>
          <div className={styles.columns}>
            <div className={styles.card}>
              <p className={`${styles.cardTitle} ${styles.good}`}>What it gives you</p>
              <ul>
                <li>
                  Canonical URIs: annatto and achiote seeds both map to{" "}
                  <code className={styles.inlineCode}>FOODON_03309925</code>
                </li>
                <li>Hierarchy: granny smith is-a apple is-a fruit — variety collapse for free</li>
                <li>Stable identifiers that survive database renames</li>
              </ul>
            </div>
            <div className={styles.card}>
              <p className={`${styles.cardTitle} ${styles.bad}`}>What it doesn&rsquo;t</p>
              <ul>
                <li>You still map ~600 entries to FoodON — the same NLP problem, done once</li>
                <li>Thin on Indigenous &amp; regional ingredients: epazote, hoja santa, masa, corn silk</li>
                <li>The catalog reflects what its builders considered worth cataloguing</li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: 20 }}>
            FoodON is a <em>scientific</em> ontology. The Flavor Bible is a <em>culinary</em> one.
            They disagree about what counts as an ingredient — and neither is wrong.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "The path forward",
    node: (
      <>
        <h2 className={styles.title}>The Path Forward</h2>
        <div className={styles.body}>
          <ul>
            <li>
              Replace the ad-hoc NLP pipeline with <strong>FoodON ontology IDs</strong> as the
              canonical key — where coverage exists
            </li>
            <li>
              Every ingredient maps to a FoodON URI (e.g.{" "}
              <code className={styles.inlineCode}>FOODON_03301710</code>)
            </li>
            <li>NLP still useful for ingesting new data — map free text to ontology terms</li>
            <li>For gaps: build a custom extension, or accept manual curation at the edge</li>
          </ul>
          <p className={styles.lead} style={{ marginTop: 24 }}>
            Use NLP to get to the ontology. Use the ontology to know when you&rsquo;ve arrived. Accept
            that the ontology has gaps.
          </p>
        </div>
      </>
    ),
  },
  {
    kicker: "Takeaways",
    node: (
      <>
        <h2 className={styles.title}>Takeaways</h2>
        <div className={styles.body}>
          <ul>
            <li>
              Ingredient normalization is an <strong>entity resolution</strong> problem (deciding
              when two records are the same real-world thing), not a string matching problem
            </li>
            <li>Each NLP technique fixes one failure mode and introduces another</li>
            <li>The real fix is a shared controlled vocabulary — NLP is the bridge, not the destination</li>
            <li>Everything is harder when you&rsquo;re crossing datasets with different assumptions</li>
          </ul>
          <div className={styles.tryItRow}>
            <TryIt href="/" label="explore the full API →" />
            <TryIt href="/api/master-search?query=corn" label="master search →" />
          </div>
        </div>
      </>
    ),
  },
  {
    titleSlide: true,
    node: (
      <div className={styles.titleSlide}>
        <h1 className={styles.title}>Questions?</h1>
        <p className={styles.author}>Interactive Cookbook — Alessandra Vertrees</p>
      </div>
    ),
  },
];

export default function Presentation() {
  const [index, setIndex] = useState(0);

  const go = useCallback((delta: number) => {
    setIndex((i) => Math.min(Math.max(i + delta, 0), slides.length - 1));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1);
      else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = slides[index];

  return (
    <div className={styles.deck}>
      <div className={styles.progress} style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
      <section className={styles.slide} key={index}>
        {slide.kicker && <p className={styles.kicker}>{slide.kicker}</p>}
        {slide.node}
      </section>
      <nav className={styles.nav}>
        <button className={styles.navBtn} onClick={() => go(-1)} disabled={index === 0}>
          ← Prev
        </button>
        <span className={styles.counter}>
          {index + 1} / {slides.length}
          <span className={styles.hint}>← → to navigate</span>
        </span>
        <button
          className={styles.navBtn}
          onClick={() => go(1)}
          disabled={index === slides.length - 1}
        >
          Next →
        </button>
      </nav>
    </div>
  );
}
