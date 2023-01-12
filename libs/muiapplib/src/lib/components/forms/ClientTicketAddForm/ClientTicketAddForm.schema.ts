import {
	object, string, number
} from "yup";

// const today = new Date().;

export const clientTicketAddFormSchema = () => {
	return object().shape({
		ticketTitle: string().trim().required(),
		fullName: string().trim().required(),
		dateOfAccount: number().required()
		// .max(
		// 	today,
		// 	"That day has not yet come "
		// )
	});
};
