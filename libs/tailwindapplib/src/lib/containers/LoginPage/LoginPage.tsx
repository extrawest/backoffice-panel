import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firebaseAuth, LoginFormValues } from "@backoffice-panel-app/shared";
import { PageLayout } from "../../layout";
import { Button, LoginForm } from "../../components";
import { loginPageTexts } from "./LoginPage.texts";
import appleLogo from "../../assets/icons/apple.svg";
import facebookLogo from "../../assets/icons/facebook.svg";
import googleLogo from "../../assets/icons/google.svg";

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
			<div className="login-page">
				<h2 className="login-page-title">{intl.formatMessage(loginPageTexts.loginPageTitle)}</h2>
				<p className="login-page-subtitle">{intl.formatMessage(loginPageTexts.loginSubtitlePageTitle)}</p>
				<LoginForm
					initialValues={{
						login: "",
						password: ""
					}}
					onSubmit={handleSignInWithEmailAndPassword}
				/>
				<div className="login-page-button-wrapper">
					<Button>
						<img
							src={appleLogo}
							alt="appleLogo"
						/>
					</Button>
					<Button
						onClick={handleSignInWithGoogle}
					>
						<img
							src={googleLogo}
							alt="googleLogo"
						/>
					</Button>
					<Button
						onClick={handleSignInWithFacebook}
					>
						<img
							src={facebookLogo}
							alt="facebookLogo"
						/>
					</Button>
				</div>
			</div>
		</PageLayout>
	);
};

export default LoginPage;
