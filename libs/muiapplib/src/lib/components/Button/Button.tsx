import { FC } from "react";
import { Box, Button as MUIButton } from "@mui/material";
import { ButtonProps } from "./Button.types";
import { buttonStyles } from "./Button.styles";

export const Button: FC<ButtonProps> = ({
	children,
	icon,
	type,
	...rest
}) => {
	return (
		<MUIButton
			disableRipple
			disableFocusRipple
			disableTouchRipple
			sx={[
				type === "default" && buttonStyles.default,
				type === "icon" && buttonStyles.icon,
				type === "blue" && buttonStyles.blue,
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
