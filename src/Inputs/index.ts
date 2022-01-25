import Readline, { ReadLine as NodeReadline } from 'readline';

type callbackFunctionType = (string: string, readline: NodeReadline) => void;

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export function inputToData(question: string, callbackFunction: callbackFunctionType) {

  readline.on("line", (input: string) => {
    const normalizedInput = normalizeString(input)
    callbackFunction(normalizedInput, readline)
  });

  readline.on("SIGINT", () => {
    readline.question("Você deseja mesmo sair? [s/n]", (answer: string ) => {
      if (answer === "s") {
        readline.close();
      } else {
        console.log("Beleza!");
      }
    })
  })

}

function normalizeString(text: string) {
  const textWithoutTypographicalAccents = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const textWithoutExtraSpaces = textWithoutTypographicalAccents
    .split(" ")
    .filter((string) => string !== "")
    .join(" ");

  const textFormatted = textWithoutExtraSpaces.toLowerCase();

  return textFormatted;
}