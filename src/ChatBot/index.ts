import { StaticDataBase } from "../StaticDataBase";
import { Interaction, InputType } from "../types";
import { ReadLine } from "readline"
import { FirestoreDatabase } from "../Firebase";

//const db = new StaticDataBase();
const db = new FirestoreDatabase();

export function startChatBot(input: string, readline: ReadLine) {
  
  /*
  const interaction = db.getInteraction(input, "phrase")

  if (interaction) { 
    console.log(interaction.answer);
  } else { 
    readline.question("O que eu deveria responder?", (answer: string) => {
      const interactionFetch = db.getInteraction(answer, "answer");

      if (!interactionFetch) { 
        db.writeNewInteraction({
          phrases: [input],
          answer
        })
      } else {
        db.appendPhrase(input, answer);
      }
        
      console.log(`Tudo bem... ${answer}`)
    })
  }
*/
}
