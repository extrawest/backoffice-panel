import { useState } from "react";
import { useIntl } from "react-intl";
import { limit, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseClientsDBRef, firebaseTasksDBRef, getDashboardData, getTasksBadgeColor, PrimaryBoardChart, TaskType } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import { dashboardPageTexts } from "./DashboardPage.texts";
import { Container, Search } from "semantic-ui-react";

export const DashboardPage = () => {
	const intl = useIntl();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(query(firebaseClientsDBRef, limit(4)));
	const [tasksData, isLoadingTasksData, tasksDataError] = useCollectionData(query(firebaseTasksDBRef, limit(3)));
	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || isLoadingTasksData}
			error={clientsDataError || tasksDataError}
		>
			<Container>
				<Search
					placeholder='Search...'
				/>
				<h3>{intl.formatMessage(dashboardPageTexts.dashboardPageTitle)}</h3>
				<Container>
					<Container>

					</Container>
					<Container>

					</Container>
					<Container>

					</Container>
				</Container>
			</Container>
		</PrivatePageLayout>
	);
};

export default DashboardPage;
