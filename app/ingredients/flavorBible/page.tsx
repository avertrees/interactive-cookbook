import Image from "next/image";
import styles from "@/app/page.module.css";

// https://panda-css.com/docs/concepts/responsive-design
// import Grid from "@/app/src/components/Grid"
// import SearchForm from "@/app/src/components/SearchForm"
import data from '@/app/src/data/flavorBible/data-formatted-json.json'

export default function flavorBibleIndexPage() {
  return (
    <div className={styles.page}>
      {/* <SearchForm />
      <Grid /> */}

      <main className={styles.main}>
        <ol>
          {data.data.map((flavorBibleObj)=>{
            return (
              <li>
                <a
                  href={'/ingredient'}
                  className={styles.secondary}
                >
                  Ingredient: {flavorBibleObj.ingredient}
                </a>
                  <ol>
                  {flavorBibleObj.pairings.map((pairing)=>{
                    return (
                      // TO DO: update href
                    <li>
                      <a
                      href={`/ingredient/flavorBible/`}
                      className={styles.secondary}
                      >
                      Ingredient: {pairing}
                      </a>
                    </li>
                    )
                  })}
                  </ol>
              </li>
            )
          })}
        </ol>
      </main>
    </div>
  );
}
