import { NextRequest, NextResponse } from "next/server";
import data from '@/data/drafts/foodb/foodb_2020_04_07_json/HealthEffect.json'
import search from '@/app/src/utils/search'

// FooDB's full Content table is too large to bundle, so this endpoint serves the
// local HealthEffect table as a stand-in. Supports an optional ?query= search.
export const GET = async (request: NextRequest) => {
  const query = request?.nextUrl?.searchParams.get('query')
  const results = query ? {"data": search(data.data, ['name','description','chebi_name'], query)} : data
  return NextResponse.json(results, { status: 200 });
}

// http://localhost:3000/api/foodb/content?query=anti
