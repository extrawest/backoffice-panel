import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppRouteEnum } from "@backoffice-panel-app/shared";
import { Box, Typography } from "@mui/material";
import { SideBarLink } from "../PrivatePageLayout.types";

export const SidebarLink: FC<SideBarLink> = ({
	link,
	title,
	icon
}) => {
	const navigate = useNavigate();

	const handleUseLink = useCallback(
		() => {
			navigate(link ?? AppRouteEnum.DASHBOARD);
		},
		[navigate],
	);

	return (
		<Typography
			variant="h5"
			onClick={handleUseLink}
		>
			<Box
				component="img"
				src={icon}
			/>
			{title}
		</Typography>
	);
};

export default SidebarLink;
