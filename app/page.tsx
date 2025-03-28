import Image from "next/image";
import styles from "./page.module.css";
// https://panda-css.com/docs/concepts/responsive-design
// import Grid from "@/app/src/components/Grid"
// import SearchForm from "@/app/src/components/SearchForm"
import data from '@/app/src/data/flavorBible/data-formatted-json.json'

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <SearchForm />
      <Grid /> */}

      <main className={styles.main}>
        <a href="/ingredients" className="button">Go to Ingredients List</a>
      </main>
    </div>
  );
}
