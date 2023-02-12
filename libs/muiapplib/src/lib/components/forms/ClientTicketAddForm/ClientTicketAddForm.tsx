import { FC, useCallback } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ClientTicketAddFormProps, ClientTicketPriority } from "@backoffice-panel-app/shared";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, DatePicker, Input, Select } from "../../common";
import { clientTicketAddFormSchema } from "./ClientTicketAddForm.schema";
import { clientTicketAddFormStyles } from "./ClientTicketAddForm.styles";

interface HTMLInputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

export const ClientTicketAddForm: FC<ClientTicketAddFormProps> = ({
	initialValues,
	onSubmit,
	isLoading
}) => {
	const schema = clientTicketAddFormSchema();
	const dropdownProps = [
		{
			label: ClientTicketPriority.HIGH,
			value: ClientTicketPriority.HIGH
		},
		{
			label: ClientTicketPriority.LOW,
			value: ClientTicketPriority.LOW
		},
		{
			label: ClientTicketPriority.NORMAL,
			value: ClientTicketPriority.NORMAL
		}
	];

	const handleSetDateValue = useCallback(
		(setFieldValue: (name: string, date: number) => void) => ((value: string) => setFieldValue("dateOfAccount", Date.parse(value))),
		[],
	);

	const handleSetImageValue = useCallback(
		(setFieldValue: (name: string, img: File | null) => void) => (
			(event: HTMLInputEvent) =>
				setFieldValue(
					"userImage",
					event.target.files ?
						event.target.files[0] : null
				)),
		[],
	);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={schema}
			>
				{({ errors, touched, setFieldValue, }) => (
					<Form
						style={{
							...clientTicketAddFormStyles.root,
							flexDirection: "row",
							flexWrap: "wrap"
						}}
					>
						<Box
							sx={clientTicketAddFormStyles.imageInputWrapper}
						>
							<Field name="userImage">
								{({ field }: FormikValues) => (
									<Input
										{...field}
										uploadedImage={field.value}
										value={undefined}
										onChange={handleSetImageValue(setFieldValue)}
										label=""
										type="image"
									/>
								)}
							</Field>
						</Box>
						<Box
							sx={clientTicketAddFormStyles.textImageWrapper}
						>
							<Field name="priority">
								{({ field }: FormikValues) => (
									<Select
										{...field}
										data={dropdownProps}
										icon="login"
										type="text"
									/>
								)}
							</Field>
							<Field
								name="ticketTitle"
							>
								{({ field }: FormikValues) => (
									<Input
										{...field}
										icon="login"
										placeholder="Ticket title"
										type="text"
										error={errors.ticketTitle && touched.ticketTitle}
										helperText={errors.ticketTitle && touched.ticketTitle && errors.ticketTitle}
									/>
								)}
							</Field>
							<Field name="fullName">
								{({ field }: FormikValues) => (
									<Input
										{...field}
										icon="login"
										placeholder="Full Name"
										type="text"
										error={errors.fullName && touched.fullName}
										helperText={errors.fullName && touched.fullName && errors.fullName}
									/>
								)}
							</Field>
							<Field name="dateOfAccount">
								{({ field }: FormikValues) => (
									<DatePicker
										value={field.value}
										onChange={handleSetDateValue(setFieldValue)}
										name={field.name}
										error={!!errors.dateOfAccount && touched.dateOfAccount}
										helperText={errors.dateOfAccount && touched.dateOfAccount && errors.dateOfAccount}
									/>
								)}
							</Field>
						</Box>
						<Box
							sx={clientTicketAddFormStyles.buttonWrapper}
						>
							<Button
								disabled={isLoading}
								variant="blue"
								type="submit"
								sx={clientTicketAddFormStyles.button}
							>
								Add
							</Button>
						</Box>
					</Form>
				)}
			</Formik>

		</LocalizationProvider>
	);
};

export default ClientTicketAddForm;
