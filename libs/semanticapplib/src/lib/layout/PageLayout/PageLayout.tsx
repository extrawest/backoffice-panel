import { FC, PropsWithChildren } from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { PageLayoutProps } from "./PageLayout.types";

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
	children,
	isLoading,
	error
}) => {
	return (
		<>
			<Container>
				{children}
			</Container>
			<Container>
				<Dimmer active>
					<Loader inverted/>
				</Dimmer>
			</Container>
		</>
	);
};

export default PageLayout;
