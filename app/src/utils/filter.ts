// 
export default function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

// 
export function filterStringsByCharacter(strings, character) {
  return strings.filter(str => str.includes(character));
}
