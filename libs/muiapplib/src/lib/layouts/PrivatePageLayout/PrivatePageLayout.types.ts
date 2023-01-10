import { AppRouteEnum } from "@backoffice-panel-app/shared";
import { PageLayoutProps } from "../PageLayout/PageLayout.types";

export type PrivatePageLayoutProps = PageLayoutProps;

export type SideBarLink = {
	link?: AppRouteEnum;
	title: string;
	icon: string;
};
