import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { firebaseAuth, LoginFormValues } from "@backoffice-panel-app/shared";
import { LoginForm, Button } from "../../components";
import { PageLayout } from "../../layouts";
import { loginPageStyles } from "./LoginPage.styles";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import appleIcon from "../../assets/icons/apple.svg";

export const LoginPage = () => {
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
			<Box
				sx={loginPageStyles.root}
			>
				<Box
					sx={loginPageStyles.title}
				>
					<Typography
						variant="h1"
					>
						Login
					</Typography>
					<Typography
						variant="h1"
					>
						to account
					</Typography>
				</Box>

				<Typography variant="body1">If you already have an account, just log in to use the system</Typography>
				<LoginForm
					initialValues={{
						login: "",
						password: ""
					}}
					onSubmit={handleSignInWithEmailAndPassword}
				/>
				<Box>
					<Button
						onClick={handleSignInWithFacebook}
						variant="icon"
						icon={facebookIcon}
					/>
					<Button
						onClick={handleSignInWithGoogle}
						variant="icon"
						icon={googleIcon}
					/>
					<Button
						disabled
						variant="icon"
						icon={appleIcon}
					/>
				</Box>
			</Box>
		</PageLayout>
	);
};

export default LoginPage;
