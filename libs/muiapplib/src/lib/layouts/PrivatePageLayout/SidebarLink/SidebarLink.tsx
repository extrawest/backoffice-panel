import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AppRouteEnum, SideBarLinkProps } from "@backoffice-panel-app/shared";

export const SidebarLink: FC<SideBarLinkProps> = ({
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
