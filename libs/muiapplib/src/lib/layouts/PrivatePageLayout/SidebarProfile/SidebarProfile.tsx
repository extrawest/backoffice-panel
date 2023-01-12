import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { SidebarProfileProps } from "./SidebarProfile.types";
import profileLogo from "../../../assets/icons/loginLogo.svg";
import { privatePageLayoutStyles } from "../PrivatePageLayout.styles";

export const SidebarProfile: FC<SidebarProfileProps> = ({
	user
}) => {
	return (
		<Box
			sx={privatePageLayoutStyles.profileWrapper}
		>
			<Box
				component="img"
				src={user.photoURL ?? profileLogo}
				sx={privatePageLayoutStyles.avatar}
			/>
			<Typography variant="h3">{user.displayName}</Typography>
			<Typography variant="subtitle1">Admin</Typography>
		</Box>
	);
};

export default SidebarProfile;
