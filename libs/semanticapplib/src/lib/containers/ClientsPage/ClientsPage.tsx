import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref as storageRef } from "firebase/storage";
import dayjs from "dayjs";
import {
	ClientTicketAddFormValues,
	ClientTicketPriority,
	firebaseClientsDBRef,
	firebaseStorage,
	getLastUpdatedTitle,
	handleAddDataToClientTicketsList
} from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import { clientsPageTexts } from "./ClientsPage.texts";
import { AddTicketModal } from "../../components";
import { Button, Container, Icon, Pagination, PaginationProps, Search, Table } from "semantic-ui-react";
import UserAvatar from "./UserAvatar/UserAvatar";

export const ClientsPage = () => {
	const intl = useIntl();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(firebaseClientsDBRef);
	const [uploadFile, uploading, , fileUploadError] = useUploadFile();
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

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

	const handlePaginationChange = useCallback(
		(
			e: unknown,
			data: PaginationProps
		) =>
			setCurrentPage(parseInt(`${data.activePage}`)),
		[]);

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
			await handleAddDataToClientTicketsList({
				...values,
				dateOfAccount: dayjs(values.dateOfAccount).format("YYYY-MM-DD")
			}, userAvatarRef);
			handleCloseModal();
		},
		[],
	);

	const getLabelColor = (priority: ClientTicketPriority) => {
		switch (priority) {
			case (ClientTicketPriority.HIGH):
				return ({
					background: "#F12B2C"
				});
			case (ClientTicketPriority.LOW):
				return ({
					background: "#29CC97"
				});
			case (ClientTicketPriority.NORMAL):
				return ({
					background: "#FEC400"
				});
			default:
				return ({});
		}
	};

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || uploading}
			error={clientsDataError || fileUploadError}
		>
			<Container
				className="client-page"
				fluid
			>
				<Search
					className="client-page_search"
					placeholder='Search...'
				/>
				<h3
					className="client-page_title"
				>
					{intl.formatMessage(clientsPageTexts.clientPageTitleText)}
				</h3>
				<Container
					className="client-page_content-wrapper"
					fluid
				>
					<Table
						striped
						unstackable
					>
						<Table.Header>
							<Table.Row >
								<Table.HeaderCell
									textAlign="left"
									colSpan="1"
									className="table-header"
								>
									{intl.formatMessage(clientsPageTexts.ticketTableTitleText)}
								</Table.HeaderCell>
								<Table.HeaderCell
									collapsing
									textAlign="right"
									colSpan="4"
									className="table-header"
								>
									<Button
										content={intl.formatMessage(clientsPageTexts.addButtonText)}
										icon='plus'
										labelPosition='right'
										onClick={handleOpenModal}
									/>
									<Button
										content={intl.formatMessage(clientsPageTexts.filterButtonText)}
										icon='filter'
										labelPosition='right'
									/>
								</Table.HeaderCell>
							</Table.Row>
							<Table.Row>
								<Table.HeaderCell>Ticket details</Table.HeaderCell>
								<Table.HeaderCell>Customer name</Table.HeaderCell>
								<Table.HeaderCell>Date</Table.HeaderCell>
								<Table.HeaderCell>Priority</Table.HeaderCell>
								<Table.HeaderCell></Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{clientsData?.slice((currentPage - 1) * 4, currentPage * 4)?.map((item, i) => (
								<Table.Row key={i}>
									<Table.Cell
										style={{
											display: "flex",
											flexWrap: "wrap",
											gap: "10px"
										}}
									>
										<UserAvatar firebaseUrl={item.userAvatar} />
										<span
											style={{
												display: "flex",
												flexWrap: "wrap",
												flexDirection: "column",
												justifyContent: "space-evenly"
											}}
										>
											<span
												style={{
													fontFamily: "Open Sans",
													fontStyle: "normal",
													fontWeight: 600,
													fontSize: "14px",
													lineHeight: "20px",
													color: "#252733",
												}}
											>
												{item.title}

											</span>
											<span
												style={{
													fontFamily: "Open Sans",
													fontStyle: "normal",
													fontWeight: 600,
													fontSize: "12px",
													lineHeight: "16px",
													color: "#C5C7CD",
												}}
											>
												{getLastUpdatedTitle(item.dateOfCreationTicket?.toDate())}

											</span>
										</span>

									</Table.Cell>
									<Table.Cell>{item.userName}</Table.Cell>
									<Table.Cell>{dayjs(item.dateOfCreationTicket?.toDate()).format("DD/MM/YYYY")}</Table.Cell>
									<Table.Cell >
										<span
											style={{
												background: getLabelColor(item.priority).background,
												borderRadius: "10px",
												textAlign: "center",
												padding: "5px 10px",
												color: "white",
												width: "min-content"
											}}
										>
											{item.priority}
										</span>

									</Table.Cell>
									<Table.Cell
										textAlign='right'
									>
										<Button icon>
											<Icon name='cog' />
										</Button>
									</Table.Cell>

								</Table.Row>
							))}
						</Table.Body>
						<Table.Footer>
							<Table.Row>
								<Table.HeaderCell
									colSpan="5"
									textAlign="right"
								>
									<Pagination
										boundaryRange={0}
										onPageChange={handlePaginationChange}
										siblingRange={1}
										activePage={currentPage}
										totalPages={Math.ceil((clientsData?.length ?? 0) / 4)}
									/>
								</Table.HeaderCell>
							</Table.Row>
						</Table.Footer>
					</Table>
				</Container>
			</Container>
			<AddTicketModal
				open={isOpenAddModal}
				onClose={handleCloseModal}
				onSubmitAddForm={handleSubmitAddForm}
			/>
		</PrivatePageLayout >
	);
};

export default ClientsPage;
