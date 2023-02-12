import { ClientTicketAddFormValues } from "@backoffice-panel-app/shared";

export type AddTicketModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: ClientTicketAddFormValues) => void;
};
