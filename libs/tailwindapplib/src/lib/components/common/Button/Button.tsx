import React, { FC, PropsWithChildren } from "react";
import { ButtonProps } from "./Button.types";

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
	onClick,
	children,
	type
}) => {
	return (
		<button
			className="button-default"
			type={type}
			onClick={onClick}
		>
			{children}
		</button >
	);
};

export default Button;
