import { FC } from "react";
import { Box, Button as MUIButton } from "@mui/material";
import { ButtonProps } from "./Button.types";
import { buttonStyles } from "./Button.styles";

export const Button: FC<ButtonProps> = ({
	children,
	icon,
	variant,
	type,
	sx,
	...rest
}) => {
	return (
		<MUIButton
			disableRipple
			disableFocusRipple
			disableTouchRipple
			type={type}
			sx={[
				variant === "default" && buttonStyles.default,
				variant === "icon" && buttonStyles.icon,
				variant === "blue" && buttonStyles.blue,
				sx as Record<string, unknown>,
			]}
			{...rest}
		>
			{icon && (
				<Box
					component="img"
					src={icon}
				/>
			)}
			{children}
		</MUIButton>
	);
};

export default Button;
