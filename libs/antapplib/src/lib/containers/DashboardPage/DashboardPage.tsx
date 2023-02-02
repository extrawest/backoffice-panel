import { useIntl } from "react-intl";
import { Badge, Button, Card, Col, Input, List, Row, Space, Statistic, Typography, Grid } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { limit, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AppRouteEnum, firebaseClientsDBRef, firebaseTasksDBRef, getDashboardData, getTasksBadgeColor, PrimaryBoardChart, TaskType } from "@backoffice-panel-app/shared";
import { PrivatePageLayout } from "../../layouts";
import DashboardPageSecondaryHeader from "./DashboardPageSecondaryHeader/DashboardPageSecondaryHeader";
import { dashboardPageTexts } from "./DashboardPage.texts";
import { dashboardPageStyles } from "./DashboardPage.styles";

export const DashboardPage = () => {
	const intl = useIntl();
	const breakpoints = Grid.useBreakpoint();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(query(firebaseClientsDBRef, limit(4)));
	const [tasksData, isLoadingTasksData, tasksDataError] = useCollectionData(query(firebaseTasksDBRef, limit(3)));

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || isLoadingTasksData}
			error={clientsDataError || tasksDataError}
		>
			<Space
				direction="vertical"
				style={dashboardPageStyles.root}
			>

				<Row
					justify="space-around"
					align="stretch"
					gutter={[0, breakpoints.lg ? 40 : 10]}
				>
					<Col
						span={breakpoints.lg ? 8 : 10}
						pull={breakpoints.lg ? 6 : 0}
						push={breakpoints.lg ? 0 : 7}
					>
						<Input
							size="large"
							prefix={<SearchOutlined />}
						/>
					</Col>
					<Col
						span={breakpoints.lg ? 20 : 24}
					>
						<Title>{intl.formatMessage(dashboardPageTexts.dashboardPageTitle)}</Title>
					</Col>
					<Col
						span={breakpoints.lg ? 20 : 24}
					>
						<Card>
							<Row>
								<Col
									span={breakpoints.lg ? 18 : 24}
									style={{
										minHeight: "300px",
									}}
								>
									<PrimaryBoardChart />
								</Col>
								<Col
									span={breakpoints.lg ? 6 : 24}
								>
									<List>
										{getDashboardData().map((item, i) => (
											<List.Item
												key={i}
												style={{
													display: "flex",
													flexDirection: "column",
													justifyContent: "center",
													alignItems: "center"
												}}
											>
												<Statistic
													title={item.title}
													value={item.value}
													style={{
														display: "flex",
														flexDirection: "column",
														justifyContent: "center",
														alignItems: "center"
													}}
												/>
											</List.Item>
										))}
									</List>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col
						span={breakpoints.lg ? 8 : 24}
					>
						<List
							bordered
							header={<DashboardPageSecondaryHeader
								title={intl.formatMessage(dashboardPageTexts.dashboardPageClientSectionTitle)}
								linkTitle={intl.formatMessage(dashboardPageTexts.dashboardPageClientSectionLinkTitle)}
								subtitle={intl.formatMessage(dashboardPageTexts.dashboardPageClientSectionSubtitle)}
								linkUrl={AppRouteEnum.CLIENTS}
							/>}
						>
							{clientsData?.map((item, i) => (
								<List.Item
									key={i}
								>
									<Space.Compact
										block
										style={{
											justifyContent: "space-between",
											display: "flex"
										}}
									>
										<Typography>{item.title}</Typography>
										<Typography>{i}</Typography>
									</Space.Compact>
								</List.Item>
							))}
						</List>
					</Col>
					<Col
						span={breakpoints.lg ? 8 : 24}
					>
						<List
							bordered
							header={<DashboardPageSecondaryHeader
								title={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionTitle)}
								linkTitle={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionLinkTitle)}
								subtitle={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionSubtitle)}
								linkUrl={AppRouteEnum.CLIENTS}
							/>}
						>
							<List.Item>
								<Space
									style={dashboardPageStyles.taskSection}
								>
									<Input
										placeholder={intl.formatMessage(dashboardPageTexts.dashboardPageTasksSectionInput)}
									/>
									<Button icon={<PlusOutlined />} />
								</Space>
							</List.Item>
							{tasksData?.map((item, i) => (
								<Badge.Ribbon
									text={item.type}
									color={getTasksBadgeColor(item.type)}
									style={{
										color: item.type === TaskType.DEFAULT ? "#9FA2B4" : "#FFFFFF",
									}}

									key={i}
								>
									<List.Item >
										<Space.Compact
											block
											style={dashboardPageStyles.taskItem}
										>
											<Typography>{item.title}</Typography>

										</Space.Compact>
									</List.Item>
								</Badge.Ribbon>

							))}
						</List>
					</Col>
				</Row>
			</Space>
		</PrivatePageLayout>
	);
};

export default DashboardPage;
