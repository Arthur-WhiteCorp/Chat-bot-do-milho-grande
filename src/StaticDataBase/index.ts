import fileSystem from "fs"
import path from "path"
import { Interaction, InputType} from "../types"
import { DataBase } from "../models"

export class StaticDataBase implements DataBase {

  private dbPath = path.join(__dirname, "dataBase.json")
  private dbInMemory: Interaction[] = []

  constructor() {
    const db = this.getDatabaseToMemory()
    this.dbInMemory = db;
  }

  writeNewInteraction(interaction: Interaction) {
    this.dbInMemory.push(interaction);
    this.send();
  }

  getInteraction(input: string, inputType: InputType) {
    let indexFetched = this.searchInteraction(input, inputType)
    if (indexFetched !== -1) {
      return this.dbInMemory[indexFetched];
    } else {
      return null;
    }
  }

  appendPhrase(phrase: string, answer: string) {
    let indexFetched = this.searchInteraction(answer, "answer");

    if (indexFetched !== -1) {
      this.dbInMemory[indexFetched].phrases.push(phrase);
      this.send();
    }
  }

  searchInteraction(input: string, inputType: InputType) {
    let indexOfInteractionFetched = -1;
    if (inputType === "phrase") { 
      indexOfInteractionFetched = this.dbInMemory.findIndex((interaction: Interaction) => {
        return interaction.phrases.includes(input);
      })
    } else {
      indexOfInteractionFetched = this.dbInMemory.findIndex((interaction: Interaction) => {
        return interaction.answer === input;
      })
    }
    return indexOfInteractionFetched;
  }

  deleteInteraction(input: string, inputType: InputType) {
    const indexOfInteractionFetched = this.searchInteraction(input, inputType);
    if (indexOfInteractionFetched !== -1) {
      this.dbInMemory.splice(indexOfInteractionFetched, 1);
      this.send();
    }
  }

  send() {
    fileSystem.writeFileSync(this.dbPath, JSON.stringify(this.dbInMemory));
  }

  getDatabaseToMemory() {
    try {
      const buffer = fileSystem.readFileSync(this.dbPath);
      const bufferToString = buffer.toString();
      const db: Interaction[] = JSON.parse(bufferToString);
      return db;
    } catch (err) {
      const buffer = fileSystem.writeFileSync(this.dbPath, "[]");
      return [];
    }
  }
}