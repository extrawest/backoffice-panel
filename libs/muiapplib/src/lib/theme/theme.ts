import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			dark: "#222831",
			main: "#808080",
			light: "#5F6769"
		},
		secondary: {
			dark: "#474747",
			main: "#505050",
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
		h2: {
		},
		h3: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 600,
			fontSize: "22px",
			lineHeight: "26px",
			textAlign: "left"
		},
		h5: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 400,
			fontSize: "20px",
			lineHeight: "26px",
			display: "flex",
			gap: "5px",
			cursor: "pointer",
			width: "fit-content"
		},
		body1: {
			fontFamily: "Roboto",
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: 14,
			lineHeight: "22px",
			textAlign: "center",
		},
		subtitle1: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: "16px",
			lineHeight: "22px",
			textAlign: "left"
		}
	}
});

theme.typography.h1.color = theme.palette.primary.dark;
theme.typography.h3.color = theme.palette.secondary.dark;
theme.typography.h5.color = theme.palette.secondary.main;
theme.typography.body1.color = theme.palette.primary.light;
theme.typography.subtitle1.color = theme.palette.primary.main;

theme.components = {
	MuiTextField: {
		styleOverrides: {
			root: {
				width: "90%",
				"& .MuiInputBase-root": {
					borderRadius: "50px",
					width: "100%",
					height: "52px"
				},
				"& input": {
					marginLeft: "20px",
					fontFamily: "Open Sans",
					fontStyle: "normal",
					fontWeight: 300,
					fontSize: "18px",
					lineHeight: "22px",
					color: "#5F6769"
				}
			}
		}
	},
	MuiCircularProgress: {
		styleOverrides: {
			root: {
				color: theme.palette.primary.dark
			}
		}
	}
};
