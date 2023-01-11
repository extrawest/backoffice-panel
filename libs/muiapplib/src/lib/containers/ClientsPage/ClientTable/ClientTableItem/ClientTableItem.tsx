import { FC } from "react";
import { Box, CircularProgress, TableCell, TableRow, Typography } from "@mui/material";
import { ref as storageRef } from "firebase/storage";
import dateFormat from "dateformat";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { firebaseStorage } from "@backoffice-panel-app/shared";
import { clientTableItemStyles } from "./ClientTableItem.styles";
import { ClientTableItemProps } from "./ClientTableItem.types";
import profileLogo from "../../../../assets/icons/loginLogo.svg";
import menuLogo from "../../../../assets/icons/menuLogo.svg";

const ClientTableItem: FC<ClientTableItemProps> = ({
	client
}) => {
	const [img, isLoading] = useDownloadURL(storageRef(firebaseStorage, client.userAvatar));

	return (
		<TableRow>
			<TableCell
				sx={clientTableItemStyles.ticketDetail}
			>
				{!isLoading ?
					<Box
						sx={clientTableItemStyles.userAvatar}
						component="img"
						src={img ?? profileLogo}
					/> :
					<CircularProgress
						sx={clientTableItemStyles.userAvatar}
					/>}
				<Box>
					<Typography
						align="left"
						variant="h4"
					>
						{client.title}
					</Typography>
					<Typography
						align="left"
						variant="body2"
					>
						{`Updated ${client.lastUpdated.toDate().getDay()} day(s) ago`}
					</Typography>
				</Box>
			</TableCell>
			<TableCell>
				<Typography
					align="left"
					variant="h4"
				>
					{client.userName}
				</Typography>
				<Typography
					align="left"
					variant="body2"
				>
					{`on ${dateFormat(client.userAccountCreationDate.toDate(), "dd.mm.yyyy")}`}
				</Typography>
			</TableCell>
			<TableCell>
				<Typography
					align="left"
					variant="h4"
				>
					{`${dateFormat(client.dateOfCreationTicket.toDate(), "mmm dd, yyyy")}`}
				</Typography>
				<Typography
					variant="body2"
					align="left"
				>
					{`${dateFormat(client.userAccountCreationDate.toDate(), "h.mm TT")}`}
				</Typography>
			</TableCell>
			<TableCell>
				<Box
					sx={[
						clientTableItemStyles.priority,
						clientTableItemStyles.getLabelColor(client.priority)
					]}
				>
					{client.priority}
				</Box>
			</TableCell>
			<TableCell>
				<Box
					component="img"
					src={menuLogo}
				/>
			</TableCell>
		</TableRow>
	);
};

export default ClientTableItem;
