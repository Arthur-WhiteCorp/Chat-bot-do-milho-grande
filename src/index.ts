import filesystem from "fs"
import path from "path"
import { inputToData } from "./Inputs" 
import {startChatBot} from "./ChatBot"


async function main() {
  inputToData("Nome da tua mãe: ", startChatBot);
}



main()