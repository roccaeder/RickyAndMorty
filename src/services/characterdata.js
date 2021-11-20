import { FetchUrl } from "./fetchurl";

export async function CharactersData() {
  let arr = [];
  let response = await FetchUrl(`https://rickandmortyapi.com/api/character`)
  arr = response.results;
  while(response.info.next) {
    response = await FetchUrl(response.info.next);
    arr = arr.concat(response.results);
  }
  return arr;
}
