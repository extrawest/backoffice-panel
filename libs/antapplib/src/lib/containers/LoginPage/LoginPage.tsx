import { useCallback } from "react";
import { useIntl } from "react-intl";
import { Button, Space } from "antd";
import { firebaseAuth, LoginFormValues } from "@backoffice-panel-app/shared";
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { PageLayout } from "../../layouts";
import { loginPageTexts } from "./LoginPage.texts";
import { LoginForm } from "../../components";

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
			<Space
				direction="vertical"
				align="center"
				size={[0, 20]}
			>
				<Title
					level={1}
					style={{
						textAlign: "center"
					}}
				>
					{intl.formatMessage(loginPageTexts.loginPageTitle)}

				</Title>
				<Paragraph
					style={{
						textAlign: "center",
						color: "#5F6769"
					}}
				>
					{intl.formatMessage(loginPageTexts.loginSubtitlePageTitle)}
				</Paragraph>
				<Space
					direction="vertical"
					align="center"
					size={15}
					style={{
						minWidth: "320px"
					}}
				>
					<LoginForm
						initialValues={{
							login: "",
							password: ""
						}}
						onSubmit={handleSignInWithEmailAndPassword}
					/>
					<Space>
						<Button
							shape="circle"
							size="large"
							icon={<GoogleOutlined />}
							onClick={handleSignInWithGoogle}
						/>
						<Button
							shape="circle"
							size="large"
							icon={<AppleOutlined />}
						/>
						<Button
							shape="circle"
							size="large"
							icon={<FacebookOutlined style={{fontSize: 20}}/>}
							onClick={handleSignInWithFacebook}
						/>
					</Space>
				</Space>

			</Space>
		</PageLayout>
	);
};

export default LoginPage;
