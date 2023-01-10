import { FC } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import { LoginFormProps } from "@backoffice-panel-app/shared";
import { Button, Input } from "../../common";
import { loginFormSchema } from "./LoginForm.schema";
import { loginFormStyles } from "./LoginForm.styles";

export const LoginForm: FC<LoginFormProps> = ({
	initialValues,
	onSubmit
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
								<Input
									{...field}
									icon="login"
									placeholder="Login"
									type="email"
									error={errors.login && touched.login}
									helperText={errors.login && touched.login && errors.login}
								/>
							)}
						</Field>
						<Field name="password">
							{({ field }: FormikValues) => (
								<Input
									{...field}
									icon="password"
									placeholder="Password"
									type="password"
									error={errors.password && touched.password}
									helperText={errors.password && touched.password && errors.password}
								/>
							)}
						</Field>
						<Button
							variant="blue"
							type="submit"
							sx={loginFormStyles.button}
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
