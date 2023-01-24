import { ModalProps } from "@mui/material";
import { ClientTicketAddFormValues } from "@backoffice-panel-app/shared";

export type AddTicketModalProps = Omit<ModalProps, "children" | "onClose"> & {
	onClose: () => void;
	onSubmitAddForm: (values: ClientTicketAddFormValues) => void;
	isLoading?: boolean;
};
