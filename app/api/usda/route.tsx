import { NextResponse } from "next/server";
import {getDataFromFoodDB, getDataFromEdamam, getDataFromOpenDataWeb, getDataFromUSDA} from "../../src/utils/api";

export const GET = async () => {
  // const data = await getDataFromFoodDB(``)
  // const data = await getDataFromUSDA('https://api.nal.usda.gov/fdc/v1/foods')
  // const data = await getDataFromOpenDataWeb('https://api.fas.usda.gov/api/esr/regions')
  // const data = await getDataFromEdamam('https://api.edamam.com/api/food-database/v2/parser')

  // console.log("data is: ", data)
  const url = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=corn&api_key=' + process.env.usdaAPIKey
  console.log("url is: ", url)
  
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

// http://localhost:3000/api/path

