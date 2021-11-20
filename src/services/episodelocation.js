import { FetchUrl } from "./fetchurl";

export async function episodeLocation(infochar) {
  let arr = [];
  let result = await FetchUrl(`https://rickandmortyapi.com/api/episode`);
  arr = result.results.reduce((acc, cur) => {
    let locations = cur.characters.map(char => infochar[char.split("/").pop() - 1].origin.name);
    locations = [...new Set(locations)];
    return acc.concat(GenerateHash(cur.name, cur.episode, locations));
  }, []);
  while(result.info.next) {
    result = await FetchUrl(result.info.next);
    arr = arr.concat(result.results.reduce((acc, cur) => {
      let locations = cur.characters.map(char => infochar[char.split("/").pop() - 1].origin.name);
      locations = [...new Set(locations)];
      return acc.concat(GenerateHash(cur.name, cur.episode, locations));
    }, []));
  }
  return arr;
}

function GenerateHash( name, episode, locations ) {
  return {
    "name": name,
    "episode": episode,
    "locations": locations
  }
}