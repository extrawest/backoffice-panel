import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { ref as storageRef } from "firebase/storage";
import dayjs from "dayjs";
import {
	ClientTicket,
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

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || uploading}
			error={clientsDataError || fileUploadError}
		>

		</PrivatePageLayout>
	);
};

export default ClientsPage;
