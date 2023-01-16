import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useIntl } from "react-intl";
import { Space, notification, Spin } from "antd";
import { AuthError } from "firebase/auth";
import { pageLayoutStyles } from "./PageLayout.styles";
import { PageLayoutProps } from "./PageLayout.types";
import { pageLayoutTexts } from "./PageLayout.texts";

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	const intl = useIntl();

	const openNotification = useCallback(
		(firebaseError: AuthError | Error) => {
			notification.open({
				message: intl.formatMessage(pageLayoutTexts.errorTitleText),
				description: firebaseError.message,
				placement: "bottomLeft",
				duration: 2000
			});
		},
		[],
	);

	useEffect(() => {
		if (error) openNotification(error);
	}, [error]);

	return (
		<>
			<Space
				style={pageLayoutStyles.root}
			>
				{children}
			</Space>
			{isLoading &&
				<Space
					style={{
						...pageLayoutStyles.backdrop,
						position: "absolute"
					}}
				>
					<Spin size="large" />
				</Space>
			}
		</>

	);
};

export default PageLayout;
