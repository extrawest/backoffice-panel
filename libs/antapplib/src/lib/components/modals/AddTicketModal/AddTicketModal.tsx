import { FC } from "react";
import { Col, Modal, Row } from "antd";
import { useIntl } from "react-intl";
import Title from "antd/es/typography/Title";
import { ClientTicketPriority } from "@backoffice-panel-app/shared";
import { AddTicketForm } from "../../forms";
import { AddTicketModalProps } from "./AddTicketModal.types";
import { addTicketModalTexts } from "./AddTicketModal.texts";

export const AddTicketModal: FC<AddTicketModalProps> = ({
	isOpen,
	onClose,
	onSubmit
}) => {
	const intl = useIntl();
	return (
		<Modal
			open={isOpen}
			centered
			onCancel={onClose}
			footer={null}
			width={1000}
		>
			<Row
				justify="center"
				gutter={[0, 40]}
			>
				<Col span={22} >
					<Title level={1}>{intl.formatMessage(addTicketModalTexts.modalTitle)}</Title>
				</Col>
				<Col span={24}>
					<AddTicketForm
						initialValues={{
							ticketTitle: "",
							fullName: "",
							dateOfAccount: "",
							priority: ClientTicketPriority.HIGH,
							userImage: undefined
						}}
						onSubmit={onSubmit}
					/>
				</Col>
			</Row>
		</Modal>
	);
};

export default AddTicketModal;
