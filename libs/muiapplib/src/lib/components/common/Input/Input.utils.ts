import { AdormentIconType } from "./Input.types";
import loginLogo from "../../../assets/icons/loginLogo.svg";
import passwordLogo from "../../../assets/icons/passwordLogo.svg";
import searchLogo from "../../../assets/icons/searchLogo.svg";

export const getStartAdormentLogo = (iconType: AdormentIconType) => {
	switch (iconType) {
		case "login":
			return loginLogo;
		case "password":
			return passwordLogo;
		case "search":
			return searchLogo;
		default:
			return undefined;
	}
};
