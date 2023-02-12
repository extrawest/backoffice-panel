import { FC, useCallback, useMemo, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { InputProps } from "./Input.types";
import { getStartAdormentLogo } from "./Input.utils";
import { inputStyles } from "./Input.styles";
import visiblePasswordLogo from "../../../assets/icons/visiblePasswordLogo.svg";

export const Input: FC<InputProps> = ({
	type,
	icon,
	uploadedImage,
	...rest
}) => {
	const isPasswordType = type === "password";
	const commonType = type === "image" ? "file" : "text";
	const startAdormentLogo = getStartAdormentLogo(icon);
	const [isPasswordVisible, setIsPasswordVisible] = useState(!isPasswordType);

	const handleShowPassword = useCallback(
		() => {
			setIsPasswordVisible((prevState) => !prevState);
		},
		[setIsPasswordVisible],
	);
	const memorizedUploadedImageStyles = useMemo(() => inputStyles.image(uploadedImage), [uploadedImage]);

	return (
		<TextField
			sx={[
				type === "image" && memorizedUploadedImageStyles
			]}
			type={isPasswordVisible ? commonType : "password"}
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
