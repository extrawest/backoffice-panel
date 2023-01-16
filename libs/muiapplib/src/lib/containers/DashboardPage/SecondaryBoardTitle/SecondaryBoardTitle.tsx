import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { SecondaryBoardTitleProps } from "./SecondaryBoardTitle.types";
import { secondaryBoardTitleStyles } from "./SecondaryBoardTitle.styles";

export const SecondaryBoardTitle: FC<SecondaryBoardTitleProps> = ({
	title,
	subtitle,
	linkTitle,
	onLinkClick
}) => {
	return (
		<Box
			sx={secondaryBoardTitleStyles.root}
		>
			<Typography
				sx={secondaryBoardTitleStyles.title}
				variant="h4"
			>
				{title}
			</Typography>
			<Typography
				sx={secondaryBoardTitleStyles.link}
				onClick={onLinkClick}
			>
				{linkTitle}
			</Typography>
			<Typography
				sx={secondaryBoardTitleStyles.subTitle}
				variant="subtitle2"
			>
				{subtitle}
			</Typography>
		</Box>
	);
};

export default SecondaryBoardTitle;
