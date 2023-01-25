import { FC } from "react";
import { ref as storageRef } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Image } from "semantic-ui-react";
import { firebaseStorage } from "@backoffice-panel-app/shared";
import { UserAvatarProps } from "./UserAvatar.types";

export const UserAvatar: FC<UserAvatarProps> = ({
	firebaseUrl
}) => {
	const ref = storageRef(firebaseStorage, firebaseUrl);
	const [img] = useDownloadURL(ref);

	return (
		<Image
			src={img ?? ""}
			style={{
				width: 50,
				height: 50,
				borderRadius: "50%"
			}}
		/>
	);
};

export default UserAvatar;
