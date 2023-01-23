import { FC, useEffect, useState } from "react";
import { AlertProps } from "./Alert.types";

export const Alert: FC<AlertProps> = ({
	isOpen,
	title,
	subtitle
}) => {
	const [isOpenNow, setIsOpenNow] = useState(false);

	useEffect(() => {
		if (!isOpenNow) return;
		const timeout = setTimeout(() => {
			setIsOpenNow(false);
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [isOpenNow]);

	useEffect(() => {
		if (isOpen) setIsOpenNow(true);
	}, [isOpen]);

	return (
		<>
			{isOpenNow && (
				<div
					role="alert"
					className="alert"
				>
					<div className="alert-title">
						{title}
					</div>
					<div className="alert-subtitle">
						<p>{subtitle}</p>
					</div>
				</div>
			)}
		</>

	);
};

export default Alert;
