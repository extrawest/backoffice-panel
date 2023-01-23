import { useState } from "react";
import { useIntl } from "react-intl";
import { limit, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Panel } from "primereact/Panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { firebaseClientsDBRef, firebaseTasksDBRef, getDashboardData, getTasksBadgeColor, PrimaryBoardChart, TaskType } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import { dashboardPageTexts } from "./DashboardPage.texts";

export const DashboardPage = () => {
	const intl = useIntl();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(query(firebaseClientsDBRef, limit(4)));
	const [tasksData, isLoadingTasksData, tasksDataError] = useCollectionData(query(firebaseTasksDBRef, limit(3)));
	const [searchRequest, setSearchRequest] = useState("");

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || isLoadingTasksData}
			error={clientsDataError || tasksDataError}
		>
			<div className="dashboard-page">
				<div className="dashboard-page_header">
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<InputText
							value={searchRequest}
							onChange={(e) => setSearchRequest(e.target.value)}
							placeholder="Search"
						/>
					</span>
					<h1>{intl.formatMessage(dashboardPageTexts.dashboardPageTitle)}</h1>
				</div>
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
					<ul className="small-panel_tickets">
						{clientsData?.map((item, i) => (
							<li key={i}>
								<span>{item.title}</span>
								<span>{i}</span>
							</li>
						))}
					</ul>
				</Panel>
				<Panel
					header={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionTitle)}
					className="dashboard-page_small-panel"
				>
					<ul className="small-panel_tasks">
						<li>
							<InputText placeholder="Create new task" />
							<Button icon="pi pi-plus" />
						</li>
						{tasksData?.map((item, i) => (
							<li key={i}>
								<div>
									<RadioButton
										value={i}
										className="mr-3"
									/>
									{item.title}
								</div>
								<div
									className="badge"
									style={{
										color: item.type === TaskType.DEFAULT ? "#9FA2B4" : "#FFFFFF",
										background: getTasksBadgeColor(item.type),
										borderRadius: "8px",
										padding: "5px 10px"
									}}
								>
									{item.type}
								</div>
							</li>
						))}
					</ul>
				</Panel>
			</div>
		</PrivatePageLayout>
	);
};

export default DashboardPage;
