import { AuthError } from "firebase/auth";

export type PageLayoutProps = {
	isLoading: boolean;
	error: AuthError | undefined;
};
