import { FC, useCallback, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { InputProps } from "./Input.types";
import { getStartAdormentLogo } from "./Input.utils";
import visiblePasswordLogo from "../../../assets/icons/visiblePasswordLogo.svg";

export const Input: FC<InputProps> = ({
	type,
	icon,
	...rest
}) => {
	const isPasswordType = type === "password";
	const startAdormentLogo = getStartAdormentLogo(icon);
	const [isPasswordVisible, setIsPasswordVisible] = useState(!isPasswordType);

	const handleShowPassword = useCallback(
		() => {
			setIsPasswordVisible((prevState) => !prevState);
		},
		[setIsPasswordVisible],
	);

	return (
		<TextField
			type={isPasswordVisible ? "text" : "password"}
			InputProps={{
				startAdornment: startAdormentLogo && (
					<Box
						component="img"
						src={startAdormentLogo}
					/>
				),
				endAdornment: isPasswordType && (
					<IconButton
						onClick={handleShowPassword}
					>
						<Box
							component="img"
							src={visiblePasswordLogo}
						/>
					</IconButton>
				)
			}}
			{...rest}
		/>
	);
};

export default Input;
