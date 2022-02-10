import { Interaction, InputType } from "../types"
import { DataBase } from "../models";

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCRmu7QMzHVg7srHzOTVIgZNlMlXmFernw",
  authDomain: "chatbot-d95ba.firebaseapp.com",
  projectId: "chatbot-d95ba",
  storageBucket: "chatbot-d95ba.appspot.com",
  messagingSenderId: "1002944791365",
  appId: "1:1002944791365:web:10dd789ae34b5fe01ab42c",
  measurementId: "G-CFGK5YD8C5"
};



export class FirestoreDatabase implements DataBase {
  private app
  private db

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async writeNewInteraction (interaction: Interaction) {
    const docRef = await addDoc(collection(this.db, "interactions"), interaction);
  };

  /*async getInteraction(input: string, inputType: InputType) { 
    
  };*/

  async appendPhrase(phrase: string, answer: string) {
    
  };

  searchInteraction(input: string, inputType: InputType) {
    return -1;
  };

  async deleteInteraction(input: string, inputType: InputType) {
    
  }

  
}