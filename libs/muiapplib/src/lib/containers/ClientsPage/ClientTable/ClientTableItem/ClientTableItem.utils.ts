import dayjs from "dayjs";

export const getLastUpdatedTitle = (date: Date) => {
	const diff = dayjs(new Date()).diff(
		date,
		"day"
	);

	switch (diff) {
		case 0:
			return `Updated today`;
		case 1:
			return `Updated ${diff} day ago`;
		default:
			return `Updated ${diff} days ago`;
	}
};
