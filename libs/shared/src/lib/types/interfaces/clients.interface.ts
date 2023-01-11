import { Timestamp } from "firebase/firestore";
import { ClientTicketPriority } from "../enums";

export type ClientTicket = {
	dateOfCreationTicket: Timestamp;
	lastUpdated: Timestamp;
	priority: ClientTicketPriority;
	title: string;
	userAccountCreationDate: Timestamp;
	userName: string;
	userAvatar: string;
};
