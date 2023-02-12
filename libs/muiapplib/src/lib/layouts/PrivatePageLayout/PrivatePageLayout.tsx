import { FC, PropsWithChildren, useCallback, useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import MenuIcon from "@mui/icons-material/Menu";
import { firebaseAuth, getSidebarLinks } from "@backoffice-panel-app/shared";
import SidebarProfile from "./SidebarProfile/SidebarProfile";
import PageLayout from "../PageLayout/PageLayout";
import SidebarLink from "./SidebarLink/SidebarLink";
import { Button } from "../../components";
import { PrivatePageLayoutProps } from "./PrivatePageLayout.types";
import { privatePageLayoutStyles } from "./PrivatePageLayout.styles";
import exitLogo from "../../assets/icons/signOutLogo.svg";

export const PrivatePageLayout: FC<PropsWithChildren<PrivatePageLayoutProps>> = ({
	isLoading,
	error,
	children
}) => {
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
					<Drawer
						open={isOpenDrawer}
						sx={privatePageLayoutStyles.sideBar}
						anchor="left"

					>
						<SidebarProfile
							user={user}
						/>
						<Box
							sx={privatePageLayoutStyles.linksWrapper}
						>
							{sidebarLinks.map((item, index) => (
								<SidebarLink
									title={item.title}
									icon={item.icon}
									link={item.link}
									key={index}
								/>
							))}
						</Box>
						<Typography
							variant="h5"
							onClick={signOut}
						>
							<Box
								component="img"
								src={exitLogo}
							/>
							Log out
						</Typography>
					</Drawer>
					<Box
						sx={privatePageLayoutStyles.bodyPart}
					>
						{children}
						<Button
							onClick={handleToggleOpenDrawer}
							variant="icon"
							sx={{
								position: "absolute",
								left: "10px",
								top: "10px",
								zIndex: 20
							}}
						>
							<MenuIcon/>
						</Button>
					</Box>
				</>
			}
		</PageLayout>
	);
};

export default PrivatePageLayout;
