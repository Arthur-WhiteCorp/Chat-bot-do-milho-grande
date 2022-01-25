import Readline, { ReadLine as NodeReadline } from 'readline';

type callbackFunctionType = (string: string, readline: NodeReadline) => void;

const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export function inputToData(question: string, callbackFunction: callbackFunctionType) {

  readline.on("line", (input: string) => {    
    callbackFunction(input, readline)
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