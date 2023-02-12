import { TaskType } from "../../types";

export const getTasksBadgeColor = (type: TaskType) => {
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

	return badgeColor;
};
