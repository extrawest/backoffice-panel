import { FC } from "react";
import { Modal } from "semantic-ui-react";
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
