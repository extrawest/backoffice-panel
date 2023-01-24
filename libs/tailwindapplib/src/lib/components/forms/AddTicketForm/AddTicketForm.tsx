import { FC, useCallback, useState } from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import { ClientTicketAddFormProps, ClientTicketPriority } from "@backoffice-panel-app/shared";
import { addTicketFormSchema } from "./AddTicketForm.schema";
import { Button, FormInput } from "../../common";

export const AddTicketForm: FC<ClientTicketAddFormProps> = ({
	initialValues,
	onSubmit,
	isLoading
}) => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);

	const handleToggleDropdown = useCallback(
		() => {
			setIsOpenDropdown((prev) => !prev);
		},
		[setIsOpenDropdown],
	);

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
									<>
										<input
											accept="image/png, image/jpeg"
											className="file-input_input"
											type="file"
											name={field.name}
											onChange={(e) => setFieldValue("userImage", e.target.files ? e.target.files[0] : undefined)}
											placeholder="Browse user image"
										>
										</input>
									</>
								)}
							</Field>
							<Field name="priority">
								{({ field }: FormikValues) => (
									<>
										<button
											id="dropdownDefaultButton"
											data-dropdown-toggle="dropdown"
											className="dropdown-button"
											type="button"
											onClick={handleToggleDropdown}
										>
											{field.value}
											<svg
												className="dropdown-svg"
												aria-hidden="true"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M19 9l-7 7-7-7"
												>
												</path>
											</svg>
										</button>
										{isOpenDropdown &&
											<div
												className="dropdown-wrapper"
											>
												<ul
													className="dropdown-ul"
													aria-labelledby="dropdownDefaultButton"
												>
													{dropdownProps.map((item, i) => (
														<li
															key={i}
															onClick={() => {
																setFieldValue("priority", item.value);
																handleToggleDropdown();
															}}
														>
															{item.value}
														</li>
													))}
												</ul>
											</div>
										}
									</>
								)}
							</Field>
							<Field name="ticketTitle">
								{({ field }: FormikValues) => (
									<>
										<FormInput
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
										<FormInput
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
										<FormInput
											{...field}
											isDate
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
