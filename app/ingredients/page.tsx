"force-dynamic";

import Image from "next/image";
import styles from "@/app/page.module.css";
import { getIngredients, getUniqueFoodsByFoodGroup, getUniqueFoodsByFoodSubGroup } from "@/app/src/utils/utils";
import search from "../src/utils/search";
import {sortIngredientsByField} from '@/app/src/utils/sort'

export default function customFoodBIndexPage({searchParams}) {
  const foodGroupFilter = searchParams['food_group'];
  const foodSubGroupFilter = searchParams['food_subgroup'];

  let data = getIngredients()
  if (foodGroupFilter){
    data = getUniqueFoodsByFoodGroup(data, foodGroupFilter)
  } 

  if (foodSubGroupFilter) {
    data = getUniqueFoodsByFoodSubGroup(data, foodSubGroupFilter)
  } 


  // sort by alphabetical order if any sort field is provided
  const sort = searchParams['sort']

  if (sort) {
    data = sortIngredientsByField(data, "name")
  }

  // TODO: search
  // const query = searchParams['query']
  // console.log("query is: ", query)
  // const results = query ? {"data": search(data, ["id", "name", "flavor_bible_name_variants","flavor_bible_pairings_ids", "status"], query)} : data

  return (
    <ol>
      {data.map((ingredient, index)=>{
        return (
          <li key={index}>
            <a
              href={`/ingredients/${ingredient.id}`}
              className={styles.secondary}
            >
              {ingredient.name}
            </a>
          </li>
        )
      })}
    </ol>
  );
}
