import { object, string } from "yup";

export const loginFormSchema = () => {
	return object().shape({
		login: string().trim().required().email(),
		password: string()
			.trim()
			.required()
			.min(
				8,
				"Password should be at least 8 symbols length"
			)
	});
};
