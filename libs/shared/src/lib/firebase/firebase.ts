import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	addDoc,
	collection, CollectionReference, getFirestore, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
	ClientTicket, ClientTicketAddFormValues, Task
} from "../types";

const firebaseConfig = {
	apiKey: process.env["NX_API_KEY"],
	authDomain: process.env["NX_AUTH_DOMAIN"],
	projectId: process.env["NX_PROJECT_ID"],
	storageBucket: process.env["NX_STORAGE_BUCKET"],
	messagingSenderId: process.env["NX_MESSAGING_SENDER_ID"],
	appId: process.env["NX_APP_ID"]
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

const firebaseClientsDBRef = collection(
	firebaseFirestore,
	"clients"
) as CollectionReference<ClientTicket>;

const firebaseTasksDBRef = collection(
	firebaseFirestore,
	"tasks"
) as CollectionReference<Task>;

const handleAddDataToClientTicketsList = async (
	values: ClientTicketAddFormValues, userAvatar?: string
) => {
	addDoc(
		firebaseClientsDBRef,
		{
			priority: values.priority,
			title: values.ticketTitle,
			userName: values.fullName,
			dateOfCreationTicket: serverTimestamp(),
			lastUpdated: serverTimestamp(),
			userAccountCreationDate: Timestamp.fromMillis(parseInt(`${values.dateOfAccount}`)),
			userAvatar: userAvatar ?? " "
		}
	);
};

export { firebaseApp, firebaseAuth, firebaseClientsDBRef, firebaseStorage, firebaseTasksDBRef, handleAddDataToClientTicketsList };
