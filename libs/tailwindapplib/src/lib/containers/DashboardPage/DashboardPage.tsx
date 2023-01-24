import { useIntl } from "react-intl";
import { limit, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseClientsDBRef, firebaseTasksDBRef, getDashboardData, getTasksBadgeColor, PrimaryBoardChart, TaskType } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import { dashboardPageTexts } from "./DashboardPage.texts";
import { Button, FormInput } from "../../components";
import addIcon from "../../assets/icons/plusIcon.svg";

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
				<div className="input-wrapper">
					<FormInput
						placeholder="Search"
						name=""
					/>
				</div>
				<h3>{intl.formatMessage(dashboardPageTexts.dashboardPageTitle)}</h3>
				<div className="dashboard-page_content-wrapper">
					<div className="dashboard-page_content-big">
						<div className="dashboard-page_chart-wrapper">
							<PrimaryBoardChart />
						</div>
						<div className="dashboard-page_chart-subtitle">
							<ul>
								{getDashboardData().map((item, i) => (
									<li key={i}>
										<span>{item.title}</span>
										<span>{item.value}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="dashboard-page_content-small">
						<h3>{intl.formatMessage(dashboardPageTexts.dashboardPageClientSectionTitle)}</h3>
						<ul>
							{clientsData?.map((item, i) => (
								<li key={i}>
									<span>{item.title}</span>
									<span>{i}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="dashboard-page_content-small">
						<h3>{intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionTitle)}</h3>
						<ul>
							<li>
								<input placeholder={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionInput)} />
								<Button>
									<img
										src={addIcon}
										alt="addIcon"
									/>
								</Button>
							</li>
							{tasksData?.map((item, i) => (
								<li key={i}>
									<span>{item.title}</span>
									<span
										style={{
											color: item.type === TaskType.DEFAULT ? "#9FA2B4" : "#FFFFFF",
											background: getTasksBadgeColor(item.type),
											borderRadius: "8px",
											padding: "5px 10px"
										}}
									>
										{item.type}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</PrivatePageLayout>
	);
};

export default DashboardPage;
