import { theme } from "../../theme/theme";

export const privatePageLayoutStyles = {
	sideBar: {
		maxWidth: "460px",
		width: "460px",
		zIndex: 1,
		"& .MuiDrawer-paper": {
			boxShadow: "0px 4px 34px rgba(96, 94, 94, 0.09)",
			maxWidth: "460px",
			width: "460px",
			height: "100vh",
			padding: "87px 100px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			alignItem: "center",
			[theme.breakpoints.down("md")]: {
				padding: "27px 20px",
				gap: "20px"
			}
		}
	},
	bodyPart: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		padding: "44px 100px",
		width: "100%",
		[theme.breakpoints.down("md")]: {
			padding: "15px",
		}
	},
	profileWrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItem: "center",
		gap: "10px"
	},
	avatar: {
		borderRadius: "50%",
		width: "124px",
		height: "124px"
	},
	linksWrapper: {
		display: "flex",
		flexDirection: "column",
		gap: "35px"
	}
};
