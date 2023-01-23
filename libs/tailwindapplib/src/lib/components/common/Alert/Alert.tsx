import { FC } from "react";
import { AlertProps } from "./Alert.types";

export const Alert: FC<AlertProps> = ({
	isOpen,
	title,
	subtitle
}) => {
	return (
		<div
			role="alert"
			className="alert"
		>
			<div className="alert-title">
				Danger
			</div>
			<div className="alert-subtitle">
				<p>Something not ideal might be happening.</p>
			</div>
		</div>
	);
};

export default Alert;
