import loginLogo from "../../../assets/icons/loginLogo.svg";
import passwordLogo from "../../../assets/icons/passwordLogo.svg";
import { AdormentIconType } from "./Input.types";

export const getStartAdormentLogo = (iconType: AdormentIconType) => {
	switch (iconType) {
		case "login":
			return loginLogo;
		case "password":
			return passwordLogo;
		default:
			return undefined;
	}
};
