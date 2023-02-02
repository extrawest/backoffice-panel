import { useState, useCallback } from "react";
import { useIntl } from "react-intl";
import { Timestamp } from "firebase/firestore";
import { Button, Col, Grid, Input, Row, Space, Table } from "antd";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { ref as storageRef } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ClientTicketAddFormValues, firebaseClientsDBRef, firebaseStorage, handleAddDataToClientTicketsList } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layouts";
import { AddTicketModal } from "../../components";
import { clientsPageStyles } from "./ClientsPage.styles";
import { clientsPageTexts } from "./ClientsPage.texts";

export const ClientsPage = () => {
	const columns = [
		{
			title: "Ticket details",
			dataIndex: "title",
			key: "title"
		},
		{
			title: "Customer name",
			dataIndex: "userName",
			key: "userName"
		},
		{
			title: "Date",
			dataIndex: "dateOfCreationTicket",
			key: "dateOfCreationTicket",
			render: (item: Timestamp) => <>{dayjs(item?.toDate()).format("DD/MM/YYYY")}</>
		},
		{
			title: "Priority",
			dataIndex: "priority",
			key: "priority"
		}
	];

	const intl = useIntl();
	const breakpoints = Grid.useBreakpoint();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(firebaseClientsDBRef);
	const [uploadFile, uploading, , fileUploadError] = useUploadFile();
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCloseModal = useCallback(
		() => {
			setIsOpenAddModal(false);
		},
		[setIsOpenAddModal],
	);

	const handleOpenModal = useCallback(
		() => {
			setIsOpenAddModal(true);
		},
		[setIsOpenAddModal],
	);

	const handleSubmitAddForm = useCallback(
		async (values: ClientTicketAddFormValues) => {
			let userAvatarRef;
			if (values.userImage) {
				const avatarImageName = `clients/${values.fullName}_image.jpg`;
				await uploadFile(storageRef(firebaseStorage, avatarImageName), values.userImage, {
					contentType: values.userImage.type
				});
				userAvatarRef = `gs://${process.env["NX_STORAGE_BUCKET"]}/${avatarImageName}`;
			}
			await handleAddDataToClientTicketsList(values, userAvatarRef);
			handleCloseModal();
		},
		[],
	);

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || uploading}
			error={clientsDataError || fileUploadError}
		>
			<Space
				direction="vertical"
				style={clientsPageStyles.root}
			>

				<Row
					justify="space-around"
					align="stretch"
					gutter={[0, breakpoints.lg ? 40 : 10]}
				>
					<Col
						span={breakpoints.lg ? 8 : 10}
						pull={breakpoints.lg ? 6 : 0}
						push={breakpoints.lg ? 0 : 7}
					>
						<Input
							size="large"
							prefix={<SearchOutlined />}
						/>
					</Col>
					<Col
						span={breakpoints.lg ? 20 : 24}
					>
						<Title>{intl.formatMessage(clientsPageTexts.clientPageTitleText)}</Title>
					</Col>
					<Col
						span={breakpoints.lg ? 20 : 24}
					>
						<Table
							pagination={{
								pageSize: 4
							}}
							title={() => (
								<Row>
									<Col span={6}>
										<Title level={3}>{intl.formatMessage(clientsPageTexts.ticketTableTitleText)}</Title>
									</Col>
									<Col
										push={breakpoints.lg ? 15 : 7}
										span={2}
									>
										<Button
											icon={<PlusOutlined />}
											onClick={handleOpenModal}
										>
											{intl.formatMessage(clientsPageTexts.addButtonText)}
										</Button>
									</Col>
									<Col
										push={15}
										span={2}
									>
										<Button icon={<FilterOutlined />}>
											{intl.formatMessage(clientsPageTexts.filterButtonText)}
										</Button>
									</Col>
								</Row>
							)}
							dataSource={clientsData}
							columns={columns}
						/>
					</Col>
				</Row>
			</Space>
			<AddTicketModal
				onClose={handleCloseModal}
				isOpen={isOpenAddModal}
				onSubmit={handleSubmitAddForm}
			/>
		</PrivatePageLayout>
	);
};

export default ClientsPage;
