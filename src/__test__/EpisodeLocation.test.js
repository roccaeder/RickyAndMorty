import { GenerateHash } from "../services/EpisodeLocation";

test("generate hash1", () => {
  const newhash = {
    "name": "BetterCallSaul",
    "episode": "S10CAP10",
    "locations":  ["Albuquerque", "Nuevo Mexico", "HHM"]
  }
  expect(GenerateHash("BetterCallSaul", "S10CAP10", ["Albuquerque", "Nuevo Mexico", "HHM"] )).toEqual(newhash);
});

test("generate hash2", () => {
  const newhash = {
    "name": "Games of throne",
    "episode": "S4CAP6",
    "locations":  ["The north", "Castle Rock", "Nest of Eagles"]
  }
  expect(GenerateHash("Games of throne", "S4CAP6",  ["The north", "Castle Rock", "Nest of Eagles"] )).toEqual(newhash);
});