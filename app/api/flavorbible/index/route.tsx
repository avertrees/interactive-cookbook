import { NextRequest, NextResponse } from "next/server";
import data from '@/app/src/data/flavorBible/data-formatted-json.json'
import onlyUnique from "@/app/src/utils/filter";
import ltrim from "@/app/src/utils/cleanup";
// ['name','name_scientific','description','food_group','food_subgroup']
// import filterStringsByCharacter from "@/app/src/utils/filter"
import search from '@/app/src/utils/search'

export const GET = async (request: NextRequest) => {
  // console.log("data is: ", data)
  const query = request?.nextUrl?.searchParams.get('query')
  console.log("query is: ", query)

  const ingredients = []
  let pairings = []
  data.data.map((object)=>{
    ingredients.push(object.ingredient)
    pairings.push.apply(pairings,object.pairings)
  }
  )
  pairings = pairings.map((str)=>{return ltrim(str)})
  const resultsArray = [...ingredients, ...pairings].filter(onlyUnique).sort()
  const cleanedUpResults = {
    "results (unique and combined list of ingredients and pairings)": resultsArray,
    "varieties (includes ,)": resultsArray.filter(str => str.includes(',')),
    "combinations (includes ands and ors)": resultsArray.filter((str)=> (str.includes('and')||str.includes('or'))),
    "headers (no ands, ors, or ,)": resultsArray.filter((str)=> (!(str.includes(',')||str.includes('and')||str.includes('or')))),
    "single words": resultsArray.filter((str)=> (!(str.includes(',')||str.includes('and')||str.includes('or')||str.includes(' ')))),
    ingredients: ingredients,
    pairings: pairings.filter(onlyUnique).sort()
  }
  const filteredCleanedUpAray = Object.keys(cleanedUpResults).map((field)=>{
    console.log("field: ", field)
    const resObject = {}
    resObject[field] = cleanedUpResults[field].filter(item => item.includes(query))
    return resObject
    // {`${field}`: cleanedUpResults[field].filter(item => item.includes(query))}
  })
  const results = query ? filteredCleanedUpAray : cleanedUpResults
  cleanedUpResults
  // console.log("results are: ", results);
  return NextResponse.json(results, { status: 200 });
}

// http://localhost:3000/api/flavorbible/index