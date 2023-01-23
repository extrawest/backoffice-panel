import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firebaseAuth, LoginFormValues } from "@backoffice-panel-app/shared";
import { PageLayout } from "../../layout";
import { LoginForm } from "../../components";
import { loginPageTexts } from "./LoginPage.texts";
import { Button, Icon, Container } from "semantic-ui-react";

export const LoginPage = () => {
	const intl = useIntl();
	const [
		signInWithGoogle, ,
		loadingSignInWithGoogle,
		errorSignInWithGoogle
	] = useSignInWithGoogle(firebaseAuth);

	const [
		signInWithFacebook, ,
		loadingSignInWithFacebook,
		errorSignInWithFacebook
	] = useSignInWithFacebook(firebaseAuth);

	const [
		signInWithEmailAndPassword, ,
		loadingSignInWithEmailAndPassword,
		errorSignInWithEmailAndPassword
	] = useSignInWithEmailAndPassword(firebaseAuth);

	const handleSignInWithGoogle = useCallback(
		() => {
			signInWithGoogle();
		},
		[signInWithGoogle],
	);
	const handleSignInWithFacebook = useCallback(
		() => {
			signInWithFacebook();
		},
		[signInWithFacebook],
	);
	const handleSignInWithEmailAndPassword = useCallback(
		(values: LoginFormValues) => {
			signInWithEmailAndPassword(values.login ?? "", values.password ?? "");
		},
		[signInWithEmailAndPassword],
	);

	return (
		<PageLayout
			error={errorSignInWithFacebook || errorSignInWithGoogle || errorSignInWithEmailAndPassword}
			isLoading={loadingSignInWithGoogle || loadingSignInWithFacebook || loadingSignInWithEmailAndPassword}
		>
			<Container
				className="login-page"
				fluid
			>
				<h1>{intl.formatMessage(loginPageTexts.loginPageTitle)}</h1>
				<p>{intl.formatMessage(loginPageTexts.loginSubtitlePageTitle)}</p>
				<LoginForm
					initialValues={{
						login: "",
						password: ""
					}}
					onSubmit={handleSignInWithEmailAndPassword}
				/>
				<Container className="login-page_social-wrapper">
					<Button
						icon
						onClick={handleSignInWithGoogle}
					>
						<Icon name="google" />
					</Button>
					<Button
						icon
						onClick={handleSignInWithFacebook}
					>
						<Icon name="facebook" />
					</Button>
					<Button icon>
						<Icon name="apple" />
					</Button>
				</Container>
			</Container>
		</PageLayout>
	);
};

export default LoginPage;
