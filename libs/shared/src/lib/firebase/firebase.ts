import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env["NX_API_KEY"],
	authDomain: process.env["NX_AUTH_DOMAIN"],
	projectId: process.env["NX_PROJECT_ID"],
	storageBucket: process.env["NX_STORAGE_BUCKET"],
	messagingSenderId: process.env["NX_MESSAGING_SENDER_ID"],
	appId: process.env["NX_APP_ID"]
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseFirestore = getFirestore(firebaseApp);

export { firebaseApp, firebaseFirestore };
