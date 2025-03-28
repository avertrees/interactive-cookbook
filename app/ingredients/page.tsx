import Image from "next/image";
import styles from "@/app/page.module.css";
// https://panda-css.com/docs/concepts/responsive-design
// import Grid from "@/app/src/components/Grid"
import SearchForm from "@/app/src/components/SearchForm"
import data from '@/app/src/data/foodb_2020_04_07_json/Food.json'
import { FoodDBFoodItemType } from "../src/types/FoodDBFoodItem";

export default function foodDBIndexPage() {
  // {console.log("data is: ", data)}
  return (
    <div className={styles.page}>
      <SearchForm />
      {/* <Grid /> */}
      <main className={styles.main}>
        <ol>
          {data.data.map((foodDBItem, index)=>{
            return (
              <li key={index}>
                <a
                  href={`/ingredients/${foodDBItem.public_id}`}
                  className={styles.secondary}
                >
                  FoodDB Name: {foodDBItem.name}
                </a>
              </li>
            )
          })}
        </ol>
      </main>
    </div>
  );
}
