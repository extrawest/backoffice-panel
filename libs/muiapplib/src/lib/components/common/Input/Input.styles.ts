import { Theme } from "@mui/material";
import uploadImageIcon from "../../../assets/icons/uploadImageLogo.svg";

export const inputStyles = {
	image: (img?: File) => {
		return ({
			"& .MuiInputBase-root.MuiOutlinedInput-root": {
				width: "25vmin",
				height: "25vmin",
				borderRadius: "0px",
				backgroundColor: (theme: Theme) => theme.palette.additional.dark,
				backgroundImage: `url(${img ? URL.createObjectURL(img as Blob) : uploadImageIcon})`,
				backgroundSize: img ? "cover" : "50%",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				"& input": {
					margin: "0",
					padding: "0",
					height: "100%",
					opacity: "0",
					cursor: "pointer"
				}
			}
		});
	}
};
