import { Timestamp } from "firebase/firestore";
import { ClientTicketPriority, TaskType } from "../enums";

export type ClientTicket = {
	dateOfCreationTicket: Timestamp;
	lastUpdated: Timestamp;
	priority: ClientTicketPriority;
	title: string;
	userAccountCreationDate: Timestamp;
	userName: string;
	userAvatar: string;
};

export type ClientTicketAddFormProps = {
	initialValues: ClientTicketAddFormValues;
	onSubmit: (values: ClientTicketAddFormValues) => void;
	isLoading?: boolean;
};

export type ClientTicketAddFormValues = {
	ticketTitle: string;
	fullName: string;
	dateOfAccount: number | string;
	priority: ClientTicketPriority;
	userImage: File | undefined;
};

export type Task = {
	title: string;
	type: TaskType;
};
