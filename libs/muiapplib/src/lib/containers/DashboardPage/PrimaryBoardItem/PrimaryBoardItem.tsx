import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { primaryBoardItemStyles } from "./PrimaryBoardItem.styles";
import { PrimaryBoardItemProps } from "./PrimaryBoardItem.types";

export const PrimaryBoardItem: FC<PrimaryBoardItemProps> = ({
	title,
	subtitle
}) => {
	return (
		<Box
			sx={primaryBoardItemStyles.root}
		>
			<Typography sx={primaryBoardItemStyles.title}>{title}</Typography>
			<Typography sx={primaryBoardItemStyles.subtitle}>{subtitle}</Typography>
		</Box>
	);
};

export default PrimaryBoardItem;
