import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "@backoffice-panel-app/shared";
import { commonRoutes } from "./commonRoutes";
import { privateRoutes } from "./privateRoutes";

const AppRoutes = () => {
	return (
		<Suspense>
			<Routes>
				{[...privateRoutes, ...commonRoutes].map((route, index) => (
					<Route
						{...route}
						key={`r_${index}_${route.path}`}
						element={
							route.isAuth ? (
								<PrivateRoute>{route.element}</PrivateRoute>
							) : (
								<PublicRoute >
									{route.element}
								</PublicRoute>
							)
						}
					/>
				))}
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
