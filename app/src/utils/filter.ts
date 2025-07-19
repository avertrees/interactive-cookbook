// filter out duplicates out of an array
export default function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

// 
export function filterStringsByCharacter(strings, character) {
  return strings.filter(str => str.includes(character));
}


// filter by field and value 
export function filterIngredientsByField(ingredients, field, value) {
  return ingredients.select((ingredient) => {
    ingredient[field] == value
  });
}