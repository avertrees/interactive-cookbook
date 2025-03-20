import onlyUnique from "@/app/src/utils/filter";
import ltrim from "@/app/src/utils/cleanup";

export const cleanUpResults = (data) => {
  const ingredients = []
  let pairings = []
  data.data.map((object)=>{
    ingredients.push(object.ingredient)
    pairings.push.apply(pairings,object.pairings)
  })
  pairings = pairings.map((str)=>{return ltrim(str)})
  const resultsArray = [...ingredients, ...pairings].filter(onlyUnique).sort()
  const cleanedUpResults = {
    "results (unique and combined list of ingredients and pairings)": resultsArray,
    "single words": getSingleWordsFromFoodBibleData(resultsArray), //resultsArray.filter((str)=> (!(str.includes(',')||str.includes('and')||str.includes('or')||str.includes(' ')))),
    // "single words cleaned up:": cleanUpSingleWordRoots(resultsArray),
    // "organized by root (single) word": getStructuredDataByRoot(resultsArray),
    "first segmant (split on , and return first substring)": getRootFromFoodBibleString(resultsArray),//resultsArray.map((str)=>{return str.split(',')[0]}).filter(onlyUnique),
    "headers (no ands, ors, or ',' or () )": getHeadersFromFoodBibleData(resultsArray),//resultsArray.filter((str)=> (!(str.includes(',')||str.includes('and')||str.includes('or')||str.includes('(')||str.includes(')')))),
    "has varieties (includes ,)": getStringsThatIncludeComma(resultsArray), //resultsArray.filter(str => str.includes(',')),
    "combinations (includes ands and ors)": getStringsThatIncludeAndOr(resultsArray), //resultsArray.filter((str)=> (str.includes('and')||str.includes('or'))),
    "has colon": getStringsThatIncludeColon(resultsArray),
    ingredients: ingredients,
    pairings: pairings.filter(onlyUnique).sort()
  }
  return cleanedUpResults
 }

// Not perfect
//  Would be nice to go one level further and group them another level
export const getStructuredDataByRootUsingFirstWord = (items: string[]) =>{
  // const singleWords = getSingleWordsFromFoodBibleData(items)
  let hierarchy = {}
  items.forEach((item)=>{
    let parts = item.replace(',', '').split(' ')
    
      let root = parts[0]
      if(!hierarchy[root]){
        hierarchy[root] = {}
      }

      parts.shift()

      let descriptors = parts
      if (descriptors.length != 0) {
        console.log("descriptors :", descriptors)
        let first_category = descriptors.join(' ')//.replace(',', ' ').replace(',,', ' ')
        if (!hierarchy[root][first_category]){
          hierarchy[root][first_category] = []
        }
        // .append(item)

        hierarchy[root][first_category].push(item) // flavor bible item
      } else {
        // hierarchy[root].push({"general": [item]})
        // hierarchy[root]["general"]
        if (!hierarchy[root]["general"]){
          hierarchy[root]["general"] = []
        }
        // console.log("item is: ", item)
        hierarchy[root]["general"].push(item) // flavor bible item
      }
    
    })

    // items.forEach((item)=>{
    //   let parts = item.replace(',', '').split(' ')

    //   parts.forEach((part, index) => {
    //     let root = parts[0]
        
    //     if(!hierarchy[part]){
    //       hierarchy[part] = {}
    //     }
  
    //     parts.shift()
  
    //     let descriptors = parts
    //     if (descriptors.length != 0) {
          
    //       let first_category = descriptors.join(' ')//.replace(',', ' ').replace(',,', ' ')
    //       if (!hierarchy[root][first_category]){
    //         hierarchy[root][first_category] = []
    //       }
    //       // .append(item)
  
    //       hierarchy[root][first_category].push(item) // flavor bible item
    //     } else {
    //       // hierarchy[root].push({"general": [item]})
    //       // hierarchy[root]["general"]
    //       if (!hierarchy[root]["general"]){
    //         hierarchy[root]["general"] = []
    //       }
    //       // console.log("item is: ", item)
    //       hierarchy[root]["general"].push(item) // flavor bible item
    //     }
    //   })
    // })
  
  return hierarchy
 }


// Not perfect
//  Would be nice to go one level further and group them another level
export const getStructuredDataByRootUsingFirstPhrase = (items: string[]) =>{
  // const singleWords = getSingleWordsFromFoodBibleData(items)
  let hierarchy = {}
  items.forEach((item)=>{
    let parsedItem = item.split(',')
    // console.log("parseItem is: ", parsedItem)
    let root = parsedItem[0]
    // console.log
    parsedItem.shift()
    let parts = parsedItem.join().replace(',', '').split(' ')
    
      // let root = parts[0]
      if(!hierarchy[root]){
        hierarchy[root] = {}
      }

      // parts.shift()

      let descriptors = parts
      if (descriptors.length != 0) {
        console.log("descriptors :", descriptors)
        let first_category = descriptors.join(' ')//.replace(',', ' ').replace(',,', ' ')
        if (!hierarchy[root][first_category]){
          hierarchy[root][first_category] = []
        }
        // .append(item)

        hierarchy[root][first_category].push(item) // flavor bible item
      } else {
        // hierarchy[root].push({"general": [item]})
        // hierarchy[root]["general"]
        if (!hierarchy[root]["general"]){
          hierarchy[root]["general"] = []
        }
        // console.log("item is: ", item)
        hierarchy[root]["general"].push(item) // flavor bible item
      }
    
    })  
  return hierarchy
 }

 const getStringsThatIncludeAndOr = (resultsArray: string[]) => {
  return resultsArray.filter((str)=> (str.includes(' and ')||str.includes(' or ')))
  }

  const getStringsThatIncludeColon = (resultsArray: string[]) => {
    return resultsArray.filter(str => str.includes(':'))
  }

  const getStringsThatIncludeComma = (resultsArray: string[]) => {
    return resultsArray.filter(str => str.includes(','))
  }

  const getHeadersFromFoodBibleData = (resultsArray: string[]) => {
    return resultsArray.filter((str)=> (!(str.includes(',')||str.includes('and')||str.includes('or')||str.includes('(')||str.includes(')'))))
  }

 const cleanUpSingleWordRoots = (resultsArray: string[]) => {
  var newResultsArray = []
  resultsArray.map((str)=>{
    // string.plural?
    var noun = []
    var singular;
    var plural;
    // have we seen the singular or plural version of this str before
    // newResultsArray.flatten.includes?(str)
    // is str a typo? 
      // if not 
        // if str is plural 
          // plural = str//pluralize (str)
          // singular = getSingular(str)
          //noun = [singular, plural]
        // if str is not plural
          // plural = pluralize (str)
          // singular = str
          //noun = [singular, plural]
    
  })
  return newResultsArray.filter(onlyUnique).sort()
 }

 const getSingleWordsFromFoodBibleData = (resultsArray: string[]) => {
  return resultsArray.filter((str)=> (!(str.includes(',')||str.includes('and')||str.includes('or')||str.includes(' '))))
 }

 const getRootFromFoodBibleString = (resultsArray: string[]) => {
  return resultsArray.map((str)=>{return str.split(',')[0]}).filter(onlyUnique)
 }

 export const filterCleanedUpArray = (cleanedUpResults, query) => {
  const filteredCleanedUpAray = Object.keys(cleanedUpResults).map((field)=>{
    const resObject = {}
    resObject[field] = cleanedUpResults[field].filter(item => item.includes(query))
    return resObject
    // {`${field}`: cleanedUpResults[field].filter(item => item.includes(query))}
  })
  return filteredCleanedUpAray
 }