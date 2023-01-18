import { lazy } from "react";
import { AppRouteEnum, Routes } from "@backoffice-panel-app/shared";

const LoginPage = lazy(() => import("../pages/Login"));

export const commonRoutes: Routes = [
	{
		element: <LoginPage />,
		path: AppRouteEnum.LOGIN,
		isAuth: false
	}
];
