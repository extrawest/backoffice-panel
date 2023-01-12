import { TextFieldProps } from "@mui/material";

export type InputProps = TextFieldProps & {
	icon: AdormentIconType;
	uploadedImage?: File;
};

export type AdormentIconType = "password" | "login" | "search" | "image";
