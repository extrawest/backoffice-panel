import { useIntl } from "react-intl";
import { limit, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebaseClientsDBRef, firebaseTasksDBRef, getDashboardData, getTasksBadgeColor, PrimaryBoardChart, TaskType } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layout";
import { dashboardPageTexts } from "./DashboardPage.texts";
import { Container, Icon, Input, Menu, Search, Segment } from "semantic-ui-react";

export const DashboardPage = () => {
	const intl = useIntl();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(query(firebaseClientsDBRef, limit(4)));
	const [tasksData, isLoadingTasksData, tasksDataError] = useCollectionData(query(firebaseTasksDBRef, limit(3)));
	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || isLoadingTasksData}
			error={clientsDataError || tasksDataError}
		>
			<Container
				className="dashboard-page"
				fluid
			>
				<Search
					className="dashboard-page_search"
					placeholder='Search...'
				/>
				<h3
					className="dashboard-page_title"
				>
					{intl.formatMessage(dashboardPageTexts.dashboardPageTitle)}
				</h3>
				<Container
					className="dashboard-page_content-wrapper"
					fluid
				>
					<Segment
						className="dashboard-page_content-big"
					>
						<Container
							className="dashboard-page_chart"
						>
							<PrimaryBoardChart />
						</Container>
						<Container
							className="dashboard-page_chart-text"
						>
							<Menu
								vertical
								fluid
								className="dashboard-page_chart-text-wrapper"
							>
								{getDashboardData().map((item, i) => (
									<Menu.Item key={i}>
										<span>{item.title}</span>
										<span>{item.value}</span>
									</Menu.Item>
								))}
							</Menu>

						</Container>
					</Segment>
					<Menu
						vertical
						className="dashboard-page_content-small"

					>
						<Menu.Item>
							<h4>{intl.formatMessage(dashboardPageTexts.dashboardPageClientSectionTitle)}</h4>
						</Menu.Item>
						{clientsData?.map((item, i) => (
							<Menu.Item key={i}>
								<span>{item.title}</span>
								<span>{i}</span>
							</Menu.Item>
						))}
					</Menu>
					<Menu
						className="dashboard-page_content-small"
						vertical
					>
						<Menu.Item>
							<h4>{intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionTitle)}</h4>
						</Menu.Item>
						<Menu.Item >
							<Input
								icon={
									<Icon

										name='plus'
										circular
										link
									/>
								}
								placeholder={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionInput)}
							/>
						</Menu.Item>
						{tasksData?.map((item, i) => (
							<Menu.Item key={i}>
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
							</Menu.Item>
						))}
					</Menu>
				</Container>
			</Container>
		</PrivatePageLayout>
	);
};

export default DashboardPage;
