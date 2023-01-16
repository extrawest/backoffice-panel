import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { limit, query } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AppRouteEnum, firebaseClientsDBRef, firebaseTasksDBRef } from "@backoffice-panel-app/shared";
import { Button, Input } from "../../components";
import { PrivatePageLayout } from "../../layouts";
import SecondaryBoardTitle from "./SecondaryBoardTitle/SecondaryBoardTitle";
import SecondaryBoardItem from "./SecondaryBoardItem/SecondaryBoardItem";
import { dashboardPageStyles } from "./DashboardPage.styles";
import { getTaskTypeLabel, trendDashboard } from "./DashboardPage.utils";
import addIcon from "../../assets/icons/plusIcon.svg";
import PrimaryBoardItem from "./PrimaryBoardItem/PrimaryBoardItem";
import PrimaryBoardChart from "./PrimaryBoardItem/PrimaryBoardChart/PrimaryBoardChart";

export const DashboardPage = () => {
	const navigate = useNavigate();
	const [clientsData, isLoadingClientsData, clientsDataError] = useCollectionData(query(firebaseClientsDBRef, limit(4)));
	const [tasksData, isLoadingTasksData, tasksDataError] = useCollectionData(query(firebaseTasksDBRef, limit(3)));

	const handleNavigateToClients = useCallback(
		() => {
			navigate(AppRouteEnum.CLIENTS);
		},
		[navigate],
	)
		;

	return (
		<PrivatePageLayout
			isLoading={isLoadingClientsData || isLoadingTasksData}
			error={clientsDataError || tasksDataError}
		>
			<Input
				sx={dashboardPageStyles.search}
				icon="search"
				placeholder="Search"
			/>
			<Typography variant="h2">Dashboard</Typography>
			<Box
				sx={dashboardPageStyles.boardWrapper}
			>
				<Box
					sx={dashboardPageStyles.primaryBoard}
				>
					<Box
						sx={dashboardPageStyles.primaryBoardChart}
					>
						<PrimaryBoardChart/>
					</Box>
					<Box
						sx={dashboardPageStyles.primaryBoardDescription}
					>
						{trendDashboard.map((item, i) => (
							<PrimaryBoardItem
								key={i}
								title={item.title}
								subtitle={item.value}
							/>
						))}
					</Box>
				</Box>
				{clientsData &&
					<Box
						sx={dashboardPageStyles.secondaryBoard}
					>
						<SecondaryBoardTitle
							title={"Unresolved tickets"}
							subtitle={"Group: Support"}
							linkTitle={"View details"}
							onLinkClick={handleNavigateToClients}
						/>
						<Box>
							{clientsData.map((item, i) => (
								<SecondaryBoardItem
									key={i}
									leftItem={<Typography variant="h4">{item.title}</Typography>}
									rightItem={<Typography variant="subtitle2">{i}</Typography>}
								/>
							))}
						</Box>
					</Box>
				}
				{tasksData &&
					<Box
						sx={dashboardPageStyles.secondaryBoard}
					>
						<SecondaryBoardTitle
							title={"Tasks"}
							subtitle={"Today"}
							linkTitle={"View all"}
							onLinkClick={() => null}
						/>
						<SecondaryBoardItem
							leftItem={
								<Typography
									variant="h4"
									color="#C5C7CD"
								>
									Create new task
								</Typography>
							}
							rightItem={
								<Button
									variant="icon"
									icon={addIcon}
									sx={dashboardPageStyles.addButton}
								/>
							}
						/>
						<Box>
							{tasksData.map((item, i) => (
								<SecondaryBoardItem
									key={i}
									leftItem={<Typography variant="h4">{item.title}</Typography>}
									rightItem={getTaskTypeLabel(item.type)}
								/>
							))}
						</Box>
					</Box>
				}
			</Box>
		</PrivatePageLayout>
	);
};

export default DashboardPage;
