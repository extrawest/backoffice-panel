import { Box } from "@mui/material";
import { FC } from "react";
import { secondaryBoardItemStyles } from "./SecondaryBoardItem.styles";
import { SecondaryBoardItemProps } from "./SecondaryBoardItem.types";

export const SecondaryBoardItem: FC<SecondaryBoardItemProps> = ({
	leftItem,
	rightItem
}) => {
	return (
		<Box sx={secondaryBoardItemStyles.root}>
			{leftItem}
			{rightItem}
		</Box>
	);
};

export default SecondaryBoardItem;
