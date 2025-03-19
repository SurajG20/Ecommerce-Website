import { initializeApp } from "firebase/app";
import config from "./config/config";

const firebaseConfig = {
  apiKey: config.firebaseKey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
  appId: config.firebaseAppId
};

const app = initializeApp(firebaseConfig);

export default app;
