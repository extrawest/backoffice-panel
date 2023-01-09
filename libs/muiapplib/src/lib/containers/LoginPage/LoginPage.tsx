import { Box, Typography } from "@mui/material";
import { Button } from "../../components";
import { PageLayout } from "../../layouts";
import { loginPageStyles } from "./LoginPage.styles";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import appleIcon from "../../assets/icons/apple.svg";

export const LoginPage = () => {
	return (
		<PageLayout>
			<Box
				sx={loginPageStyles.root}
			>
				<Typography
					variant="h1"
					sx={loginPageStyles.title}
				>
					{`Login to account`}
				</Typography>
				<Typography variant="body1">If you already have an account, just log in to use the system</Typography>
				<Button type="blue">Log in</Button>
				<Box>
					<Button
						type="icon"
						icon={facebookIcon}
					/>
					<Button
						type="icon"
						icon={googleIcon}
					/>
					<Button
						type="icon"
						icon={appleIcon}
					/>
				</Box>
			</Box>
		</PageLayout>
	);
};

export default LoginPage;
