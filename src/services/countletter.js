import { FetchUrl } from "./fetchurl";

export function CountLetter(name, letter) {
  let index = [];
  for (let i = 0; i < name.length; i++) {
    if (name[i].toLowerCase() === letter) index.push(i);
  }
  return index.length
}

export async function searchletter(section, search) {
  let cont = 0;
  let response = await FetchUrl(`https://rickandmortyapi.com/api/${section}/?name=${search}`)
  cont += response.results.reduce((acc, cur) => {
    return acc + CountLetter(cur.name, search);
  }, 0);
  while(response.info.next) {
    response = await FetchUrl(response.info.next);
    cont += response.results.reduce((acc, cur) => {
      return acc + CountLetter(cur.name, search);
    }, 0)
  }
  return cont;
}


