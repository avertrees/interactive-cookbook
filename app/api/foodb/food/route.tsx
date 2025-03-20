import { NextRequest, NextResponse } from "next/server";
import data from '@/app/src/data/foodb_2020_04_07_json/Food.json'
import search from '@/app/src/utils/search'

// ['name','name_scientific','description','food_group','food_subgroup']
export const GET = async (request: NextRequest) => {
  // console.log("data is: ", data)
  const query = request?.nextUrl?.searchParams.get('query')
  const results = query ? {"data": search(data.data, ['name','name_scientific','description','food_group','food_subgroup'], query)} : data
  // console.log("results are: ", results);
  return NextResponse.json(results, { status: 200 });
}

// http://localhost:3000/api/foodb/food?query=corn