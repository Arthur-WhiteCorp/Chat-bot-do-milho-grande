import Readline, { ReadLine as NodeReadline } from "readline";
import { normalizeString } from "../util/normalizeString";

type callbackFunctionType = (string: string, readline: NodeReadline) => void;

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function inputToData(callbackFunction: callbackFunctionType) {
  readline.on("line", (input: string) => {
    const normalizedInput = normalizeString(input);
    callbackFunction(normalizedInput, readline);
  });

  readline.on("SIGINT", () => {
    readline.question("Você deseja mesmo sair? [s/n] ", (answer: string) => {
      if (answer.toLowerCase() === "s") {
        readline.close();
      } else {
        console.log("Beleza!");
      }
    });
  });
}
