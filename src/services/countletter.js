export function fetchurl(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
}

function countletter(cadena, letter) {
  var indices = [];
  for (var i = 0; i < cadena.length; i++) {
    if (cadena[i].toLowerCase() === letter) indices.push(i);
  }
  return indices.length
}

export async function searchletter(section, search) {
  let cont = 0;
  let result = await fetchurl(`https://rickandmortyapi.com/api/${section}/?name=${search}`)
  cont += result.results.reduce((acc, cur) => {
    return acc + countletter(cur.name, search);
  }, 0);
  while(result.info.next) {
    result = await fetchurl(result.info.next);
    cont += result.results.reduce((acc, cur) => {
      return acc + countletter(cur.name, search);
    }, 0)
  }
  return cont;
}


