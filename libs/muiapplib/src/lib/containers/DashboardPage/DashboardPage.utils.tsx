import { getTasksBadgeColor, TaskType } from "@backoffice-panel-app/shared";
import { Badge } from "@mui/material";
import { dashboardPageStyles } from "./DashboardPage.styles";

export const getTaskTypeLabel = (type: TaskType) => {
	const badgeColor = getTasksBadgeColor(type);

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
