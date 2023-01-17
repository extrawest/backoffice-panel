import { FC } from "react";
import { Avatar, Space, Typography } from "antd";
import { SidebarProfileProps } from "./SidebarProfile.types";

export const SidebarProfile: FC<SidebarProfileProps> = ({
	user
}) => {
	return (
		<Space.Compact
			direction="vertical"
		>
			<Avatar
				src={user.photoURL}
				size={100}
			/>
			<Typography.Title level={2}>{user.displayName}</Typography.Title>
			<Typography.Text disabled>Admin</Typography.Text>
		</Space.Compact>
	);
};

export default SidebarProfile;
