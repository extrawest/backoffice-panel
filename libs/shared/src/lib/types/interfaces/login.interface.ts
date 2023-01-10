export type LoginFormValues = {
	login?: string;
	password?: string;
};

export type LoginFormProps = {
	initialValues: LoginFormValues;
	onSubmit: (values: LoginFormValues) => void;
};
