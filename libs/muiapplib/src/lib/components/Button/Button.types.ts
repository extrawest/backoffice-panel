import { ButtonProps as MUIButtonProps } from "@mui/material";

export type ButtonProps = Omit<MUIButtonProps, "type"> & {
	icon?: string;
	type: "default" | "icon" | "blue"
};
