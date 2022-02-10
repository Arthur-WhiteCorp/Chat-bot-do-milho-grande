import { Interaction, InputType} from "../types"

export interface DataBase {
  writeNewInteraction: (interaction: Interaction) => void;
  getInteraction?: (input: string, inputType: InputType) => Interaction | null;
  appendPhrase: (phrase: string, answer: string) => void;
  searchInteraction: (input: string, inputType: InputType) => number;
  deleteInteraction: (input: string, inputType: InputType) => void
}