import { AppRouteEnum } from "../../types";
import dashboardLogo from "../../assets/icon/dashboardLogo.svg";
import teamLogo from "../../assets/icon/teamLogo.svg";
import offersLogo from "../../assets/icon/offersLogo.svg";
import partnersLogo from "../../assets/icon/partnersLogo.svg";
import financesLogo from "../../assets/icon/financesLogo.svg";
import clientsLogo from "../../assets/icon/clientsLogo.svg";

export const getSidebarLinks = () => ([
	{
		title: "Dashboard",
		link: AppRouteEnum.DASHBOARD,
		icon: dashboardLogo
	},
	{
		title: "Team",
		icon: teamLogo
	},
	{
		title: "Offers",
		icon: offersLogo
	},
	{
		title: "Partners",
		icon: partnersLogo
	},
	{
		title: "Finances",
		icon: financesLogo
	},
	{
		title: "Clients",
		link: AppRouteEnum.CLIENTS,
		icon: clientsLogo
	}
]);

export type SideBarLinkProps = {
	link?: AppRouteEnum;
	title: string;
	icon: string;
};
