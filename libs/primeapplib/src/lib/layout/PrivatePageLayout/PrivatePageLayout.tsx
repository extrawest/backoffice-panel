import { FC, PropsWithChildren, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";
import { firebaseAuth, getSidebarLinks } from "@backoffice-panel-app/shared";
import PageLayout from "../PageLayout/PageLayout";
import { PrivatePageLayoutProps } from "./PrivatePageLayout.types";
import { privatePageLayoutTexts } from "./PrivatePageLayout.texts";
import extrawestLogo from "../../assets/extrawestLogo.png";

export const PrivatePageLayout: FC<PropsWithChildren<PrivatePageLayoutProps>> = ({
	isLoading,
	error,
	children
}) => {
	const intl = useIntl();
	const navigate = useNavigate();
	const location = useLocation();
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
			{!isLoadingUser && !errorUser && user && (
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
							justifyContent: "center",
							alignItems: "center",
							padding: "10px",
							width: "100%",
							gap: "10px"
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
						className="p-button-rounded absolute"
						onClick={handleToggleOpenDrawer}
					>
						<i
							className="pi pi-list"
							style={{ fontSize: "1.4rem" }}
						>
						</i>
					</Button>
					<Sidebar
						visible={isOpenDrawer}
						onHide={handleToggleOpenDrawer}
						className="sidebar"
					>
						<Avatar
							label="A"
							icon="pi pi-user"
							image={user.photoURL ?? ""}
							className="avatar"
						/>
						<h4
							className="username"
						>
							{user.displayName}
						</h4>
						<p className="status">Admin</p>
						<ul>
							{sidebarLinks.map((item, i) => (
								<li
									key={i}
									className={location.pathname === item.link ? "bold" : undefined}
								>
									<img
										src={item.icon}
										alt={`${item.title}_li`}
									/>
									<span onClick={() => navigate(item?.link ?? "#")}>
										{item.title}
									</span>
								</li>
							))}
						</ul>
						<Button
							className="p-button"
							onClick={signOut}
							label={intl.formatMessage(privatePageLayoutTexts.logoutButtonTitle)}
							icon="pi pi-sign-out"
						/>
					</Sidebar>
				</>
			)}
		</PageLayout>
	);
};

export default PrivatePageLayout;
