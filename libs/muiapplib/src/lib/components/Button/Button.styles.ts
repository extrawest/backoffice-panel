import { Theme } from "@mui/material";

export const buttonStyles = {
	default: {

	},
	icon: {
		borderRadius: "50%",
		"&:hover": {
			background: "none"
		}
	},
	blue: {
		background: `linear-gradient(174.19deg, #1D2992 -0.39%, #237DBF 154.32%)`,
		transition: "background .4s",
		borderRadius: "38.5px",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: "15px 70px",
		gap: "10px",
		fontFamily: "Open Sans",
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "16px",
		lineHeight: "22px",
		textAlign: "center",
		boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.75)",
		color: (theme: Theme) => theme.palette.common.white,
		"&:hover": {
			boxShadow: "1px 3px 3px 0px rgba(0,0,0,0.75)",
			transition: "all .4s"
		}
	}
};
