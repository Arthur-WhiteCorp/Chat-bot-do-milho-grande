import { DataBase } from "../DataBase";
import { ReadLine } from "readline";
import { normalizeString } from "../util/normalizeString";

const db = new DataBase();

export function startChatBot(input: string, readline: ReadLine) {
  const interaction = db.getInteraction(input, "phrase");

  if (interaction) {
    console.log(interaction.answer);
  } else {
    readline.question("O que eu deveria responder?", (answer: string) => {
      const interactionFetch = db.getInteraction(answer, "answer");

      if (!interactionFetch) {
        db.writeNewInteraction({
          phrases: [normalizeString(input)],
          answer,
        });
      } else {
        db.appendPhrase(input, answer);
      }

      console.log(`Tudo bem... ${answer}`);
    });
  }
}
