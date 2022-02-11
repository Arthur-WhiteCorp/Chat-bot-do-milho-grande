import { inputToData } from "./Inputs";
import { startChatBot } from "./ChatBot";
import { printInitialMensage } from "./util/messages";

async function main() {
  printInitialMensage();
  inputToData(startChatBot);
}

main();
