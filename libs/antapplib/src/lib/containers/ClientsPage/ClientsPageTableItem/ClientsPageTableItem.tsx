import { FC } from "react";
import { ref as storageRef } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Avatar, List } from "antd";
import { ClientTicket, firebaseStorage } from "@backoffice-panel-app/shared";

const ClientsPageTableItem: FC<ClientTicket> = ({
	title,
	userAvatar,
	userName
}) => {
	const ref = storageRef(firebaseStorage, userAvatar);
	const [img, isLoading] = useDownloadURL(ref);

	return (
		<>
			{!isLoading && (
				<List.Item>
					<List.Item.Meta
						avatar={<Avatar src={img}/>}
						title={title}
						description={userName}
					/>
					{title}
				</List.Item>
			)}
		</>
	);
};

export default ClientsPageTableItem;
