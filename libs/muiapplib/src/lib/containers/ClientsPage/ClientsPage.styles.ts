import { theme } from "../../theme/theme";

export const clientsPageStyles = {
	search: {
		maxWidth: "500px",
		marginBottom: "70px",
		[theme.breakpoints.down("md")]: {
			marginTop: "40px"
		}
	},
	ticketsWrapper: {
		marginTop: "51px",
		width: "100%",
		border: "1px solid #DFE0EB",
		borderRadius: "8px"
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
