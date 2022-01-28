import Readline, { ReadLine as NodeReadline } from "readline";
import { normalizeString } from "../util/normalizeString";

type callbackFunctionType = (string: string, readline: NodeReadline) => void;

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function inputToData(callbackFunction: callbackFunctionType) {
  const aksNewAnswer = () => {
    readline.question("Você deseja mesmo sair? [s/n] ", (answer: string) => {
      switch (answer.toLowerCase()) {
        case "s":
          readline.close();
          console.log(
            "Fique sempre a vontade pra voltar a me enchendo o saco. Tchau!"
          );
          break;
        case "n":
          console.log("Beleza!");
          break;
        default:
          console.log("Ops... não entendi");
          aksNewAnswer();
          break;
      }
    });
  };

  readline.on("line", (input: string) => {
    const normalizedInput = normalizeString(input);
    callbackFunction(normalizedInput, readline);
  });

  readline.on("SIGINT", () => {
    aksNewAnswer();
  });
}
