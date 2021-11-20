import { FetchUrl } from "./fetchurl";

export async function CharactersData() {
  let arr = [];
  let result = await FetchUrl(`https://rickandmortyapi.com/api/character`)
  arr = result.results;
  while(result.info.next) {
    result = await FetchUrl(result.info.next);
    arr = arr.concat(result.results);
  }
  return arr;
}
