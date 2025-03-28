import Image from "next/image";
import styles from "@/app/page.module.css";
// https://panda-css.com/docs/concepts/responsive-design

export default function FoodDBItemPage({item}) {
  {console.log("item is: ", item)}
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
          {Object.keys(item).map((key, index)=>{
            console.log("key is: ", key)
            console.log("index is: ", index)
            return (
              <li key={index}>
                {/* <a
                  href={`/ingredient/${foodDBItem.public_id}`}
                  className={styles.secondary}
                > */}
                  {key}: {item[key]}
                {/* </a> */}
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  );
}
