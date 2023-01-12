import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		neutral: Palette["primary"];
		additional: Palette["primary"];
	}

	interface PaletteOptions {
		neutral: PaletteOptions["primary"];
		additional: PaletteOptions["primary"];
	}
}

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
			light: "#222831"
		},
		neutral: {
			dark: "#252733",
			main: "#C5C7CD",
			light: "#9FA2B4"
		},
		additional: {
			dark: "#DDDDDD",
			main: "#C5C7CD",
			light: "#9FA2B4"
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
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 700,
			fontSize: "38px",
			lineHeight: "48px",
		},
		h3: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 600,
			fontSize: "22px",
			lineHeight: "26px",
			textAlign: "left"
		},
		h4: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 600,
			fontSize: "14px",
			lineHeight: "20px",
			letterSpacing: "0.2px"
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
		h6: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 700,
			fontSize: "19px",
			lineHeight: "26px",
			letterSpacing: "0.4px",
		},
		body1: {
			fontFamily: "Roboto",
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: 14,
			lineHeight: "22px",
			textAlign: "center",
		},
		body2: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 400,
			fontSize: "12px",
			lineHeight: "16px",
			letterSpacing: "0.1px"
		},
		subtitle1: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 300,
			fontSize: "16px",
			lineHeight: "22px",
			textAlign: "left"
		},
		subtitle2: {
			fontFamily: "Open Sans",
			fontStyle: "normal",
			fontWeight: 700,
			fontSize: "14px",
			lineHeight: "19px",
			letterSpacing: "0.2px"
		}
	}
});

theme.typography.h1.color = theme.palette.primary.dark;
theme.typography.h2.color = theme.palette.secondary.light;
theme.typography.h3.color = theme.palette.secondary.dark;
theme.typography.h4.color = theme.palette.neutral.dark;
theme.typography.h5.color = theme.palette.secondary.main;
theme.typography.h6.color = theme.palette.neutral.dark;
theme.typography.body1.color = theme.palette.primary.light;
theme.typography.body2.color = theme.palette.neutral.main;
theme.typography.subtitle1.color = theme.palette.primary.main;
theme.typography.subtitle2.color = theme.palette.neutral.light;

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
			},

		}
	},
	MuiInputBase: {
		styleOverrides: {
			root: {
				width: "90%",
				"&.MuiOutlinedInput-root": {
					borderRadius: "50px"
				},
				"& .MuiInputBase-input": {
					fontFamily: "Open Sans",
					fontStyle: "normal",
					fontWeight: 300,
					fontSize: "18px",
					lineHeight: "22px",
					color: "#5F6769",
					textAlign: "left",
					display: "flex",
					alignItems: "center"
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
	},
};
