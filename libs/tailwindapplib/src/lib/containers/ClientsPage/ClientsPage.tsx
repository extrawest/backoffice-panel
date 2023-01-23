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
import { AddTicketModal, FormInput } from "../../components";
import UserAvatar from "./UserAvatar/UserAvatar";
import settingLogo from "../../assets/icons/menuLogo.svg";

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

	const handleChangePage = useCallback(
		(way: "next" | "prev") => {
			if (!clientsData) return;
			if (way === "next") {
				setCurrentPage((prev) => prev > Math.floor(clientsData.length / 4) ? prev : prev + 1);
			}
			if (way === "prev") {
				setCurrentPage((prev) => prev === 1 ? prev : prev - 1);
			}
		},
		[setCurrentPage, clientsData],
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
			<div className="client-page">
				<div className="input-wrapper">
					<FormInput
						placeholder="Search"
						name=""
					/>
				</div>
				<h3>{intl.formatMessage(clientsPageTexts.ticketTableTitleText)}</h3>
				<div className="client-page_table-wrapper">
					<div
						className="table"
						style={{
							width: "100%",
							border: "1px solid #DFE0EB",
							borderRadius: "8px",
						}}
					>
						<table
							style={{
								width: "100%",
							}}
						>
							<thead
								style={{
									width: "100%",
									borderBottom: "1px solid #DFE0EB",
									borderRadius: "8px"
								}}
							>
								<th
									style={{
										padding: "10px",
									}}
								>
									Ticket details

								</th>
								<th
									style={{
										padding: "10px",
									}}
								>
									Customer name

								</th>
								<th
									style={{
										padding: "10px",
									}}
								>
									Date

								</th>
								<th
									style={{
										padding: "10px",
									}}
								>
									Priority

								</th>
							</thead>
							<tbody >
								{clientsData && clientsData.slice((currentPage - 1) * 4, currentPage * 4).map((item, i) => (
									<tr
										key={i}
									>
										<td
											style={{
												display: "flex",
												flexWrap: "wrap",
												gap: "10px",
												padding: "10px"
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

										</td>
										<td
											style={{
												padding: "10px"
											}}
										>
											{item.userName}
										</td>
										<td
											style={{
												padding: "10px"
											}}
										>
											{dayjs(item.lastUpdated.toDate()).format("DD/MM/YYYY")}
										</td>
										<td
											style={{
												padding: "10px",
												display: "flex"
											}}
										>
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
										</td>
										<td
											style={{
												padding: "10px"
											}}
										>
											<img
												style={{
													cursor: "pointer"
												}}
												src={settingLogo}
												alt="setting"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<nav
							style={{
								borderTop: "1px solid #DFE0EB",
								padding: "10px 2vw",
								display: "flex",
								justifyContent: "flex-end"
							}}
						>
							<div className="buttonWrapper">
								<button
									onClick={() => handleChangePage("prev")}
									style={{
										background: "#9FA2B4",
										padding: "5px 10px",
										borderRadius: "30px 0px 0px 30px",
										fontFamily: "Mulish",
										fontStyle: "normal",
										fontWeight: "600",
										fontSize: "14px",
										lineHeight: "20px",
										color: "#252733",
										border: "1px solid black"
									}}
								>
									Prev
								</button>
								<button
									onClick={() => handleChangePage("next")}
									style={{
										background: "#9FA2B4",
										padding: "5px 10px",
										borderRadius: "0px 30px 30px 0px",
										fontFamily: "Mulish",
										fontStyle: "normal",
										fontWeight: "600",
										fontSize: "14px",
										lineHeight: "20px",
										color: "#252733",
										border: "1px solid black"
									}}
								>
									Next
								</button>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</PrivatePageLayout >
	);
};

export default ClientsPage;
