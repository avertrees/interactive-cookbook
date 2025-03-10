// https://stackoverflow.com/questions/24282158/how-to-remove-the-white-space-at-the-start-of-the-string
export default function ltrim(str) {
  if(!str) return str;
  return str.replace(/^\s+/g, '');
}

function trimStr(str) {
  if(!str) return str;
  return str.replace(/^\s+|\s+$/g, '');
}

function rtrim(str) {
  if(!str) return str;
  return str.replace(/\s+$/g, '');
}