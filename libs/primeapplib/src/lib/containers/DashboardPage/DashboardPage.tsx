import { useIntl } from "react-intl";
import { limit, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Panel } from "primereact/Panel";
import { firebaseClientsDBRef, firebaseTasksDBRef, getDashboardData, PrimaryBoardChart } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import { dashboardPageTexts } from "./DashboardPage.texts";

export const DashboardPage = () => {
	const intl = useIntl();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(query(firebaseClientsDBRef, limit(4)));
	const [tasksData, isLoadingTasksData, tasksDataError] = useCollectionData(query(firebaseTasksDBRef, limit(3)));

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || isLoadingTasksData}
			error={clientsDataError || tasksDataError}
		>
			<div className="dashboard-page">
				<Panel
					header={intl.formatMessage(dashboardPageTexts.dashboardPageTrendTitle)}
					className="dashboard-page_big-panel"
				>
					<div className="dashboard-page_chart-wrapper">
						<div className="dashboard-page_chart">
							<PrimaryBoardChart />
						</div>
						<div className="dashboard-page_chart-data">
							<ul>
								{getDashboardData().map((item, i) => (
									<li key={i}>
										<h4>{item.title}</h4>
										<span>{item.value}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Panel>
				<Panel
					header={intl.formatMessage(dashboardPageTexts.dashboardPageClientSectionTitle)}
					className="dashboard-page_small-panel"
				>
					<ul>
						{clientsData?.map((item, i) => (
							<li key={i}>
								{item.title}
							</li>
						))}
					</ul>
				</Panel>
				<Panel
					header={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionTitle)}
					className="dashboard-page_small-panel"
				>
					<ul>
						{tasksData?.map((item, i) => (
							<li key={i}>
								{item.title}
							</li>
						))}
					</ul>
				</Panel>
			</div>
		</PrivatePageLayout>
	);
};

export default DashboardPage;
