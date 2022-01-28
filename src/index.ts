import { inputToData } from "./Inputs";
import { startChatBot } from "./ChatBot";
import { printInicialMensage } from "./util/messages";

async function main() {
  printInicialMensage();
  inputToData(startChatBot);
}

main();
