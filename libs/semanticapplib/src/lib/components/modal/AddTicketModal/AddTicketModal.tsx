import { FC } from "react";
import { AddTicketModalProps } from "./AddTicketModal.types";
import { AddTicketForm } from "../../forms";
import { ClientTicketPriority } from "@backoffice-panel-app/shared";
import { Modal } from "semantic-ui-react";

export const AddTicketModal: FC<AddTicketModalProps> = ({
	onSubmitAddForm,
	isLoading,
	onClose,
	open
}) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
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
		</Modal>
	);
};

export default AddTicketModal;
