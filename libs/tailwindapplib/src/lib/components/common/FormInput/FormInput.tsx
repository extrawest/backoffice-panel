import { FC } from "react";
import { FormInputProps } from "./FormInput.types";

export const FormInput: FC<FormInputProps> = ({
	placeholder,
	onChange,
	value,
	name,
	isDate
}) => {
	return (
		<div>
			<input
				name={name}
				type={isDate ? "date" : "text"}
				value={value}
				onChange={onChange}
				className="input-field"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default FormInput;
