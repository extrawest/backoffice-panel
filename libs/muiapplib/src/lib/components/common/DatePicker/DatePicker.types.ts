export type DatePickerProps = {
	value: Date;
	onChange: (value: Date | null, keyboardInputValue?: string | undefined) => void;
	name: string;
	error: boolean | undefined;
	helperText: boolean | string | undefined;
};
