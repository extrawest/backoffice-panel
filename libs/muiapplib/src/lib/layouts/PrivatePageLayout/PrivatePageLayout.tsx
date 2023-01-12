import { FC, PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@backoffice-panel-app/shared";
import SidebarProfile from "./SidebarProfile/SidebarProfile";
import PageLayout from "../PageLayout/PageLayout";
import { PrivatePageLayoutProps } from "./PrivatePageLayout.types";
import { privatePageLayoutStyles } from "./PrivatePageLayout.styles";
import exitLogo from "../../assets/icons/signOutLogo.svg";
import { getSidebarLinks } from "./PrivatePageLayout.utils";
import SidebarLink from "./SidebarLink/SidebarLink";

export const PrivatePageLayout: FC<PropsWithChildren<PrivatePageLayoutProps>> = ({
	isLoading,
	error,
	children
}) => {
	const sidebarLinks = getSidebarLinks();
	const [user, isLoadingUser, errorUser] = useAuthState(firebaseAuth);
	const [signOut, isLoadingSignOut, errorSignOut] = useSignOut(firebaseAuth);

	return (
		<PageLayout
			isLoading={isLoadingUser || isLoading || isLoadingSignOut}
			error={errorUser || error || errorSignOut}
		>
			{!isLoadingUser && !errorUser && user &&
				<>
					<Box
						sx={privatePageLayoutStyles.sideBar}
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
					</Box>
					<Box
						sx={privatePageLayoutStyles.bodyPart}
					>
						{children}
					</Box>
				</>
			}
		</PageLayout>
	);
};

export default PrivatePageLayout;
