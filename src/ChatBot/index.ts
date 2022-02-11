import { StaticDataBase } from "../StaticDataBase";
import { Interaction, InputType } from "../types";
import { FirestoreDatabase } from "../Firebase";
import { ReadLine } from "readline";
import { normalizeString } from "../util/normalizeString";

const db = new FirestoreDatabase();

export async function startChatBot(input: string, readline: ReadLine) {
  
  db.deleteInteraction("Ooo", "phrase");

  const interaction = await db.getInteraction(input, "phrase")

  if (interaction) {
    console.log(interaction.answer);
  } else {
    readline.question("O que eu deveria responder? ", async (answer: string) => {
      const interactionFetch = await db.getInteraction(answer, "answer");

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
