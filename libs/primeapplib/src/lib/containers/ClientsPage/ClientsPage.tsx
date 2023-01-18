import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { ref as storageRef } from "firebase/storage";
import { Column } from "primereact/Column";
import { DataTable } from "primereact/DataTable";
import { ClientTicket, ClientTicketAddFormValues, ClientTicketPriority, firebaseClientsDBRef, firebaseStorage, handleAddDataToClientTicketsList } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import dayjs from "dayjs";

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
			key: "dateOfCreationTicket"
		},
		{
			title: "Priority",
			dataIndex: "priority",
			key: "priority"
		}
	];

	const intl = useIntl();
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
			console.log("values", values);
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

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || uploading}
			error={clientsDataError || fileUploadError}
		>
			<div className="card">
				<DataTable
					value={clientsData}
					paginator
					// header={header}
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
						style={{ minWidth: "14rem" }}
					/>
					<Column
						header="User"
						field="userName"
						style={{ minWidth: "14rem" }}
						body={UsernameBodyTemplate}
					/>
					<Column
						field="dateOfCreationTicket"
						header="Date"
						filterField="date"
						dataType="date"
						style={{ minWidth: "8rem" }}
						body={(rowItem) => dayjs(rowItem.dateOfCreationTicket.toDate()).format("DD/MM/YYYY")}
					/>
					<Column
						field="priority"
						header="Priority"
						style={{ minWidth: "8rem" }}
						body={(rowItem) => (
							<div
								style={{
									background: getLabelColor(rowItem.priority).background,
									borderRadius: "10px",
									textAlign: "center",
									padding: "5px"
								}}
							>
								{rowItem.priority}
							</div>
						)}
					/>
				</DataTable>
			</div>
		</PrivatePageLayout>
	);
};

export default ClientsPage;
