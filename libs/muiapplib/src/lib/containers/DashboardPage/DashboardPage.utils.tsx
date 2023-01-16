import { TaskType } from "@backoffice-panel-app/shared";
import { Badge } from "@mui/material";
import { dashboardPageStyles } from "./DashboardPage.styles";

export const getTaskTypeLabel = (type: TaskType) => {
	let badgeColor;

	switch (type as TaskType) {
		case TaskType.URGENT:
			badgeColor = "#FEC400";
			break;
		case TaskType.NEW:
			badgeColor = "#29CC97";
			break;
		case TaskType.DEFAULT:
			badgeColor = "#F0F1F7";
			break;
		default:
			break;
	}

	return (
		<Badge
			sx={[
				dashboardPageStyles.badge,
				{
					backgroundColor: badgeColor,
					color: type === TaskType.DEFAULT ? "#9FA2B4" : "#FFFFFF"
				}
			]}
		>
			{type}
		</Badge>
	);
};

export const trendDashboard = [
	{
		title: "Resolved",
		value: "449"
	},
	{
		title: "Received",
		value: "426"
	},
	{
		title: "Average first response time",
		value: "33m"
	},
	{
		title: "Average response time",
		value: "3h 8m"
	},
	{
		title: "Resolution within SLA",
		value: "94%"
	}
];
