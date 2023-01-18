import { lazy } from "react";
import { AppRouteEnum, Routes } from "@backoffice-panel-app/shared";

const ClientsPage = lazy(() => import("../pages/Clients"));
const DashboardPage = lazy(() => import("../pages/Dashboard"));

export const privateRoutes: Routes = [
	{
		element: <ClientsPage />,
		path: AppRouteEnum.CLIENTS,
		isAuth: true
	},
	{
		element: <DashboardPage />,
		path: AppRouteEnum.DASHBOARD,
		isAuth: true
	}
];
