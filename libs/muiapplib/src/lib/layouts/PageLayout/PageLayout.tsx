import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { pageLayoutStyles } from "./PageLayout.styles";

export const PageLayout: FC<PropsWithChildren> = ({
	children
}) => {
	return (
		<Box
			sx={pageLayoutStyles.root}
		>
			{children}
		</Box>
	);
};

export default PageLayout;
