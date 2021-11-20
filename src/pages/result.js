import { useEffect, useState } from "react";
import { CharactersData } from "../services/CharacterData";
import { searchletter } from "../services/CountLetter";
import { EpisodeLocation } from "../services/EpisodeLocation";

export const Result = () => {

  const [letterL, SetLetterL] = useState(0);
  const [letterE, SetLetterE] = useState(0);
  const [letterC, SetLetterC] = useState(0);
  const [locations, SetLocations] = useState([]);
  const [delay1, SetDelay1] = useState("");
  const [delay2, SetDelay2] = useState("");

  useEffect(() => {

    async function SolutionAll() {
      let t0 = performance.now();
      const data = await CharactersData();
      const info = await EpisodeLocation(data);
      SetLocations(info);
      let t1 = performance.now();
      let difTime = t1 - t0;
      SetDelay2(difTime >= 1000 ? `${Math.floor(difTime/1000)}s ${difTime%1000}ms` : `${difTime}ms`);
      return info;
    }

    SolutionAll();

    let t0 = performance.now();
      Promise.all([
          searchletter("location", "l").then((data) => SetLetterL(data)),
          searchletter("episode", "e").then((data) => SetLetterE(data)),
          searchletter("character", "c").then((data) => SetLetterC(data))
      ]).then(() => {
        let difTime = performance.now() - t0;
        SetDelay1(difTime >= 1000 ? `${Math.floor(difTime/1000)}s ${difTime%1000}ms` : `${difTime}ms`)
      });

  }, []);
  
  return (
    <pre>
      {JSON.stringify([
        {
          exercise_name: "Char counter",
          time: delay1,
          in_time: true,
          results: [
            {
              char: "l",
              count: letterL,
              resource: "location",
            },
            {
              char: "e",
              count: letterE,
              resource: "episode",
            },
            {
              char: "c",
              count: letterC,
              resource: "character",
            },
          ],
        },
        {
          exercise_name: "Episode locations",
          time: delay2,
          in_time: true,
          results: locations,
        },
      ])}
    </pre>
  );
}