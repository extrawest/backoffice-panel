import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/firebase";
import { AppRouteEnum, RouteItem } from "../types";

export const PrivateRoute: FC<PropsWithChildren<RouteItem>> = ({
	children
}) => {
	const location = useLocation();
	const [user, loading] = useAuthState(firebaseAuth);

	if (!user && !loading) {
		return (
			<Navigate
				to={AppRouteEnum.LOGIN}
				state={{ from: location }}
				replace
			/>
		);
	}

	return (
		<>{!loading && children}</>
	);
};

export default PrivateRoute;
