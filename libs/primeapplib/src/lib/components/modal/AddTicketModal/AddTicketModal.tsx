import { FC } from "react";
import { Dialog } from "primereact/dialog";
import { ClientTicketPriority } from "@backoffice-panel-app/shared";
import { AddTicketForm } from "../../forms";
import { AddTicketModalProps } from "./AddTicketModal.types";

export const AddTicketModal: FC<AddTicketModalProps> = ({
	onSubmitAddForm,
	isLoading,
	onClose,
	open
}) => {
	return (
		<Dialog
			visible={open}
			onHide={onClose}
		>
			<div className="ticket-add-dialog">
				<h1>Add new</h1>
				<AddTicketForm
					initialValues={{
						ticketTitle: "",
						fullName: "",
						dateOfAccount: "",
						priority: ClientTicketPriority.HIGH,
						userImage: undefined
					}}
					onSubmit={onSubmitAddForm}
				/>
			</div>
		</Dialog>
	);
};

export default AddTicketModal;
