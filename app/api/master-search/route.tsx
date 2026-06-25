import { NextRequest, NextResponse } from "next/server";
import fooDBData from '@/data/drafts/foodb/foodb_2020_04_07_json/Food.json'
import flavorBibleData from '@/data/drafts/flavorBible/data-formatted-json.json'
import search from '@/app/src/utils/search'

// Live external search helpers. Each returns [] on any failure so that one
// unavailable source can't break the whole response.
const searchUSDA = async (ingredient: string) => {
  try {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=Foundation&api_key=${process.env.usdaAPIKey}`
    const response = await fetch(url)
    if (!response.ok) return []
    const json = await response.json()
    // Drop the bulky per-food nutrient data from the results.
    return (json.foods ?? []).map(({ foodNutrients, ...food }: any) => food)
  } catch {
    return []
  }
}

const searchEdamam = async (ingredient: string) => {
  try {
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EdamamApplicationID}&app_key=${process.env.EdamamAPIKey}&ingr=${ingredient}`
    const response = await fetch(url)
    if (!response.ok) return []
    const json = await response.json()
    // Only the food names are needed — drop measures and other fields, and dedupe.
    const names = (json.hints ?? []).map((hint: any) => hint.food?.label).filter(Boolean)
    return [...new Set(names)]
  } catch {
    return []
  }
}

export const GET = async (request: NextRequest) => {
  const query = request?.nextUrl?.searchParams.get('query')

  if (!query) {
    return NextResponse.json(
      { error: "Provide a ?query= parameter, e.g. /api/master-search?query=corn" },
      { status: 400 }
    )
  }

  // Internal datasets (local JSON) — synchronous relevance search.
  const flavorBibleResults = search(flavorBibleData.data, ['ingredient', 'pairings'], query)
  const fooDBResults = search(fooDBData.data, ['name', 'food_group', 'food_subgroup'], query)

  // External live APIs — fetched in parallel.
  const [usdaResults, edamamResults] = await Promise.all([
    searchUSDA(query),
    searchEdamam(query),
  ])

  const results = {
    query,
    counts: {
      usda: usdaResults.length,
      edamam: edamamResults.length,
      flavorBible: flavorBibleResults.length,
      fooDB: fooDBResults.length,
    },
    usdaResults,
    edamamResults,
    flavorBibleResults,
    fooDBResults,
  }

  return NextResponse.json(results, { status: 200 });
}

// http://localhost:3000/api/master-search?query=corn
