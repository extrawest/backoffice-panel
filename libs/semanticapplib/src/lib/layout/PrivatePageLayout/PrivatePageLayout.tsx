import { FC, PropsWithChildren, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Button, Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";
import { firebaseAuth, getSidebarLinks } from "@backoffice-panel-app/shared";
import PageLayout from "../PageLayout/PageLayout";
import { PrivatePageLayoutProps } from "./PrivatePageLayout.types";
import { privatePageLayoutTexts } from "./PrivatePageLayout.texts";
import extrawestLogo from "../../assets/extrawestLogo.png";

export const PrivatePageLayout: FC<PropsWithChildren<PrivatePageLayoutProps>> = ({
	children,
	isLoading,
	error
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
					{children}
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							fontFamily: "Open Sans",
							fontStyle: "normal",
							fontWeight: 600,
							fontSize: "16px",
							lineHeight: "22px",
							textAlign: "center",
							letterSpacing: "0.3px",
							color: "#9FA2B4",
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
							padding: "1px 10px",
							width: "100%",
							gap: "10px",
							background: "white"
						}}
					>
						Powered by Extrawest
						<img
							src={extrawestLogo}
							height={30}
							alt="extrawestLogo"
						/>
					</div>
					<Button
						className="layout-open-sidebar"
						icon
						onClick={handleToggleOpenDrawer}
					>
						<Icon name="table" />
					</Button>
					<Container
						fluid
						style={{
							height: "100%",
							position: "absolute",
							left: "0",
							width: "auto"
						}}
					>
						<Sidebar.Pushable>
							<Sidebar
								as={Menu}
								animation='overlay'
								icon='labeled'
								onHide={handleToggleOpenDrawer}
								vertical
								visible={isOpenDrawer}
								width='wide'
							>
								<Container>
									<Image
										size="small"
										src={user.photoURL}
										style={{
											borderRadius: "50%"
										}}
									/>
									<h2>{user.displayName}</h2>
									<p>Admin</p>
								</Container>
								<Container>
									{sidebarLinks.map((item, i) => (
										<Menu.Item
											as="a"
											key={i}
											href={item.link}
											style={{
												display: "flex",
												justifyContent: "flex-start",
												gap: "10px",
												alignItems: "center",
												flexDirection: "row"
											}}
										>
											<Image src={item.icon} />
											{item.title}
										</Menu.Item>
									))}
								</Container>
								<Container>
									<Button onClick={signOut}>{intl.formatMessage(privatePageLayoutTexts.logoutButtonTitle)}</Button>
								</Container>
							</Sidebar>
							<Sidebar.Pusher dimmed={isOpenDrawer} />
						</Sidebar.Pushable>
					</Container>
				</>
			}
		</PageLayout >
	);
};

export default PrivatePageLayout;
