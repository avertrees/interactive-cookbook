import { NextRequest, NextResponse } from "next/server";
import {getDataFromFoodDB, getDataFromEdamam, getDataFromOpenDataWeb, getDataFromUSDA} from "../../src/utils/api";
// https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1#/
// https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1#/FDC/getFood
// https://fdc.nal.usda.gov/api-guide#bkmk-3
// https://fdc.nal.usda.gov/bkmk-2
export const GET = async (request: NextRequest) => {
  // https://api.nal.usda.gov/fdc/v1/foods/search?query=cheese&dataType=Foundation&pageSize=25&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=8u6ofSAd1wxQGkB6wdu8aHzl7aqUksB6N2hEgCNw
  const ingredient = request?.nextUrl?.searchParams.get('ingredient')

  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&dataType=Foundation&api_key=${process.env.usdaAPIKey}`
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return NextResponse.json(json, { status: 200 });

  } catch (error) {
    console.error(error.message);
    return NextResponse.json({"message":"error"}, { status: 404 });
  }

};
// http://localhost:3000/api/usda?ingredient=culture

