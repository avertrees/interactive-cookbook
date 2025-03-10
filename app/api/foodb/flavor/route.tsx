import { NextRequest, NextResponse } from "next/server";
import data from '@/app/src/data/foodb_2020_04_07_json/Flavor.json'
import search from '@/app/src/utils/search'

// ['name','name_scientific','description','food_group','food_subgroup']
export const GET = async (request: NextRequest) => {
  // console.log("data is: ", data)
  const query = request?.nextUrl?.searchParams.get('query')
  console.log("query is: ", query)
  const results = query ? {"data": search(data.data, ['name','flavor_group','category'], query)} : data
  // console.log("results are: ", results);
  return NextResponse.json(results, { status: 200 });
}
// http://localhost:3000/api/foodb/flavor?query=corn