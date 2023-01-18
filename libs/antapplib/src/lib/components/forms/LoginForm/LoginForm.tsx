import { FC } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import { Button, Input, Space, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormProps } from "@backoffice-panel-app/shared";
import { loginFormStyles } from "./LoginForm.styles";
import { loginFormSchema } from "./LoginForm.schema";

export const LoginForm: FC<LoginFormProps> = ({
	onSubmit,
	initialValues
}) => {
	const schema = loginFormSchema();

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={schema}
			>
				{({ errors, touched }) => (
					<Form
						style={{
							...loginFormStyles.root,
							flexDirection: "column"
						}}
					>
						<Field
							name="login"
						>
							{({ field }: FormikValues) => (
								<Space.Compact
									direction="vertical"
									style={{
										width: "100%"
									}}
								>
									<Input
										{...field}
										size="large"
										placeholder="Login"
										prefix={<UserOutlined />}
										type="email"
										style={loginFormStyles.input}
										status={errors.login && touched.login && "error"}
									/>

									{errors.login && touched.login &&
										<Typography.Text type="danger">{errors.login && touched.login && errors.login}</Typography.Text>
									}
								</Space.Compact>
							)}
						</Field>
						<Field name="password">
							{({ field }: FormikValues) => (
								<Space.Compact
									direction="vertical"
									style={{
										width: "100%"
									}}
								>
									<Input.Password
										{...field}
										width={"100%"}
										style={loginFormStyles.input}
										size="large"
										placeholder="Password"
										prefix={<LockOutlined />}
										type="password"
										status={errors.password && touched.password && "error"}
									/>
									{errors.password && touched.password &&
										<Typography.Text type="danger">{errors.password && touched.password && errors.password}</Typography.Text>
									}
								</Space.Compact>

							)}
						</Field>
						<Button
							htmlType="submit"
							style={loginFormStyles.button}
						>
							Log in
						</Button>
					</Form>
				)}
			</Formik>

		</>
	);
};

export default LoginForm;
