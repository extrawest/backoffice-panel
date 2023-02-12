import { FC } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { ClientTicketPriority } from "@backoffice-panel-app/shared";
import { Button, ClientTicketAddForm } from "../../";
import { ClientPageAddModalProps } from "./ClientPageAddModal.types";
import { clientPageAddModalStyles } from "./ClientPageAddModal.styles";
import closeIcon from "../../../assets/icons/closeIcon.svg";

export const ClientPageAddModal: FC<ClientPageAddModalProps> = ({
	open,
	onClose,
	onSubmitAddForm,
	isLoading
}) => {

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Box
				sx={clientPageAddModalStyles.root}
			>
				<Button
					sx={clientPageAddModalStyles.closeButton}
					icon={closeIcon}
					variant="icon"
					onClick={onClose}
				/>
				<Typography variant="h1">Add new</Typography>
				<Box>
					<ClientTicketAddForm
						isLoading={isLoading}
						onSubmit={onSubmitAddForm}
						initialValues={{
							ticketTitle: "",
							fullName: "",
							dateOfAccount: "",
							priority: ClientTicketPriority.LOW,
							userImage: undefined
						}}
					/>
				</Box>
			</Box>
		</Modal>
	);
};

export default ClientPageAddModal;
