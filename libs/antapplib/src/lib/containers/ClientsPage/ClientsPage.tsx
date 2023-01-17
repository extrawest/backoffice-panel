import { useState, useCallback } from "react";
import { ref as storageRef } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ClientTicketAddFormValues, firebaseClientsDBRef, firebaseStorage, handleAddDataToClientTicketsList } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layouts";

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
		</PrivatePageLayout>
	);
};

export default ClientsPage;
