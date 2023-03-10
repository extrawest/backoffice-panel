import { theme } from "../../theme/theme";

export const dashboardPageStyles = {
	search: {
		maxWidth: "500px",
		marginBottom: "70px",
		[theme.breakpoints.down("md")]: {
			marginTop: "40px"
		}
	},
	boardWrapper: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		flexWrap: "wrap",
		alignItems: "flex-start",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column"
		}
	},
	primaryBoard: {
		marginTop: "51px",
		width: "100%",
		border: "1px solid #DFE0EB",
		borderRadius: "8px",
		display: "flex",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column"
		}
	},
	primaryBoardDescription: {
		width: "30%",
		[theme.breakpoints.down("md")]: {
			width: "100%",
		}
	},
	primaryBoardChart: {
		width: "70%",
		[theme.breakpoints.down("md")]: {
			width: "100%",
		}
	},
	secondaryBoard: {
		marginTop: "31px",
		width: "45%",
		border: "1px solid #DFE0EB",
		borderRadius: "8px",
		[theme.breakpoints.down("md")]: {
			width: "100%",
		}
	},
	badge: {
		borderRadius: "8px",
		padding: "5px 12px"
	},
	addButton: {
		background: "#F0F1F7",
		borderRadius: "8px",
		width: "24px",
		height: "24px",
		padding: "6px",
		minWidth: "initial"
	},
	primaryBoardChartRoot: {
		width: "100%",
		height: "100%",
		minHeight: "300px"
	},
	logo: {
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
		padding: "20px",
		width: "100%",
		gap: "10px"
	}
};
