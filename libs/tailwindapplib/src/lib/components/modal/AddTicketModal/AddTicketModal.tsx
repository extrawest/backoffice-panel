import { FC } from "react";
import { AddTicketModalProps } from "./AddTicketModal.types";
import { AddTicketForm } from "../../forms";
import { ClientTicketPriority } from "@backoffice-panel-app/shared";

export const AddTicketModal: FC<AddTicketModalProps> = ({
	onSubmitAddForm,
	isLoading,
	onClose,
	open
}) => {
	return (
		<>
			{open &&
				<div
					className="add-ticket-modal"
				>
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
			}
		</>
	);
};

export default AddTicketModal;
