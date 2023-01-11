import { Box, Typography } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseClientsDBRef } from "@backoffice-panel-app/shared";
import { Input } from "../../components";
import { PrivatePageLayout } from "../../layouts";
import ClientTable from "./ClientTable/ClientTable";
import { clientsPageStyles } from "./ClientsPage.styles";

export const ClientsPage = () => {
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(firebaseClientsDBRef);

	console.log("clientsData", clientsData);

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData}
			error={clientsDataError}
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
				{clientsData && <ClientTable data={clientsData}/>}
			</Box>
		</PrivatePageLayout>
	);
};

export default ClientsPage;
