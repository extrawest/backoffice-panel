import {
	object, string, number
} from "yup";

export const clientTicketAddFormSchema = () => {
	return object().shape({
		ticketTitle: string().trim().required(),
		fullName: string().trim().required(),
		dateOfAccount: number().required()
	});
};
