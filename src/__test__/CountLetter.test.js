import { CountLetter } from "../services/CountLetter";

test("Count letter 'a' in string", () => {
  expect(CountLetter("es un pajaro es un avion es superman", "a")).toBe(4);
});

test("Count letter 'b' in string", () => {
  expect(CountLetter("los barbaros buscaron buenos y bondados hombres", "b")).toBe(6);
});