import { FC, PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import { Container, Dimmer, Loader, Message } from "semantic-ui-react";
import { PageLayoutProps } from "./PageLayout.types";
import { pageLayoutTexts } from "./PageLayout.texts";

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	const intl = useIntl();
	return (
		<>
			<Container fluid>
				{children}
			</Container>
			<Dimmer
				active={isLoading}
				page
			>
				<Loader inverted />
			</Dimmer>
			<Message
				className="error-message"
				negative
				hidden={!error}
				compact
			>
				<Message.Header>{intl.formatMessage(pageLayoutTexts.errorTitleText)}</Message.Header>
				<Message.Content>{error?.message}</Message.Content>
			</Message>
		</>
	);
};

export default PageLayout;
