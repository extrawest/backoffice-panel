import { RouteProps } from "react-router-dom";

export type RouteItem = RouteProps & {
	isAuth?: boolean
};

export type Routes = Array<RouteItem>;
