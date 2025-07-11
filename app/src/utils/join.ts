export const mergeFooDBAndFlavorBible = (foodDBResults, FlavorBibleResults) => {
  var results = []
  foodDBResults.map((fooDBObj)=>{
    if (FlavorBibleResults.includes(fooDBObj.name.toLowerCase())) {
      var index = FlavorBibleResults.find(element => element.name === fooDBObj.name.toLowerCase())// indexOf(fooDBObj.name) // index of the keyword
      const compoundObj = {
      ...fooDBObj,
      flavorBibleName: FlavorBibleResults[index]
      // flavorBibleName: 
      // flavorBiblePairings:
      }
      results.push(compoundObj)
    } 
  })
  return results
}