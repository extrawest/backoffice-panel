import { FC, PropsWithChildren, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { firebaseAuth, getSidebarLinks } from "@backoffice-panel-app/shared";
import PageLayout from "../PageLayout/PageLayout";
import { Button } from "../../components";
import { PrivatePageLayoutProps } from "./PrivatePageLayout.types";
import { privatePageLayoutTexts } from "./PrivatePageLayout.texts";
import menuLogo from "../../assets/icons/menuLogo.svg";
import signLogo from "../../assets/icons/signOutLogo.svg";
import userLogo from "../../assets/icons/loginLogo.svg";
import extrawestLogo from "../../assets/icons/extrawestLogo.png";

export const PrivatePageLayout: FC<PropsWithChildren<PrivatePageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	const intl = useIntl();
	const navigate = useNavigate();
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
					<div
						className="content-wrapper"
						style={{
							overflow: "auto"
						}}
					>
						{children}
					</div>
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
							gap: "10px",
							background: "white"
						}}
					>
						Powered by Extrawest
						<img
							src={extrawestLogo}
							style={{
								height: 30
							}}
							alt="extrawestLogo"
						/>
					</div>
					<div
						className="private-layout"
						style={{
							transform: `translateX(${isOpenDrawer ? "0" : "-100%"})`,
							transition: "transform .3s"
						}}
					>
						<div className="private-layout_avatar-wrapper">
							<img
								src={user.photoURL ?? userLogo}
								alt="signLogo"
							/>
							<h3>{user.displayName}</h3>
							<p>Admin</p>
						</div>
						<div className="private-layout_links-wrapper">
							<ul>
								{sidebarLinks.map((item, i) => (
									<li
										key={i}
										onClick={() => navigate(item.link ?? "")}
									>
										<img
											src={item.icon}
											alt="signLogo"
										/>
										{item.title}
									</li>
								))}
							</ul>
						</div>
						<Button
							onClick={signOut}
							className="sidebar-button"
						>
							<img
								src={signLogo}
								alt="signLogo"
							/>
							{intl.formatMessage(privatePageLayoutTexts.logoutButtonTitle)}
						</Button>
					</div>
					<Button
						className="layout-open-sidebar"
						onClick={handleToggleOpenDrawer}
					>
						<img
							src={menuLogo}
							alt="menu logo"
						/>
					</Button>
				</>
			}
		</PageLayout >
	);
};

export default PrivatePageLayout;
