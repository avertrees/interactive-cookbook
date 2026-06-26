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
  // 1 — Title
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

  // 2 — The goal
  {
    kicker: "The goal",
    node: (
      <>
        <h2 className={styles.title}>One Search, Four Databases</h2>
        <div className={styles.body}>
          <p>
            The first goal was to search one ingredient across four data sources at once — to{" "}
            <strong>evaluate which ones are worth building on</strong>:
          </p>
          <ul>
            <li>
              <strong>Flavor Bible</strong> — what it pairs with (&ldquo;apple + cinnamon&rdquo;)
            </li>
            <li>
              <strong>FooDB</strong> — scientific name, food group, flavor compounds
            </li>
            <li>
              <strong>Edamam</strong> — live nutrition data
            </li>
            <li>
              <strong>USDA</strong> — government nutrient database (FoodData Central)
            </li>
          </ul>
          <p className={styles.tryItNote}>That&rsquo;s the goal. Here&rsquo;s why it&rsquo;s hard.</p>
        </div>
      </>
    ),
  },

  // 3 — Flavor Bible data pipeline
  {
    kicker: "Where the data starts",
    node: (
      <>
        <h2 className={styles.title}>Wrangling the Flavor Bible</h2>
        <div className={styles.body}>
          <p>The Flavor Bible is a book of pairings. Getting it usable took three passes:</p>
          <p>
            <strong>1. Raw scrape</strong> — 26,133 flat rows, one per pairing
          </p>
          <pre className={styles.code}>{`{ "main": "ACHIOTE SEEDS", "pairing": "beef" }      // ×26,133`}</pre>
          <p>
            <strong>2. Group by ingredient</strong> — collapse to ~537 ingredients
          </p>
          <pre className={styles.code}>{`{ "ingredient": "achiote seeds",
  "pairings": ["beef","chicken","chiles","fish", ...] }`}</pre>
          <p>
            <strong>3. Build a master index</strong> — every unique name, sliced into views
          </p>
          <pre className={styles.code}>{`results: 2,248 names · ingredients: 537 · pairings: 2,118`}</pre>
          <div className={styles.tryItRow}>
            <TryIt href="/api/flavorbible/ingredients" label="the grouped data →" />
            <TryIt href="/api/flavorbible/index" label="the master index →" />
          </div>
        </div>
      </>
    ),
  },

  // 4 — Problem A: one word, many things (CORN)
  {
    kicker: "Problem #1",
    node: (
      <>
        <h2 className={styles.title}>One Word, Many Things</h2>
        <div className={styles.body}>
          <p>
            We assumed the same ingredient has the same name. It doesn&rsquo;t. Corn is{" "}
            <em>one plant</em> — but these are all separate, real database entries:
          </p>
          <table className={styles.table}>
            <tbody>
              {[
                ["corn", "the kernel / the plant"],
                ["hominy", "nixtamalized corn"],
                ["masa", "milled nixtamalized corn"],
                ["corn silk", "the silk of the cob — used in teas"],
                ["corn husk", "the outer casing — used in tamales"],
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
          <p>Nothing in the data says these share a plant.</p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/master-search?query=corn" label="search 'corn' across all four →" />
          </div>
        </div>
      </>
    ),
  },

  // 4 — Pepper (live, right after corn)
  {
    kicker: "Problem #1, live",
    node: (
      <>
        <h2 className={styles.title}>The &ldquo;Pepper&rdquo; Problem</h2>
        <div className={styles.body}>
          <p>
            Same story, even messier — one word, dozens of different things. And black pepper and
            bell pepper aren&rsquo;t even related plants.
          </p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/master-search?query=pepper" label="search 'pepper' across all four →" />
          </div>
        </div>
      </>
    ),
  },

  // 5 — Problem B: many words, one thing (synonyms)
  {
    kicker: "Problem #2",
    node: (
      <>
        <h2 className={styles.title}>Many Words, One Thing</h2>
        <div className={styles.body}>
          <p>The mirror image: the same spice, two totally different names across databases.</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Database</th>
                <th>Calls it</th>
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
          <p className={styles.lead}>
            So matching has to solve <em>both</em>: one name covering many things, and many names
            covering one thing.
          </p>
        </div>
      </>
    ),
  },

  // 6 — Three fixes, consolidated
  {
    kicker: "What we tried",
    node: (
      <>
        <h2 className={styles.title}>Three Tries, Three New Problems</h2>
        <div className={styles.body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>We tried</th>
                <th className={styles.good}>It fixed</th>
                <th className={styles.bad}>It broke</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. Clean the strings (lowercase, strip punctuation)</td>
                <td>Capitalization, punctuation</td>
                <td>Synonyms still miss: achiote ≠ annatto</td>
              </tr>
              <tr>
                <td>2. Fuzzy match (count letter edits)</td>
                <td>Typos: yoghurt = yogurt</td>
                <td>&ldquo;apple&rdquo; ≈ &ldquo;apple cider vinegar&rdquo; — wrong</td>
              </tr>
              <tr>
                <td>3. Embeddings (group by meaning)</td>
                <td>bread, breads, bread french → one</td>
                <td>Over-merges by &ldquo;vibe&rdquo; → next slide</td>
              </tr>
            </tbody>
          </table>
          <p className={styles.tryItNote}>
            An <strong>embedding</strong> turns each name into numbers so similar meanings sit nearby;
            then we group the nearby ones. Handy — but it learned &ldquo;meaning&rdquo; from the open
            internet, not from a chef.
          </p>
        </div>
      </>
    ),
  },

  // 7 — How a cluster becomes a bug (angelica)
  {
    kicker: "When 'meaning' goes wrong",
    node: (
      <>
        <h2 className={styles.title}>How a Cluster Becomes a Bug</h2>
        <div className={styles.body}>
          <p>The embedding model grouped these four into one ingredient, and named it Angelica:</p>
          <pre className={styles.code}>{`["angelica", "biryani", "harissa", "jasmine"]  →  "Angelica"`}</pre>
          <ul>
            <li>
              Only <code className={styles.inlineCode}>angelica</code> is a real ingredient — the rest
              are unrelated
            </li>
            <li>The model merged them because they all &ldquo;sound aromatic&rdquo;</li>
            <li>No human approved this. The distance setting did.</li>
          </ul>
          <div className={styles.tryItRow}>
            <TryIt href="/api/ingredients?query=angelica" label="see it live in the data →" />
          </div>
        </div>
      </>
    ),
  },

  // — The iterative reality
  {
    kicker: "The reality",
    node: (
      <>
        <h2 className={styles.title}>It Took a Lot of Passes</h2>
        <div className={styles.body}>
          <p>
            It wasn&rsquo;t three clean attempts — it was many iterations over the same list. Each
            one is still a file in the repo:
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pass</th>
                <th>What it tried</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["sample.txt", "Grouping variants by hand (basil, chicken…) — accurate, doesn't scale"],
                ["reformat.txt", "Split messy names into one clean ingredient list"],
                ["grouped.json", "Auto-group by first word → 825 root buckets"],
                ["index.json", "Slice into views: ingredients / varieties / headers / single words"],
                ["cleaned_data.json", "Dedupe pass"],
                ["clustering.ipynb", "Embeddings + clustering (the previous two slides)"],
              ].map(([file, what]) => (
                <tr key={file}>
                  <td>
                    <code>{file}</code>
                  </td>
                  <td>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 8 — What actually ships
  {
    kicker: "What shipped",
    node: (
      <>
        <h2 className={styles.title}>What Actually Ships</h2>
        <div className={styles.body}>
          <p>Production uses plain keyword search — rank by where the word appears:</p>
          <pre className={styles.code}>{`"apple" → "apple pie"     (starts with it)   — best
"apple" → "green apple"   (whole word)       — good
"apple" → "pineapple"     (substring)        — meh`}</pre>
          <p>
            <strong className={styles.good}>Fast, simple, no dependencies.</strong>{" "}
            <strong className={styles.bad}>But</strong> search{" "}
            <code className={styles.inlineCode}>annatto</code> → nothing, even though the same spice is
            in there as <code className={styles.inlineCode}>achiote</code>.
          </p>
          <div className={styles.tryItRow}>
            <TryIt href="/api/flavorbible/ingredients?query=annatto" label="'annatto' → empty →" />
            <TryIt href="/api/flavorbible/ingredients?query=achiote" label="'achiote' → found →" />
          </div>
        </div>
      </>
    ),
  },

  // 9 — Why more matching won't fix it
  {
    kicker: "The real problem",
    node: (
      <>
        <h2 className={styles.title}>It&rsquo;s a Knowledge Problem</h2>
        <div className={styles.body}>
          <ul>
            <li>Matching — even smart matching — only compares words</li>
            <li>
              It can&rsquo;t <em>know</em> that achiote and annatto are the same spice. That&rsquo;s a
              fact about the world, not about the spelling.
            </li>
          </ul>
        </div>
      </>
    ),
  },

  // 10 — The real fix
  {
    kicker: "The fix",
    node: (
      <>
        <h2 className={styles.title}>The Real Fix: A Shared ID</h2>
        <div className={styles.body}>
          <ul>
            <li>
              Give every ingredient a stable ID from a food ontology (e.g. <strong>FoodON</strong>) —
              a foreign key everyone agrees on
            </li>
            <li>
              <code className={styles.inlineCode}>achiote seeds</code> and{" "}
              <code className={styles.inlineCode}>Annatto</code> → the same ID
            </li>
            <li>
              <strong>Tradeoff:</strong> great for common foods, thin on regional ones (epazote, masa,
              corn silk)
            </li>
          </ul>
        </div>
      </>
    ),
  },

  // 11 — Takeaways
  {
    kicker: "Takeaways",
    node: (
      <>
        <h2 className={styles.title}>Takeaways</h2>
        <div className={styles.body}>
          <ul>
            <li>
              It&rsquo;s <strong>entity resolution</strong> (when are two records the same thing?), not
              string matching
            </li>
            <li>Every fancier matching trick fixed one thing and broke another</li>
            <li>The real fix is a shared ID — NLP is the bridge, not the destination</li>
          </ul>
          <div className={styles.tryItRow}>
            <TryIt href="/" label="explore the full API →" />
            <TryIt href="/api/master-search?query=corn" label="master search →" />
          </div>
        </div>
      </>
    ),
  },

  // — What's next: FoodON for the cookbook
  {
    kicker: "What's next — the cookbook",
    node: (
      <>
        <h2 className={styles.title}>Next: One Canonical Ingredient ID</h2>
        <div className={styles.body}>
          <ol>
            <li>
              Map each ingredient to a <strong>FoodON ID</strong> — NLP does the first pass, a human
              confirms the edge cases
            </li>
            <li>
              Inherit FoodON&rsquo;s botanical hierarchy, so varieties and synonyms collapse for free
              (<code className={styles.inlineCode}>corn</code> ⊃ hominy, masa, corn silk)
            </li>
            <li>
              The two sources — Flavor Bible & FooDB — finally join on a shared key,
              not a name string
            </li>
          </ol>
          <p className={styles.lead}>
            For the cookbook: search <code className={styles.inlineCode}>corn</code> → pairings,
            nutrition, and compounds, reliably merged — no more guessing whether achiote = annatto.
          </p>
        </div>
      </>
    ),
  },

  // — What's next: a native seed library (ties back to NYPL)
  {
    kicker: "Back to the library",
    node: (
      <>
        <h2 className={styles.title}>And a Native Seed Library</h2>
        <div className={styles.body}>
          <p>
            Libraries lend seeds too. A native seed library (e.g. Native Seeds/SEARCH) catalogs the
            subgroups <em>below</em> a species — <strong>varieties, cultivars, and landraces</strong>:
          </p>
          <ul>
            <li>
              One species (e.g. <code className={styles.inlineCode}>corn</code> / <em>Zea mays</em>)
              splits into many subgroups — cultivars are human-selected and named; landraces are
              locally adapted and often unnamed
            </li>
            <li>
              The data worth saving lives at this level: environmental adaptation — climate, altitude,
              region, soil — plus provenance and who&rsquo;s been keeping the seed
            </li>
            <li>
              So a seed library sits a level <em>below</em> the ingredient: one FoodON species → many
              distinct, seed-saved subgroups
            </li>
          </ul>
          <p className={styles.lead}>
            The ontology work becomes the backbone: hang variety records off a known plant, and link
            what you can <em>grow</em> to what you can <em>cook</em> — seeds, climate, culture, and
            cuisine then merge into one graph.
          </p>
        </div>
      </>
    ),
  },

  // — Questions
  {
    titleSlide: true,
    node: (
      <div className={styles.titleSlide}>
        <h1 className={styles.title}>Questions?</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.questionsImg} src="./sheep-oranges.jpg"/>
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
