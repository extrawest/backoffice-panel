import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
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
		<PageLayout>
			asas
		</PageLayout>
	);
};

export default LoginPage;
