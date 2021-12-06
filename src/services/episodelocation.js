import { FetchUrl } from "./fetchurl";

export async function EpisodeLocation(infochar) {
  let arr = [];
  let response = await FetchUrl(`https://rickandmortyapi.com/api/episode`);
  arr = JoinArray( response, infochar);
  while(response.info.next) {
    response = await FetchUrl(response.info.next);
    arr = arr.concat(JoinArray( response, infochar));
  }
  return arr;
}

export function JoinArray( response, infochar){
  return response.results.reduce((acc, cur) => {
      let locations = cur.characters.map(char => infochar[char.split("/").pop() - 1].origin.name);
      locations = [...new Set(locations)];
      return acc.concat(GenerateHash(cur.name, cur.episode, locations));
    }, []);
}

export function GenerateHash( name, episode, locations ) {
  return {
    "name": name,
    "episode": episode,
    "locations": locations
  }
}