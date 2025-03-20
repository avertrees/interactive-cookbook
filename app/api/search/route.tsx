import { NextRequest, NextResponse } from "next/server";
import fooDBData from '@/app/src/data/foodb_2020_04_07_json/Food.json'
import flavorBibleData from '@/app/src/data/flavorBible/data-formatted-json.json'
import search from '@/app/src/utils/search'
import {cleanUpResults, filterCleanedUpArray}from '@/app/src/utils/flavorbible'
import {mergeFooDBAndFlavorBible} from '@/app/src/utils/join'
// ['name','name_scientific','description','food_group','food_subgroup']
export const GET = async (request: NextRequest) => {
  // console.log("data is: ", data)
  const query = request?.nextUrl?.searchParams.get('query')
  // console.log("query is: ", query)

  // search fooDB and FlaborBible
  const fooDBResults = query ? search(fooDBData.data, ['name','food_group','food_subgroup'], query) : fooDBData
  // console.log("fooDBResults are: ", fooDBResults.length);

  const flavorBibleResults =  query ? filterCleanedUpArray(cleanUpResults(flavorBibleData),query) : cleanUpResults(flavorBibleData)
  // console.log("flavorbible is: ", flavorBibleResults[0]["results (unique and combined list of ingredients and pairings)"].length)

  const results = {
    "shared": mergeFooDBAndFlavorBible(fooDBResults, flavorBibleResults[0]["results (unique and combined list of ingredients and pairings)"]),
    "fooDBResults": fooDBResults,
    "flavorBibleResults": flavorBibleResults[0]["results (unique and combined list of ingredients and pairings)"],
  }

  return NextResponse.json(results, { status: 200 });
}

// http://localhost:3000/api/foodb/food?query=corn