import { FC } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import { LoginFormProps } from "@backoffice-panel-app/shared";
import { Button, FormInput } from "../../common";
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
									<FormInput
										{...field}
										placeholder="Login"
									/>
									{errors.login && touched.login &&
										<p className="login-form_error">{errors.login && touched.login && errors.login}</p>
									}
								</div>
							)}
						</Field>
						<Field name="password">
							{({ field }: FormikValues) => (
								<div className="login-form_field">
									<FormInput
										{...field}
										placeholder="Password"
										type="password"
									/>
									{errors.password && touched.password &&
										<p className="login-form_error">{errors.password && touched.password && errors.password}</p>
									}
								</div>

							)}
						</Field>
						<Button
							type="submit"
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
