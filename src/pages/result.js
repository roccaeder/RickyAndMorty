import { useEffect, useState } from "react";
import { CharactersData } from "../services/characterdata";
import { searchletter } from "../services/countletter";
import { EpisodeLocation } from "../services/episodelocation";

export const Result = () => {

  const [letterL, SetLetterL] = useState(0);
  const [letterE, SetLetterE] = useState(0);
  const [letterC, SetLetterC] = useState(0);
  const [locations, SetLocations] = useState([]);
  const [delay1, SetDelay1] = useState(0);
  const [delay2, SetDelay2] = useState(0);


  // async function SolutionAll() {
  //   let t0 = performance.now();
  //   const data = await CharactersData();
  //   const info = await EpisodeLocation(data);
  //   SetLocations(info);
  //   let t1 = performance.now();
  //   console.log("the function delay " + (t1 - t0) + " miliseconds.");
  //   return info;
  // }

  // SolutionAll().then(data => console.log(data));


  useEffect(() => {

    async function SolutionAll() {
      let t0 = performance.now();
      const data = await CharactersData();
      const info = await EpisodeLocation(data);
      SetLocations(info);
      let t1 = performance.now();
      SetDelay2(t1 - t0);
      return info;
    }

    SolutionAll();

    let t0 = performance.now();
      Promise.all([
          searchletter("location", "l").then((data) => SetLetterL(data)),
          searchletter("episode", "e").then((data) => SetLetterE(data)),
          searchletter("character", "c").then((data) => SetLetterC(data))
      ]).then(() => SetDelay1(performance.now() - t0));

  }, []);
  
  return (
    <pre>
      {JSON.stringify([
        {
          exercise_name: "Char counter",
          time: `${delay1}ms`,
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
          time: `${delay2}ms`,
          in_time: true,
          results: locations,
        },
      ])}
    </pre>
  );
}