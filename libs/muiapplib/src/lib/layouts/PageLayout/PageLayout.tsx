import { FC, PropsWithChildren } from "react";
import { Box, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { pageLayoutStyles } from "./PageLayout.styles";
import { PageLayoutProps } from "./PageLayout.types";

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	return (
		<>
			<Box
				sx={pageLayoutStyles.root}
			>
				{children}
			</Box>
			<Backdrop
				sx={pageLayoutStyles.backdrop}
				open={!!isLoading}
			>
				<CircularProgress />
			</Backdrop>
			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				message={error?.message}
			/>
		</>

	);
};

export default PageLayout;
