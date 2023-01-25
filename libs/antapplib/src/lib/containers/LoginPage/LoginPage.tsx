import { useCallback } from "react";
import { useIntl } from "react-intl";
import { Button, Space } from "antd";
import { useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { firebaseAuth, LoginFormValues } from "@backoffice-panel-app/shared";
import { PageLayout } from "../../layouts";
import { LoginForm } from "../../components";
import { loginPageTexts } from "./LoginPage.texts";
import { loginPageStyles } from "./LoginPage.styles";

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
						...loginPageStyles.loginSubtitlePageTitle,
						textAlign: "center",
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
							icon={<FacebookOutlined style={{ fontSize: 20 }} />}
							onClick={handleSignInWithFacebook}
						/>
					</Space>
				</Space>
			</Space>
		</PageLayout>
	);
};

export default LoginPage;
