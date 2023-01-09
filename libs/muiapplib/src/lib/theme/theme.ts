import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			dark: "#222831",
			main: "#222831",
			light: "#5F6769"
		}
	},
	typography: {
		h1: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 700,
			fontSize: 56,
			lineHeight: "66px",
			textAlign: "center"
		},
		body1: {
			fontFamily: "Roboto",
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: 14,
			lineHeight: "22px",
			textAlign: "center",
		}
	}
});

theme.typography.h1.color = theme.palette.primary.dark;
theme.typography.body1.color = theme.palette.primary.light;
