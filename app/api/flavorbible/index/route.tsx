import { NextRequest, NextResponse } from "next/server";
import data from '@/app/src/data/flavorBible/cleaned_data.json'
import {cleanUpResults, filterCleanedUpArray, getStructuredDataByRootUsingFirstWord, getStructuredDataByRootUsingFirstPhrase}from '@/app/src/utils/flavorbible'

export const GET = async (request: NextRequest) => {
  const query = request?.nextUrl?.searchParams.get('query')

  const cleanedUpResults = cleanUpResults(data)
  const filteredCleanedUpAray = filterCleanedUpArray(cleanedUpResults, query)

  const results = query ? filteredCleanedUpAray : cleanedUpResults
  const resObj = {
    "organized by root (single) word": getStructuredDataByRootUsingFirstWord(results["results (unique and combined list of ingredients and pairings)"]),
    // "organized by root (phrase) word": getStructuredDataByRootUsingFirstPhrase(results["results (unique and combined list of ingredients and pairings)"]),
    results: results,
  }
  return NextResponse.json(resObj, { status: 200 });
}

// http://localhost:3000/api/flavorbible/index