import { FC, PropsWithChildren } from "react";
import { PageLayoutProps } from "./PageLayout.types";

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	return (
		<div>
			{children}
		</div>
	);
};

export default PageLayout;
