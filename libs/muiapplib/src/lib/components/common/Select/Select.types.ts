import { ClientTicketPriority } from "@backoffice-panel-app/shared";
import { SelectProps as MUISelectProps } from "@mui/material";
import { AdormentIconType } from "../Input/Input.types";

export type SelectProps = MUISelectProps & {
	data: Array<SelectItem>;
	icon: AdormentIconType;
};

export type SelectItem = {
	label: string;
	value: ClientTicketPriority;
};
