import { object, string } from "yup";

export const addTicketFormSchema = () => {
	return object().shape({
		ticketTitle: string().trim().required(),
		fullName: string().trim().required(),
		dateOfAccount: string().trim().required()
	});
};
