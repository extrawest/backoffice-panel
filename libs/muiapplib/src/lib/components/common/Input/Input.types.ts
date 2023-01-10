import { TextFieldProps } from "@mui/material";

export type InputProps = TextFieldProps & {
	icon: AdormentIconType;
};

export type AdormentIconType = "password" | "login";
