import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Button } from "primereact/button";
import { firebaseAuth, LoginFormValues } from "@backoffice-panel-app/shared";
import { PageLayout } from "../../layout";
import { LoginForm } from "../../components";
import { loginPageTexts } from "./LoginPage.texts";

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
			<div className="flex flex-column align-items-center gap-4 login-page">
				<h3 className="login-page_title">
					{intl.formatMessage(loginPageTexts.loginPageTitle)}
				</h3>
				<p className="login-page_subtitle">
					{intl.formatMessage(loginPageTexts.loginSubtitlePageTitle)}
				</p>
				<LoginForm
					initialValues={{
						login: "",
						password: ""
					}}
					onSubmit={handleSignInWithEmailAndPassword}
				/>
				<div className="flex flex-row gap-3">
					<Button
						className="p-button-rounded"
					>
						<i
							className="pi pi-apple"
							style={{ fontSize: "1.4rem" }}
						>
						</i>
					</Button>
					<Button
						className="p-button-rounded"
						onClick={handleSignInWithGoogle}
					>
						<i
							className="pi pi-google"
							style={{ fontSize: "1.4rem" }}
						>
						</i>
					</Button>
					<Button
						className="p-button-rounded"
						onClick={handleSignInWithFacebook}
					>
						<i
							className="pi pi-facebook"
							style={{ fontSize: "1.4rem" }}
						>
						</i>
					</Button>
				</div>
			</div>
		</PageLayout>
	);
};

export default LoginPage;
