import { ClientTicketAddFormValues } from "@backoffice-panel-app/shared";
import { ModalProps } from "@mui/material";

export type ClientPageAddModalProps = Omit<ModalProps, "children" | "onClose"> & {
	onClose: () => void;
	onSubmitAddForm: (values: ClientTicketAddFormValues) => void;
	isLoading?: boolean;
};
