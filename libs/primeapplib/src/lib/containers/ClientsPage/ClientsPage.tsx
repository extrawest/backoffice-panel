import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { ref as storageRef } from "firebase/storage";
import { Column } from "primereact/Column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/DataTable";
import { ClientTicket, ClientTicketAddFormValues, ClientTicketPriority, firebaseClientsDBRef, firebaseStorage, getLastUpdatedTitle, handleAddDataToClientTicketsList } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import dayjs from "dayjs";
import { clientsPageTexts } from "./ClientsPage.texts";
import { AddTicketModal } from "../../components";

export const ClientsPage = () => {
	const intl = useIntl();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(firebaseClientsDBRef);
	const [uploadFile, uploading, , fileUploadError] = useUploadFile();
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [searchRequest, setSearchRequest] = useState("");

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
			console.log("values", dayjs(values.dateOfAccount).format("YYYY-MM-DD"));
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

	const UsernameBodyTemplate = (rowData: ClientTicket) => {
		const ref = storageRef(firebaseStorage, rowData.userAvatar);
		const [img, isLoading] = useDownloadURL(ref);
		return (
			<>
				{!isLoading &&
					<>
						<img
							alt={rowData.userName}
							src={img}
							style={{
								verticalAlign: "middle",
								width: "3rem",
								height: "3rem",
								borderRadius: "50%",
								marginRight: "10px"
							}}
						/>
						<span className="image-text">{rowData.userName}</span>
					</>}
			</>
		);
	};

	const UsernameTicketTemplate = (rowData: ClientTicket) => {
		return (
			<div>
				<h4>{rowData.title}</h4>
				<div>{getLastUpdatedTitle(rowData.lastUpdated?.toDate())}</div>
			</div>
		);
	};

	const renderHeader = () => {
		return (
			<div className="flex justify-content-between align-items-center">
				<h3 className="m-0">{intl.formatMessage(clientsPageTexts.ticketTableTitleText)}</h3>
				<div>
					<Button
						className="p-button mr-4"
						onClick={handleOpenModal}
						label={intl.formatMessage(clientsPageTexts.addButtonText)}
					/>
					<Button
						className="p-button"
						onClick={handleOpenModal}
						label={intl.formatMessage(clientsPageTexts.filterButtonText)}
					/>
				</div>
			</div>
		);
	};

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || uploading}
			error={clientsDataError || fileUploadError}
		>
			<div className="client-page">
				<div className="client-page_header">
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<InputText
							value={searchRequest}
							onChange={(e) => setSearchRequest(e.target.value)}
							placeholder="Search"
						/>
					</span>
					<h1>{intl.formatMessage(clientsPageTexts.clientPageTitleText)}</h1>
				</div>
				<div className="card client-page_tableWrapper">
					<DataTable
						value={clientsData}
						paginator
						header={renderHeader()}
						rows={4}
						paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						rowsPerPageOptions={[2, 4, 8]}
						dataKey="id"
						loading={isLoadingClientsData || uploading}
						responsiveLayout="scroll"
						emptyMessage="No customers found."
						currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
					>
						<Column
							selectionMode="multiple"
							headerStyle={{ width: "3em" }}
						>
						</Column>
						<Column
							field="title"
							header="Ticket"
							style={{ minWidth: "20rem" }}
							body={UsernameTicketTemplate}
						/>
						<Column
							header="User"
							field="userName"
							style={{ minWidth: "20rem" }}
							body={UsernameBodyTemplate}
						/>
						<Column
							field="dateOfCreationTicket"
							header="Date"
							style={{ minWidth: "14rem" }}
							body={(rowItem) => dayjs(rowItem.dateOfCreationTicket?.toDate()).format("DD/MM/YYYY")}
						/>
						<Column
							field="priority"
							header="Priority"
							style={{ minWidth: "14rem" }}
							body={(rowItem) => (
								<div
									style={{
										background: getLabelColor(rowItem.priority).background,
										borderRadius: "10px",
										textAlign: "center",
										padding: "5px 10px",
										color: "white",
										width: "min-content"
									}}
								>
									{rowItem.priority}
								</div>
							)}
						/>
					</DataTable>
				</div>
			</div>
			<AddTicketModal
				open={isOpenAddModal}
				onClose={handleCloseModal}
				onSubmitAddForm={handleSubmitAddForm}
			/>
		</PrivatePageLayout>
	);
};

export default ClientsPage;
