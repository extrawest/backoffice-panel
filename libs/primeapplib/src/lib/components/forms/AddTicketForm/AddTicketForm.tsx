import { FC } from "react";
import { Field, Form, Formik, FormikValues } from "formik";
import { ClientTicketAddFormProps, ClientTicketPriority } from "@backoffice-panel-app/shared";
import { addTicketFormSchema } from "./AddTicketForm.schema";
import { Button, Col, DatePicker, Input, Row, Select, Space, Typography, Upload } from "antd";
import dayjs from "dayjs";

export const AddTicketForm: FC<ClientTicketAddFormProps> = ({
	initialValues,
	onSubmit,
	isLoading
}) => {
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

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={schema}
		>
			{({ setFieldValue, errors, touched }) => (
				<Form>
					<Row
						justify="space-around"
						align="stretch"
						gutter={[0, 40]}
					>
						<Col span={8}>
							<Field name="userImage">
								{({ field }: FormikValues) => {
									return (
										<Upload.Dragger
											showUploadList={false}
											listType="picture-card"
											onChange={(newValue) => setFieldValue("userImage", newValue.file.originFileObj)}
										>
											{
												field.value ? "done" : "Upload user image"
											}
										</Upload.Dragger>
									);
								}}
							</Field>
						</Col>
						<Col
							span={12}
						>
							<Space
								direction="vertical"
								size={[0, 40]}
								style={{
									width: "100%"
								}}
							>
								<Field name="priority">
									{({ field }: FormikValues) => (
										<Select
											value={field.value}
											defaultValue={dropdownProps[0].value}
											options={dropdownProps}
											onChange={(value) => setFieldValue("priority", value)}
											style={{
												width: "100%",
											}}
										/>
									)}
								</Field>
								<Field name="ticketTitle">
									{({ field }: FormikValues) => (
										<>
											<Input
												{...field}
												placeholder="Ticket Title"
											/>
											{errors.ticketTitle && touched.ticketTitle &&
												<Typography.Text type="danger">{errors.ticketTitle && touched.ticketTitle && errors.ticketTitle}</Typography.Text>
											}
										</>
									)}
								</Field>
								<Field name="fullName">
									{({ field }: FormikValues) => (
										<>
											<Input
												{...field}
												placeholder="Full Name"
											/>
											{errors.fullName && touched.fullName &&
												<Typography.Text type="danger">{errors.fullName && touched.fullName && errors.fullName}</Typography.Text>
											}
										</>
									)}
								</Field>
								<Field name="dateOfAccount">
									{({ field }: FormikValues) => (
										<>
											<DatePicker
												name="dateOfAccount"
												value={field.value ? dayjs(field.value) : undefined}
												onChange={(_, stringValue) => setFieldValue("dateOfAccount", stringValue)}
												style={{
													width: "100%"
												}}
											/>
											{errors.dateOfAccount && touched.dateOfAccount &&
												<Typography.Text type="danger">{errors.dateOfAccount && touched.dateOfAccount && errors.dateOfAccount}</Typography.Text>
											}
										</>
									)}
								</Field>

							</Space>
						</Col>
						<Col span={22}>
							<Button htmlType="submit">Add</Button>
						</Col>
					</Row>
				</Form>
			)
			}
		</Formik >
	);
};

export default AddTicketForm;
