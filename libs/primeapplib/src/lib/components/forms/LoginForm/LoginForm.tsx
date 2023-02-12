import { FC } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
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
						className="login-form"
						style={{
							...loginFormStyles.root,
							flexDirection: "column"
						}}
					>
						<Field
							name="login"
						>
							{({ field }: FormikValues) => (
								<div className="login-form_field">
									<span className="p-input-icon-right">
										<i className="pi pi-user" />
										<InputText
											{...field}
											placeholder="Login"
										/>
									</span>
									{errors.login && touched.login &&
										<p className="login-form_error">{errors.login && touched.login && errors.login}</p>
									}
								</div>
							)}
						</Field>
						<Field name="password">
							{({ field }: FormikValues) => (
								<div className="login-form_field">
									<Password
										{...field}
										toggleMask
										placeholder="Password"
										feedback={false}
									/>
									{errors.password && touched.password &&
										<p className="login-form_error">{errors.password && touched.password && errors.password}</p>
									}
								</div>

							)}
						</Field>
						<Button
							type="submit"
							label="Log in"
							className="mt-2"
						/>
					</Form>
				)}
			</Formik>

		</>
	);
};

export default LoginForm;
