import { useEffect, useState } from "react";
import { searchletter } from "../services/countletter";

export const Result = () => {

  const [letterL, SetLetterL] = useState(0);
  const [letterE, SetLetterE] = useState(0);
  const [letterC, SetLetterC] = useState(0);
  const [delay, SetDelay] = useState(0);

  useEffect(() => {

    let t0 = performance.now();
      Promise.all([
          searchletter("location", "l").then((data) => SetLetterL(data)),
          searchletter("episode", "e").then((data) => SetLetterE(data)),
          searchletter("character", "c").then((data) => SetLetterC(data))
      ]).then(() => SetDelay(performance.now() - t0));

  }, []);
  
  return (
    <div>
      <h1>Result</h1>
      <p>{delay}</p>
      <p>{letterL}</p>
      <p>{letterE}</p>
      <p>{letterC}</p>
    </div>
  );
}