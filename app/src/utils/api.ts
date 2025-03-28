// import logger from "logger";

// /**
//  * Makes a GET or POST request to the Repo API and returns the response.
//  * Times out at 10 seconds to prevent 504 crash.
//  * @param {string} apiUrl - The URL for the API request.
//  * @param {object} options - Options for the request:
//  *   - method: "GET" or "POST" (default is "GET").
//  *   - params: URL parameters for GET requests.
//  *   - body: Body data for POST requests.
//  *   - isRepoApi: Boolean flag to determine if Repo API authorization should be included.
//  * @returns {Promise<any>} - The API response.
//  */

//   export const fetchApi = async ({
//     apiUrl,
//     options = {},
//   }: {
//     apiUrl: string;
//     options?: {
//       method?: "GET" | "POST";
//       params?: { [key: string]: any };
//       body?: any;
//       requiresHeaders?: boolean;
//     };
//   }) => {
  
//     // update to take many auth tokens
//   const apiKey = process.env.AUTH_TOKEN;
  
//   const { method = "GET", params, body, requiresHeaders = true } = options;


//   const headers = {
//     Authorization: `Token token=${apiKey}`,
//     ...(method === "POST" && { "Content-Type": "application/json" }),
//   };

//   if (method === "GET" && params) {
//     const queryString = "?" + new URLSearchParams(params).toString();
//     apiUrl += queryString;
//   }

//   try {
//     const response = (await fetch(apiUrl, {
//       method,
//       ...(requiresHeaders ? { headers } : {}),
//       body: method === "POST" ? JSON.stringify(body) : undefined,
//     })) as Response;

//     if (!response.ok) {
//       throw new Error(
//         `fetchApi: ${response.status} ${
//           response.statusText ? response.statusText : "No message"
//         }`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     logger.error(error);
//     throw new Error(error.message);
//   }
// };


// #Food DB https://foodb.ca/api/v1/foodreport/food
// #description may include info about country of origin 
// #also includes Taxonomy
// #OpenFoodFacts https://world.openfoodfacts.org/cgi/search.pl
// openFoodFactsEmail =
// openFoodFactsKey = 
// email = 
// TODO: make it work
export const getDataFromFoodDB = async (apiUrl: string) => {
  // process.env.AUTH_TOKEN;
  // process.env.apiEmail = avertrees447@gmail.com
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": process.env.fooDBAPIKEY
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

// # API Endpoints
// # URL	Verb	Purpose
// # /food/{fdcId}	GET	Fetches details for one food item by FDC ID
// # /foods	GET | POST	Fetches details for multiple food items using input FDC IDs
// # /foods/list	GET | POST	Returns a paged list of foods, in the 'abridged' format
// # /foods/search	GET | POST	Returns a list of foods that matched search (query) keywords
// usdaAPIEmail = avertrees447@gmail.com 
// usdaAPIKey = 8u6ofSAd1wxQGkB6wdu8aHzl7aqUksB6N2hEgCNw
// usdaAPIBaseURL = https://api.nal.usda.gov/fdc/v1/foods?api_key=8u6ofSAd1wxQGkB6wdu8aHzl7aqUksB6N2hEgCNw
// TODO: make it work
export const getDataFromUSDA= async (apiUrl: string) => {
  // process.env.AUTH_TOKEN;
  // process.env.apiEmail = avertrees447@gmail.com
  const url = apiUrl + '?api_key=' + process.env.usdaAPIKey
  console.log("url is: ", url)
  try {
    const response = await fetch(url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "X-Auth-Token": process.env.usdaAPIKey
        }
      });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

// #Opendataweb - https://apps.fas.usda.gov/opendatawebV2/#/
// opendatawebV2APIKey = iBWf3DX2Zp12Hi4WcNbhDb8Lq0IMBErptzvgBvD0
// opendatawebV2Email = avertrees447@gmail.com
// opendatawebV2BaseURL = https://api.fas.usda.gov/api/esr/regions
export const getDataFromOpenDataWeb = async (apiUrl: string) => {
  const url = apiUrl + '?api_key=' + process.env.opendatawebV2APIKey
  console.log("url is: ", url)
  try {
    const response = await fetch(url,
      {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "X-Auth-Token": process.env.opendatawebV2APIKey
      }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("json is: ", json)

    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

// #Edamam
// # https://developer.edamam.com/food-database-api
// EdamamApplicationID = b453c148
// EdamamAPIKey = 580947679618563f1ccc325e1e12b349	
export const getDataFromEdamam = async (apiUrl: string) => {
  // process.env.AUTH_TOKEN;
  // process.env.apiEmail = avertrees447@gmail.com
  const url = apiUrl + '?app_id=' + process.env.EdamamApplicationID + '&app_key=' + process.env.EdamamAPIKey + '&ingr=corn'
  console.log("url is: ", url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}  

const createURL = (path) => {
  return window.location.origin + path
}