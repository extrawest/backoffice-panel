import { FC } from "react";
import { ClientTicketPriority } from "@backoffice-panel-app/shared";
import { AddTicketForm } from "../../forms";
import { AddTicketModalProps } from "./AddTicketModal.types";
import { Button } from "../../common";

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
					<div className="button-wrapper">
						<Button
							className="close-modal-button"
							onClick={onClose}
						>
							X
						</Button>
					</div>
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
