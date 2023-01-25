import { FC, PropsWithChildren, useCallback, useState } from "react";
import { Button, Drawer, Space } from "antd";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useIntl } from "react-intl";
import { DoubleRightOutlined, LogoutOutlined } from "@ant-design/icons";
import { firebaseAuth, getSidebarLinks } from "@backoffice-panel-app/shared";
import SidebarProfile from "./SidebarProfile/SidebarProfile";
import PageLayout from "../PageLayout/PageLayout";
import SidebarLink from "./SidebarLink/SidebarLink";
import { PrivatePageLayoutProps } from "./PrivatePageLayout.types";
import { privatePageLayoutTexts } from "./PrivatePageLayout.texts";

export const PrivatePageLayout: FC<PropsWithChildren<PrivatePageLayoutProps>> = ({
	isLoading,
	error,
	children
}) => {
	const intl = useIntl();
	const sidebarLinks = getSidebarLinks();
	const [user, isLoadingUser, errorUser] = useAuthState(firebaseAuth);
	const [signOut, isLoadingSignOut, errorSignOut] = useSignOut(firebaseAuth);
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);

	const handleToggleOpenDrawer = useCallback(
		() => {
			setIsOpenDrawer(prev => !prev);
		},
		[],
	);

	return (
		<PageLayout
			isLoading={isLoadingUser || isLoading || isLoadingSignOut}
			error={errorUser || error || errorSignOut}
		>
			{!isLoadingUser && !errorUser && user &&
				<>
					<Space >
						{children}
					</Space>
					<Button
						style={{
							position: "absolute",
							top: "30px",
							left: "30px"
						}}
						onClick={handleToggleOpenDrawer}
						icon={<DoubleRightOutlined />}
					/>
					<Drawer
						open={isOpenDrawer}
						onClose={handleToggleOpenDrawer}
						placement="left"

					>
						<Space
							direction="vertical"
							size={[0, 40]}
							style={{
							}}
						>
							<SidebarProfile
								user={user}
							/>
							<Space
								direction="vertical"
								size={[0, 30]}
							>
								{sidebarLinks.map((item, index) => (
									<SidebarLink
										title={item.title}
										icon={item.icon}
										link={item.link}
										key={index}
									/>
								))}
							</Space>
							<Button
								type="text"
								icon={<LogoutOutlined />}
								size="large"
								onClick={signOut}
								style={{
									fontSize: "20px",
									padding: "0"
								}}
							>
								{intl.formatMessage(privatePageLayoutTexts.logoutButtonTitle)}
							</Button>
						</Space>
					</Drawer>
				</>
			}
		</PageLayout>
	);
};

export default PrivatePageLayout;
