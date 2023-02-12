import { FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Input from "../Input/Input";
import { DatePickerProps } from "./DatePicker.types";

export const DatePicker: FC<DatePickerProps> = ({
	value,
	onChange,
	name,
	error,
	helperText
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DesktopDatePicker
				inputFormat="MM/DD/YYYY"
				value={value}
				onChange={onChange}
				renderInput={
					(params) =>
						<Input
							{...params}
							name={name}
							icon="login"
							type="text"
							error={!!error}
							helperText={helperText}
						/>
				}
			/>
		</LocalizationProvider>
	);
};

export default DatePicker;
