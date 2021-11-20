import { FetchUrl } from "./fetchurl";

function countletter(cadena, letter) {
  var indices = [];
  for (var i = 0; i < cadena.length; i++) {
    if (cadena[i].toLowerCase() === letter) indices.push(i);
  }
  return indices.length
}

export async function searchletter(section, search) {
  let cont = 0;
  let result = await FetchUrl(`https://rickandmortyapi.com/api/${section}/?name=${search}`)
  cont += result.results.reduce((acc, cur) => {
    return acc + countletter(cur.name, search);
  }, 0);
  while(result.info.next) {
    result = await FetchUrl(result.info.next);
    cont += result.results.reduce((acc, cur) => {
      return acc + countletter(cur.name, search);
    }, 0)
  }
  return cont;
}


