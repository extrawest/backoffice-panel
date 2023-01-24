import { ChangeEventHandler } from "react";

export type FormInputProps = {
	onChange?: ChangeEventHandler<HTMLInputElement>;
	value?: string | number;
	placeholder: string;
	name: string;
	isDate?: boolean;
};
