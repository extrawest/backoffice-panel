import { FC, useCallback, useRef } from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadHandlerParam } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Toast } from "primereact/Toast";
import { ClientTicketAddFormProps, ClientTicketPriority } from "@backoffice-panel-app/shared";
import { addTicketFormSchema } from "./AddTicketForm.schema";

export const AddTicketForm: FC<ClientTicketAddFormProps> = ({
	initialValues,
	onSubmit,
	isLoading
}) => {
	const toast = useRef<Toast>(null);
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
	const schema = addTicketFormSchema();

	const handleUploadFile = useCallback(
		(
			e: FileUploadHandlerParam,
			setFieldValue: (field: string, value: File) => void
		) => {
			if (e.files.length > 0) {
				setFieldValue("userImage", e.files[0]);
				toast.current?.show({ severity: "success", summary: "Success", detail: "File Uploaded" });
			} else {
				toast.current?.show({ severity: "error", summary: "Upload Error", detail: "File wasnt uploaded" });
			}

		},
		[],
	);

	return (
		<>
			<Toast ref={toast}></Toast>
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
									<FileUpload
										name="userImage"
										uploadHandler={(e) => handleUploadFile(e, setFieldValue)}
										mode="basic"
										accept="image/*"
										auto
										customUpload
										chooseLabel="Browse user image"
									/>
								)}
							</Field>
							<Field name="priority">
								{({ field }: FormikValues) => (
									<Dropdown
										{...field}
										optionLabel="label"
										optionValue="value"
										options={dropdownProps}
										placeholder="Select Priority"
									/>
								)}
							</Field>
							<Field name="ticketTitle">
								{({ field }: FormikValues) => (
									<>
										<InputText
											{...field}
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
										<InputText
											{...field}
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
										<Calendar
											{...field}
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
