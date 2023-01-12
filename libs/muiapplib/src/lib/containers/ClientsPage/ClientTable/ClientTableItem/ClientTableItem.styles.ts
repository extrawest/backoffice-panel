import { ClientTicketPriority } from "@backoffice-panel-app/shared";

export const clientTableItemStyles = {
	ticketDetail: {
		display: "flex",
	},
	userAvatar: {
		borderRadius: "50%",
		width: "44px",
		height: "44px",
		marginRight: "24px"
	},
	priority: {
		padding: "5px 12px",
		borderRadius: "100px",
		fontFamily: "Mulish",
		fontStyle: "normal",
		fontWeight: 700,
		fontSize: "11px",
		lineHeight: "14px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
		letterSpacing: "0.5px",
		textTransform: "uppercase",
		color: "#FFFFFF",
		width: "fit-content"
	},
	getLabelColor: (priority: ClientTicketPriority) => {
		switch (priority) {
			case (ClientTicketPriority.HIGH):
				return ({
					background: "#F12B2C"
				});
			case (ClientTicketPriority.LOW):
				return ({
					background: "#29CC97"
				});
			case (ClientTicketPriority.NORMAL):
				return ({
					background: "#FEC400"
				});
			default:
				return ({});
		}
	}
};
