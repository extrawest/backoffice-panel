import { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { ref as storageRef } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ClientTicketAddFormValues, firebaseClientsDBRef, firebaseStorage, handleAddDataToClientTicketsList } from "@backoffice-panel-app/shared";
import { ClientPageAddModal, Input } from "../../components";
import { PrivatePageLayout } from "../../layouts";
import ClientTable from "./ClientTable/ClientTable";
import { clientsPageStyles } from "./ClientsPage.styles";

export const ClientsPage = () => {
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
			<Input
				sx={clientsPageStyles.search}
				icon="search"
				placeholder="Search"
			/>
			<Typography variant="h2">Clients</Typography>
			<Box
				sx={clientsPageStyles.ticketsWrapper}
			>
				{clientsData &&
					<ClientTable
						data={clientsData}
						onClickAddButton={handleOpenModal}
					/>
				}
			</Box>
			<ClientPageAddModal
				open={isOpenAddModal}
				onClose={handleCloseModal}
				onSubmitAddForm={handleSubmitAddForm}
				isLoading={isLoadingClientsData || uploading}
			/>
		</PrivatePageLayout>
	);
};

export default ClientsPage;
