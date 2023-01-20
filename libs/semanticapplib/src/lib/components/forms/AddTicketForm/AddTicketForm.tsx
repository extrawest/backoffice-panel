import { FC } from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import { ClientTicketAddFormProps, ClientTicketPriority } from "@backoffice-panel-app/shared";
import { addTicketFormSchema } from "./AddTicketForm.schema";
import { Button, Dropdown, Input } from "semantic-ui-react";

export const AddTicketForm: FC<ClientTicketAddFormProps> = ({
	initialValues,
	onSubmit,
	isLoading
}) => {
	const dropdownProps = [
		{
			text: ClientTicketPriority.HIGH,
			key: ClientTicketPriority.HIGH,
			value: ClientTicketPriority.HIGH
		},
		{
			text: ClientTicketPriority.LOW,
			key: ClientTicketPriority.LOW,
			value: ClientTicketPriority.LOW
		},
		{
			text: ClientTicketPriority.NORMAL,
			key: ClientTicketPriority.NORMAL,
			value: ClientTicketPriority.NORMAL
		}
	];
	const schema = addTicketFormSchema();

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={schema}
			>
				{({ setFieldValue, errors, touched }) => (
					<Form>
						<div className="dialog-form_wrapper">
							<Field name="userImage">
								{({ field }: FormikValues) => (
									<Input
										disabled={isLoading}
										name="userImage"
										onChange={(e) => setFieldValue("userImage", e.target.files ? e.target.files[0] : undefined)}
										accept="image/*"
										type="file"
										label="Browse user image"
									/>
								)}
							</Field>
							<Field name="priority">
								{({ field }: FormikValues) => (
									<Dropdown
										{...field}
										disabled={isLoading}
										selection
										onBlur={() => null}
										options={dropdownProps}
										placeholder="Select Priority"
										onChange={(e, data) => setFieldValue("priority", data.value)}

									/>
								)}
							</Field>
							<Field name="ticketTitle">
								{({ field }: FormikValues) => (
									<>
										<Input
											{...field}
											disabled={isLoading}
											placeholder="Ticket Title"
										/>
										{errors.ticketTitle && touched.ticketTitle &&
											<p>{errors.ticketTitle && touched.ticketTitle && errors.ticketTitle}</p>
										}
									</>
								)}
							</Field>
							<Field name="fullName">
								{({ field }: FormikValues) => (
									<>
										<Input
											{...field}
											disabled={isLoading}
											placeholder="Full Name"
										/>
										{errors.fullName && touched.fullName &&
											<p>{errors.fullName && touched.fullName && errors.fullName}</p>
										}
									</>
								)}
							</Field>
							<Field name="dateOfAccount">
								{({ field }: FormikValues) => (
									<>
										<Input
											{...field}
											type="date"
											disabled={isLoading}
											placeholder="Date of user account creation"
										/>
										{errors.dateOfAccount && touched.dateOfAccount &&
											<p>{errors.dateOfAccount && touched.dateOfAccount && errors.dateOfAccount}</p>
										}
									</>
								)}
							</Field>
							<Button type="submit">Add</Button>
						</div>
					</Form>
				)
				}
			</Formik >
		</>
	);
};

export default AddTicketForm;
