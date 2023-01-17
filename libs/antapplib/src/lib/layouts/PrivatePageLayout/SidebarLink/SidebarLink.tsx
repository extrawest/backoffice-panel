import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRouteEnum, SideBarLinkProps } from "@backoffice-panel-app/shared";
import { Image, Typography } from "antd";

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
				fontSize: "20px",
				padding: "0",
				display: "flex",
				alignItems: "center",
				gap: "5px",
				cursor: "pointer",
				color: "#505050",
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
