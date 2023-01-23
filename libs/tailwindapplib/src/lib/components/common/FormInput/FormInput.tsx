import { FC } from "react";
import { FormInputProps } from "./FormInput.types";

export const FormInput: FC<FormInputProps> = ({
	placeholder,
	onChange,
	value,
	name
}) => {
	return (
		<div>
			<input
				name={name}
				type="text"
				value={value}
				onChange={onChange}
				className="input-field"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default FormInput;
