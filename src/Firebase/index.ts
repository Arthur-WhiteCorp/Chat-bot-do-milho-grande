import { Interaction, InputType } from "../types"

import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCRmu7QMzHVg7srHzOTVIgZNlMlXmFernw",
  authDomain: "chatbot-d95ba.firebaseapp.com",
  projectId: "chatbot-d95ba",
  storageBucket: "chatbot-d95ba.appspot.com",
  messagingSenderId: "1002944791365",
  appId: "1:1002944791365:web:10dd789ae34b5fe01ab42c",
  measurementId: "G-CFGK5YD8C5"
};

type InteractionDocument = {
  interaction: Interaction;
  id: string;
}

export class FirestoreDatabase {
  private app
  private db

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async writeNewInteraction (interaction: Interaction) {
    const docRef = await addDoc(collection(this.db, "interactions"), interaction);
  };

  async getInteraction(input: string, inputType: InputType) { 
    const interactionDocument = await this.getInteractionDocument(input, inputType);
    return interactionDocument.interaction;
  };

  async appendPhrase(phrase: string, answer: string) {
    const { interaction, id } = await this.getInteractionDocument(answer, "answer");
    const docRef = doc(this.db, "interactions", id);
    setDoc(docRef, {
      phrases: [...interaction.phrases, phrase],
      answer: interaction.answer,
    })
  };

  async deleteInteraction(input: string, inputType: InputType) {
    const { id } = await this.getInteractionDocument(input, inputType);
    const docRef = doc(this.db, "interactions", id);
    deleteDoc(docRef);
  }

  async getInteractionDocument(input: string, inputType: InputType) {
    const interactionsCollectionRef = collection(this.db, "interactions");

    const dbQuery = inputType === "answer" ?
      query(interactionsCollectionRef, where("answer", "==", input))
      :
      query(interactionsCollectionRef, where("phrases", "array-contains", input));

    const docsFetched = await getDocs(dbQuery);
    const interactions = [] as InteractionDocument[];
    docsFetched.forEach((interaction) => {
      interactions.push({
        interaction: interaction.data() as Interaction,
        id: interaction.id ,
      })
    });

    const [ fetchedInteraction ] = interactions
    
    return fetchedInteraction || {};
  } 
  
}