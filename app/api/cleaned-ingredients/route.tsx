import { NextRequest, NextResponse } from "next/server";
import { getCleanedIngredients } from "@/app/src/utils/utils";
import search from '@/app/src/utils/search'
import {sortIngredientsByField} from '@/app/src/utils/sort'

export const GET = async (request: NextRequest) => {
  let data = await getCleanedIngredients()
  console.log("data is: ", data)
  const sort = request?.nextUrl?.searchParams.get('sort')

  //sort by alphabetical order
  if (sort) {
    data = sortIngredientsByField(data, "name")
  }
  const query = request?.nextUrl?.searchParams.get('query')
  console.log("query is: ", query)
  const results = query ? {"data": search(data, ["id", "name", "flavor_bible_name_variants","flavor_bible_pairings_ids", "status"], query)} : data
  return NextResponse.json(results, { status: 200 });
}

// http://localhost:3000/api/ingredients