import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <a href="/ingredients" className="button">Go to Ingredients List</a>
      </main>
    </div>
  );
}
