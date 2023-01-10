import { AppRouteEnum } from "@backoffice-panel-app/shared";
import { SideBarLink } from "./PrivatePageLayout.types";
import dashboardLogo from "../../assets/icons/dashboardLogo.svg";
import teamLogo from "../../assets/icons/teamLogo.svg";
import offersLogo from "../../assets/icons/offersLogo.svg";
import partnersLogo from "../../assets/icons/partnersLogo.svg";
import financesLogo from "../../assets/icons/financesLogo.svg";
import clientsLogo from "../../assets/icons/clientsLogo.svg";

export const getSidebarLinks = (): Array<SideBarLink> => ([
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
