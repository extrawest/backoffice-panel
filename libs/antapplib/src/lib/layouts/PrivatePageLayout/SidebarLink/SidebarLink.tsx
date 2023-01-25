import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image, Typography } from "antd";
import { AppRouteEnum, SideBarLinkProps } from "@backoffice-panel-app/shared";
import { sidebarLinkStyles } from "./SidebarLink.styles";

export const SidebarLink: FC<SideBarLinkProps> = ({
	link,
	title,
	icon
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleUseLink = useCallback(
		() => {
			navigate(link ?? AppRouteEnum.DASHBOARD);
		},
		[navigate],
	);

	console.log("navigate", location.pathname);

	return (
		<Typography
			onClick={handleUseLink}
			style={{
				...sidebarLinkStyles.root,
				fontWeight: location.pathname === link ? 600 : 300
			}}

		>
			<Image
				src={icon}

			/>
			{title}
		</Typography>
	);
};

export default SidebarLink;
