import { FC } from "react";
import { Box, MenuItem, Select as MUISelect } from "@mui/material";
import { getStartAdormentLogo } from "../Input/Input.utils";
import { SelectProps } from "./Select.types";

export const Select: FC<SelectProps> = ({
	icon,
	data,
	...rest
}) => {
	const startAdormentLogo = getStartAdormentLogo(icon);
	return (
		<MUISelect
			{...rest}
			renderValue={(value) => (
				<>
					{startAdormentLogo && (
						<Box
							component="img"
							src={startAdormentLogo}
							mr="20px"
						/>
					)}
					{value}
				</>
			)}
		>

			{data.map((item, i) => (
				<MenuItem
					key={i}
					value={item.value}
				>
					{item.label}
				</MenuItem>
			))}
		</MUISelect>
	);
};

export default Select;
